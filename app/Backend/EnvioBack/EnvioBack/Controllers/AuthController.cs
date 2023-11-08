using EnvioBack.Data;
using EnvioBack.DTOs;
using EnvioBack.Services.interfaces;
using EnvioBack.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EnvioBack.Controllers
{
    [Route("auth")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IUserService _iUserService;

        public AuthController(IUserService iUserService)
        {
            _iUserService = iUserService;
        }

        [HttpPost("registration")]
        public async Task<ActionResult<TokenDTO>> Registration(UserRegistrationDTO body) {
            try
            {
                TokenDTO token = _iUserService.RegisterUser(body).Result;
                return Ok(token);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("registerProsummer"), Authorize(Roles = "Admin")]
        public async Task<ActionResult<NumberOfPagesDTO>> RegisterProsummer(ProsummerRegistartionDTO body)
        {
            try
            {
                NumberOfPagesDTO reponse = _iUserService.RegisterProsummer(body).Result;
                return Ok(reponse);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("initRegisterProsummer")]
        public async Task<ActionResult<NumberOfPagesDTO>> initRegisterProsummer(ProsummerRegistartionDTO body)
        {
            try
            {
                NumberOfPagesDTO reponse = _iUserService.RegisterProsummer(body).Result;
                return Ok(reponse);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("login")]
        public async Task<ActionResult<TokenDTO>> Login(UserLoginDTO body)
        {
            try
            {
                TokenDTO token = _iUserService.LoginUser(body).Result;
                return Ok(token);  
            } catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("isTokenValid")]
        public async Task<ActionResult<ValidTokenDTO>> isTokenValid(TokenDTO token)
        {
            try
            {
                ValidTokenDTO validation = new ValidTokenDTO();
                validation.isValid = _iUserService.ValidateToken(token.Token);
                return Ok(validation);
            } catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("userRole")]
        public async Task<ActionResult<RoleDTO>> userRole(RoleDTOBody param)
        {
            try
            {
                var userId = Convert.ToInt32(AESEncryptor.DecryptStringAES(param.userId));
                
                return Ok(_iUserService.getRoleByUserId(userId).Result);
            } catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }
    }
}
