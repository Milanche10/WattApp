using EnvioBack.Entities;

namespace EnvioBack.DTOs
{
    public class RealEstateDTO
    {
        private int id;
        private string type;
        
        private AdresseDTO addreseDto;


        public RealEstateDTO(RealEstate realEstate)
        {
            this.id = realEstate.Id;
            this.type = realEstate.Type;
            this.addreseDto = new AdresseDTO(realEstate.Adresse);
        }

        public int Id { get => id; set => id = value; }
        public string Type { get => type; set => type = value; }
        public AdresseDTO AddreseDto { get => addreseDto; set => addreseDto = value; }
    }
}
