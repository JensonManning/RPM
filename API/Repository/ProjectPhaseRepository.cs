using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dto.ProjectPhase;
using API.Interfaces;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class ProjectPhaseRepository : IProjectPhaseRepository
    {
        // set AppDbContext and constructor
        private readonly AppDbContext _context;
        public ProjectPhaseRepository(AppDbContext context)
        {
            _context = context;
        }

        // Create
        public async Task<ProjectPhase> CreateAsync(ProjectPhase projectPhaseModel)
        {
            await _context.ProjectPhase.AddAsync(projectPhaseModel);
            await _context.SaveChangesAsync();
            return projectPhaseModel;
        }

        // Delete
        public async Task<ProjectPhase?> DeleteAsync(int ProjectPhaseID)
        {
            var projectPhase = await _context.ProjectPhase.FirstOrDefaultAsync(x => x.ProjectPhaseID == ProjectPhaseID);
            if (projectPhase == null)
            {
                return null;
            }
            _context.ProjectPhase.Remove(projectPhase);
            await _context.SaveChangesAsync();
            return projectPhase;
        }

        // Get All
        public async Task<List<ProjectPhase>> GetAllAsync()
        {
            return await _context.ProjectPhase.ToListAsync();
        }

        // Get By ID
        public async Task<ProjectPhase?> GetByIdAsync(int ProjectPhaseID)
        {
            return await _context.ProjectPhase.FindAsync(ProjectPhaseID);
        }

        // Update
        public async Task<ProjectPhase?> UpdateAsync(int ProjectPhaseID, ProjectPhaseUpdateReqDto projectPhaseDto)
        {
            var existingProjectPhase = await _context.ProjectPhase.FirstOrDefaultAsync(p => p.ProjectPhaseID == ProjectPhaseID);
            if (existingProjectPhase == null)
            {
                return null;
            }

            existingProjectPhase.ProjectPhaseName = projectPhaseDto.ProjectPhaseName;
            existingProjectPhase.ProjectPhaseDescription = projectPhaseDto.ProjectPhaseDescription;
            existingProjectPhase.ProjectPhaseStartDate = projectPhaseDto.ProjectPhaseStartDate;
            existingProjectPhase.ProjectPhaseEndDate = projectPhaseDto.ProjectPhaseEndDate;
            existingProjectPhase.ProjectPhaseStatus = projectPhaseDto.ProjectPhaseStatus;
            existingProjectPhase.ProjectPhaseOrder = projectPhaseDto.ProjectPhaseOrder;

            await _context.SaveChangesAsync();
            return existingProjectPhase;
        }
    }
}