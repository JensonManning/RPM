using API.Data;
using API.Dto.Roles;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{

    [Authorize(Roles = "Admin, Project Manager")]
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
        public async Task<IActionResult> CreateRole([FromBody] CreateRoleDto createRoleDto)
        {
            // check if the model is valid
            if (string.IsNullOrEmpty(createRoleDto.RoleName)) {
                return BadRequest("Role name is required");
            }

            // check if the role already exists
            var roleExist = await _roleManager.RoleExistsAsync(createRoleDto.RoleName);
            if (roleExist) {
                return BadRequest("Role already exists");
            }

            // create the role
            var roleResult = await _roleManager.CreateAsync(new IdentityRole(
                createRoleDto.RoleName));
            if (roleResult.Succeeded) {
                return Ok(new { message = "Role created successfully"});
            } else {
                return BadRequest("Failed to create role");
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
                return Ok(new { message = "Role deleted successfully" });
            }
            // return the result if failed 
            else {
                return BadRequest("Failed to delete role");
            }
        }
    }
}