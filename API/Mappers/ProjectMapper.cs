using API.Dto.Projects;
using API.Models;

namespace API.Mappers
{
    public static class ProjectMapper
    {
        public static ProjectDto ToProjectDto(this Project projectModel)
        {
            return new ProjectDto{
                ProjectID = projectModel.ProjectID,
                ProjectName = projectModel.ProjectName,
                ProjectShortCode = projectModel.ProjectShortcode,
                ProjectDescription = projectModel.ProjectDescription,
                ProjectStatus = projectModel.ProjectStatus,
                ProjectStartDate = projectModel.ProjectStartDate,
                ProjectEndDate = projectModel.ProjectEndDate,
                ProjectPhase = projectModel.ProjectPhase.Select(c => c.ToProjectPhaseDto()).ToList(),
                ProjectTasks = projectModel.ProjectTasks.Select(c => c.ToProjectTasksDto()).ToList(),
                AppUsers = projectModel.AppUsers.Select(c => c.ToUserDetailDto()).ToList()
            };
        }

        public static Project ToProjectFromCreateProjectDto(this ProjectCreateReqDto projectDto)
        {
            return new Project
            {
                ProjectName = projectDto.ProjectName,
                ProjectShortcode = projectDto.ProjectShortCode,
                ProjectDescription = projectDto.ProjectDescription,
                ProjectStartDate = projectDto.ProjectStartDate,
                ProjectEndDate = projectDto.ProjectEndDate,
                ProjectStatus = projectDto.ProjectStatus,
            };
        }
    }
}