using EnvioBack.Entities;

namespace EnvioBack.Repository.interfaces
{
    public interface IRealEstateRepository
    {
        Task insertRealEstate(RealEstate realEstate);
        Task<List<RealEstate>> getAllRealEstatesByProsummerId(int prosummerId);
        Task<RealEstate> getRealEstateById(int id);
    }
}
