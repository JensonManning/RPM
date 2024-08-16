using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto.ProjectTeam
{
    public class ProjectTeamDto
    {
        public int ProjectTeamID { get; set; }
        public int? ProjectID { get; set; }
        public string? AppUserID { get; set; }
    }
}