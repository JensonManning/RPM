

namespace API.Models
{
    public class ProjectTasks
    {
        public int ProjectTasksID { get; set; }
        public string ProjectTasksName { get; set; } = String.Empty;
        public string ProjectTasksDescription { get; set; } = String.Empty;
        public string ProjectTasksStatus { get; set; } = String.Empty;
        public string ProjectTasksStartDate { get; set; } = String.Empty;
        public string ProjectTasksEndDate { get; set; } = String.Empty;

        public int? ProjectID { get; set; }
        public Project? Project { get; set; }

        public int? ProjectPhaseID { get; set; }
        public ProjectPhase? ProjectPhase { get; set; }
    }
}