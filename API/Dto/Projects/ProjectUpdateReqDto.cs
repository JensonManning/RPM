using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.ProjectTeam;
using API.Models;

namespace API.Dto.Projects
{
    public class ProjectUpdateReqDto
    {
        public string ProjectName { get; set; } = String.Empty;
        public string ProjectShortCode { get; set; } = String.Empty;
        public string ProjectDescription { get; set; } = String.Empty;
        public string ProjectStartDate { get; set; } = String.Empty;
        public string ProjectEndDate { get; set; } = String.Empty;
        public string ProjectStatus { get; set; } = String.Empty; // Active, Delayed, Completed, Cancelled
        public List<ProjectTeamDto>? ProjectTeam { get; set; } 
    }
}