
using API.Data;
using API.Dto.Auth;
using API.Dto.ProjectTeam;
using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectTeamController : ControllerBase
    {
        private readonly IProjectTeamRepository _projectTeamRepo;
        private readonly AppDbContext _context;
        public ProjectTeamController(IProjectTeamRepository projectTeamRepo, AppDbContext context)
        {
            _projectTeamRepo = projectTeamRepo;
            _context = context;
        }

        // Get All
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var projectTeam = await _projectTeamRepo.GetAllAsync();
            var projectTeamDto = projectTeam.Select(x => new ProjectTeamDto());
            return Ok(projectTeamDto);
        }

        // Get By ID
        [HttpGet("{ProjectTeamID}")]
        public async Task<IActionResult> GetById([FromRoute] int ProjectTeamID)
        {
            var projectTeam = await _projectTeamRepo.GetByIdAsync(ProjectTeamID);
            if (projectTeam == null)
            {
                return NotFound(new { message = "Project Team not found" });
            }

            return Ok(projectTeam);
        }

        // Create
        [HttpPost("{ProjectID}")]
        public async Task<IActionResult> Create([FromBody] ProjectTeamCreateReqDto projectTeamCreateReqDto)
        {
            var projectTeam = new ProjectTeam
            {
                ProjectID = projectTeamCreateReqDto.ProjectID,
                AppUserID = projectTeamCreateReqDto.AppUserID
            };
            await _projectTeamRepo.CreateAsync(projectTeam);
            return Ok(projectTeam);
        }

        // Update
        [HttpPut("{ProjectTeamID}")]
        public async Task<IActionResult> Update([FromRoute] int ProjectTeamID, [FromBody] ProjectTeamUpdateReqDto projectTeamUpdateReqDto)
        {
            var projectTeam = await _projectTeamRepo.UpdateAsync(ProjectTeamID, projectTeamUpdateReqDto);
            if (projectTeam == null)
            {
                return NotFound(new { message = "Project Team not found" });
            }

            return Ok(projectTeam);
        }

        // Delete
        [HttpDelete("{ProjectTeamID}")]
        public async Task<IActionResult> Delete([FromRoute] int ProjectTeamID)
        {
            var projectTeam = await _projectTeamRepo.DeleteAsync(ProjectTeamID);
            if (projectTeam == null)
            {
                return NotFound( new { message = "Project Team not found" });
            }

            return Ok(projectTeam);
        }
    }
}