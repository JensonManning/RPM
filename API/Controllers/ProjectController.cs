using API.Data;
using Microsoft.AspNetCore.Mvc;
using API.Interfaces;
using API.Mappers;
using API.Dto.Projects;
using Microsoft.AspNetCore.Identity;
using API.Models;
using static API.Models.ProjectStatusEnum;

namespace API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    
    public class ProjectsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IProjectRepository _projectRepo;
        private readonly UserManager<AppUser> _userManager;
        public ProjectsController(AppDbContext context, IProjectRepository projectRepo, UserManager<AppUser> userManager)
        {
            _context = context;
            _projectRepo = projectRepo;
            _userManager = userManager;
        }

        // Get All
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var project = await _projectRepo.GetAllAsync();

            var projectDTO = project.Select(s => s.ToProjectDto());   

            return Ok(project);
        }

        // Get By Id
        [HttpGet("ProjectID/{ProjectID}")]
        public async Task<IActionResult> GetById([FromRoute] int ProjectID) {
            var project = await _projectRepo.GetByIdAsync(ProjectID);

                if(project == null) 
                {
                    return NotFound();
                }
            var projectDTO = project.ToProjectDto();
            return Ok(projectDTO);
        }

        // Get All By Project Status
        [HttpGet("ProjectStatus/{ProjectStatus}")]
        public async Task<IActionResult> GetByName([FromRoute] string ProjectStatus) {
        var projects = await _projectRepo.GetByNameAsync(ProjectStatus);

        if (projects == null)
        {
            return BadRequest(new { message = "No projects with that status exist" });
        }   
        else 
        {
            var projectDTO = projects.ToProjectDto();
            return Ok(projectDTO);
        }
    }
        
        // Get All By AppUserID
        [HttpGet("{AppUserID}")]
        public async Task<IActionResult> GetByAppUserID([FromRoute] string AppUserID) {
            var projects = await _projectRepo.GetByAppUserIDAsync(AppUserID);
            if(projects == null) {
                return NotFound();
            }
            return Ok(projects.ToProjectDto());
        }
        
        // Get Active Projects By UserID
        [HttpGet("UserActive/{AppUserID}")]
        public async Task<IActionResult> GetActiveProjectsByAppUserID([FromRoute] string AppUserID)
        {
            var projects = await _projectRepo.GetActiveProjectsByAppUserIDAsync(AppUserID, ProjectStatusEnum.Active);

            if (projects == null)
            {
                return BadRequest(new { message = "No active projects with that user ID exist" });
            }

            var projectDTO = projects.Select(p => p.ToProjectDto());
            return Ok(projectDTO);
        }

        // Get Upcoming Projects By UserID
        [HttpGet("UserUpcoming/{AppUserID}")]
        public async Task<IActionResult> GetUpcomingProjectsByAppUserID([FromRoute] string AppUserID)
        {
            var projects = await _projectRepo.GetUpcomingProjectsByAppUserIDAsync(AppUserID, ProjectStatusEnum.Upcoming);

            if (projects == null)
            {
                return BadRequest(new { message = "No upcoming projects with that user ID exist" });
            }

            var projectDTO = projects.Select(p => p.ToProjectDto());
            return Ok(projectDTO);
        }

        // Get Projects By Status and User ID
        [HttpGet("{AppUserID}/{ProjectStatus}")]
        public async Task<IActionResult> GetByAppUserIDAndProjectStatus([FromRoute] string AppUserID, [FromRoute] string ProjectStatus)
        {
            var projects = await _projectRepo.GetByAppUserIDAndProjectStatusNamesAsync(AppUserID,ProjectStatus);

            if (projects == null)
            {
                return BadRequest(new { message = "No projects with that status exist" });
            }   
            else 
            {
                var projectDTO = projects.Select(p => p.ToProjectDto());
                return Ok(projectDTO);
            }
        }

        // Get Project Names By Status and User ID
        [HttpGet("names/{AppUserID}/{ProjectStatus}")]
        public async Task<IActionResult> GetProjectNamesByAppUserIDAndStatus(string AppUserID, string ProjectStatus)
        {
            var result = await _projectRepo.GetByAppUserIDAndProjectStatusNamesAsync(AppUserID, ProjectStatus);
            return Ok(result);
        }
        // Create
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ProjectCreateReqDto projectDto) {
            var projectModel = projectDto.ToProjectFromCreateProjectDto();
            await _projectRepo.CreateAsync(projectModel);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new {ProjectID = projectModel.ProjectID}, projectModel.ToProjectDto());
        }

        [HttpPost("{ProjectID}/users")]
        public async Task<IActionResult> AddUserToProject2([FromRoute] int ProjectID, [FromBody] string Username)
        {
            var project = await _projectRepo.GetByIdAsync(ProjectID);
            if (project == null)
            {
                return NotFound();
            }

            var user = await _userManager.FindByNameAsync(Username);
            if (user == null)
            {
                return NotFound("User not found");
            }

            project.AppUsers.Add(user);
            await _context.SaveChangesAsync();

            return Ok("User added to project");
        }

        [HttpPost("AddUserToProject/{ProjectID}/{Username}")]
        public async Task<IActionResult> AddUserToProject([FromRoute] int ProjectID, [FromRoute] string UserName)
        {
            var project = await _projectRepo.AddUserToProjectAsync(ProjectID, UserName);
            if (project == null) return NotFound();
            return Ok("User added to project");
        }

        // Update
        [HttpPut("{ProjectID}")]
        public async Task<IActionResult> Update([FromRoute] int ProjectID, [FromBody] ProjectUpdateReqDto projectDto) {
            var projectModel = await _projectRepo.UpdateAsync(ProjectID, projectDto);
            if(projectModel == null) {
                return NotFound();
            }
            return Ok(projectModel.ToProjectDto());
        }

        // Delete
        [HttpDelete("{ProjectID}")]
        public async Task<IActionResult> Delete([FromRoute] int ProjectID) {
            var project = await _projectRepo.DeleteAsync(ProjectID);
            if(project == null) {
                return NotFound();
            }
            return NoContent();
        }

        
    }
}
