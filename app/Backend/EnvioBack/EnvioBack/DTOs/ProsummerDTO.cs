using EnvioBack.Entities;
using EnvioBack.Utils;

namespace EnvioBack.DTOs
{
    public class ProsummerDTO
    {
        int id;
        private string firstName;
        private string lastName;
        private string email;
        private string adress;
        private double lat;
        private double lon;
        private string jbmg;
        private string brlk;
        private int numberOfDevices;
        private List<DeviceDetailDTO> devices;
        private int isBlock;

        public ProsummerDTO(Prosummer prosummer, List<Devices> devicesParam)
        {
            this.id = prosummer.Id;
            this.firstName = prosummer.User.FirstName == null ? " " : prosummer.User.FirstName;
            this.lastName = prosummer.User.LastName == null ? " ": prosummer.User.LastName;
            this.email = prosummer.User.Email == null ? " " : prosummer.User.Email;
            Adresses adresseTemp = prosummer.Adresse;
            this.adress = adresseTemp.Address + ", " + adresseTemp.City + ", " + adresseTemp.County;
            this.lat = adresseTemp.Lat;
            this.lon = adresseTemp.Lon;
            this.jbmg = prosummer.Jbmg == null ? " " : prosummer.Jbmg;
            this.brlk = prosummer.BrLK == null ? " " : prosummer.BrLK ;
            this.NumberOfDevices = devicesParam.Count();
            List<DeviceDetailDTO> deviceDTOs = new List<DeviceDetailDTO>();
            devicesParam.ForEach(device =>
            {
                deviceDTOs.Add(new DeviceDetailDTO(device));
            });
            this.devices = deviceDTOs;
            this.isBlock = prosummer.IsBlock;
        }

        public string Id { get => AESEncryptor.EncryptStringAES(id.ToString()); }
        public string FirstName { get => firstName; }
        public string LastName { get => lastName; }
        public string Email { get => email; }
        public string Jbmg { get => jbmg; }
        public string Brlk { get => brlk; }
        public string Adress { get => adress; set => adress = value; }
        public int NumberOfDevices { get => numberOfDevices; set => numberOfDevices = value; }
        public List<DeviceDetailDTO> Devices { get => devices; set => devices = value; }
        public int IsBlock { get => isBlock; set => isBlock = value; }
        public double Lat { get => lat; set => lat = value; }
        public double Lon { get => lon; set => lon = value; }
    }
}
