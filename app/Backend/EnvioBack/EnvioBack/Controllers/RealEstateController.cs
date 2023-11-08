using EnvioBack.DTOs;
using EnvioBack.Services.interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EnvioBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RealEstateController : Controller
    {
        private readonly IRealEstateService _realEstateService;
        public RealEstateController(IRealEstateService realEstateService)
        {
            _realEstateService = realEstateService;
        }

        [HttpGet("getRealEstateByProsummer")]
        public async Task<ActionResult<List<RealEstateDTO>>> GetAllRealEstatesByProsummerId(int prosummerId)
        {
            try
            {
                return Ok(_realEstateService.GetAllRealEstatesByProsummerId(prosummerId));
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("addRealEstate")]
        public async Task InsertRealEstate(RealEstateAddDTO realEstateAddDTO)
        {
            await _realEstateService.InsertRealEstate(realEstateAddDTO);
        }

    }
}
