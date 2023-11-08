using EnvioBack.DTOs;
using EnvioBack.Entities;
using EnvioBack.Repository;
using EnvioBack.Repository.interfaces;
using EnvioBack.Services.interfaces;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace EnvioBack.Services
{
    public class RealEstateService : IRealEstateService
    {
        private readonly IRealEstateRepository _realEstateRepository;
        private readonly IProsummerRepository _prosummerRepository;
        private readonly IAdresseRepository _adresseRepository;
        public RealEstateService(IRealEstateRepository realEstateRepository,IProsummerRepository prosummerRepository,IAdresseRepository adresseRepository) 
        {
            _realEstateRepository = realEstateRepository;
            _prosummerRepository = prosummerRepository;
            _adresseRepository = adresseRepository;
        }

        public async Task<List<RealEstateDTO>> GetAllRealEstatesByProsummerId(int prosummerId)
        {
            List<RealEstate> realEstates = await _realEstateRepository.getAllRealEstatesByProsummerId(prosummerId);
            List<RealEstateDTO> realEstateDTOs = new List<RealEstateDTO>();
            realEstates.ForEach(realEstate =>
            {
                realEstateDTOs.Add(new RealEstateDTO(realEstate));
            });
            return realEstateDTOs;
        }

        public async Task InsertRealEstate(RealEstateAddDTO realEstateDTO)
        {
            RealEstate realEstate = new RealEstate();
            Adresses adresses = new Adresses();
            adresses.Address = realEstateDTO.AddreseDto.Street;
            adresses.City = realEstateDTO.AddreseDto.City;
            adresses.County = realEstateDTO.AddreseDto.County;
            adresses.Lat = realEstateDTO.AddreseDto.Lat;
            adresses.Lon = realEstateDTO.AddreseDto.Lon;
            _adresseRepository.insert(adresses);
            realEstate.Adresse = adresses;
            realEstate.Type = realEstateDTO.Type;
            realEstate.ProsummerId = realEstateDTO.ProsummerId;
            Prosummer prosummer = await _prosummerRepository.getProsummerById(realEstate.ProsummerId);
            realEstate.Prosummer = prosummer;
            await _realEstateRepository.insertRealEstate(realEstate);
        }
    }
}
