using EnvioBack.DTOs;
using EnvioBack.Services;
using EnvioBack.Services.interfaces;
using EnvioBack.Utils;
using Microsoft.AspNetCore.Mvc;

namespace EnvioBack.Controllers
{
    [ApiController]
    [Route("api/prediction")]
    public class PredictionController : Controller
    {
        private readonly IPredictionService _predictionService;
        public PredictionController(IPredictionService predictionService)
        {
            _predictionService = predictionService;
        }

        [HttpPost("PredictionsPerDevice")]
        public Object MonthlyPredictionsPerDevice([FromBody] PredictionGetParam param)
        {
            var id = Convert.ToInt32(AESEncryptor.DecryptStringAES(param.id));
            return _predictionService.GetMontlyPredictionsPerDevice(id);
        }

        [HttpGet("AllMonthlyPredictions")]
        public Object MonthlyPredictions()
        {
            return _predictionService.GetPredictionsPerMonth();
        }

        [HttpPost("MonthlyPerProsummer")]
        public Object MonthlyPredictionsByProsummer([FromBody] PredictionGetParam param)
        {
            var id = Convert.ToInt32(AESEncryptor.DecryptStringAES(param.id));
            return _predictionService.GetMontlyPredictionsPerDevice(id);
        }

        [HttpPost("PredictionsPerDeviceForSevenDays")]
        public Object PredictionsPerDeviceForSevenDays([FromBody] PredictionGetParam param)
        {
            var id = Convert.ToInt32(AESEncryptor.DecryptStringAES(param.id));
            return _predictionService.GetPredictionsPerDeviceForSevenDays(id);
        }

        [HttpGet("AllPredictionsForSevenDays")]
        public Object AllPredictionsForSevenDays()
        {
            return _predictionService.GetPredictionsForSevenDays();
        }

        [HttpPost("PredictionsPerProsummerForSevenDays")]
        public Object PredictionsByProsummerForSevenDays([FromBody] PredictionGetParam param)
        {
            var id = Convert.ToInt32(AESEncryptor.DecryptStringAES(param.id));
            return _predictionService.GetPredictionsPerProsummerForSevenDays(id);
        }

        [HttpPost("PredictionsPerDeviceSevenDaysBefore")]
        public Object PredictionsPerDeviceSevenDaysBefore([FromBody] PredictionGetParam param)
        {
            var id = Convert.ToInt32(AESEncryptor.DecryptStringAES(param.id));
            return _predictionService.GetPredictionsPerDeviceSevenDaysBefore(id);
        }

        [HttpGet("AllPredictionsSevenDaysBefore")]
        public Object AllPredictionsSevenDaysBefore()
        {
            return _predictionService.GetPredictionsSevenDaysBefore();
        }

        [HttpPost("PredictionsPerProsummerSevenDaysBefore")]
        public Object PredictionsByProsummerSevenDaysBefore([FromBody] PredictionGetParam param)
        {
            var id = Convert.ToInt32(AESEncryptor.DecryptStringAES(param.id));
            return _predictionService.GetPredictionsPerProsummerSevenDaysBefore(id);
        }


        [HttpPost("PredictionToRecord")]
        public async Task PredictionToRecord()
        {
            await _predictionService.PredictionToRecord();
        }

    }
}
