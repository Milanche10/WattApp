using EnvioBack.DTOs;
using EnvioBack.Repository.interfaces;
using EnvioBack.Services.interfaces;
using EnvioBack.Utils;
using MessagePack.Formatters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EnvioBack.Controllers
{
    [ApiController]
    [Route("api/record")]
    public class RecordController : Controller
    {
        private readonly IRecordService _recordService;

        public RecordController(IRecordService recordService)
        {
            _recordService= recordService;
        }

        [HttpPost("MonthlyPerDevice")]
        public Object MonthlyUsagePerDevice([FromBody] RecordGetParam param)
        {
            var id = Convert.ToInt32(AESEncryptor.DecryptStringAES(param.id));
            return _recordService.GetMontlyRecordsPerDevice(id);
        }

        [HttpGet("AllMonthlyRecords")]
        public Object MonthlyRecords()
        {
            return _recordService.GetRecordsPerMonth();
        }

        [HttpPost("MonthlyPerProsummer")]
        public Object MonthlyRecordsByProsummer([FromBody] RecordGetParam param)
        {
            var id = Convert.ToInt32(AESEncryptor.DecryptStringAES(param.id));
            return _recordService.GetRecordsPerProsummer(id);
        }

        [HttpPost("RecordsPerDeviceForSevenDays")]
        public Object GetRecordsPerDeviceForSevenDays([FromBody] RecordGetParam param)
        {
            var id = Convert.ToInt32(AESEncryptor.DecryptStringAES(param.id));
            return _recordService.GetRecordsPerDeviceForSevenDays(id);
        }

        [HttpGet("RecordsForSevenDays")]
        public Object GetRecordsForSevenDays()
        {
            return _recordService.GetRecordsForSevenDays();
        }

        [HttpPost("RecordsPerProsummerForSevenDays")]
        public Object GetRecordsPerProsummerForSevenDays([FromBody] RecordGetParam param)
        {
            var id = Convert.ToInt32(AESEncryptor.DecryptStringAES(param.id));
            return _recordService.GetRecordsPerProsummerForSevenDays(id);
        }
        
        [HttpGet("TotalUsage")]
        public async Task<double> GetTotalUsage()
        {
            return await _recordService.GetTotalUsage();
        }
        [HttpGet("TotalProduced")]
        public async Task<double> GetTotalProduced()
        {
            return await _recordService.GetTotalProduced();
        }
        [HttpPost("TotalUsageForDevice")]
        public async Task<double> GetTotalUsageForDevice([FromBody] RecordGetParam param)
        {
            var id = Convert.ToInt32(AESEncryptor.DecryptStringAES(param.id));
            return await _recordService.GetTotalUsageForDevice(id);
        }
        [HttpPost("TotalProducedForDevice")]
        public async Task<double> GetTotalProducedForDevice([FromBody] RecordGetParam param)
        {
            var id = Convert.ToInt32(AESEncryptor.DecryptStringAES(param.id));
            return await _recordService.GetTotalProducedForDevice(id);
        }
        [HttpPost("TotalUsageForProsummer")]
        public async Task<double> GetTotalUsageForProsummer([FromBody] RecordGetParam param)
        {
            var id = Convert.ToInt32(AESEncryptor.DecryptStringAES(param.id));
            return await _recordService.GetTotalUsageForProsummer(id);
        }
        [HttpPost("TotalProducedForProsummer")]
        public async Task<double> GetTotalProducedForProsummer([FromBody] RecordGetParam param)
        {
            var id = Convert.ToInt32(AESEncryptor.DecryptStringAES(param.id));
            return await _recordService.GetTotalProducedForProsummer(id);
        }

        [HttpGet("HighestUsageDevice")]
        public Object GetDeviceWithHighestUsage()
        {
            return _recordService.GetDeviceWithHighestUsage();
        }
        [HttpGet("HighestProducedDevice")]
        public Object GetDeviceWithHighestProduced()
        {
            return _recordService.GetDeviceWithHighestProduced();
        }

        [HttpPost("HighestUsageDevicePerProsummer")]
        public Object GetDeviceWithHighestUsagePerProsummer([FromBody] RecordGetParam param)
        {
            var decrytId = Convert.ToInt32(AESEncryptor.DecryptStringAES(param.id));
            return _recordService.GetDeviceWithHighestUsagePerProsummer(decrytId);
        }
        [HttpPost("HighestProducedDevicePerProsummer")]
        public Object GetDeviceWithHighestProducedPerProsummer([FromBody] RecordGetParam param)
        {
            var decrytId = Convert.ToInt32(AESEncryptor.DecryptStringAES(param.id));
            return _recordService.GetDeviceWithHighestProducedPerProsummer(decrytId);
        }

        [HttpGet("HighestUsageProsummer")]
        public Object GetProsummerWithHighestUsage()
        {
            return _recordService.GetProsummerWithHighestUsage();
        }
        [HttpGet("HighestProducedProsummer")]
        public Object GetProsummerWithHighestProduced()
        {
            return _recordService.GetProsummerWithHighestProduced();
        }
        [HttpGet("CurrentUsage")]
        public async Task<ActionResult<double>> GetCurrentUsage()
        {
            try
            {
                return Ok(_recordService.GetCurrentUsage().Result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("CurrentProduced")]
        public async Task<ActionResult<double>> GetCurrentProduced()
        {
            try
            {
                return Ok(_recordService.GetCurrentProduced().Result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet("TotalUsageForLastMonth")]
        public async Task<ActionResult<double>> GetTotalUsageForLastMonth()
        {
            try
            {
                return Ok(_recordService.GetTotalUsageForLastMonth().Result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("TotalProducedForLastMonth")]
        public async Task<ActionResult<double>> GetTotalProducedForLastMonth()
        {
            try
            {
                return Ok(_recordService.GetTotalProducedForLastMonth().Result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("TotalUsageForLastSevenDays")]
        public async Task<ActionResult<double>> GetTotalUsageForLastSevenDays()
        {
            try
            {
                return Ok(_recordService.GetTotalUsageForSevenDays().Result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("TotalProducedForLastSevenDays")]
        public async Task<ActionResult<double>> GetTotalProducedForLastSevenDays()
        {
            try
            {
                return Ok(_recordService.GetTotalProducedForSevenDays().Result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet("CurrentUsageDevice")]
        public double GetCurrentUsageForDevice(string deviceId)
        {
            Random rand = new Random();
            return rand.NextDouble() * 100;
        }
        [HttpGet("CurrentProducedDevice")]
        public double GetCurrentProducedForDevice(string deviceId)
        {
            Random rand = new Random();
            return rand.NextDouble() * 100;
        }

        [HttpPost("TodayProducedDevice")]
        public double GetTodayProducedForDevice([FromBody] RecordGetParam param)
        {
            var decrytId = Convert.ToInt32(AESEncryptor.DecryptStringAES(param.id));
            return _recordService.GetTodayProducedForDevice(decrytId);
        }

        [HttpPost("TodayUsageDevice")]
        public double GetTodayUsageForDevice([FromBody] RecordGetParam param)
        {
            var decrytId = Convert.ToInt32(AESEncryptor.DecryptStringAES(param.id));
            return _recordService.GetTodayUsageForDevice(decrytId);
        }

        [HttpPost("CurrentUsageProsummer")]
        public double GetCurrentUsageForProsummer([FromBody] RecordGetParam param)
        {
            var decrytId = Convert.ToInt32(AESEncryptor.DecryptStringAES(param.id));
            return _recordService.GetCurrentUsageForProsummer(decrytId);
        }
        [HttpPost("CurrentProducedProsummer")]
        public double GetCurrentProducedForProsummer([FromBody] RecordGetParam param)
        {
            var decrytId = Convert.ToInt32(AESEncryptor.DecryptStringAES(param.id));
            return _recordService.GetCurrentProducedForProsummer(decrytId);
        }
    }
}
