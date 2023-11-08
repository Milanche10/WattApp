using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EnvioBack.Entities
{
    public class Admin
    {
        [Key]
        private int id;

        [ForeignKey("UserId")]
        private int userId;
        private User user;

        public int Id { get => id; set => id = value; }
        public int UserId { get => userId; set => userId = value; }
        public User User { get => user; set => user = value; }
    }
}
