using EnvioBack.Entities;
using EnvioBack.Utils;

namespace EnvioBack.DTOs
{
    public class UserDTO
    {
        string id;
        private string firstName;
        private string lastName;
        private string email;

        public UserDTO(User user) {
            this.id= AESEncryptor.EncryptStringAES(user.Id.ToString());
            this.firstName= user.FirstName;
            this.lastName= user.LastName;
            this.email= user.Email;
        }

        public string Id { get => id; set => id = value; }
        public string FirstName { get => firstName; set => firstName = value; }
        public string LastName { get => lastName; set => lastName = value; }
        public string Email { get => email; set => email = value; }
    }
}
