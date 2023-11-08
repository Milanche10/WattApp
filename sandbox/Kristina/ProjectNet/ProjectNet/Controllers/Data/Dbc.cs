using Microsoft.EntityFrameworkCore;

namespace ProjectNet.Controllers.Data
{
    public class Dbc : DbContext
    {
        public Dbc(DbContextOptions<Dbc> options) : base(options)
        {

        }

        public DbSet<Model> Models => Set<Model>();
    }
}
