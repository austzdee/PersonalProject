using Microsoft.EntityFrameworkCore;
using EmployeeManagementApi.Models;

namespace EmployeeManagementApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Pre-computed hashes (constant values)
            // Generate these once using BCrypt.Net.BCrypt.HashPassword("password") 
            // and paste the string result here.
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Username = "admin",
                    PasswordHash = "$2a$11$7QkYxZkYQkYxZkYQkYxZkOQkYxZkYQkYxZkYQkYxZkYQkYxZkY", // replace with actual hash
                    Email = "admin@example.com",
                    Role = "Admin"
                },
                new User
                {
                    Id = 2,
                    Username = "hr",
                    PasswordHash = "$2a$11$ABCDEF1234567890ABCDEF1234567890ABCDEF1234567890AB", // replace with actual hash
                    Email = "hr@example.com",
                    Role = "HR"
                },
                new User
                {
                    Id = 3,
                    Username = "Dan",
                    PasswordHash = "$2a$11$XYZXYZXYZXYZXYZXYZXYZXYZXYZXYZXYZXYZXYZXYZXYZXYZXY", // replace with actual hash
                    Email = "austzdee@hotmail.com",
                    Role = "Admin"
                }
            );
        }
    }
}