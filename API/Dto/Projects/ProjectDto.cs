
using API.Dto.Auth;
using API.Dto.ProjectPhase;
using API.Dto.ProjectTasks;
//using API.Dto.Phases;
//using API.Dto.Tasks;

namespace API.Dto.Projects
{
    public class ProjectDto
    {
        public int ProjectID { get; set; }
        public string ProjectName { get; set; } = String.Empty;
        public string ProjectShortCode { get; set; } = String.Empty;
        public string ProjectDescription { get; set; } = String.Empty;
        public string ProjectStartDate { get; set; } = String.Empty;
        public string ProjectEndDate { get; set; } = String.Empty;
        public string ProjectStatus { get; set; } = String.Empty;

        public List<ProjectPhaseDto> ProjectPhase { get; set; }
        public List<ProjectTaskDto> ProjectTasks { get; set; }
        public List <UserDetailDto> AppUsers { get; set; }
    }
}