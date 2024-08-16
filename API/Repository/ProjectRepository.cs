using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dto.Projects;
using API.Interfaces;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class ProjectRepository : IProjectRepository
    {
         private readonly AppDbContext _context;

        public ProjectRepository(AppDbContext context)
        {
            _context = context;
        }
        
        public async Task<List<Project>> GetAllAsync()
        {
            return await _context.Project
                .Include(x => x.ProjectPhase)
                .Include(t => t.ProjectTasks)
                .Include(x => x.ProjectTeam)
                .ToListAsync();
        }

        public async Task<Project?> GetByIdAsync(int ProjectID)
        {
            return await _context.Project
                .Include(x => x.ProjectPhase)
                .Include(t => t.ProjectTasks)
                .Include(x => x.ProjectTeam)
                .FirstOrDefaultAsync(x => x.ProjectID == ProjectID);
        }

        public async Task<Project?> GetByNameAsync(string ProjectStatus)
        {
            return await _context.Project
                .FirstOrDefaultAsync(x => x.ProjectStatus == ProjectStatus);
        }

        public async Task<Project> CreateAsync(Project projectModel)
        {
            await _context.Project.AddAsync(projectModel);
            await _context.SaveChangesAsync();
            return projectModel;
        }

        
        public async Task<Project?> DeleteAsync(int ProjectID) {
            var project = await _context.Project.FirstOrDefaultAsync(x => x.ProjectID == ProjectID);
            if(project == null) {
                return null;
            }
            _context.Project.Remove(project);
            await _context.SaveChangesAsync();
            return project;
        }

        public Task<bool> ProjectsExists(int ProjectID)
        {
            return _context.Project.AnyAsync(x => x.ProjectID == ProjectID);
        }

        public async Task<Project?> UpdateAsync(int ProjectID, ProjectUpdateReqDto projectDto)
        {
            var existingProject = await _context.Project.FirstOrDefaultAsync(x => x.ProjectID == ProjectID);

            if(existingProject == null) {
                return null;
            }

            existingProject.ProjectName = projectDto.ProjectName;
            existingProject.ProjectStatus = projectDto.ProjectStatus;
            existingProject.ProjectShortcode = projectDto.ProjectShortCode;
            existingProject.ProjectDescription = projectDto.ProjectDescription;
            existingProject.ProjectStartDate = projectDto.ProjectStartDate;
            existingProject.ProjectEndDate = projectDto.ProjectEndDate;
            existingProject.ProjectStatus = projectDto.ProjectStatus;
            existingProject.ProjectTeam = projectDto.ProjectTeam.Select(dto => new ProjectTeam
                                                                    {
                                                                        ProjectID = dto.ProjectID,
                                                                        AppUserID = dto.AppUserID
                                                                    }).ToList();
            await _context.SaveChangesAsync();
            return existingProject;
        }

        public Task<bool> ProjectExists(int ProjectID)
        {
            return _context.Project.AnyAsync(x => x.ProjectID == ProjectID);
        }
    }
}