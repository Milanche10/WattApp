using EnvioBack.DTOs;
using EnvioBack.Entities;

namespace EnvioBack.Repository.interfaces
{
    public interface IRecordRepository
    {
        Task<List<Records>> GetAllRecords();
        Task<List<Records>> GetRecordsByDevice(int deviceId);
        Object GetRecordsByMonthPerDevice(int deviceId);
        Object GetRecordsPerMonth();
        Object GetRecordsPerProsummer(int prosummerId);
        Object GetRecordsForSevenDays();
        Object GetRecordsPerDeviceForSevenDays(int deviceId);
        Object GetRecordsPerProsummerForSevenDays(int  prosummerId);

        Task<double> GetTotalUsage();
        Task<double> GetTotalUsageForDevice(int deviceId);
        Task<double> GetTotalUsageForProsummer(int prosummerId);
        Task<double> GetTotalProduced();
        Task<double> GetTotalProducedForDevice(int deviceId);
        Task<double> GetTotalProducedForProsummer(int prosummerId);


        Object GetDeviceWithHighestUsage();
        Object GetDeviceWithHighestProduced();
        Object GetProsummerWithHighestUsage();
        Object GetProsummerWithHighestProduced();
        Object GetDeviceWithHighestUsagePerProsummer(int prosummerId);
        Object GetDeviceWithHighestProducedPerProsummer(int prosummerId);

        Task<double> GetCurrentProduced();
        Task<double> GetCurrentUsage();
        Task<double> GetTotalUsageForSevenDays();
        Task<double> GetTotalProducedForSevenDays();
        Task<double> GetTotalUsageForLastMonth();
        Task<double> GetTotalProducedForLastMonth();

        double GetCurrentUsageForDevice(int deviceId);
        double GetCurrentUsageForProsummer(int prosummerId);
        double GetCurrentProducedForDevice(int deviceId);
        double GetCurrentProducedForProsummer(int prosummerId);

        double GetTodayProducedForDevice(int deviceId);
        double GetTodayUsageForDevice(int deviceId);
    }
}
