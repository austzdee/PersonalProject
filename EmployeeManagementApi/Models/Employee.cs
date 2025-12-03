namespace EmployeeManagementApi.Models
{
    public class Employee
    {
        public int Id { get; set; }

        // Existing fields
        public string? FullName { get; set; }
        public string? Position { get; set; }
        public string? Department { get; set; }

        // Authentication fields
        public string UserName { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Role { get; set; } = "User";
    }
}