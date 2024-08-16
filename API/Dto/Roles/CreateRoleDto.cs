using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto.Roles
{
    public class CreateRoleDto
    {
        [Required(ErrorMessage = "Role is required")]
        public string RoleName { get; set; } = null!;
    }
}