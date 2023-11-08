using EnvioBack.DTOs;
using EnvioBack.Entities;
using EnvioBack.Repository;
using EnvioBack.Repository.interfaces;
using EnvioBack.Services.interfaces;

namespace EnvioBack.Services
{
    public class ImageService : IImageService
    {
        private readonly IImageRepository _imageRepository;
        private readonly IUserRepository _userRepository;

        public ImageService(IImageRepository imageRepository, IUserRepository userRepository)
        {
            _imageRepository = imageRepository;
            _userRepository = userRepository;
        }

        public Task<ImageDTO> getImageByUser(int userId)
        {
            throw new NotImplementedException();
        }

        public void Update(ImageDTO imageDTO)
        {
            throw new NotImplementedException();
        }

        public async Task<ImageDTO> UploadImage(IFormFile img)
        {
            string email = _userRepository.GetEmailFromLoggedUser();
            string path = Path.Combine("Images", email, "img", img.FileName);
            DirectoryInfo di = new DirectoryInfo(Path.Combine("Images", email, "img"));
            if (_imageRepository.CheckIfFolderExists())
            {
                foreach (FileInfo file in di.GetFiles())
                {
                    _imageRepository.Delete(Path.Combine("Images", email, "img", file.Name));
                    file.Delete();
                }
                using (FileStream fs = new FileStream(path, FileMode.Create))
                {
                    img.CopyTo(fs);
                }
            }
            else
            {
                try
                {
                    _imageRepository.CreateUserFolder();
                    using (FileStream fs = new FileStream(path, FileMode.Create))
                    {
                        img.CopyTo(fs);
                    }
                }
                catch (Exception ex)
                {
                    return null;
                }


            }
            Image image = new Image();
            image.Name = img.Name;
            image.Url = path;
            User user = _userRepository.getByEmail(email).Result;
            image.User = user;
            _imageRepository.Insert(image);
            return new ImageDTO(image);
        }
    }
}
