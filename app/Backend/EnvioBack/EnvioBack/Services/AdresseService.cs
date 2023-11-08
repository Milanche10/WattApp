using EnvioBack.DTOs;
using EnvioBack.Entities;
using EnvioBack.Repository.interfaces;
using EnvioBack.Services.interfaces;

namespace EnvioBack.Services
{
    public class AdresseService : IAdresseService
    {
        private readonly IAdresseRepository _adresseRepository;

        public AdresseService(IAdresseRepository adresseRepository)
        {
            _adresseRepository = adresseRepository;
        }

        public async Task<AdresseDTO> GetAdresseByLatandLon(double lat, double lon)
        {
            return new AdresseDTO(await _adresseRepository.getAdressByLatandLon(lat, lon));
        }

        private double distance(double lat1, double lon1, double lat2, double lon2)
        {
            double p = 0.017453292519943295;    // Math.PI / 180
            double a = 0.5 - Math.Cos((lat2 - lat1) * p) / 2 +
                    Math.Cos(lat1 * p) * Math.Cos(lat2 * p) *
                            (1 - Math.Cos((lon2 - lon1) * p)) / 2;

            return 12742 * Math.Asin(Math.Sqrt(a)); // 2 * R; R = 6371 km
        }
        private double getDistanceFromLatLonInKm(double lat1, double lon1, double lat2, double lon2)
        {
            double R = 6371;
            double dLat = deg2rad(lat2 - lat1);
            double dLon = deg2rad(lon2 - lon1);
            double a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                    Math.Cos(deg2rad(lat1)) * Math.Cos(deg2rad(lat2)) *
                            Math.Sin(dLon / 2) * Math.Sin(dLon / 2);
            double c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
            double d = R * c;
            return d;
        }
        private double deg2rad(double deg)
        {
            return deg * (Math.PI * 180);
        }


    }
}
