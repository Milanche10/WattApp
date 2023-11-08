using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EnvioBack.Entities
{
    public class Adresses
    {
        [Key]
        private int id;

        private double lon;

        private double lat;

        private string address;

        private string city;

        private string county;

        public int Id { get => id; set => id = value; }
        public string Address { get => address; set => address = value; }
        public string City { get => city; set => city = value; }
        public string County { get => county; set => county = value; }
        public double Lon { get => lon; set => lon = value; }
        public double Lat { get => lat; set => lat = value; }
    }
}
