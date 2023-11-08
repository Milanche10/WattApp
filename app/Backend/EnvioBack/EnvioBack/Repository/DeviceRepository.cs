using EnvioBack.Data;
using EnvioBack.DTOs;
using EnvioBack.Entities;
using EnvioBack.Repository.interfaces;
using Microsoft.EntityFrameworkCore;

namespace EnvioBack.Repository
{
    public class DeviceRepository : IDeviceRepository
    {
        private readonly DatabaseContext _context;
        public DeviceRepository(DatabaseContext context)
        {
            _context = context;
        }

        public int countAllDevicesByFilter(DeviceFilterDTO filterDTO)
        {
            return _context.Devices
                .Where
                (
                    device => device.Name.ToLower().Contains(filterDTO.SearchBarText.ToLower())
                    && device.RealEstate.Adresse.City.ToLower().Contains(filterDTO.CitySearch.ToLower())
                    && device.RealEstate.Adresse.County.ToLower().Contains(filterDTO.CountySearch.ToLower())
                    && device.Type.ToLower().Contains(filterDTO.Type.ToLower())
                    && device.ProsummerId == filterDTO.ProsummerId
                )
                .Include(device => device.Prosummer)
                    .ThenInclude(prosummer => prosummer.User)
                .Include(device => device.RealEstate)
                    .ThenInclude(device => device.Adresse)
                .Count();
        }

        public int countAllDevicesByProsummer(int prosummerId)
        {
            return  _context.Devices.Where(d => d.IsVisible == true).Where(d=>d.ProsummerId == prosummerId).Count();

        }

        public async void DeleteByProsummerId(int id)
        {
            List<Devices> devices = await _context.Devices
                .Include(d => d.RealEstate)
                .Where(d => d.ProsummerId == id).ToListAsync();

            foreach (Devices device in devices)
            {
                _context.RealEstates.Remove(device.RealEstate);
            }

            _context.RemoveRange(devices);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteDevice(int id)
        {
            Devices device = await _context.Devices.FindAsync(id);
            if(device != null)
            {
                _context.Devices.Remove(device);
                if(device.RealEstate != null)
                {
                    _context.RealEstates.Remove(device.RealEstate);
                }
            }
            await _context.SaveChangesAsync();
        }

        public async Task<List<Devices>> findAllDevicesByProsummer(Prosummer prosummer)
        {
            return await _context.Devices
                .Where(device => device.ProsummerId == prosummer.Id)
                .Include(device => device.Prosummer)
                    .ThenInclude(prosummer => prosummer.User)
                .Include(device => device.RealEstate)
                    .ThenInclude(device => device.Adresse)
                .ToListAsync();
        }

        public async Task<List<Devices>> findAllDevicesByProsummerId(int prosummerId)
        {
            return await _context.Devices
                .Where(device => device.ProsummerId == prosummerId)
                .Include(device => device.Prosummer)
                    .ThenInclude(prosummer => prosummer.User)
                .Include(device => device.RealEstate)
                    .ThenInclude(device => device.Adresse)
                .ToListAsync();
        }

        public async Task<List<Devices>> getAllDevicesByAdresseCity(string city)
        {
            return await _context.Devices
                .Where(device=>device.RealEstate.Adresse.City == city)
                .Include(device=>device.Prosummer)
                    .ThenInclude(prosummer => prosummer.User)
                .Include(device => device.RealEstate)
                    .ThenInclude(device => device.Adresse)
                .ToListAsync();
        }

        public async Task<List<Devices>> getAllDevicesByAdresseCounty(string county)
        {
            return await _context.Devices
                .Where(device => device.RealEstate.Adresse.County == county)
                .Include(device => device.Prosummer)
                    .ThenInclude(prosummer => prosummer.User)
                .Include(device => device.RealEstate)
                    .ThenInclude(device => device.Adresse)
                .ToListAsync();
        }

        public async Task<List<Devices>> getAllDevicesByFilter(DeviceFilterDTO filterDTO, int pageResults)
        {
            return await _context.Devices
                .Where
                (
                    device=> device.Name.ToLower().Contains(filterDTO.SearchBarText.ToLower())
                    && device.RealEstate.Adresse.City.ToLower().Contains(filterDTO.CitySearch.ToLower())
                    && device.RealEstate.Adresse.County.ToLower().Contains(filterDTO.CountySearch.ToLower())
                    && device.Type.ToLower().Contains(filterDTO.Type.ToLower())
                    && device.ProsummerId == filterDTO.ProsummerId
                )
                .Include(device => device.Prosummer)
                    .ThenInclude(prosummer => prosummer.User)
                .Include(device => device.RealEstate)
                    .ThenInclude(device => device.Adresse)
                .Skip((filterDTO.Page - 1) * pageResults)
                .Take(pageResults)
                .ToListAsync();
        }

        public async Task<List<Devices>> getAllDevicesByProsummerByPage(int prosummerId, int page, int pageResults)
        {
            return await _context.Devices
                .Where(device=>device.ProsummerId==prosummerId)
                .Include(device => device.Prosummer)
                    .ThenInclude(prosummer => prosummer.User)
                .Include(device => device.RealEstate)
                    .ThenInclude(device => device.Adresse)
                .Skip((page - 1) * pageResults)
                .Take(pageResults)
                .ToListAsync();
        }

        public async Task<Devices> GetDeviceById(int id)
        {
            return await _context.Devices
                .Where(d => d.Id.Equals(id))
                .Include(device => device.Prosummer)
                    .ThenInclude(prosummer => prosummer.User)
                .Include(device => device.RealEstate)
                    .ThenInclude(device => device.Adresse)
                .FirstOrDefaultAsync();
        }

        public async void Insert(Devices device)
        {
            await _context.Devices.AddAsync(device);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAccesability(UpdateDeviceAccesabilityParam param)
        {
            Devices devices = await _context.Devices
                .Where(d => d.Id.Equals(param.Id))
                .FirstOrDefaultAsync();
            if(devices != null)
            {
                devices.IsAccesable = param.Accesability;
                _context.Update(devices);
            }

            _context.SaveChangesAsync();
        }

        public async Task UpdateStatus(UpdateDeviceStatusParam param)
        {
            Devices devices = await _context.Devices
                .Where(d => d.Id.Equals(param.Id))
                .FirstOrDefaultAsync();
            if(devices != null)
            {
                devices.Status = param.Status;
                _context.Update(devices);
            }
            _context.SaveChangesAsync();
        }

        public async Task UpdateVisibility(UpdateDeviceVisibilityParam param)
        {
            Devices devices = await _context.Devices
                .Where(d => d.Id.Equals(param.Id))
                .FirstOrDefaultAsync();
            if (devices != null)
            {
                devices.IsVisible = param.Visibility;
                _context.Update(devices);
            }
            _context.SaveChangesAsync();
        }
    }
}
