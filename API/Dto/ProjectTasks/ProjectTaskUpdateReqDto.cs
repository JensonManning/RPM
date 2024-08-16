using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto.ProjectTasks
{
    public class ProjectTaskUpdateReqDto
    {
        public string ProjectTasksName { get; set; } = String.Empty;
        public string ProjectTasksDescription { get; set; } = String.Empty;
        public string ProjectTasksStatus { get; set; } = String.Empty;
        public string ProjectTasksStartDate { get; set; } = String.Empty;
        public string ProjectTasksEndDate { get; set; } = String.Empty;
    }
}