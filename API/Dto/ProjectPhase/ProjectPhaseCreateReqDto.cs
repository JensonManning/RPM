using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto.ProjectPhase
{
    public class ProjectPhaseCreateReqDto
    {
        public string ProjectPhaseName { get; set; } = String.Empty;
        public string ProjectPhaseDescription { get; set; } = String.Empty;
        public string ProjectPhaseStartDate { get; set; } = String.Empty;
        public string ProjectPhaseEndDate { get; set; } = String.Empty;
        public string ProjectPhaseStatus { get; set; } = String.Empty;
        public int ProjectPhaseOrder { get; set; }
    }
}