using EnvioBack.Data;
using EnvioBack.DTOs;
using EnvioBack.Entities;
using EnvioBack.Repository.interfaces;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.IO;

namespace EnvioBack.Repository
{
    public class ImageRepository : IImageRepository 
    {
        private readonly DatabaseContext _context;
        private IUserRepository _userRepository;
        public ImageRepository(DatabaseContext context, IUserRepository userRepository) {
            _context = context;
            _userRepository = userRepository;
        }

        public bool CheckIfFolderExists()
        {
            var email = _userRepository.GetEmailFromLoggedUser();

            return Directory.Exists(Path.Combine("Images", email, "img"));
        }

        public bool CreateUserFolder()
        {
            var email = _userRepository.GetEmailFromLoggedUser();
            var path = Path.Combine("Images", email, "img");
            return Directory.CreateDirectory(path).Exists;
        }
        public async Task<Image> FindByUrl(string url)
        {
            return await _context.Images.Where(i => i.Url.Equals(url)).FirstOrDefaultAsync();
        }
        public void Delete(string url)
        {
            Image image = FindByUrl(url).Result;
            _context.Entry(image).State = EntityState.Deleted;
            _context.SaveChangesAsync();
        }

        public Image getById(int imageId)
        {
            Image image = _context.Images.Where(i => i.Id == imageId).FirstOrDefault();
            if(image == null)
            {
                throw new Exception("There is no image with such id");
            }
            return image;
        }

        public async Task<Image> getImageByUser(int userId)
        {
            return await _context.Images.Where(i => i.UserId == userId).FirstOrDefaultAsync();
        }

        public async void Insert(Image image)
        {
            await _context.Images.AddAsync(image);
            await _context.SaveChangesAsync();
        }

        public void SaveImage(IFormFile img)
        {
            throw new NotImplementedException();
        }

        public async void Update(Image image)
        {
            _context.Images.Entry(image).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
