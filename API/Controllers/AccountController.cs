using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Dto.Auth;
using API.Dto.Account;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    // api/account
    public class AccountController : ControllerBase
    {
        // variables for contructor, setting the UserManager and RoleManager
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;


        public AccountController(
            UserManager<AppUser> userManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration
        )
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            
        }

        // POST api/account/register
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<string>> Register(RegisterDto registerDto)
        {

            // check if the model is valid
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // create a new user
            var user = new AppUser
            {
                Email = registerDto.Email,
                FullName = registerDto.FullName,
                UserName = registerDto.Email
            };

            // create the user
            var result = await _userManager.CreateAsync(user,registerDto.Password);

            // check if the user was created
            if(!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }
            
            // add the user to the role, we will need to input this manually or have it error out!
            if(registerDto.Roles is null)
            {
                await _userManager.AddToRoleAsync(user,"UnAssigned");
                // return message about user being unassigned
                return Ok("User role was UnAssigned, please assign to a role manually after registration is completed");
            }
            else
            {
                foreach(var role in registerDto.Roles)
                {
                    await _userManager.AddToRoleAsync(user,role);
                }
            }

            // return a success message
            return Ok(new AuthResponseDto
            {
                IsSuccess = true,
                Message = "Account Created Sucessfully! Name : " 
                            + user.FullName + " | Email : " 
                            + user.Email + " | Username : " 
                            + user.UserName
            });
        }

        // POST api/account/login
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<AuthResponseDto>> Login(LoginDto loginDto)
        {
        
            // check if the model is valid
            if(!ModelState.IsValid) 
            {
            
                return BadRequest(ModelState + "MODEL STATE IS NOT VALID");
            }

            // check if the user exists
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            // if user is null, return Unauthorized
            if(user is null) 
            {
                return Unauthorized(new AuthResponseDto{
                    IsSuccess = false,
                    Message = user + " not found with this Email/Username" 
                });
            }

            // check if the password is correct
            var result = await _userManager.CheckPasswordAsync(user,loginDto.Password);

            if(!result) 
            {
                return Unauthorized(new AuthResponseDto{
                    IsSuccess = false,
                    Message = "Incorrect Email or Password" 
                });
            }

            var token = GenerateToken(user);
            var refreshToken = GenerateRefreshToken();


            if (int.TryParse(_configuration.GetSection("JWTSetting").GetSection("RefreshTokenValidityInDays").Value!, out var refreshTokenValidityInDays))
            {
                user.RefreshToken = refreshToken;
                user.RefreshTokenExpiryTime = DateTime.Now.AddDays(refreshTokenValidityInDays);
            }

            await _userManager.UpdateAsync(user);

            return Ok(new AuthResponseDto{
                Token = token,
                IsSuccess = true,
                Message = user + " Login Success.",
                RefreshToken = refreshToken
            });
        }
        
        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        // Generate Token
        private string GenerateToken(AppUser user)
        {
            // Variables
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII
                .GetBytes(_configuration.GetSection("JWTSetting").GetSection("securityKey").Value!);
            var roles = _userManager.GetRolesAsync(user).Result;

            // New claims
            List<Claim> claims = 
            [
                new (JwtRegisteredClaimNames.Email,user.Email??""),
                new (JwtRegisteredClaimNames.Name,user.FullName??""),
                new (JwtRegisteredClaimNames.NameId,user.Id??""),
                new (JwtRegisteredClaimNames.Aud, _configuration
                .GetSection("JWTSetting")
                .GetSection("ValidAudience").Value!),
                new (JwtRegisteredClaimNames.Iss, _configuration
                .GetSection("JWTSetting")
                .GetSection("ValidIssuer").Value!),
            ];

            // Add roles
            foreach(var role in roles) 
            {
                claims.Add(new Claim(ClaimTypes.Role,role));
            }

            // Create Token
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256
                )
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        // GET api/account/detail
        [HttpGet("detail")] 
        public async Task<ActionResult<UserDetailDto>> GetUserDetail() 
        {
            // get current user Id
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            // check if user exists
            var user = await _userManager.FindByIdAsync(currentUserId!);
            // if user is null, return NotFound
            if(user is null) 
            {
                return NotFound(new AuthResponseDto{
                    IsSuccess = false,
                    Message = user + " not found"
                });
            }
            // return user details
            return Ok(new UserDetailDto 
            {
                Id = user.Id,
                Email = user.Email,
                FullName = user.FullName,
                Roles = [..await _userManager.GetRolesAsync(user)],
                PhoneNumber = user.PhoneNumber,
                PhoneNumberConfirmed = user.PhoneNumberConfirmed,
                TwoFactorEnabled = user.TwoFactorEnabled,
                AccessFailedCount = user.AccessFailedCount 
            });
        }

        // GET api/account
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDetailDto>>> GetUsers() 
        {
            // get all users
            var users = await _userManager.Users.Select(u=> new UserDetailDto 
            {
                Id = u.Id,
                Email = u.Email,
                FullName = u.FullName,
                Roles = _userManager.GetRolesAsync(u).Result.ToArray()
            }).ToListAsync();

            return Ok(users);
        }
        
        // DELETE api/account
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id) 
        {
            var user = await _userManager.FindByIdAsync(id);
            if(user is null) 
            {
                return NotFound();
            }
            var result = await _userManager.DeleteAsync(user);
            if(result.Succeeded) 
            {
                return Ok(new AuthResponseDto
                {
                    IsSuccess = true,
                    Message = user + " deleted successfully"
                });
            }
            return BadRequest(new AuthResponseDto
            {
                IsSuccess = false,
                Message = "Failed to delete " + user
            });
        }

        // PUT api/account
        [HttpPut]
        public async Task<IActionResult> UpdateUser([FromBody] UserDetailDto userDetailDto) 
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userManager.FindByIdAsync(currentUserId!);
            if(user is null) 
            {
                return NotFound();
            }
            user.Email = userDetailDto.Email;
            user.FullName = userDetailDto.FullName;
            user.PhoneNumber = userDetailDto.PhoneNumber;
            user.PhoneNumberConfirmed = userDetailDto.PhoneNumberConfirmed;
            user.TwoFactorEnabled = userDetailDto.TwoFactorEnabled;
            user.AccessFailedCount = userDetailDto.AccessFailedCount;
            var result = await _userManager.UpdateAsync(user);
            if(result.Succeeded) 
            {
                return Ok(new AuthResponseDto 
                {
                    IsSuccess = true,
                    Message = user + " updated successfully"
                });
            }
            return BadRequest(new AuthResponseDto
            {
                IsSuccess = false,
                Message = "Failed to update " + user
            });
        }
    }
}