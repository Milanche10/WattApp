using EnvioBack.DTOs;
using EnvioBack.Entities;

namespace EnvioBack.Services.interfaces
{
    public interface IDeviceService
    {
        public Task<List<DeviceDTO>> getAllDevicesByProsummerId(int prosummerId);
        public Task<List<Devices>> getAllDevicesByProsummer(Prosummer prosummer);
        public Task<List<DeviceDTO>> getAllDevicesByAdresseCity(string city);
        public Task<List<DeviceDTO>> getAllDevicesByAdresseCounty(string county);
        void DeleteByProsummerId(int id);
        Task<DevicePagingDTO> GetAllDevicePaging(DeviceProsummerPageParam param);
        Task<DevicePagingDTO> GetAllDevicesByFilters(DeviceFilterDTO filter);
        void InsertDevice(DeviceAddDTO device);
        Task UpdateDeviceStatus(UpdateDeviceStatusParam param);
        Task UpdateVisibility(UpdateDeviceVisibilityParam param);
        Task UpdateAccesability(UpdateDeviceAccesabilityParam param);
        Task DeleteDevice(int id);
        Task<DeviceDTO> GetDeviceById(int id);
    }
}
