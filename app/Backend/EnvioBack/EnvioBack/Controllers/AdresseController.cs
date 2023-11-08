using EnvioBack.DTOs;
using EnvioBack.Services.interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EnvioBack.Controllers
{
    [Route("api/[controller]"), Authorize]
    [ApiController]
    public class AdresseController : Controller
    {
        private readonly IAdresseService _adresseService;

        public AdresseController(IAdresseService adresseService)
        {
            _adresseService = adresseService;
        }

        [HttpGet("getAdresseByLatAndLon"), Authorize(Roles = "Admin")]
        public async Task<ActionResult<AdresseDTO>> getAdresseByLatAndLon([FromQuery] double lat,[FromQuery] double lon)
        {
            try
            {
                return  Ok(await _adresseService.GetAdresseByLatandLon(lat, lon));
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
        

}
