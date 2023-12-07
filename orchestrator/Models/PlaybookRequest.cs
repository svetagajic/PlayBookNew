// File: PlaybookRequest.cs
namespace Orchestrator.Models
{
    public class PlaybookRequest
    {
        public PlaybookDto playbook { get; set; }
    }

    public class PlaybookDto
    {
        public string name { get; set; }
        public List<JobDto> jobs { get; set; }
    }

    public class JobDto
    {
        public int job_id { get; set; }
        public string name { get; set; }
        public int weight { get; set; }
        public List<int> dependent_on { get; set; }
    }
}
