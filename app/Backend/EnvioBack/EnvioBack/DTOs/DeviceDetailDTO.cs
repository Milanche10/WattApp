using EnvioBack.Entities;
using EnvioBack.Utils;
using System.Transactions;

namespace EnvioBack.DTOs
{
    public class DeviceDetailDTO
    {
        private int id;

        private string name;

        private string type;

        private string address;

        private string city;
        private bool status;
        private string county;
        private bool isVisible;
        private bool isAccesable;
        private string description;
        private string manufacturer;

        private int realEstateId;

        public DeviceDetailDTO(Devices device)
        {
            this.id = device.Id;
            this.name = device.Name;
            this.type = device.Type;
            this.address = device.RealEstate.Adresse.Address;
            this.city = device.RealEstate.Adresse.City;
            this.county = device.RealEstate.Adresse.County;
            this.status = device.Status;
            this.isVisible = device.IsVisible;
            this.description = device.Description;
            this.manufacturer = device.Manufacturer;
            this.isAccesable = device.IsAccesable;
            this.realEstateId = device.RealEstateId;
    }

        public string Id { get => AESEncryptor.EncryptStringAES(id.ToString()); }
        public string Address { get => address; }
        public string City { get => city; }
        public string County { get => county; }
        public string Name { get => name; set => name = value; }
        public string Type { get => type; set => type = value; }
        public bool Status { get => status; set => status = value; }
        public bool IsVisible { get => isVisible; set => isVisible = value; }
        public bool IsAccesable { get => isAccesable; set => isAccesable = value; }
        public string Description { get => description; set => description = value; }
        public string Manufacturer { get => manufacturer; set => manufacturer = value; }
        public int RealEstateId { get => realEstateId; set => realEstateId = value; }
    }
}
