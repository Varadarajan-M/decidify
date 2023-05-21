using Decidify.Repository.Models;
using Microsoft.EntityFrameworkCore;

namespace Decidify.Repository
{
    public class PollContext: DbContext
    {
        public PollContext(DbContextOptions<PollContext> options) : base(options)
        {

        }
        public DbSet<PollData> PollDetails { get; set; }

    }
}
