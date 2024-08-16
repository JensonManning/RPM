using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto.Roles
{
    public class RoleAssignDto
    {
        public string UserId { get; set; } = null!;
        public string RoleId { get; set; } = null!;
        
    }
}