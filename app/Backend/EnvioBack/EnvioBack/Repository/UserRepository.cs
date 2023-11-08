using EnvioBack.Controllers;
using EnvioBack.Data;
using EnvioBack.DTOs;
using EnvioBack.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace EnvioBack.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly DatabaseContext _context;
        private IHttpContextAccessor _httpContextAccessor;
        public UserRepository(DatabaseContext context, IHttpContextAccessor httpContextAccessor) {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        public void Delete(int userId)
        {
            throw new NotImplementedException();
        }

        public List<User> getAll()
        {
            throw new NotImplementedException();
        }

        public async Task<User> getByEmail(string email)
        {
            return await _context.Users.Where(user => user.Email == email).FirstOrDefaultAsync();
        }

        public User getById(int userId)
        {
            User user = _context.Users.Where(u => u.Id == userId).FirstOrDefault();
            if (user == null)
            {
                throw new Exception("There is no user with such id");
            }
            return user;
        }

        public async void Insert(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        public async void InsertPass(UserPass userPass)
        {
            await _context.UsersPass.AddAsync(userPass);
            await _context.SaveChangesAsync();
        }

        public void Update(UserDTO userDTO)
        {
            throw new NotImplementedException();
        }


        public async Task<UserPass> getPassByUser(User user)
        {
            return await _context.UsersPass.Where(u => u.UserId == user.Id).FirstOrDefaultAsync();
        }

        public async Task<Prosummer> getProsummerByUser(User user)
        {
            return await _context.Prosummers
                .Include(p => p.Adresse)
                .Where(u => u.UserId == user.Id)
                .FirstOrDefaultAsync();
        }

        public async Task<Admin> getAdminByUser(User user)
        {
            return await _context.Admins.Where(u => u.UserId == user.Id).FirstOrDefaultAsync();
        }

        public async void InsertAdmin(Admin admin)
        {
            await _context.Admins.AddAsync(admin);
            await _context.SaveChangesAsync();
        }

        public async void InsertProsummer(Prosummer prosummer)
        {
            await _context.Prosummers.AddAsync(prosummer);
            await _context.SaveChangesAsync();
        }

        public async void UpdatePass(UserPass userPass)
        {
            _context.UsersPass.Update(userPass);
            await _context.SaveChangesAsync();
        }

        public async void UpdateProsummer(Prosummer prosummer)
        {
            _context.Prosummers.Update(prosummer);
            await _context.SaveChangesAsync();
        }

        public string GetEmailFromLoggedUser()
        {
            return _httpContextAccessor?.HttpContext?.User?.Claims.Where(c => c.Type == ClaimTypes.Email).FirstOrDefault().Value;
        }

        public Prosummer returnInsertProsummer(Prosummer prosummer)
        {
            _context.Prosummers.AddAsync(prosummer);
            _context.SaveChangesAsync();
            return prosummer;
        }

        public async Task<bool> doesUserExists(string email)
        {
            User user = await _context.Users.Where(u => u.Email == email).FirstOrDefaultAsync();
            if(user == null) {
                return false;
            }
            return true;

        }
    }
}
