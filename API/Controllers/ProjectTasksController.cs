using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using API.Mappers;
using API.Dto.ProjectTasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectTasksController : ControllerBase
    {
        private readonly IProjectTasksRepository _projectTasksRepo;
        private readonly IProjectRepository _projectRepo;

        public ProjectTasksController(IProjectTasksRepository projectTasksRepository, IProjectRepository projectRepository)
        {
            _projectTasksRepo = projectTasksRepository;
            _projectRepo = projectRepository;
        }

        // Get All
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var projectTasks = await _projectTasksRepo.GetAllAsync();
            var projectTasksDto = projectTasks.Select(x => x.ToProjectTasksDto());
            return Ok(projectTasksDto);
        }

        // Get By ID
        [HttpGet("{ProjectTasksID}")]
        public async Task<IActionResult> GetById([FromRoute] int ProjectTasksID)
        {
            var projectTasks = await _projectTasksRepo.GetByIdAsync(ProjectTasksID);
            if (projectTasks == null)
            {
                return NotFound(new { message = "Project Tasks not found" });
            }
            return Ok(projectTasks.ToProjectTasksDto());
        }

        // Create
        [HttpPost("{ProjectID}")]
        public async Task<IActionResult> Create([FromRoute] int ProjectID, ProjectTaskCreateReqDto projectTasksDto)
        {
            if (!await _projectRepo.ProjectExists(ProjectID)) 
            {
                return BadRequest(new { message = "Project does not exist" });
            }

            var projectTasks = projectTasksDto.ToProjectTasksFromCreateProjectTasksDto(ProjectID);
            await _projectTasksRepo.CreateAsync(projectTasks);
            return Ok(projectTasks);
        }

        // Update
        [HttpPut("{ProjectTasksID}")]
        public async Task<IActionResult> Update([FromRoute] int ProjectTasksID, [FromBody] ProjectTaskUpdateReqDto projectTaskDto)
        {
            var projectTasks = await _projectTasksRepo.UpdateAsync(ProjectTasksID, projectTaskDto);
            if (projectTasks == null)
            {
                return NotFound(new { message = "Project Tasks not found" });
            }
            return Ok(projectTasks);
        }
    }
}