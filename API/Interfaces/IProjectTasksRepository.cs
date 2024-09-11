using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.ProjectTasks;
using API.Models;

namespace API.Interfaces
{
    public interface IProjectTasksRepository
    {
        Task<List<ProjectTasks>> GetAllAsync();
        Task<ProjectTasks?> GetByIdAsync(int ProjectTasksID);
        Task<ProjectTasks> CreateAsync(ProjectTasks projectTasksModel); // Create
        Task<ProjectTasks?> UpdateAsync(int ProjectTasksID, ProjectTaskUpdateReqDto projectTaskDto); // Update
        Task<ProjectTasks?> UpdateToCompleteAsync(int ProjectTasksID, ProjectTaskUpdateToCompleteDto projectTaskDto);
        Task<ProjectTasks?> DeleteAsync(int ProjectTasksID);

        Task<IEnumerable<ProjectTasks>> GetActiveProjectTasksByAppUserIDAsync(string AppUserID, ProjectTaskStatusEnum projectTaskStatus);
        Task<IEnumerable<ProjectTasks>> GetAllByStatusAndAppUserIDAsync(string AppUserID, string projectTaskStatus);

        Task<ProjectTasks?> AddUserToProjectTaskAsync(int ProjectTasksID, string UserName);
    }
}