using Backend.Data;
using Backend.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DataContext _context;

        public UserController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<List<User>>> AddUser(User user)
        {
            _context.User.Add(user);
            await _context.SaveChangesAsync();

            return Ok(await _context.User.ToListAsync());
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            return Ok(await _context.User.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<User>>> UpdateUser(User user)
        {
            var userDb = await _context.User.FindAsync(user.Id);
            if (userDb == null)
                return BadRequest("User not found");

            userDb.FirstName = user.FirstName;
            userDb.LastName = user.LastName;
            userDb.Password = user.Password;

            await _context.SaveChangesAsync();

            return Ok(await _context.User.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<User>>> DeleteUser(int id)
        {
            var userDb = await _context.User.FindAsync(id);
            if (userDb == null)
                return BadRequest("User not found");

            _context.User.Remove(userDb);
            await _context.SaveChangesAsync();

            return Ok(await _context.User.ToListAsync());
        }
    }
}
