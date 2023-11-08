using EnvioBack.DTOs;
using EnvioBack.DTOs.maps;
using EnvioBack.Entities;
using EnvioBack.Repository.interfaces;
using EnvioBack.Services.interfaces;

namespace EnvioBack.Services
{
    public class RecordService : IRecordService
    {
        private readonly IRecordRepository _recordRepository;

        public RecordService(IRecordRepository recordRepository)
        {
            _recordRepository = recordRepository;
        }

        public async Task<double> GetCurrentProduced()
        {
            return await _recordRepository.GetCurrentProduced();
        }

        public double GetCurrentProducedForDevice(int deviceId)
        {
            return _recordRepository.GetCurrentProducedForDevice(deviceId);
        }

        public double GetCurrentProducedForProsummer(int prosummerId)
        {
            return _recordRepository.GetCurrentProducedForProsummer(prosummerId);
        }

        public async Task<double> GetCurrentUsage()
        {
            return await _recordRepository.GetCurrentUsage();
        }

        public double GetCurrentUsageForDevice(int deviceId)
        {
            return _recordRepository.GetCurrentUsageForDevice(deviceId);
        }

        public double GetTodayUsageForDevice(int deviceId)
        {
            return _recordRepository.GetTodayUsageForDevice(deviceId);
        }

        public double GetTodayProducedForDevice(int deviceId)
        {
            return _recordRepository.GetTodayProducedForDevice(deviceId);
        }

        public double GetCurrentUsageForProsummer(int prosummerId)
        {
            return _recordRepository.GetCurrentUsageForProsummer(prosummerId);
        }

        public object GetDeviceWithHighestProduced()
        {
            return _recordRepository.GetDeviceWithHighestProduced();
        }

        public object GetDeviceWithHighestProducedPerProsummer(int prosummerId)
        {
            return _recordRepository.GetDeviceWithHighestProducedPerProsummer(prosummerId);
        }

        public Object GetDeviceWithHighestUsage()
        {
            return _recordRepository.GetDeviceWithHighestUsage();
        }

        public object GetDeviceWithHighestUsagePerProsummer(int prosummerId)
        {
            return _recordRepository.GetDeviceWithHighestUsagePerProsummer(prosummerId);
        }

        public Object GetMontlyRecordsPerDevice(int deviceId)
        {
            return _recordRepository.GetRecordsByMonthPerDevice(deviceId);
        }

        public object GetProsummerWithHighestProduced()
        {
            return _recordRepository.GetProsummerWithHighestProduced();
        }

        public object GetProsummerWithHighestUsage()
        {
            return _recordRepository.GetProsummerWithHighestUsage();
        }

        public object GetRecordsForSevenDays()
        {
            return _recordRepository.GetRecordsForSevenDays();
        }

        public object GetRecordsPerDeviceForSevenDays(int deviceId)
        {
            return _recordRepository.GetRecordsPerDeviceForSevenDays(deviceId);
        }

        public Object GetRecordsPerMonth()
        {
            return _recordRepository.GetRecordsPerMonth();
        }

        public object GetRecordsPerProsummer(int prosummerId)
        {
            return _recordRepository.GetRecordsPerProsummer(prosummerId);
        }

        public object GetRecordsPerProsummerForSevenDays(int prosummerId)
        {
            return _recordRepository.GetRecordsPerProsummerForSevenDays(prosummerId);
        }

        public async Task<double> GetTotalProduced()
        {
            return await _recordRepository.GetTotalProduced();
        }

        public async Task<double> GetTotalProducedForDevice(int deviceId)
        {
            return await _recordRepository.GetTotalProducedForDevice(deviceId);
        }

        public async Task<double> GetTotalProducedForLastMonth()
        {
            return await _recordRepository.GetTotalProducedForLastMonth();
        }

        public async Task<double> GetTotalProducedForProsummer(int prosummerId)
        {
            return await _recordRepository.GetTotalProducedForProsummer(prosummerId);
        }

        public async Task<double> GetTotalProducedForSevenDays()
        {
            return await _recordRepository.GetTotalProducedForSevenDays();
        }

        public async Task<double> GetTotalUsage()
        {
            return await _recordRepository.GetTotalUsage();
        }

        public async Task<double> GetTotalUsageForDevice(int deviceId)
        {
            return await _recordRepository.GetTotalUsageForDevice(deviceId);
        }

        public async Task<double> GetTotalUsageForLastMonth()
        {
            return await _recordRepository.GetTotalUsageForLastMonth();
        }

        public async Task<double> GetTotalUsageForProsummer(int prosummerId)
        {
            return await _recordRepository.GetTotalUsageForProsummer(prosummerId);      
        }

        public async Task<double> GetTotalUsageForSevenDays()
        {
            return await _recordRepository.GetTotalUsageForSevenDays();
        }

        protected string getMonthName(int month)
        {
            string monthName = "";
            switch (month)
            {
                case 1:
                    monthName = "January";
                    break;
                case 2:
                    monthName = "February";
                    break;
                case 3:
                    monthName = "March";
                    break;
                case 4:
                    monthName = "April";
                    break;
                case 5:
                    monthName = "May";
                    break;
                case 6:
                    monthName = "June";
                    break;
                case 7:
                    monthName = "July";
                    break;
                case 8:
                    monthName = "August";
                    break;
                case 9:
                    monthName = "September";
                    break;
                case 10:
                    monthName = "October";
                    break;
                case 11:
                    monthName = "November";
                    break;
                case 12:
                    monthName = "December";
                    break;
                default:
                    break;
            }
            return monthName;
        }
    }
}
