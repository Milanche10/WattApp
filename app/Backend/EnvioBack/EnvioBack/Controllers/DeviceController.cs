using EnvioBack.DTOs;
using EnvioBack.Entities;
using EnvioBack.Services.interfaces;
using EnvioBack.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Diagnostics.Metrics;

namespace EnvioBack.Controllers
{
    [Route("api/device"), Authorize(Roles = "Admin,Prosummer")]
    [ApiController]
    public class DeviceController : Controller
    {
        private readonly IDeviceService _deviService;

        public DeviceController(IDeviceService deviService)
        {
            _deviService = deviService;
        }

        [HttpPost("getAllByProsummer")]
        public async Task<ActionResult<List<DeviceDTO>>> getAllProssumerDevices([FromBody] DevicesProsummerParam param)
        {
            try
            {
                var id = Convert.ToInt32(AESEncryptor.DecryptStringAES(param.id));
                return Ok(_deviService.getAllDevicesByProsummerId(id).Result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("getAllByProsummerPage")]
        public async Task<ActionResult<List<DeviceDTO>>> getAllProssumerDevicesPaging([FromBody] DeviceProsummerPageParam param)
        {
            try
            {
                //var id = Convert.ToInt32(AESEncryptor.DecryptStringAES(param.id));
                return Ok(_deviService.GetAllDevicePaging(param).Result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getAllByAdresseCity")]
        public async Task<ActionResult<List<DeviceDTO>>> getAllDevicesByAdresseCity([FromQuery] string city)
        {
            try
            {
                return Ok(_deviService.getAllDevicesByAdresseCity(city));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getAllByAdresseCounty")]
        public async Task<ActionResult<List<DeviceDTO>>> getAllDevicesByAdresseCounty([FromQuery] string county)
        {
            try
            {
                return Ok(_deviService.getAllDevicesByAdresseCounty(county));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("getAllDevicesByFilter")]
        public async Task<ActionResult<DevicePagingDTO>> getAllDevicesByFilter([FromBody] DeviceFilterDTO filterDTO)
        {
            try
            {
                return Ok(_deviService.GetAllDevicesByFilters(filterDTO));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("addDevice")]
        public void addDevice([FromBody] DeviceAddDTO device)
        {
            _deviService.InsertDevice(device);
        }

        [HttpPut("updateDevice")]
        public async Task updateDevice([FromBody] UpdateDeviceStatusParam param)
        {
            try
            {
                await _deviService.UpdateDeviceStatus(param);
            }
            catch (Exception ex)
            {
                BadRequest(ex.Message);
            }
        }

        [HttpPut("updateVisibility")]
        public async Task updateDeviceVisibility([FromBody] UpdateDeviceVisibilityParam param)
        {
            try
            {
                await _deviService.UpdateVisibility(param);
            }
            catch (Exception ex)
            {
                BadRequest(ex.Message);
            }
        }

        [HttpPut("updateAccesability")]
        public async Task updateDeviceVisibility([FromBody] UpdateDeviceAccesabilityParam param)
        {
            try
            {
                await _deviService.UpdateAccesability(param);
            }
            catch (Exception ex)
            {
                BadRequest(ex.Message);
            }
        }

        [HttpDelete("deleteDevice")]
        public async Task deleteDevice([FromQuery] string id)
        {
            try
            {
                var decrytId = Convert.ToInt32(AESEncryptor.DecryptStringAES(id));
                await _deviService.DeleteDevice(decrytId);
            }
            catch(Exception ex)
            {
                BadRequest(ex.Message);
            }
        }
        [HttpGet("getDeviceById")]
        public async Task<ActionResult<DeviceDTO>> getDeviceById(string id)
        {
            try
            {
                var decrytId = Convert.ToInt32(AESEncryptor.DecryptStringAES(id));
                return Ok(await _deviService.GetDeviceById(decrytId));
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        } 
    }
}
