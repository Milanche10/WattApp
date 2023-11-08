using EnvioBack.DTOs;

namespace EnvioBack.Services.interfaces
{
    public interface IRealEstateService
    {
        Task<List<RealEstateDTO>> GetAllRealEstatesByProsummerId(int prosummerId);
        Task InsertRealEstate(RealEstateAddDTO realEstateDTO);
    }
}
