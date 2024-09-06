using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class ProjectPhase
    {
        // Primary Key
        public int ProjectPhaseID { get; set; }

        // Properties
        public string ProjectPhaseName { get; set; } = String.Empty;
        public string ProjectPhaseDescription { get; set; } = String.Empty;
        public string ProjectPhaseStartDate { get; set; } = String.Empty;
        public string ProjectPhaseEndDate { get; set; } = String.Empty;
        public string ProjectPhaseStatus { get; set; } = String.Empty;
        public int ProjectPhaseOrder { get; set; }

        // Foreign Keys | 1 to 1
        // Project Link
        public int? ProjectID { get; set; }
        public Project? Project { get; set; }
    }
}