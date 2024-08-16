using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto.ProjectTeam
{
    public class ProjectTeamUpdateReqDto
    {
        public string? AppUserID { get; set; }

        public int? ProjectID { get; set; }
    }
}