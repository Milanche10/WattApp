using EnvioBack.Entities;

namespace EnvioBack.DTOs
{
    public class DeviceAddDTO
    {
        private string name;
        private bool status;
        private bool isVisible;
        private bool isAccesable;
        private string description;
        private string manufacturer;
        private string type;
        private int prosummerId;
        private int realEstateId;

        public string Name { get => name; set => name = value; }
        public bool Status { get => status; set => status = value; }
        public string Type { get => type; set => type = value; }
        public int ProsummerId { get => prosummerId; set => prosummerId = value; }
        public int RealEstateId { get => realEstateId; set => realEstateId = value; }
        public bool IsVisible { get => isVisible; set => isVisible = value; }
        public bool IsAccesable { get => isAccesable; set => isAccesable = value; }
        public string Description { get => description; set => description = value; }
        public string Manufacturer { get => manufacturer; set => manufacturer = value; }
    }
}
