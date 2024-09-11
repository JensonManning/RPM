using static API.Models.ProjectStatusEnum;

namespace API.Models
{
    public class Project
    {
        // Primary Key
        public int ProjectID { get; set; }

        // Properties
        public string ProjectName { get; set; } = String.Empty;
        public string ProjectShortcode { get; set; } = String.Empty; 
        public string ProjectDescription { get; set; } = String.Empty;
        public string ProjectStartDate { get; set; } = String.Empty;
        public string ProjectEndDate { get; set; } = String.Empty;
        public string ProjectStatus { get; set; } = String.Empty;

        // Enums
        public ProjectStatusEnum ProjectStatusEnum { get; set; }
        
        // Foreign Keys | 1 to Many
        
        // Phases Link
        public List<ProjectPhase> ProjectPhase { get; set; } = new List<ProjectPhase>();
        // Tasks Link
        public List<ProjectTasks> ProjectTasks { get; set; } = new List<ProjectTasks>();
        // User Link
        public List<AppUser> AppUsers { get; set; } = new List<AppUser>();
        // Notebooks Link
        public List<ProjectNotebooks> ProjectNotebooks { get; set; } = new List<ProjectNotebooks>();

        public List<ProjectEvents> ProjectEvents { get; set; } = new List<ProjectEvents>();


    }
}