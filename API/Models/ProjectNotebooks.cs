using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class ProjectNotebooks
    {
        public int ProjectNotebooksID { get; set; }
        public string ProjectNotebooksName { get; set; } = String.Empty;
        public string ProjectNotebooksDescription { get; set; } = String.Empty;
        public string ProjectNotebooksDetails { get; set; } = String.Empty;
        public int ProjectID { get; set; }
        public Project? Project { get; set; }

        public int ProjectNotebookCategoryID { get; set; }
        public ProjectNotebookCategory? ProjectNotebookCategory { get; set; }
    }
}