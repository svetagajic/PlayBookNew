// OrchestratorDbContext.cs

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Orchestrator.Models;

namespace Orchestrator.Data
{
    public class OrchestratorDbContext : DbContext
    {
        public OrchestratorDbContext(DbContextOptions<OrchestratorDbContext> options)
            : base(options)
        {
        }

        public DbSet<Playbook> Playbooks { get; set; }
        public DbSet<Job> Jobs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Playbook>()
                .HasKey(p => p.PlaybookId);

            modelBuilder.Entity<Job>()
                .HasKey(j => j.Id);

            modelBuilder.Entity<Job>()
                .HasOne(j => j.Playbook)
                .WithMany(p => p.Jobs)
                .HasForeignKey(j => j.PlaybookId)
                .OnDelete(DeleteBehavior.Cascade);


            // Add other configurations as needed

            base.OnModelCreating(modelBuilder);
        }
    }
}
