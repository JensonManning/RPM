using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using API.Mappers;
using API.Dto.ProjectTasks;
using API.Models;

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

        // Get Active Tasks By User ID
        [HttpGet("activetasks/{AppUserID}")]
        public async Task<IActionResult> GetActiveProjectTasksByAppUserID([FromRoute] string AppUserID)
        {
            var projectTasks = await _projectTasksRepo.GetActiveProjectTasksByAppUserIDAsync(AppUserID, ProjectTaskStatusEnum.Active);
            var projectTasksDTO = projectTasks.Select(p => p.ToProjectTasksDto());
            return Ok(projectTasksDTO);
        }

        // Get Upcoming Tasks By User ID
        [HttpGet("upcomingtasks/{AppUserID}")]
        public async Task<IActionResult> GetUpcomingProjectTasksByAppUserID([FromRoute] string AppUserID)
        {
            var projectTasks = await _projectTasksRepo.GetActiveProjectTasksByAppUserIDAsync(AppUserID, ProjectTaskStatusEnum.Upcoming);
            var projectTasksDTO = projectTasks.Select(p => p.ToProjectTasksDto());
            return Ok(projectTasksDTO);
        }

        // Get All Tasks By Status and User ID
        [HttpGet("{Status}/{AppUserID}")]
        public async Task<IActionResult> GetAllByStatusAndAppUserID([FromRoute] string Status, [FromRoute] string AppUserID)
        {
            var projectTasks = await _projectTasksRepo.GetAllByStatusAndAppUserIDAsync(Status, AppUserID);
            var projectTasksDTO = projectTasks.Select(p => p.ToProjectTasksDto());
            return Ok(projectTasksDTO);
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

        // Update Task to Complete
        [HttpPut("complete/{ProjectTasksID}")]
        public async Task<IActionResult> UpdateToComplete([FromRoute] int ProjectTasksID, [FromBody] ProjectTaskUpdateToCompleteDto projectTaskDto)
        {
            var projectTasks = await _projectTasksRepo.UpdateToCompleteAsync(ProjectTasksID, projectTaskDto);
            if (projectTasks == null)
            {
                return NotFound(new { message = "Project Tasks not found" });
            }
            return Ok(projectTasks);
        }

        // Add User to Project Task
        [HttpPost("adduser/{ProjectTasksID}/{UserName}")]
        public async Task<IActionResult> AddUserToProjectTask([FromRoute] int ProjectTasksID, [FromRoute] string UserName)
        {
            var projectTasks = await _projectTasksRepo.AddUserToProjectTaskAsync(ProjectTasksID, UserName);
            if (projectTasks == null)
            {
                return NotFound(new { message = "Project Tasks not found" });
            }
            return Ok(projectTasks);
        }
    }
}