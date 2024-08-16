using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.ProjectPhase;
using API.Models;

namespace API.Mappers
{
    public static class ProjectPhaseMapper
    {
        public static ProjectPhaseDto ToProjectPhaseDto(this ProjectPhase projectPhaseModel)
        {
            return new ProjectPhaseDto
            {
                ProjectPhaseID = projectPhaseModel.ProjectPhaseID,
                ProjectPhaseName = projectPhaseModel.ProjectPhaseName,
                ProjectPhaseDescription = projectPhaseModel.ProjectPhaseDescription,
                ProjectPhaseStartDate = projectPhaseModel.ProjectPhaseStartDate,
                ProjectPhaseEndDate = projectPhaseModel.ProjectPhaseEndDate,
                ProjectPhaseStatus = projectPhaseModel.ProjectPhaseStatus,
                ProjectID = projectPhaseModel.ProjectID
            };
        }
        public static ProjectPhase ToProjectPhaseFromCreateProjectPhaseDto(this ProjectPhaseCreateReqDto projectPhaseDto, int ProjectID)
        {
            return new ProjectPhase
            {
                ProjectPhaseName = projectPhaseDto.ProjectPhaseName,
                ProjectPhaseDescription = projectPhaseDto.ProjectPhaseDescription,
                ProjectPhaseStartDate = projectPhaseDto.ProjectPhaseStartDate,
                ProjectPhaseEndDate = projectPhaseDto.ProjectPhaseEndDate,
                ProjectPhaseStatus = projectPhaseDto.ProjectPhaseStatus,
                ProjectID = ProjectID
            };
        }
    }
}