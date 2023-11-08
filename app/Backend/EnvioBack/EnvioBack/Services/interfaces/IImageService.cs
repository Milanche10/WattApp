using EnvioBack.DTOs;

namespace EnvioBack.Services.interfaces
{
    public interface IImageService
    {
        Task<ImageDTO> getImageByUser(int userId);
        void Update(ImageDTO imageDTO);

        Task<ImageDTO> UploadImage(IFormFile img);
    }
}
