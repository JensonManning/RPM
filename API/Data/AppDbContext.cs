using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    // Referencing the IdentityDbContext with AppUser Model
    public class AppDbContext:IdentityDbContext<AppUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options):base(options)
        {

        }
        public DbSet<Project> Project { get; set; }    
        public DbSet<ProjectTeam> ProjectTeam { get; set; }
        public DbSet<ProjectPhase> ProjectPhase { get; set; }
        public DbSet<ProjectTasks> ProjectTasks { get; set; }
    }
}