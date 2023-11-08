using EnvioBack.DTOs;
using EnvioBack.Entities;

namespace EnvioBack.Repository.interfaces
{
    public interface IProsummerRepository
    {
        void Delete(int id);
        Task<List<Prosummer>> getAll();
        Task<List<Prosummer>> getAllProsummersByPage(int page, int pageResults);
        int countAllProsummers();
        void changeState(int id, int state);
        Task<Prosummer> getProsummerById(int id);
        Task<List<Prosummer>> getProsummerByAdresse(int adresseId);
        Task<List<Prosummer>> getProsummerByAdresseCity(string city);
        Task<List<Prosummer>> getProsummerByAdresseCounty(string county);
        Task<List<Prosummer>> getProsummerByFilters(ProsummerFilterDTO filterDTO, int pageResults);
        int countAllProsummersByFilter(ProsummerFilterDTO filterDTO);
    }
}
