using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class ProjectPhase
    {
        public int ProjectPhaseID { get; set; }
        public string ProjectPhaseName { get; set; } = String.Empty;
        public string ProjectPhaseDescription { get; set; } = String.Empty;
        public string ProjectPhaseStartDate { get; set; } = String.Empty;
        public string ProjectPhaseEndDate { get; set; } = String.Empty;
        public string ProjectPhaseStatus { get; set; } = String.Empty;
        public int ProjectPhaseOrder { get; set; }
        // Project Link
        public int? ProjectID { get; set; }
        public Project? Project { get; set; }
    }
}