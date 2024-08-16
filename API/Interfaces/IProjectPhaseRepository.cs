using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.ProjectPhase;
using API.Models;

namespace API.Interfaces
{
    public interface IProjectPhaseRepository
    {
        Task<List<ProjectPhase>> GetAllAsync(); // Get All
        Task<ProjectPhase?> GetByIdAsync(int ProjectPhaseID); // Get By ID
        Task<ProjectPhase> CreateAsync(ProjectPhase projectPhaseModel); // Create
        Task<ProjectPhase?> UpdateAsync(int ProjectPhaseID, ProjectPhaseUpdateReqDto ProjectPhaseDto);
        Task<ProjectPhase?> DeleteAsync(int ProjectPhaseID);
    }
}