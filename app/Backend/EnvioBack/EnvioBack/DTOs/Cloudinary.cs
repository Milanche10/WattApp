using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace EnvioBack.DTOs
{
    public class CloudinaryConnection
    {
        public static CloudinaryConnection _Instance = null;
        private Cloudinary _cloudinary = null;

        private CloudinaryConnection() {
            Account account = new Account(
                "daimazvnc",
                "196358181476492",
                "cf8NtifnHFX6CMiUCEM5uAn7uGU");
            _cloudinary = new Cloudinary(account);
            _cloudinary.Api.Secure = true;
        }
        public static CloudinaryConnection Instance
        {
            get
            {
                if(_Instance == null)
                {
                    _Instance = new CloudinaryConnection();
                }
                return _Instance;
            }
        }
    }
}
