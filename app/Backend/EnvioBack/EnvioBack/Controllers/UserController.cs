using EnvioBack.Data;
using EnvioBack.DTOs;
using EnvioBack.Entities;
using EnvioBack.Repository.interfaces;
using EnvioBack.Services.interfaces;
using EnvioBack.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EnvioBack.Controllers
{
    
    [ApiController]
    [Route("api/user"), Authorize]
    public class UserController : Controller
    {
        private readonly IUserService _iUserService;
        private readonly IImageService _imageService;

        public UserController(IUserService iUserService,IImageService imageService)
        {
            _iUserService = iUserService;
            _imageService = imageService;
        }

        [HttpPost]
        public async Task<ActionResult<UserDTO>> GetUserById([FromBody]DeleteProsummerParam param) {
            try
            {
                var id = Convert.ToInt32(AESEncryptor.DecryptStringAES(param.id));
                return Ok(_iUserService.getById(id).Result);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPatch("firstTimeLogged"), Authorize(Roles = "Prosummer")]
        public async Task<ActionResult<ProsummerDTO>> firstTimeLogged([FromBody] ProsumerFirstTimeDTO body)
        {
            try
            {
                return Ok(_iUserService.firstTimeProsummer(body).Result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("upload-image")]
        public async Task<ActionResult<ImageDTO>> UploadImage(IFormFile image)
        {
            try
            {
                return Ok(_imageService.UploadImage(image).Result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("doesExists"),AllowAnonymous]
        public async Task<ActionResult<bool>> doesUserExists([FromQuery] string email)
        {
            try
            {
                return Ok(await _iUserService.doesUserExists(email));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
