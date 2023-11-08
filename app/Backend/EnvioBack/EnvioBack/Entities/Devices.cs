using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EnvioBack.Entities
{
    public class Devices
    {
        [Key]
        private int id;

        private string name;

        private bool status;

        private string type;

        private string manufacturer;
        private bool isVisible;
        private bool isAccesable;
        private string description;
        [ForeignKey("ProsummerId")]
        private int prosummerId;
        private Prosummer prosummer { get; set; }

        [ForeignKey("RealEstateId")]
        private int realEstateId;
        private RealEstate realEstate { get; set; }


        public int Id { get => id; set => id = value; }
        public Prosummer Prosummer { get => prosummer; set => prosummer = value; }
        public int ProsummerId { get => prosummerId; set => prosummerId = value; }
        public string Name { get => name; set => name = value; }
        public string Type { get => type; set => type = value; }
        public bool Status { get => status; set => status = value; }
        public int RealEstateId { get => realEstateId; set => realEstateId = value; }
        public RealEstate RealEstate { get => realEstate;set => realEstate = value; }
        public string Manufacturer { get => manufacturer; set => manufacturer = value; }
        public bool IsVisible { get => isVisible; set => isVisible = value; }
        public bool IsAccesable { get => isAccesable; set => isAccesable = value; }
        public string Description { get => description; set => description = value; }
    }
}
