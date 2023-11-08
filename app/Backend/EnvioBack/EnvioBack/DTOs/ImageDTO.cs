using EnvioBack.Entities;
using EnvioBack.Utils;

namespace EnvioBack.DTOs
{
    public class ImageDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public string userId { get; set; }

        public ImageDTO(Image image) {
            Id = image.Id;
            Name = image.Name;
            Url = image.Url;
            userId = AESEncryptor.EncryptStringAES(image.UserId.ToString());
        }
    }
}
