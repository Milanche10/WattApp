using EnvioBack.Data;
using EnvioBack.DTOs;
using EnvioBack.Services;
using EnvioBack.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EnvioBack.Controllers
{
    [Route("api/[controller]"), Authorize]
    [ApiController]
    public class ProsummerController : Controller
    {
        private readonly IProsummerService _prosummerService;
        public ProsummerController(IProsummerService prosummerService)
        {
            _prosummerService = prosummerService;
        }

        [HttpGet("getAllProsummers"), Authorize(Roles = "Admin")]
        public async Task<ActionResult<List<ProsummerDTO>>> getAll()
        {
           try
            {
                return Ok(_prosummerService.GetAllProsummers().Result);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getAllProsummers/{page}"), Authorize(Roles = "Admin")]
        public async Task<ActionResult<ProsummerPagingDTO>> getAllProsummersPaging(int page)
        {   
            try
            {
                return Ok(_prosummerService.GetAllProsummersPaging(page).Result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("deleteProsummer"), Authorize(Roles = "Admin")]
        public void delete([FromBody] DeleteProsummerParam param) 
        {
            var id = Convert.ToInt32(AESEncryptor.DecryptStringAES(param.id));
            _prosummerService.Delete(id);
        }

        [HttpPatch("changeState"), Authorize(Roles = "Admin")]
        public void changeState([FromBody] ChangeStateParam param)
        {
            var id = Convert.ToInt32(AESEncryptor.DecryptStringAES(param.id));
            _prosummerService.changeState(id, param.state);
        }

        [HttpGet("getProsummerById"),Authorize(Roles = "Prosummer")]
        public async Task<ProsummerDTO> getProsummerById([FromQuery]string id)
        {
            var decryptId = Convert.ToInt32(AESEncryptor.DecryptStringAES(id));
            return await _prosummerService.GetProsummerById(decryptId);
        }
        [HttpGet("getAllProsummerByAdress"), Authorize(Roles = "Admin")]
        public async Task<List<ProsummerDTO>> getProsummerByAdresse([FromQuery] int adresseId)
        {
            //var decryptId = Convert.ToInt32(AESEncryptor.DecryptStringAES(adresseId));
            return await _prosummerService.GetProsummerByAdresse(adresseId);
        }
        [HttpGet("getAllProsummerByAdressCity"), Authorize(Roles = "Admin")]
        public async Task<List<ProsummerDTO>> getProsummerByAdresseCity([FromQuery] string city)
        {
            //var decryptId = Convert.ToInt32(AESEncryptor.DecryptStringAES(adresseId));
            return await _prosummerService.getProsummerByAdresseCity(city);
        }

        [HttpGet("getAllProsummerByAdressCounty"), Authorize(Roles = "Admin")]
        public async Task<List<ProsummerDTO>> getProsummerByAdresseCounty([FromQuery] string county)
        {
            //var decryptId = Convert.ToInt32(AESEncryptor.DecryptStringAES(adresseId));
            return await _prosummerService.getProsummerByAdresseCounty(county);
        }
        [HttpPost("getAllProsummersByFilter"),Authorize(Roles = "Admin")]
        public async Task<ProsummerPagingDTO> getAllProsummersByFilter([FromBody] ProsummerFilterDTO prosummerFilterDTO)
        {
            return await _prosummerService.getProsummerByFilters(prosummerFilterDTO);
        }

        [HttpGet("sendEmail"), Authorize(Roles = "Admin")]
        public void sendEmail([FromQuery] string email)
        {
            //Console.WriteLine("\n\n Pozvana funkcija \n\n");
            _prosummerService.sendEmail(email);
        }
        [HttpPost("verifyEmail"), Authorize(Roles = "Admin")]
        public async Task<IActionResult> VerifyEmail([FromBody] VerifyEmailRequest request)
        {
            bool emailExists = await _prosummerService.verifyEmail(request.Email);

            return Ok(emailExists);
        }
    }
}
