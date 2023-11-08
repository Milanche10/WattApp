using EnvioBack.DTOs;

namespace EnvioBack.Services.interfaces;

public interface IUserService
{
    Task<UserDTO> getById(int userId);

    Task<TokenDTO> RegisterUser(UserRegistrationDTO registration);

    Task<NumberOfPagesDTO> RegisterProsummer(ProsummerRegistartionDTO registration);

    Task<TokenDTO> LoginUser(UserLoginDTO login);

    bool ValidateToken(string token);

    Task<RoleDTO> getRoleByUserId(int userId);

    Task<ProsummerDTO> firstTimeProsummer(ProsumerFirstTimeDTO param);

    Task<bool> doesUserExists(string email);

}
