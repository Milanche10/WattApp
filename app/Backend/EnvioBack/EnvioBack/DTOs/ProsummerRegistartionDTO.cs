using EnvioBack.Entities;

namespace EnvioBack.DTOs
{
    public class ProsummerRegistartionDTO
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string address { get; set; } = string.Empty;
        public string city { get; set; } = string.Empty;
        public string county { get; set; } = string.Empty;
        public double lat { get; set; } = 0.0;
        public double lon { get; set; } = 0.0;
        public string type { get; set; } = string.Empty;    
    }
}
