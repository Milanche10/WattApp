using EnvioBack.Entities;
using System.Drawing;

namespace EnvioBack.DTOs
{
    public class AdresseDTO
    {
        private string street;
        private string city;
        private string county;
        private double lat;
        private double lon;

        public AdresseDTO(Adresses adresses)
        {
            this.street = adresses.Address;
            this.city = adresses.City;
            this.county = adresses.County;
            this.lat = adresses.Lat;
            this.lon = adresses.Lon;
        }

        public string Street { get => street; set => street = value; }
        public string City { get => city; set => city = value; }
        public string County { get => county; set => county = value; }
        public double Lat { get => lat; set => lat = value; }
        public double Lon { get => lon; set => lon = value; }
    }
}
