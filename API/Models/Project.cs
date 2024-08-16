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

        public List<ProjectTeam> ProjectTeam { get; set; } = new List<ProjectTeam>();

        // Phases Link
        public List<ProjectPhase> ProjectPhase { get; set; } = new List<ProjectPhase>();
        // Tasks Link
        public List<ProjectTasks> ProjectTasks { get; set; } = new List<ProjectTasks>();
    }
}