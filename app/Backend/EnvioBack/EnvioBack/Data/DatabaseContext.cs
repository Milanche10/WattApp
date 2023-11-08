using EnvioBack.Entities;
using Microsoft.EntityFrameworkCore;

namespace EnvioBack.Data
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base (options)
        {

        }

        //entities
        public DbSet<Adresses> adresses { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserPass> UsersPass { get; set; }
        public DbSet<Prosummer> Prosummers { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Devices> Devices { get; set; }
        public DbSet<Records> Records { get; set; }
        public DbSet<Predictions> Predictions { get; set; }
        public DbSet<Image> Images { get; set; }

        public DbSet<RealEstate> RealEstates { get; set; }
       
    }
}
