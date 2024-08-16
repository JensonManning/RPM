using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class ProjectTeam
    {
        public int ProjectTeamID { get; set; }
        public int? ProjectID { get; set; }
        public string? AppUserID { get; set; }

        public Project? Project { get; set; }
        public AppUser? AppUser { get; set; }
    }
}