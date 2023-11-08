using EnvioBack.Entities;
using EnvioBack.Utils;

namespace EnvioBack.DTOs
{
    public class DeviceDTO
    {
        private int id;

        private string name;
        private string type;
        private bool status;
        private string address;
        private bool isVisible;
        private bool isAccesable;
        private string description;
        private string manufacturer;
        private string city;

        private string county;

        private string ownerName;
        private string ownerEmail;

        public DeviceDTO(Devices device)
        {
            this.id = device.Id;
            this.address = device.RealEstate.Adresse.Address;
            this.city = device.RealEstate.Adresse.City;
            this.county = device.RealEstate.Adresse.County;
            this.ownerName = device.Prosummer.User.FirstName + " " + device.Prosummer.User.LastName;
            this.ownerEmail = device.Prosummer.User.Email;
            this.name = device.Name;
            this.type = device.Type;
            this.status = device.Status;
            this.isVisible = device.IsVisible;
            this.description = device.Description;
            this.manufacturer = device.Manufacturer;
            this.isAccesable = device.IsAccesable;
        }

        public string Id { get => AESEncryptor.EncryptStringAES(id.ToString()); }
        public string Address { get => address; }
        public string City { get => city; }
        public string County { get => county; }
        public string OwnerName { get => ownerName; }
        public string OwnerEmail { get => ownerEmail; }
        public string Name { get => name; set => name = value; }
        public string Type { get => type; set => type = value; }
        public bool Status { get => status; set => status = value; }
        public bool IsVisible { get => isVisible; set => isVisible = value; }
        public bool IsAccesable { get => isAccesable; set => isAccesable = value; }
        public string Description { get => description; set => description = value; }
        public string Manufacturer { get => manufacturer; set => manufacturer = value; }
    }
}
