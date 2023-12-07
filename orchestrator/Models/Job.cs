using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Orchestrator.Models
{
    public class Job
    {
        [Key]
        public int Id { get; set; } // Primary key
        public int JobId { get; set; }
        public string Name { get; set; }
        public int Weight { get; set; }
        public List<int>? DependentOn { get; set; } = new List<int>();
        public string State { get; set; } = "NotStarted";

        // Foreign key property
        public int PlaybookId { get; set; }

        // Navigation property for the related playbook
        public Playbook Playbook { get; set; }
    }
}
