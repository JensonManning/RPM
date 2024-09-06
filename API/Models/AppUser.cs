using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace API.Models
{
    public class AppUser:IdentityUser
    {
        // Properties
        public string FullName { get; set; }

        // Foreign Keys | 1 to Many
        public List<Project> Projects { get; set; } = new List<Project>();

        public List<ProjectTasks> ProjectTasks { get; set; } = new List<ProjectTasks>();
    }
}