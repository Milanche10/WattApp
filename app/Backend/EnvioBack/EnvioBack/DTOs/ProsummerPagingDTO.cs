using EnvioBack.Entities;

namespace EnvioBack.DTOs
{
    public class ProsummerPagingDTO
    {
        public List<ProsummerDTO> Prosummers {  get; set; } = new List<ProsummerDTO>();
        public int NumberOfPages { get; set; }
        public int CurrentPage { get; set; }
    }
}
