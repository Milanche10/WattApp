using EnvioBack.DTOs;
using EnvioBack.Entities;

namespace EnvioBack.Repository.interfaces
{
    public interface IAdresseRepository
    {
        void insert(Adresses adresse);

        Task<Adresses> getAdressByLatandLon(double lat, double lon);
        Task<Adresses> getAdressesById(int id);
    }
}
