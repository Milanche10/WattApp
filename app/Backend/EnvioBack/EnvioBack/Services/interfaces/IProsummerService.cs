using EnvioBack.DTOs;
using EnvioBack.Repository;

namespace EnvioBack.Services
{
    public interface IProsummerService
    {
        Task<List<ProsummerDTO>> GetAllProsummers();
        Task<ProsummerPagingDTO> GetAllProsummersPaging(int page);
        void Delete(int id);
        void changeState(int id, int state);
        Task<ProsummerDTO> GetProsummerById(int id);
        Task<List<ProsummerDTO>> GetProsummerByAdresse(int adresseId);
        Task<List<ProsummerDTO>> getProsummerByAdresseCity(string city);
        Task<List<ProsummerDTO>> getProsummerByAdresseCounty(string county);
        Task<ProsummerPagingDTO> getProsummerByFilters(ProsummerFilterDTO filter);
        void sendEmail(string email);
        Task<bool> verifyEmail(string email);
    }
}
