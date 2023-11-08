using EnvioBack.DTOs;
using EnvioBack.Entities;
using EnvioBack.Repository.interfaces;
using EnvioBack.Services.interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EnvioBack.Services
{
    public class DeviceService : IDeviceService
    {
        private readonly IDeviceRepository _deviceRepository;
        private readonly IProsummerRepository _prosummerRepository;
        private readonly IAdresseRepository _adresseRepository;
        private readonly IRealEstateRepository _realEstateRepository;
        private readonly IPredictionRepository _predictionRepository;

        public DeviceService(IDeviceRepository deviceRepository, IProsummerRepository prosummerRepository, IAdresseRepository adresseRepository, IRealEstateRepository realEstateRepository, IPredictionRepository predictionRepository)
        {
            _deviceRepository = deviceRepository;
            _prosummerRepository = prosummerRepository;
            _adresseRepository = adresseRepository;
            _realEstateRepository = realEstateRepository;
            _predictionRepository = predictionRepository;
        }

        public void DeleteByProsummerId(int id)
        {
            _deviceRepository.DeleteByProsummerId(id);
        }

        public async Task<List<DeviceDTO>> getAllDevicesByAdresseCity(string city)
        {
            var devices = await _deviceRepository.getAllDevicesByAdresseCity(city);

            List<DeviceDTO> deviceDTOs = new List<DeviceDTO>();

            foreach (var device in devices)
            {
                deviceDTOs.Add(new DeviceDTO(device));
            }

            return deviceDTOs;
        }

        public async Task<List<DeviceDTO>> getAllDevicesByAdresseCounty(string county)
        {
            var devices = await _deviceRepository.getAllDevicesByAdresseCounty(county);

            List<DeviceDTO> deviceDTOs = new List<DeviceDTO>();

            foreach (var device in devices)
            {
                deviceDTOs.Add(new DeviceDTO(device));
            }

            return deviceDTOs;
        }

        public async Task<List<Devices>> getAllDevicesByProsummer(Prosummer prosummer)
        {
            return await _deviceRepository.findAllDevicesByProsummer(prosummer);
        }

        public async Task<List<DeviceDTO>> getAllDevicesByProsummerId(int prosummerId)
        {
            var devices = await _deviceRepository.findAllDevicesByProsummerId(prosummerId);

            List<DeviceDTO> deviceDTOs = new List<DeviceDTO>();

            foreach (var device in devices)
            {
                deviceDTOs.Add(new DeviceDTO(device));
            }

            return deviceDTOs;
        }

        public async Task<DevicePagingDTO> GetAllDevicePaging(DeviceProsummerPageParam param)
        {
            var pageResults = 4f;
            var pageCount = Math.Ceiling(_deviceRepository.countAllDevicesByProsummer(Convert.ToInt32(param.id)) / pageResults);

            var devices = await _deviceRepository.getAllDevicesByProsummerByPage(Convert.ToInt32(param.id),param.page, (int)pageResults);

            DevicePagingDTO devicePagingDTO = new DevicePagingDTO();

            List<DeviceDTO> deviceDTOs = new List<DeviceDTO>();
            devices.ForEach(device =>
            {
                deviceDTOs.Add(new DeviceDTO(device));
            });
            devicePagingDTO.Devices = deviceDTOs;
            devicePagingDTO.CurrentPage = param.page;
            devicePagingDTO.NumberOfPages = (int)pageCount;
            return devicePagingDTO;
        }

        public async Task<DevicePagingDTO> GetAllDevicesByFilters(DeviceFilterDTO filter)
        {
            var pageResults = 4f;
            var pageCount = Math.Ceiling(_deviceRepository.countAllDevicesByFilter(filter) / pageResults);

            var devices = await _deviceRepository.getAllDevicesByFilter(filter,(int)pageResults);

            DevicePagingDTO devicePagingDTO = new DevicePagingDTO();

            List<DeviceDTO> deviceDTOs = new List<DeviceDTO>();
            devices.ForEach(device =>
            {
                deviceDTOs.Add(new DeviceDTO(device));
            });
            devicePagingDTO.Devices = deviceDTOs;
            devicePagingDTO.CurrentPage = filter.Page;
            devicePagingDTO.NumberOfPages = (int)pageCount;
            return devicePagingDTO;
        }

        public async void InsertDevice(DeviceAddDTO deviceDTO)
        {
            Devices device = new Devices();
            Prosummer prosummer = _prosummerRepository.getProsummerById(deviceDTO.ProsummerId).Result;
            RealEstate realEstate = _realEstateRepository.getRealEstateById(deviceDTO.RealEstateId).Result;

            //Insert device
            device.Name = deviceDTO.Name;
            device.Status = deviceDTO.Status;
            device.Type = deviceDTO.Type;
            device.IsVisible = deviceDTO.IsVisible;
            device.IsAccesable = deviceDTO.IsAccesable;
            device.Manufacturer = deviceDTO.Manufacturer;
            device.Description = deviceDTO.Description;

            device.ProsummerId = deviceDTO.ProsummerId;
            device.Prosummer = prosummer;
            device.RealEstate = realEstate;
            device.RealEstateId = realEstate.Id;
            _deviceRepository.Insert(device);
            if(device.Type == "Potrosac")
            {
                for(int i = 0; i < 600; i++)
                {
                    await _predictionRepository.insertPredictionPotrosac(device.Id);
                }
                
            }
            else
            {
                for (int i = 0; i < 600; i++)
                {
                    await _predictionRepository.insertPredictionProizvodjac(device.Id);
                }
            }
        }

        public async Task UpdateDeviceStatus(UpdateDeviceStatusParam param)
        {
            await _deviceRepository.UpdateStatus(param);
        }

        public async Task DeleteDevice(int id)
        {
            await _deviceRepository.DeleteDevice(id);
        }

        public async Task<DeviceDTO> GetDeviceById(int id)
        {
            Devices device = await _deviceRepository.GetDeviceById(id);
            return new DeviceDTO(device);
        }

        public async Task UpdateVisibility(UpdateDeviceVisibilityParam param)
        {
            await _deviceRepository.UpdateVisibility(param);
        }

        public async Task UpdateAccesability(UpdateDeviceAccesabilityParam param)
        {
            await _deviceRepository.UpdateAccesability(param);
        }
    }
}
