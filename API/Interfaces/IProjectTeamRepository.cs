
using API.Dto.ProjectTeam;
using API.Models;

namespace API.Interfaces
{
    public interface IProjectTeamRepository
    {
        Task<List<ProjectTeam>> GetAllAsync();
        Task<ProjectTeam?> GetByIdAsync(int ProjectTeamID);
        Task<ProjectTeam> CreateAsync(ProjectTeam projectTeam);
        Task<ProjectTeam?> UpdateAsync(int ProjectTeamID, ProjectTeamUpdateReqDto projectTeamUpdateReqDto);
        Task<ProjectTeam?> DeleteAsync(int ProjectTeamID);
    }
}