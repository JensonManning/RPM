using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.ProjectPhase;
using API.Interfaces;
using API.Mappers;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectPhaseController : ControllerBase
    {
        // Dependency Injection
        private readonly IProjectPhaseRepository _projectPhaseRepo;
        private readonly IProjectRepository _projectRepo;
        public ProjectPhaseController(IProjectPhaseRepository projectPhaseRepository, IProjectRepository projectRepository)
        {
            _projectPhaseRepo = projectPhaseRepository;
            _projectRepo = projectRepository;
        }

        // Get All
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var projectPhase = await _projectPhaseRepo.GetAllAsync();
            var projectPhaseDto = projectPhase.Select(x =>  x.ToProjectPhaseDto());
            return Ok(projectPhaseDto);
        }

        // Get By ID
        [HttpGet("{ProjectPhaseID}")]
        public async Task<IActionResult> GetById([FromRoute] int ProjectPhaseID)
        {
            var projectPhase = await _projectPhaseRepo.GetByIdAsync(ProjectPhaseID);
            if (projectPhase == null)
            {
                return NotFound(new { message = "Project Phase not found" });
            }
            return Ok(projectPhase.ToProjectPhaseDto());
        }

        // Create
        [HttpPost("{ProjectID}")]
        public async Task<IActionResult> Create([FromRoute] int ProjectID, ProjectPhaseCreateReqDto projectPhaseDto)
        {
            if (!await _projectRepo.ProjectExists(ProjectID)) 
            {
                return BadRequest(new { message = "Project does not exist" });
            }

            var projectPhaseModel = projectPhaseDto.ToProjectPhaseFromCreateProjectPhaseDto(ProjectID);
            await _projectPhaseRepo.CreateAsync(projectPhaseModel);
            return CreatedAtAction(nameof(GetById), new { ProjectPhaseID = projectPhaseModel.ProjectPhaseID }, projectPhaseModel.ToProjectPhaseDto());
        }

        // Update
        [HttpPut("{ProjectPhaseID}")]
        public async Task<IActionResult> Update([FromRoute] int ProjectPhaseID, ProjectPhaseUpdateReqDto projectPhaseDto)
        {
            var projectPhase = await _projectPhaseRepo.UpdateAsync(ProjectPhaseID, projectPhaseDto);
            if (projectPhase == null)
            {
                return NotFound(new { message = "Project Phase not found" });
            }
            return Ok(projectPhase);
        }
    }
}