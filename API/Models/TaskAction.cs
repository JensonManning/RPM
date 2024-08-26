using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
     public enum TaskActionType
    {
        View,
        Edit,
        Delete
    }

    public class TaskAction
    {
        public TaskActionType Type { get; set; }
        public bool Allowed { get; set; }
    }
}