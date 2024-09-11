using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.Auth;

namespace API.Dto.ProjectTasks
{
    public enum ProjectTaskActions
        {
            View,
            Edit,
            Delete
        } 
    public class ProjectTaskDto
    {
        public int ProjectTasksID { get; set; }
        public string ProjectTasksName { get; set; } = String.Empty;
        public string ProjectTasksDescription { get; set; } = String.Empty;
        public string ProjectTasksStatus { get; set; } = String.Empty;
        public string ProjectTasksStartDate { get; set; } = String.Empty;
        public string ProjectTasksEndDate { get; set; } = String.Empty;
        public int? ProjectID { get; set; }
        public string? ProjectName { get; set; } = String.Empty;
        public int? ProjectPhaseID { get; set; }
        public string? ProjectPhaseName { get; set; } = String.Empty;
        public List <UserDetailDto> AppUsers { get; set; }
    }
}