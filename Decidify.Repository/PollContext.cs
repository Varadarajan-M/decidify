using Decidify.Repository.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
