using EnvioBack.Data;
using EnvioBack.DTOs.maps;
using EnvioBack.Entities;
using EnvioBack.Migrations;
using EnvioBack.Repository.interfaces;
using System.Data.Entity;

namespace EnvioBack.Repository
{
    public class PredictionRepository : IPredictionRepository
    {
        private readonly DatabaseContext _context;
        private readonly IDeviceRepository _deviceRepository;
        public PredictionRepository(DatabaseContext context, IDeviceRepository deviceRepository)
        {
            _context = context;
            _deviceRepository = deviceRepository;   
        }

        public async Task deleteEverything()
        {
            List<Predictions> predictions = await _context.Predictions.ToListAsync();
            _context.Predictions.RemoveRange(predictions);
            await _context.SaveChangesAsync();
        }

        public object GetPredictionByMonthPerDevice(int deviceId)
        {
            return _context.Predictions
                .Where(r => r.DeviceId == deviceId)
                .Where(d => d.Device.IsVisible == true)
                .GroupBy(r => new { r.date.Month, r.date.Year })
                 .Select(g => new PredictionsMap(g.Key.Month.ToString(), g.Key.Year.ToString(), g.ToList()));
        }

        public object GetPredictionsForSevenDays()
        {
            var startDate = DateTime.Now.Date;
            var endDate = startDate.AddDays(7);

            return _context.Predictions
                .Where(r => r.date >= startDate && r.date <= endDate)
                .Where(d => d.Device.IsVisible == true)
                .GroupBy(r => new { r.date.Month, r.date.Year })
                 .Select(g => new PredictionsMap(g.Key.Month.ToString(), g.Key.Year.ToString(), g.ToList()));

        }

        public object GetPredictionsPerDeviceForSevenDays(int deviceId)
        {
            var startDate = DateTime.Now.Date;
            var endDate = startDate.AddDays(7);

            return _context.Predictions
                .Where(r => r.DeviceId == deviceId && r.date >= startDate && r.date < endDate)
                .GroupBy(r => new { r.date.Month, r.date.Year })
                 .Select(g => new PredictionsMap(g.Key.Month.ToString(), g.Key.Year.ToString(), g.ToList()));
        }

        public object GetPredictionsPerDeviceSevenDaysBefore(int deviceId)
        {
            var endDate = DateTime.Now.Date;
            var startDate = endDate.AddDays(-7);

            return _context.Predictions
                .Where(r => r.DeviceId == deviceId && r.date >= startDate && r.date <= endDate)
                .GroupBy(r => new { r.date.Month, r.date.Year })
                 .Select(g => new PredictionsMap(g.Key.Month.ToString(), g.Key.Year.ToString(), g.ToList()));
        }

        public object GetPredictionsPerMonth()
        {
            return _context.Predictions
                .Where(d => d.Device.IsVisible == true)
                .GroupBy(r => new { r.date.Month, r.date.Year })
                 .Select(g => new PredictionsMap(g.Key.Month.ToString(), g.Key.Year.ToString(), g.ToList()));
        }

        public object GetPredictionsPerProsummer(int prosummerId)
        {
            User user = _context.Users.Where(u => u.Id == prosummerId).FirstOrDefault();
            return _context.Predictions
                .Where(r => r.Device.Prosummer.User == user)
                .Where(d => d.Device.IsVisible == true)
                .GroupBy(r => new { r.date.Month, r.date.Year })
                 .Select(g => new PredictionsMap(g.Key.Month.ToString(), g.Key.Year.ToString(), g.ToList()));
        }

        public object GetPredictionsPerProsummerForSevenDays(int prosummerId)
        {
            var startDate = DateTime.Now.Date;
            var endDate = startDate.AddDays(7);
            User user = _context.Users.Where(u => u.Id == prosummerId).FirstOrDefault();

            return _context.Predictions
                .Where(r => r.Device.Prosummer.User == user && r.date >= startDate && r.date <= endDate)
                .Where(d => d.Device.IsVisible == true)
                .GroupBy(r => new { r.date.Month, r.date.Year })
                 .Select(g => new PredictionsMap(g.Key.Month.ToString(), g.Key.Year.ToString(), g.ToList()));
        }

        public object GetPredictionsPerProsummerSevenDaysBefore(int prosummerId)
        {
            var endDate = DateTime.Now.Date;
            var startDate = endDate.AddDays(-7);
            User user = _context.Users.Where(u => u.Id == prosummerId).FirstOrDefault();

            return _context.Predictions
                .Where(r => r.Device.Prosummer.User == user && r.date >= startDate && r.date <= endDate)
                .Where(d => d.Device.IsVisible == true)
                .GroupBy(r => new { r.date.Month, r.date.Year })
                 .Select(g => new PredictionsMap(g.Key.Month.ToString(), g.Key.Year.ToString(), g.ToList()));
        }

        public object GetPredictionsSevenDaysBefore()
        {
            var endDate = DateTime.Now.Date;
            var startDate = endDate.AddDays(-7);

            return _context.Predictions
                .Where(r => r.date >= startDate && r.date <= endDate)
                .Where(d => d.Device.IsVisible == true)
                .GroupBy(r => new { r.date.Month, r.date.Year })
                 .Select(g => new PredictionsMap(g.Key.Month.ToString(), g.Key.Year.ToString(), g.ToList()));
        }

        public async Task insertEverything(List<Predictions> predictions)
        {
           await _context.Predictions.AddRangeAsync(predictions);
            await _context.SaveChangesAsync();
        }

        public async Task insertPredictionPotrosac(int deviceId)
        {
            DateTime today = DateTime.Today;
            int yearToday = today.Year;
            int monthToday = today.Month;
            int dayToday = today.Day;
            DateTime startDate = new DateTime(yearToday, monthToday, dayToday);
            DateTime endDate = new DateTime(2025, 12, 31);
            Predictions predictions = new Predictions();
            predictions.DeviceId = deviceId;
            Devices devices = await _deviceRepository.GetDeviceById(deviceId);
            predictions.Device = devices;
            predictions.IsTransfered = false;
            int daysDiff = (endDate - startDate).Days;
            DateTime randomDate = startDate.AddDays(new Random().Next(0, daysDiff + 1));
            TimeSpan randomTime = new TimeSpan(new Random().Next(0, 24), new Random().Next(0, 60), new Random().Next(0, 60));
            DateTime randomDateTime = randomDate.Add(randomTime);

            double usage = new Random().NextDouble() * (8.5 - 0.1) + 0.1;
            double produced = 0;

            predictions.date = randomDateTime;
            predictions.UsagePrediction = usage;
            predictions.ProducedPrediction = produced;

            await _context.Predictions.AddAsync(predictions);
            await _context.SaveChangesAsync();
        }

        public async Task insertPredictionProizvodjac(int deviceId)
        {
            DateTime today = DateTime.Today;
            int yearToday = today.Year;
            int monthToday = today.Month;
            int dayToday = today.Day;
            DateTime startDate = new DateTime(yearToday, monthToday, dayToday);
            DateTime endDate = new DateTime(2025, 12, 31);
            Predictions predictions = new Predictions();
            predictions.DeviceId = deviceId;
            Devices devices = await _deviceRepository.GetDeviceById(deviceId);
            predictions.Device = devices;
            predictions.IsTransfered = false;
            int daysDiff = (endDate - startDate).Days;
            DateTime randomDate = startDate.AddDays(new Random().Next(0, daysDiff + 1));
            TimeSpan randomTime = new TimeSpan(new Random().Next(0, 24), new Random().Next(0, 60), new Random().Next(0, 60));
            DateTime randomDateTime = randomDate.Add(randomTime);

            double usage = 0;
            double produced = new Random().NextDouble() * (8.5 - 0.1) + 0.1;
            predictions.date = randomDateTime;
            predictions.UsagePrediction = usage;
            predictions.ProducedPrediction = produced;
            await _context.Predictions.AddAsync(predictions);
            await _context.SaveChangesAsync();
        }

        public async Task PredictionToRecord()
        {
            var predictionsToMove = _context.Predictions.Where(p => p.date < DateTime.Now && p.IsTransfered == false);
            if(predictionsToMove == null){
                return;
            }

            foreach (var prediction in predictionsToMove)
            {
                Random random = new Random();
                double minValue = -4.0;
                double maxValue = 4.0;

                double randomValue = random.NextDouble() * (maxValue - minValue) + minValue;
                var record = new Records { date = prediction.date, Usage = Math.Abs(prediction.UsagePrediction + randomValue), Produced = Math.Abs(prediction.ProducedPrediction + randomValue), DeviceId = prediction.DeviceId };
                _context.Records.Add(record);
                prediction.IsTransfered = true;
            }
             await _context.SaveChangesAsync();
        }
    }
}
