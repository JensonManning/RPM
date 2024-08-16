using API.Data;
using API.Dto.Roles;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{

    //[Authorize(Roles = "Admin, Project Manager")]
    [ApiController]
    [Route("api/[controller]")]
    public class RolesController : ControllerBase
    {
        // variables for contructor, setting the UserManager and RoleManager
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<AppUser> _userManager;

        // constructor
        public RolesController(RoleManager<IdentityRole> roleManager, UserManager<AppUser> userManager) {
            _roleManager = roleManager;
            _userManager = userManager;
        }

        // POST api/roles | Create the role
        [HttpPost]
        public async Task<IActionResult> CreateRole([FromBody] RoleCreateDto roleCreateDto)
        {
            // check if the model is valid
            if (string.IsNullOrEmpty(roleCreateDto.RoleName)) {
                return BadRequest("Role name is required");
            }

            // check if the role already exists
            var roleExist = await _roleManager.RoleExistsAsync(roleCreateDto.RoleName);
            if (roleExist) {
                return BadRequest("Role already exists");
            }

            // create the role
            var roleResult = await _roleManager.CreateAsync(new IdentityRole(
                roleCreateDto.RoleName));
            if (roleResult.Succeeded) {
                return Ok(new { message = roleCreateDto.RoleName + " created successfully"});
            } else {
                return BadRequest("Failed to create " + roleCreateDto.RoleName);
            }

        }

        // api/roles | Get all roles with user count in each role
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoleResponseDto>>> GetRoles()
        {
            

            // list of roles with total users in each role 

            var roles = await _roleManager.Roles.Select(r=>new RoleResponseDto{
                Id = r.Id,
                Name = r.Name,
                TotalUsers = _userManager.GetUsersInRoleAsync(r.Name!).Result.Count,
            }).ToListAsync();

            return Ok(roles);
        }

        // api/roles/{id} | Delete role
        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteRole(string id) {
            // check if the role exists
            var role = await _roleManager.FindByIdAsync(id);
            // check if the role is null
            if (role is null) {
                return NotFound("Role not found or is blank");
            }
            // delete the role
            var result = await _roleManager.DeleteAsync(role);
            // return the result if succeeded
            if (result.Succeeded) {
                return Ok(new { message = role +" deleted successfully" });
            }
            // return the result if failed 
            else {
                return BadRequest("Failed to delete " + role);
            }
        }

        [HttpPost("assign")]

        public async Task<IActionResult> AddUserToRole([FromBody] RoleAssignDto roleAssignDto) {

            // check if the user exists
            var user = await _userManager.FindByIdAsync(roleAssignDto.UserId);
            // check if the user is null
            if (user is null) {
                return NotFound(user + " not found");
            }

            // check if the role exists
            var role = await _roleManager.FindByIdAsync(roleAssignDto.RoleId);
            // check if the role is null
            if (role is null) {
                return NotFound(role + "not found");
            }

            // add the user to the role
            var result = await _userManager.AddToRoleAsync(user, role.Name!);
            // return the result if succeeded
            if (result.Succeeded) {
                return Ok(new { message = "User " + user.UserName + " assigned to " + role.Name + " successfully" });
            }
            // return the result if failed 
            else {
                return BadRequest("Failed to assign " + user.UserName + " to role");
            }
        }
    }
}