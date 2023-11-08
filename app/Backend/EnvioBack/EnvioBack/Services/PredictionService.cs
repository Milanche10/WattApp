using EnvioBack.Entities;
using EnvioBack.Repository.interfaces;
using EnvioBack.Services.interfaces;
using Microsoft.ML;

namespace EnvioBack.Services
{
    public class PredictionService : IPredictionService
    {
        private readonly IPredictionRepository _predictionRepository;
        private readonly IRecordRepository _recordRepository;

        public PredictionService(IPredictionRepository predictionRepository, IRecordRepository recordRepository)
        {
            _predictionRepository = predictionRepository;
            _recordRepository = recordRepository;
        }
        public async Task deleteEverything()
        {
            await _predictionRepository.deleteEverything();
        }

        public object GetMontlyPredictionsPerDevice(int deviceId)
        {
            return _predictionRepository.GetPredictionByMonthPerDevice(deviceId);
        }

        public object GetPredictionsForSevenDays()
        {
            return _predictionRepository.GetPredictionsForSevenDays();
        }

        public object GetPredictionsPerDeviceForSevenDays(int deviceId)
        {
            return _predictionRepository.GetPredictionsPerDeviceForSevenDays(deviceId);
        }

        public object GetPredictionsPerDeviceSevenDaysBefore(int deviceId)
        {
            return _predictionRepository.GetPredictionsPerDeviceSevenDaysBefore(deviceId);
        }

        public object GetPredictionsPerMonth()
        {
            return _predictionRepository.GetPredictionsPerMonth();
        }

        public object GetPredictionsPerProsummer(int prosummerId)
        {
            return _predictionRepository.GetPredictionsPerProsummer(prosummerId);
        }

        public object GetPredictionsPerProsummerForSevenDays(int prosummerId)
        {
            return _predictionRepository.GetPredictionsPerProsummerForSevenDays(prosummerId);
        }

        public object GetPredictionsPerProsummerSevenDaysBefore(int prosummerId)
        {
            return _predictionRepository.GetPredictionsPerProsummerSevenDaysBefore(prosummerId);
        }

        public object GetPredictionsSevenDaysBefore()
        {
            return _predictionRepository.GetPredictionsSevenDaysBefore();
        }

        public async Task InsertEverything()
        {
        }

        public async Task PredictionToRecord()
        {
            await _predictionRepository.PredictionToRecord();
        }
    }
}
