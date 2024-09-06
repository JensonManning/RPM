using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.ProjectTasks;
using API.Models;

namespace API.Mappers
{
    public static class ProjectTaskMapper
    {
        public static ProjectTaskDto ToProjectTasksDto(this ProjectTasks projectTasksModel)
        {
            return new ProjectTaskDto
            {
                ProjectTasksID = projectTasksModel.ProjectTasksID,
                ProjectTasksName = projectTasksModel.ProjectTasksName,
                ProjectTasksDescription = projectTasksModel.ProjectTasksDescription,
                ProjectTasksStartDate = projectTasksModel.ProjectTasksStartDate, 
                ProjectTasksEndDate = projectTasksModel.ProjectTasksEndDate, 
                ProjectTasksStatus = projectTasksModel.ProjectTasksStatus,
                ProjectID = projectTasksModel.ProjectID,
                ProjectPhaseID = projectTasksModel.ProjectPhaseID,
                AppUsers = projectTasksModel.AppUsers.Select(c => c.ToUserDetailDto()).ToList(),
                ProjectTaskActions = (Dto.ProjectTasks.ProjectTaskActions)projectTasksModel.ProjectTaskActions

            };
        }
        public static ProjectTasks ToProjectTasksFromCreateProjectTasksDto(this ProjectTaskCreateReqDto projectTasksDto, int ProjectID)
        {
            return new ProjectTasks
            {
                ProjectTasksName = projectTasksDto.ProjectTasksName,
                ProjectTasksDescription = projectTasksDto.ProjectTasksDescription,
                ProjectTasksStartDate = projectTasksDto.ProjectTasksStartDate,
                ProjectTasksEndDate = projectTasksDto.ProjectTasksEndDate,
                ProjectTasksStatus = projectTasksDto.ProjectTasksStatus,
                ProjectID = ProjectID,
                ProjectPhaseID = projectTasksDto.ProjectPhaseID
            };
        }
    }
}