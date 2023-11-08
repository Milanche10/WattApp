using EnvioBack.Entities;

namespace EnvioBack.Repository.interfaces
{
    public interface IPredictionRepository
    {
        Task deleteEverything();
        Task insertEverything(List<Predictions> predictions);
        Task insertPredictionPotrosac(int deviceId);
        Task insertPredictionProizvodjac(int deviceId);

        Object GetPredictionByMonthPerDevice(int deviceId);
        Object GetPredictionsPerMonth();
        Object GetPredictionsPerProsummer(int prosummerId);
        Object GetPredictionsForSevenDays();
        Object GetPredictionsPerProsummerForSevenDays(int prosummerId);
        Object GetPredictionsPerDeviceForSevenDays(int deviceId);

        Object GetPredictionsSevenDaysBefore();
        Object GetPredictionsPerProsummerSevenDaysBefore(int prosummerId);
        Object GetPredictionsPerDeviceSevenDaysBefore(int deviceId);

        Task PredictionToRecord();
    }
}
