namespace EnvioBack.Services.interfaces
{
    public interface IPredictionService
    {
        Task deleteEverything();
        Task InsertEverything();

        Object GetMontlyPredictionsPerDevice(int deviceId);
        Object GetPredictionsPerMonth();
        Object GetPredictionsPerProsummer(int prosummerId);

        Object GetPredictionsPerDeviceForSevenDays(int deviceId);
        Object GetPredictionsForSevenDays();
        Object GetPredictionsPerProsummerForSevenDays(int prosummerId);

        Object GetPredictionsPerDeviceSevenDaysBefore(int deviceId);
        Object GetPredictionsSevenDaysBefore();
        Object GetPredictionsPerProsummerSevenDaysBefore(int prosummerId);

        Task PredictionToRecord();
    }
}
