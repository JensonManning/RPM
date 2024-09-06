using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dto.Projects;
using API.Interfaces;
using API.Models;
using Microsoft.EntityFrameworkCore;
using static API.Models.ProjectStatusEnum;

namespace API.Repository
{
    public class ProjectRepository : IProjectRepository
    {
         private readonly AppDbContext _context;

        public ProjectRepository(AppDbContext context)
        {
            _context = context;
        }
        
        // GET 

        // GET ALL
        public async Task<List<Project>> GetAllAsync()
        {
            return await _context.Project
                .Include(x => x.ProjectPhase)
                .Include(t => t.ProjectTasks)
                .Include(x => x.AppUsers)
                .ToListAsync();
        }

        // GET BY ID
        public async Task<Project?> GetByIdAsync(int ProjectID)
        {
            return await _context.Project
                .Include(x => x.ProjectPhase)
                .Include(t => t.ProjectTasks)
                .Include(x => x.AppUsers)
                .FirstOrDefaultAsync(x => x.ProjectID == ProjectID);
        }


        // GET BY STATUS
        public async Task<Project?> GetByNameAsync(string ProjectStatus)
        {
            return await _context.Project
                .FirstOrDefaultAsync(x => x.ProjectStatus == ProjectStatus);
        }

        // GET BY USERID
        public async Task<Project?> GetByAppUserIDAsync(string AppUserID)
        {
            return await _context.Project
            .Include(p => p.AppUsers)
            .FirstOrDefaultAsync(p => p.AppUsers.Any(a => a.Id == AppUserID));
        }

        // GET BY USERID AND ACTIVE STATUS
        public async Task<IEnumerable<Project>> GetByAppUserIDAndProjectStatusAsync(string AppUserID, string ProjectStatus)
        {
            return await _context.Project
                .Where(p => p.AppUsers.Any(a => a.Id == AppUserID) && p.ProjectStatus == ProjectStatus)
                .ToListAsync();
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

        public async Task<bool> ProjectsExists(int ProjectID)
        {
            return await _context.Project.AnyAsync(x => x.ProjectID == ProjectID);
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
            await _context.SaveChangesAsync();
            return existingProject;
        }

        public async Task<bool> ProjectExists(int ProjectID)
        {
            return await _context.Project.AnyAsync(x => x.ProjectID == ProjectID);
        }

        public async Task<List<Project>> GetActiveProjectsByAppUserIDAsync(string AppUserID, ProjectStatusEnum projectStatus)
        {
            return await _context.Project
            .Where(p => p.AppUsers.Any(a => a.Id == AppUserID) && p.ProjectStatus == projectStatus.ToString())
            .ToListAsync();
        }

        public async Task<List<Project>> GetUpcomingProjectsByAppUserIDAsync(string AppUserID, ProjectStatusEnum projectStatus)
        {
            return await _context.Project
            .Where(p => p.AppUsers.Any(a => a.Id == AppUserID) && p.ProjectStatus == projectStatus.ToString())
            .ToListAsync();
        }

        public async Task<List<Project>> GetByAppUserIDAndProjectStatusNamesAsync(string AppUserID, string ProjectStatus)
        {
            return await _context.Project
            .Where(p => p.AppUsers.Any(a => a.Id == AppUserID) && p.ProjectStatus == ProjectStatus)
            .Include(x => x.ProjectPhase)
            .Include(t => t.ProjectTasks)
            .Include(x => x.AppUsers)
            .ToListAsync();
        }

        public async Task<Project?> AddUserToProjectAsync(int ProjectID, string UserName)
        {
            var project = await _context.Project
            .Include(p => p.AppUsers)
            .FirstOrDefaultAsync(p => p.ProjectID == ProjectID);
            if(project == null) {
                return null;
            }
            var user = await _context.Users
            .FirstOrDefaultAsync(u => u.UserName == UserName);
            if(user == null) {
                return null;
            }
            project.AppUsers.Add(user);
            await _context.SaveChangesAsync();
            return project;
        }
    }
}