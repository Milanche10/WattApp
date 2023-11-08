using EnvioBack.DTOs;

namespace EnvioBack.Services.interfaces
{
    public interface IAdresseService
    {
        Task<AdresseDTO> GetAdresseByLatandLon(double lat, double lon);
    }
}
