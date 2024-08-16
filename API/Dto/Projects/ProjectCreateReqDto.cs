using API.Dto.ProjectTeam;
using API.Models;

namespace API.Dto.Projects
{
    public class ProjectCreateReqDto
    {
        public string ProjectName { get; set; } = String.Empty;
        public string ProjectShortCode { get; set; } = String.Empty;
        public string ProjectDescription { get; set; } = String.Empty;
        public string ProjectStartDate { get; set; } = String.Empty;
        public string ProjectEndDate { get; set; } = String.Empty;
        public string ProjectStatus { get; set; } = String.Empty; // Active, Delayed, Completed, Cancelled  
    }
}