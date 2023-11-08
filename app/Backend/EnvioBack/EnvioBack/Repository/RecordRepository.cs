using EnvioBack.Data;
using EnvioBack.DTOs;
using EnvioBack.DTOs.maps;
using EnvioBack.Entities;
using EnvioBack.Repository.interfaces;
using Microsoft.EntityFrameworkCore;

namespace EnvioBack.Repository
{
    public class RecordRepository : IRecordRepository
    {
        private readonly DatabaseContext _context;
        public RecordRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<List<Records>> GetAllRecords()
        {
            return await _context.Records.ToListAsync();
        }

        public async Task<double> GetCurrentProduced()
        {
            var todaysDate = DateTime.Now.Date;

           return await _context.Records
                .Where(r => r.date.Date == todaysDate)
                .SumAsync(r => r.Produced);
        }

        public double GetCurrentProducedForDevice(int deviceId)
        {
            var todaysDate = DateTime.Now.Date;

            var totalProduced = _context.Records
                .Where(r => r.DeviceId == deviceId && r.date.Date == todaysDate)
                .Sum(r => r.Produced);

            return totalProduced;
        }

        public double GetCurrentProducedForProsummer(int prosummerId)
        {
            var todaysDate = DateTime.Now.Date;

            var totalProduced = _context.Records
                .Where(r => r.Device.ProsummerId == prosummerId && r.date.Date == todaysDate)
                .Sum(r => r.Produced);

            return totalProduced;
        }

        public async Task<double> GetCurrentUsage()
        {
            var todaysDate = DateTime.Now.Date;

            return await _context.Records
                 .Where(r => r.date.Date == todaysDate)
                 .SumAsync(r => r.Usage);
        }

        public double GetCurrentUsageForDevice(int deviceId)
        {
            var todaysDate = DateTime.Now.Date;

            var totalUsage = _context.Records
                .Where(r => r.DeviceId == deviceId && r.date.Date == todaysDate)
                .Sum(r => r.Usage);

            return totalUsage;
        }

        public double GetTodayUsageForDevice(int deviceId)
        {
            var todaysDate = DateTime.Now.Date;

            var totalUsage = _context.Records
                .Where(r => r.DeviceId == deviceId && r.date.Date == todaysDate)
                .Sum(r => r.Usage);

            return totalUsage;
        }

        public double GetTodayProducedForDevice(int deviceId)
        {
            var todaysDate = DateTime.Now.Date;

            var totalProduced = _context.Records
                .Where(r => r.DeviceId == deviceId && r.date.Date == todaysDate)
                .Sum(r => r.Produced);

            return totalProduced;
        }

        public double GetCurrentUsageForProsummer(int prosummerId)
        {
            var todaysDate = DateTime.Now.Date;

            var totalUsage = _context.Records
                .Where(r => r.Device.ProsummerId == prosummerId && r.date.Date == todaysDate)
                .Sum(r => r.Usage);

            return totalUsage;
        }

        public Object GetDeviceWithHighestProduced()
        {
            return _context.Devices
            .Join(
                _context.Records,
                d => d.Id,
                r => r.DeviceId,
                (d, r) => new { Device = d, Record = r }
            )
            .Where(d=>d.Device.IsVisible == true)
            .GroupBy(
                x => new { x.Device.Id, x.Device.Type,x.Device.Name },
                x => x.Record.Produced,
                (key, g) => new
                {
                    key.Id,
                    key.Name,
                    key.Type,
                    Usage = 0,
                    Produced = g.Sum()
                }
            )
            .OrderByDescending(x => x.Produced)
            .FirstOrDefault();
        }

        public object GetDeviceWithHighestProducedPerProsummer(int prosummerId)
        {
            return _context.Devices
            .Join(
                _context.Records,
                d => d.Id,
                r => r.DeviceId,
                (d, r) => new { Device = d, Record = r }
            )
            .Where(d => d.Device.IsVisible == true && d.Device.ProsummerId == prosummerId)
            .GroupBy(
                x => new { x.Device.Id, x.Device.Type, x.Device.Name },
                x => x.Record.Produced,
                (key, g) => new
                {
                    key.Id,
                    key.Name,
                    key.Type,
                    Usage = 0,
                    Produced = g.Sum()
                }
            )
            .OrderByDescending(x => x.Produced)
            .FirstOrDefault();
        }

        public Object GetDeviceWithHighestUsage()
        {
            return _context.Devices
            .Join(
                _context.Records,
                d => d.Id,
                r => r.DeviceId,
                (d, r) => new { Device = d, Record = r }
            )
            .Where(d => d.Device.IsVisible == true)
            .GroupBy(
                x => new { x.Device.Id, x.Device.Type, x.Device.Name },
                x => x.Record.Usage,
                (key, g) => new
                {
                    key.Id,
                    key.Name,
                    key.Type,
                    Usage = g.Sum(),
                    Produced = 0
                }
            )
            .OrderByDescending(x => x.Usage)
            .FirstOrDefault();
        }

        public object GetDeviceWithHighestUsagePerProsummer(int prosummerId)
        {
            return _context.Devices
            .Join(
                _context.Records,
                d => d.Id,
                r => r.DeviceId,
                (d, r) => new { Device = d, Record = r }
            )
            .Where(d => d.Device.IsVisible == true && d.Device.ProsummerId == prosummerId)
            .GroupBy(
                x => new { x.Device.Id, x.Device.Type, x.Device.Name },
                x => x.Record.Usage,
                (key, g) => new
                {
                    key.Id,
                    key.Name,
                    key.Type,
                    Usage = g.Sum(),
                    Produced = 0
                }
            )
            .OrderByDescending(x => x.Usage)
            .FirstOrDefault();
        }

        public object GetProsummerWithHighestProduced()
        {
            return _context.Prosummers
            .Join(_context.Devices, p => p.Id, d => d.ProsummerId, (p, d) => new { Prosumer = p, Device = d })
            .Join(_context.Records, pd => pd.Device.Id, r => r.DeviceId, (pd, r) => new { ProsumerDevice = pd, Record = r })
            .GroupBy(pr => pr.ProsumerDevice.Prosumer.User.Email)
            .Select(g => new { Email = g.Key, TotalProduced = g.Sum(pr => pr.Record.Produced) })
            .OrderByDescending(pr => pr.TotalProduced)
            .FirstOrDefault();
        }

        public object GetProsummerWithHighestUsage()
        {
            return _context.Prosummers
            .Join(_context.Devices, p => p.Id, d => d.ProsummerId, (p, d) => new { Prosumer = p, Device = d })
            .Join(_context.Records, pd => pd.Device.Id, r => r.DeviceId, (pd, r) => new { ProsumerDevice = pd, Record = r })
            .GroupBy(pr => pr.ProsumerDevice.Prosumer.User.Email)
            .Select(g => new { Email = g.Key, TotalUsage = g.Sum(pr => pr.Record.Usage) })
            .OrderByDescending(pr => pr.TotalUsage)
            .FirstOrDefault();

        }

        public async Task<List<Records>> GetRecordsByDevice(int deviceId)
        {
            return await _context.Records
                .Where(r => r.DeviceId == deviceId)
                .Where(d => d.Device.IsVisible == true)
                .ToListAsync() ;
        }

        public Object GetRecordsByMonthPerDevice(int deviceId)
        {
            return _context.Records
                .Where(r => r.DeviceId == deviceId)
                .GroupBy(r => new {  r.date.Year, r.date.Month })
                 .Select(g => new RecordsMap(g.Key.Month.ToString(), g.Key.Year.ToString(), g.ToList()));
        }

        public object GetRecordsForSevenDays()
        {
            var todaysDate = DateTime.Now.Date;
            var dateSevenDaysAgo = todaysDate.AddDays(-6);

            return _context.Records
                .Where(r=> r.date >= dateSevenDaysAgo)
                .Where(d => d.Device.IsVisible == true)
                .GroupBy(r => new { r.date.Month, r.date.Year })
                 .Select(g => new RecordsMap(g.Key.Month.ToString(), g.Key.Year.ToString(), g.ToList()));
        }



        public object GetRecordsPerDeviceForSevenDays(int deviceId)
        {
            var todaysDate = DateTime.Now.Date;
            var dateSevenDaysAgo = todaysDate.AddDays(-7);

            return _context.Records
                .Where(r => r.DeviceId == deviceId && r.date >= dateSevenDaysAgo)
                .GroupBy(r => new { r.date.Month, r.date.Year })
                 .Select(g => new RecordsMap(g.Key.Month.ToString(), g.Key.Year.ToString(), g.ToList()));

        }

        public Object GetRecordsPerMonth()
        {
            return _context.Records
                .Where(d => d.Device.IsVisible == true)
                .GroupBy(r => new { r.date.Month, r.date.Year })
                 .Select(g => new RecordsMap(g.Key.Month.ToString(), g.Key.Year.ToString(), g.ToList()));
        }

        public Object GetRecordsPerProsummer(int prosummerId)
        {
            User user = _context.Users.Where(u=>u.Id == prosummerId).FirstOrDefault();
            return _context.Records
                .Where(r => r.Device.Prosummer.User == user)
                .Where(d => d.Device.IsVisible == true)
                .GroupBy(r => new { r.date.Month, r.date.Year })
                 .Select(g => new RecordsMap(g.Key.Month.ToString(), g.Key.Year.ToString(), g.ToList()));
        }

        public object GetRecordsPerProsummerForSevenDays(int prosummerId)
        {
            User user = _context.Users.Where(u => u.Id == prosummerId).FirstOrDefault();
            var todaysDate = DateTime.Now.Date;
            var dateSevenDaysAgo = todaysDate.AddDays(-7);
            return _context.Records
                .Where(r => r.Device.Prosummer.User == user && r.date >= dateSevenDaysAgo)
                .Where(d => d.Device.IsVisible == true)
                .GroupBy(r => new { r.date.Month, r.date.Year })
                 .Select(g => new RecordsMap(g.Key.Month.ToString(), g.Key.Year.ToString(), g.ToList()));
        }

        public async Task<double> GetTotalProduced()
        {
            return await _context.Records.SumAsync(r => r.Produced);
        }

        public async Task<double> GetTotalProducedForDevice(int deviceId)
        {
            return await _context.Records
                .Where(r=>r.DeviceId == deviceId)
                .Where(d => d.Device.IsVisible == true)
                .SumAsync(r => r.Produced);
        }

        public async Task<double> GetTotalProducedForLastMonth()
        {
            DateTime today = DateTime.Today;
            DateTime firstDayOfMonth = new DateTime(today.Year, today.Month, 1);
            DateTime lastDayOfPreviousMonth = firstDayOfMonth.AddDays(-1);
            var endDate = lastDayOfPreviousMonth;
            var startDate = lastDayOfPreviousMonth.AddMonths(-1);

            return await _context.Records
                 .Where(r => r.date.Date >= startDate && r.date.Date <= endDate)
                 .SumAsync(r => r.Produced);
        }

        public async Task<double> GetTotalProducedForProsummer(int prosummerId)
        {
            User user = _context.Users.Where(u => u.Id == prosummerId).FirstOrDefault();
            return await _context.Records
                .Where(r => r.Device.Prosummer.User == user)
                .Where(d => d.Device.IsVisible == true)
                .SumAsync(r => r.Produced);
        }

        public async Task<double> GetTotalProducedForSevenDays()
        {
            var todaysDate = DateTime.Now.Date;
            var sevenDaysBefore = todaysDate.AddDays(-7);

            return await _context.Records
                 .Where(r => r.date.Date >= sevenDaysBefore && r.date.Date <= todaysDate)
                 .SumAsync(r => r.Produced);
        }

        public async Task<double> GetTotalUsage()
        {
            return await _context.Records.SumAsync(r => r.Usage);
        }

        public async Task<double> GetTotalUsageForDevice(int deviceId)
        {
            return await _context.Records
                .Where(r => r.DeviceId == deviceId)
                .Where(d => d.Device.IsVisible == true)
                .SumAsync(r => r.Usage);
        }

        public async Task<double> GetTotalUsageForLastMonth()
        {
            DateTime today = DateTime.Today;
            DateTime firstDayOfMonth = new DateTime(today.Year, today.Month, 1);
            DateTime lastDayOfPreviousMonth = firstDayOfMonth.AddDays(-1);
            var endDate = lastDayOfPreviousMonth;
            var startDate = lastDayOfPreviousMonth.AddMonths(-1);

            return await _context.Records
                 .Where(r => r.date.Date >= startDate && r.date.Date <= endDate)
                 .SumAsync(r => r.Usage);
        }

        public async Task<double> GetTotalUsageForProsummer(int prosummerId)
        {
            User user = _context.Users.Where(u => u.Id == prosummerId).FirstOrDefault();
            return await _context.Records
                .Where(d => d.Device.IsVisible == true)
                .Where(r => r.Device.Prosummer.User == user)
                .SumAsync(r => r.Usage);
        }

        public async Task<double> GetTotalUsageForSevenDays()
        {
            var todaysDate = DateTime.Now.Date;
            var sevenDaysBefore = todaysDate.AddDays(-7);

            return await _context.Records
                 .Where(r => r.date.Date >= sevenDaysBefore && r.date.Date <= todaysDate)
                 .SumAsync(r => r.Usage);
        }
    }
}
