using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Orchestrator.Data;
using Orchestrator.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Orchestrator.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlayBookController : ControllerBase
    {

        private readonly ILogger<PlayBookController> _logger;

        private readonly OrchestratorDbContext _orchestratorDbContext;

        public PlayBookController(
            OrchestratorDbContext orchestratorDbContext,
            ILogger<PlayBookController> logger)
        {
            _orchestratorDbContext = orchestratorDbContext;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Playbook>>> GetPlaybooks()
        {

            var playbooks = await _orchestratorDbContext.Playbooks.Include(p => p.Jobs).ToListAsync();

            Console.WriteLine(playbooks);

            foreach (var playbook in playbooks)
            {
                Console.WriteLine(playbook.Name);
            }

            
            if (playbooks != null)
            {
                // Process the playbooks and return the result
                return Ok(
                    JsonConvert.SerializeObject(playbooks, Formatting.Indented, 
                            new JsonSerializerSettings { 
                                   ReferenceLoopHandling = ReferenceLoopHandling.Ignore 
                            }));
            }
            else
            {
                // Handle the case where playbooks is null
                return NotFound("No playbooks found");
            }
        }

        [HttpPost]
        public IActionResult CreatePlaybook([FromBody] PlaybookRequest playbookRequest)
        {
            if (playbookRequest == null)
            {
                return BadRequest("Invalid playbook request");
            }

            Console.WriteLine("Request received for YourAction"); // Log to console

            // You can add validation logic here based on your requirements

            var playbook = new Playbook
            {
                Name = playbookRequest.playbook.name,
                Jobs = playbookRequest.playbook.jobs
                    .Select(jobRequest => new Job
                    {
                        JobId = jobRequest.job_id,
                        Name = jobRequest.name,
                        Weight = jobRequest.weight,
                        DependentOn = jobRequest.dependent_on
                    })
                    .ToList()
            };

            Console.WriteLine("Request received for YourAction 2222"); // Log to console
 
            _orchestratorDbContext.Playbooks.Add(playbook);
            _orchestratorDbContext.SaveChanges();

            return Ok("Playbook added");
        }
    }
}
