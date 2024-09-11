using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Mappers;

namespace API.Models
{
    public class ProjectEvents
    {
        // Primary Key
        public int ProjectEventsID { get; set; }

        // Properties
        public string ProjectEventsName { get; set; } = String.Empty;
        public string ProjectEventsDescription { get; set; } = String.Empty;
        public string ProjectEventsDetails { get; set; } = String.Empty;
        public string? ProjectEventsDate { get; set; } = String.Empty;
        public string? ProjectEventsTime { get; set; } = String.Empty;
        public string? ProjectEventsStartDate { get; set; } = String.Empty;
        public string? ProjectEventsEndDate { get; set; } = String.Empty;
        public string? ProjectEventsStartTime { get; set; } = String.Empty;
        public string? ProjectEventsEndTime { get; set; } = String.Empty;


        // Foreign Keys | 1 to Many
        public int ProjectID { get; set; }
        public Project? Project { get; set; }

        public List<AppUser>? AppUsers { get; set; } = new List<AppUser>();
    }
}