using EnvioBack.DTOs;
using EnvioBack.Entities;

namespace EnvioBack.Repository.interfaces
{
    public interface IImageRepository
    {
        Image getById(int imageId);
        void Insert(Image image);
        void Delete(string url);
        void Update(Image image);
        Task<Image> getImageByUser(int userId);

        bool CreateUserFolder();
        bool CheckIfFolderExists();

        Task<Image> FindByUrl(string url);

        void SaveImage(IFormFile img);
    }
}
