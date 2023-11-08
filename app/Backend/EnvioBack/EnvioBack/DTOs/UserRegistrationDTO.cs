using EnvioBack.Entities;

namespace EnvioBack.DTOs
{
    public class UserRegistrationDTO
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Jbmg { get; set; } = string.Empty;
        public string BrLk { get; set; } = string.Empty;
        public bool admin { get; set; } = false;
        public string adminPass { get; set; } = string.Empty;
    }
}
