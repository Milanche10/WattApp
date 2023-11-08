using EnvioBack.DTOs;
using EnvioBack.DTOs.maps;
using EnvioBack.Entities;

namespace EnvioBack.Services.interfaces
{
    public interface IRecordService
    {
        Object GetMontlyRecordsPerDevice(int deviceId);
        Object GetRecordsPerMonth();
        Object GetRecordsPerProsummer(int prosummerId);
        Object GetRecordsForSevenDays();
        Object GetRecordsPerDeviceForSevenDays(int deviceId);
        Object GetRecordsPerProsummerForSevenDays(int prosummerId);
        Task<double> GetTotalUsage();
        Task<double> GetTotalUsageForDevice(int deviceId);
        Task<double> GetTotalUsageForProsummer(int prosummerId);
        Task<double> GetTotalProduced();
        Task<double> GetTotalProducedForDevice(int deviceId);
        Task<double> GetTotalProducedForProsummer(int prosummerId);

        Object GetDeviceWithHighestUsage();
        Object GetDeviceWithHighestProduced();
        Object GetDeviceWithHighestUsagePerProsummer(int prosummerId);
        Object GetDeviceWithHighestProducedPerProsummer(int prosummerId);
        Object GetProsummerWithHighestUsage();
        Object GetProsummerWithHighestProduced();


        Task<double> GetCurrentUsage();
        Task<double> GetCurrentProduced();
        Task<double> GetTotalUsageForSevenDays();
        Task<double> GetTotalProducedForSevenDays();
        Task<double> GetTotalUsageForLastMonth();
        Task<double> GetTotalProducedForLastMonth();
        double GetCurrentUsageForDevice(int deviceId);
        double GetCurrentUsageForProsummer(int prosummerId);
        double GetCurrentProducedForDevice(int deviceId);
        double GetCurrentProducedForProsummer(int prosummerId);
        double GetTodayUsageForDevice(int deviceId);
        double GetTodayProducedForDevice(int deviceId);
    }
}
