using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace EnvioBack.Entities
{
    public class Prosummer
    {
        [Key]
        private int id;
        [ForeignKey("UserId")]
        private int userId;
        private User user { get; set; }
        [StringLength(13)]
        private string jbmg;
        [StringLength(9)]
        private string brLK;

        [ForeignKey("AdresseId")]
        private int adresseId;
        private Adresses adresse { get; set; }
        private int isBlock { get; set; } = 0;
        private int isFirstTimeLogged { get; set; } = 0;

        public int Id { get => id; set => id = value; }
        public int UserId { get => userId; set => userId = value; }
        public string Jbmg { get => jbmg; set => jbmg = value; }
        public string BrLK { get => brLK; set => brLK = value; }
        public User User { get => user; set => user = value; }
        public Adresses Adresse { get => adresse; set => adresse = value; }
        public int AdresseId { get => adresseId; set => adresseId = value; }
        public int IsBlock { get => isBlock; set => isBlock = value; }
        public int IsFirstTimeLogged { get => isFirstTimeLogged; set => isFirstTimeLogged = value; }
    }
}
