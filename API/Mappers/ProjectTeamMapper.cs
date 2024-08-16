using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.ProjectTeam;
using API.Models;

namespace API.Mappers
{
    public static class ProjectTeamMapper
    {
        public static ProjectTeamDto ToProjectTeamDto(this ProjectTeam projectTeam)
        {
            return new ProjectTeamDto
            {
                ProjectTeamID = projectTeam.ProjectTeamID,
                ProjectID = projectTeam.ProjectID,
                AppUserID = projectTeam.AppUserID
            };
        }

        public static ProjectTeam ToProjectTeamFromCreateProjectTeamDto(this ProjectTeamCreateReqDto projectTeamDto) {
            return new ProjectTeam
            {
                ProjectID = projectTeamDto.ProjectID,
                AppUserID = projectTeamDto.AppUserID
            };
        }
    }
}