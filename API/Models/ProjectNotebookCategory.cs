using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class ProjectNotebookCategory
    {
        public int ProjectNotebookCategoryID { get; set; }
        public string ProjectNotebookCategoryName { get; set; } = String.Empty;
        public string ProjectNotebookCategoryDescription { get; set; } = String.Empty;

        public List<ProjectNotebooks>? ProjectNotebooks { get; set; } = new List<ProjectNotebooks>();
        

    }
}