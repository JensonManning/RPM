using API.Data;
using Microsoft.AspNetCore.Mvc;
using API.Interfaces;
using API.Mappers;
using API.Dto.Projects;
using Microsoft.AspNetCore.Identity;
using API.Models;

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
        [HttpGet("{ProjectID}")]
        public async Task<IActionResult> GetById([FromRoute] int ProjectID) {
            var project = await _projectRepo.GetByIdAsync(ProjectID);
                if(project == null) 
                {
                    return NotFound();
                }
            return Ok(project.ToProjectDto());
        }

        // Get By Name
        [HttpGet("{ProjectID}/{ProjectStatus}")]
        public async Task<IActionResult> GetByName([FromRoute] string ProjectStatus) {
            var project = await _projectRepo.GetByNameAsync(ProjectStatus);
            if(project == null) {
                return NotFound();
            }
            switch(project.ProjectStatus) {
                case "Created":
                    return Ok("Project status is " + project.ProjectStatus + project.ToProjectDto());
                case "Active":
                    return Ok("Project status is " + project.ProjectStatus + project.ToProjectDto());
                case "Complete":
                    return Ok("Project status is " + project.ProjectStatus + project.ToProjectDto());
                case "Cancelled":
                    return Ok("Project status is " + project.ProjectStatus + project.ToProjectDto());
                case "Delayed":
                    return Ok("Project status is " + project.ProjectStatus + project.ToProjectDto());
                default:
                    this.HttpContext.Response.StatusCode = 900;
                    return StatusCode(900 , "Project is status is not defined properly");
            }
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
        public async Task<IActionResult> AddUserToProject([FromRoute] int ProjectID, [FromBody] string Username)
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
