using API.Data;
using API.Dto.ProjectTasks;
using API.Interfaces;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{  
    public class ProjectTasksRepository : IProjectTasksRepository
    {
        private readonly AppDbContext _context;   
        

        public ProjectTasksRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<ProjectTasks> CreateAsync(ProjectTasks projectTasksModel)
        {
            await _context.ProjectTasks.AddAsync(projectTasksModel);
            await _context.SaveChangesAsync();
            return projectTasksModel;
        }

        public async Task<ProjectTasks?> DeleteAsync(int projectTasksID)
        {
            var projectTasks = await _context.ProjectTasks.FirstOrDefaultAsync(x => x.ProjectTasksID == projectTasksID);
            if (projectTasks == null)
            {
                return null;
            }

            _context.ProjectTasks.Remove(projectTasks);
            _context.SaveChanges();
            return projectTasks;
        }

        public async Task<List<ProjectTasks>> GetAllAsync()
        {
            return await _context.ProjectTasks.ToListAsync();
        }

        public async Task<ProjectTasks?> GetByIdAsync(int projectTasksID)
        {
            return await _context.ProjectTasks.FindAsync(projectTasksID);
        }

        public async Task<ProjectTasks> UpdateAsync(int ProjectTasksID, ProjectTaskUpdateReqDto projectTaskDto)
        {
            var existingProjectTask = await _context.ProjectTasks.FirstOrDefaultAsync(t => t.ProjectTasksID == ProjectTasksID);
            if (existingProjectTask == null)
            {
                return null;
            }

            existingProjectTask.ProjectTasksName = projectTaskDto.ProjectTasksName;
            existingProjectTask.ProjectTasksDescription = projectTaskDto.ProjectTasksDescription;
            existingProjectTask.ProjectTasksStartDate = projectTaskDto.ProjectTasksStartDate;
            existingProjectTask.ProjectTasksEndDate = projectTaskDto.ProjectTasksEndDate;
            existingProjectTask.ProjectTasksStatus = projectTaskDto.ProjectTasksStatus;

            await _context.SaveChangesAsync();
            return existingProjectTask;
        }

        public async Task<IEnumerable<ProjectTasks>> GetActiveProjectTasksByAppUserIDAsync(string AppUserID, ProjectTaskStatusEnum projectTaskStatus)
        {
            return await _context.ProjectTasks
                .Join(_context.Project, pt => pt.ProjectID, p => p.ProjectID, (pt, p) => new { pt, p })
                .Where(x => x.pt.AppUsers.Any(a => a.Id == AppUserID) && x.pt.ProjectTasksStatus == projectTaskStatus.ToString())
                .Select(x => new ProjectTasks
                {
                    ProjectTasksID = x.pt.ProjectTasksID,
                    ProjectTasksName = x.pt.ProjectTasksName,
                    ProjectTasksDescription = x.pt.ProjectTasksDescription,
                    ProjectTasksStartDate = x.pt.ProjectTasksStartDate,
                    ProjectTasksEndDate = x.pt.ProjectTasksEndDate,
                    ProjectTasksStatus = x.pt.ProjectTasksStatus,
                    ProjectName = x.p.ProjectName,
                    ProjectID = x.p.ProjectID,
                    ProjectPhaseID = x.pt.ProjectPhaseID,
                    ProjectPhaseName = x.pt.ProjectPhase.ProjectPhaseName
                })
                .ToListAsync();
        }

        public async Task<ProjectTasks?> UpdateToCompleteAsync(int ProjectTasksID, ProjectTaskUpdateToCompleteDto projectTaskDto)
        {
            var existingProjectTask = await _context.ProjectTasks.FirstOrDefaultAsync(t => t.ProjectTasksID == ProjectTasksID);
            if (existingProjectTask == null)
            {
                return null;
            }
            existingProjectTask.ProjectTasksStatus = projectTaskDto.ProjectTasksStatus;
            await _context.SaveChangesAsync();
            return existingProjectTask;
        }

        public async Task<IEnumerable<ProjectTasks>> GetAllByStatusAndAppUserIDAsync(string AppUserID, string projectTaskStatus)
        {
            return await _context.ProjectTasks
            .Where(p => p.AppUsers.Any(a => a.Id == AppUserID) && p.ProjectTasksStatus == projectTaskStatus.ToString())
            .ToListAsync();
        }

        public async Task<ProjectTasks?> AddUserToProjectTaskAsync(int ProjectTasksID, string UserName)
        {
            var projectTasks = await _context.ProjectTasks.FirstOrDefaultAsync(t => t.ProjectTasksID == ProjectTasksID);
            if (projectTasks == null)
            {
                return null;
            }
            projectTasks.AppUsers.Add(await _context.AppUser.FirstOrDefaultAsync(u => u.UserName == UserName));
            await _context.SaveChangesAsync();
            return projectTasks;
        }

        
    }
}