using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EnvioBack.Entities
{
    public class User
    {
        [Key]
        private int id;
        [Required]
        [StringLength(50)]
        private string firstName;
        [Required]
        [StringLength(50)]
        private string lastName;
        [Required]
        [StringLength(255)]
        private string email;

        public int Id { get => id; set => id = value; }
        public string FirstName { get => firstName; set => firstName = value; }
        public string LastName { get => lastName; set => lastName = value; }
        public string Email { get => email; set => email = value; }
    }
}
