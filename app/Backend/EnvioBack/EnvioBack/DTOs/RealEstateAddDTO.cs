using EnvioBack.Entities;

namespace EnvioBack.DTOs
{
    public class RealEstateAddDTO
    {
        private int prosummerId;
        private string type;
        private AdresseDTO addreseDto;

        

        public int ProsummerId { get => prosummerId; set => prosummerId = value; }
        public string Type { get => type; set => type = value; }
        public AdresseDTO AddreseDto { get => addreseDto; set => addreseDto = value; }
    }
}
