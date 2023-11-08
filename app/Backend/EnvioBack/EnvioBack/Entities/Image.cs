using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EnvioBack.Entities
{
    public class Image
    {
        [Key]
        private int id;
        [Required]
        private string name;
        [Required]
        private string url;
        [ForeignKey("UserId")]
        private int userId;
        private User user { get; set; }

        public int Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public string Url { get => url; set => url = value; }
        public int UserId { get => userId; set => userId = value; }
        public User User { get => user; set => user = value; }
    }
}
