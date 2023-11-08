using EnvioBack.DTOs;
using EnvioBack.Entities;

namespace EnvioBack.Repository.interfaces
{
    public interface IDeviceRepository
    {
        Task<List<Devices>> findAllDevicesByProsummerId(int prosummerId);
        Task<List<Devices>> findAllDevicesByProsummer(Prosummer prosummer);
        void DeleteByProsummerId(int id);
        Task<List<Devices>> getAllDevicesByAdresseCity(string city);
        Task<List<Devices>> getAllDevicesByAdresseCounty(string county);
        int countAllDevicesByProsummer(int prosummerId);
        Task<List<Devices>> getAllDevicesByProsummerByPage(int prosummerId, int page, int pageResults);
        Task<List<Devices>> getAllDevicesByFilter(DeviceFilterDTO filterDTO, int pageResults);
        int countAllDevicesByFilter(DeviceFilterDTO filterDTO);
        Task UpdateStatus(UpdateDeviceStatusParam param);
        Task UpdateVisibility(UpdateDeviceVisibilityParam param);
        Task UpdateAccesability(UpdateDeviceAccesabilityParam param);
        void Insert(Devices device);
        Task DeleteDevice(int id);
        Task<Devices> GetDeviceById(int id);
    }
}
