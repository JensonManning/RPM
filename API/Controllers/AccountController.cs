using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Dto;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    // api/account
    public class AccountController : ControllerBase
    {
        // variables for contructor, setting the UserManager and RoleManager
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;

        // constructor
        public AccountController(
            UserManager<AppUser> userManager, 
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration) {
                _userManager = userManager;
                _roleManager = roleManager;
                _configuration = configuration;
            }

        // POST api/account/register
        [HttpPost("register")]
        public async Task<ActionResult<string>> Register(RegisterDto registerDto)
        {

            // check if the model is valid
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // create a new user
            var user = new AppUser{
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
            if(registerDto.Roles is null){
                    await _userManager.AddToRoleAsync(user,"UnAssigned");
                    // re
                    return Ok("User Roll was UnAssigned, please assign to a role manually after registration is completed");
            }
            else{
                foreach(var role in registerDto.Roles)
                {
                    await _userManager.AddToRoleAsync(user,role);
                }
            }

            // return a success message
            return Ok(new AuthResponseDto{
                IsSuccess = true,
                Message = "Account Created Sucessfully! Name : " 
                            + user.FullName + " | Email : " 
                            + user.Email + " | Username : " 
                            + user.UserName
            });
        }
    }
}