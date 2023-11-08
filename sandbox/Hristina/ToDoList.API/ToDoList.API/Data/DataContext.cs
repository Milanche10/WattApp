using Microsoft.EntityFrameworkCore;

namespace ToDoList.API.Data
{
    public class DataContext : DbContext 
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Task> Tasks => Set<Task>();
    }
}
