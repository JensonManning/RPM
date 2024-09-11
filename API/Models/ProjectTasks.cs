

namespace API.Models
{
    public class ProjectTasks
    {
        // Primary Key
        public int ProjectTasksID { get; set; }

        // Properties
        public string ProjectTasksName { get; set; } = String.Empty;
        public string ProjectTasksDescription { get; set; } = String.Empty;
        public string ProjectTasksStatus { get; set; } = String.Empty;
        public string ProjectTasksStartDate { get; set; } = String.Empty;
        public string ProjectTasksEndDate { get; set; } = String.Empty;

        // Enumaration
        public ProjectTaskStatusEnum ProjectTaskStatusEnumC { get; set; } 


        // Foreign Keys 1 to Many
        public List<AppUser> AppUsers { get; set; } = new List<AppUser>();

        // Foreign Keys 1 to 1
        // Project Navigation
        public int? ProjectID { get; set; }
        public string? ProjectName { get; set; } = String.Empty;
        public Project? Project { get; set; }

        // Phase Navigation
        public int? ProjectPhaseID { get; set; }
        public string? ProjectPhaseName { get; set; } = String.Empty;
        public ProjectPhase? ProjectPhase { get; set; }
    }
}