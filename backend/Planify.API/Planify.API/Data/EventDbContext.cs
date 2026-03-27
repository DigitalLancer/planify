using Microsoft.EntityFrameworkCore;
using Planify.API.Models;

namespace Planify.API.Data
{
    public class EventDbContext(DbContextOptions<EventDbContext> options): DbContext(options)
    {
        public DbSet<Event> Events => Set<Event>();
    }
}
