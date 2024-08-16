using API.Data;
using API.Dto.ProjectTeam;
using API.Interfaces;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class ProjectTeamRepository : IProjectTeamRepository
    {
        // set AppDbContext and constructor
        private readonly AppDbContext _context;
        public ProjectTeamRepository(AppDbContext context)
        {
            _context = context;
        }

        // Get All 
        public async Task<List<ProjectTeam>> GetAllAsync()
        {
            return await _context.ProjectTeam.ToListAsync();
        }

        // Get By ID
        public async Task<ProjectTeam?> GetByIdAsync(int ProjectTeamID)
        {
            return await _context.ProjectTeam
                .FirstOrDefaultAsync(x => x.ProjectTeamID == ProjectTeamID);
        }

        // Create
        public async Task<ProjectTeam> CreateAsync(ProjectTeam projectTeamModel)
        {
            await _context.ProjectTeam.AddAsync(projectTeamModel);
            await _context.SaveChangesAsync();
            return projectTeamModel;
        }

        // Delete
        public async Task<ProjectTeam?> DeleteAsync(int ProjectTeamID)
        {
            // check if the project team exists
            var projectTeam = await _context.ProjectTeam.FirstOrDefaultAsync(x => x.ProjectTeamID == ProjectTeamID);
            if (projectTeam == null)
            {
                return null;
            }

            // delete the project team
            _context.ProjectTeam.Remove(projectTeam);
            await _context.SaveChangesAsync();
            return projectTeam;
        }

        // Update
        public async Task<ProjectTeam?> UpdateAsync(int ProjectTeamID, ProjectTeamUpdateReqDto projectTeamUpdateReqDto)
        {
            // check if the project team exists
            var projectTeam = await _context.ProjectTeam.FirstOrDefaultAsync(x => x.ProjectTeamID == ProjectTeamID);
            if (projectTeam == null)
            {
                return null;
            }

            // update the project team
            projectTeam.AppUserID = projectTeamUpdateReqDto.AppUserID;
            await _context.SaveChangesAsync();
            return projectTeam;
        }
    }
}