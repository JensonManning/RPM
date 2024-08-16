using API.Dto.Projects;
using API.Models;

namespace API.Interfaces
{
    public interface IProjectRepository
    {
        Task<List<Project>> GetAllAsync(); // Get All
        Task<Project?> GetByIdAsync(int ProjectID); // Get By Id
        Task<Project> CreateAsync(Project projectModel); // Create
        Task<Project?> GetByNameAsync(string ProjectStatus); // Get By Name
        Task<bool> ProjectExists(int ProjectID); // Exists
        Task<Project?> UpdateAsync(int ProjectID, ProjectUpdateReqDto projectDto); // Update

        Task<Project?> DeleteAsync(int ProjectID);
    }
}