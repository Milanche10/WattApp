
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EnvioBack.Entities
{
    public class RealEstate
    {
        [Key]
        private int id;
        private string type;

        [ForeignKey("AdresseId")]
        private int adresseId;
        private Adresses adresse { get; set; }

        [ForeignKey("ProsummerId")]
        private int prosummerId;
        private Prosummer prosummer { get; set; }
        public int Id { get => id; set => id = value; }
        public string Type { get => type; set => type = value; }
        public int AdresseId { get => adresseId; set => adresseId = value; }
        public int ProsummerId { get => prosummerId; set => prosummerId = value; }

        public Prosummer Prosummer { get => prosummer;set => prosummer = value; }
        public Adresses Adresse { get=> adresse;set => adresse = value; }
    }
}
