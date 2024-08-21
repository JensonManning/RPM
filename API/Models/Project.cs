namespace API.Models
{
    public class Project
    {
        public int ProjectID { get; set; }
        public string ProjectName { get; set; } = String.Empty;
        public string ProjectShortcode { get; set; } = String.Empty; 
        public string ProjectDescription { get; set; } = String.Empty;
        public string ProjectStartDate { get; set; } = String.Empty;
        public string ProjectEndDate { get; set; } = String.Empty;
        public string ProjectStatus { get; set; } = String.Empty;

        // Phases Link
        public List<ProjectPhase> ProjectPhase { get; set; } = new List<ProjectPhase>();
        // Tasks Link
        public List<ProjectTasks> ProjectTasks { get; set; } = new List<ProjectTasks>();
        // User Link
        public List<AppUser> AppUsers { get; set; } = new List<AppUser>();
    }
}