using API.Dto.Projects;
using API.Models;
using static API.Models.ProjectStatusEnum;

namespace API.Interfaces
{
    public interface IProjectRepository
    {
        Task<List<Project>> GetAllAsync(); // Get All
        Task<Project?> GetByIdAsync(int ProjectID); // Get By Id
        Task<Project> CreateAsync(Project projectModel); // Create
        Task<Project?> GetByNameAsync(string ProjectStatus); // Get By Name
        Task<bool> ProjectExists(int ProjectID); // Exists
        Task<Project?> GetByAppUserIDAsync(string AppUserID); // Get By User ID
        Task<IEnumerable<Project>> GetByAppUserIDAndProjectStatusAsync(string AppUserID, string ProjectStatus); // Get By User ID and Status
        Task<Project?> UpdateAsync(int ProjectID, ProjectUpdateReqDto projectDto); // Update

        Task<Project?> DeleteAsync(int ProjectID);

        Task<List<Project>> GetActiveProjectsByAppUserIDAsync(string AppUserID, ProjectStatusEnum projectStatus);

        Task<List<Project>> GetUpcomingProjectsByAppUserIDAsync(string AppUserID, ProjectStatusEnum projectStatus);

        Task<List<Project>> GetByAppUserIDAndProjectStatusNamesAsync(string AppUserID, string ProjectStatus);

        Task<Project?> AddUserToProjectAsync(int ProjectID, string AppUserID);

    }
}