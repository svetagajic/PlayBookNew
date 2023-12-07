using System.ComponentModel.DataAnnotations;
namespace Orchestrator.Models
{
    public class Playbook
    {
        [Key]
        public int PlaybookId { get; set; } // Primary key
        public string Name { get; set; }
        public List<Job> Jobs { get; set; }
        public string State { get; set; } = "NotStarted";
    }
}
