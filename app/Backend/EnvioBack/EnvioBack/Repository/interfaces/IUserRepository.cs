using EnvioBack.DTOs;
using EnvioBack.Entities;

namespace EnvioBack.Repository
{
    public interface IUserRepository
    {
        List<User> getAll();
        User getById(int userId);
        Task<User> getByEmail(string email);
        string GetEmailFromLoggedUser();
        void Insert(User user);
        void InsertPass(UserPass userPass);
        void UpdatePass(UserPass userPass);
        void InsertAdmin(Admin admin);
        void InsertProsummer(Prosummer prosummer);
        Task<bool> doesUserExists(string email);
        Prosummer returnInsertProsummer(Prosummer prosummer);
        void UpdateProsummer(Prosummer prosummer);
        void Update(UserDTO userDTO);
        void Delete(int userId);
        Task<UserPass> getPassByUser(User user);
        Task<Prosummer> getProsummerByUser(User user);
        Task<Admin> getAdminByUser(User user);
    }
}
