

namespace API.Models
{
    public enum ProjectTasksAction
        {
            View,
            Edit,
            Delete
        }
    public class ProjectTasks
    {
        public int ProjectTasksID { get; set; }
        public string ProjectTasksName { get; set; } = String.Empty;
        public string ProjectTasksDescription { get; set; } = String.Empty;
        public string ProjectTasksStatus { get; set; } = String.Empty;
        public string ProjectTasksStartDate { get; set; } = String.Empty;
        public string ProjectTasksEndDate { get; set; } = String.Empty;

        public ProjectTasksAction Action { get; set; }

        public bool Allowed { get; set; }

        public int? ProjectID { get; set; }
        public Project? Project { get; set; }

        public int? ProjectPhaseID { get; set; }
        public ProjectPhase? ProjectPhase { get; set; }
    }
}