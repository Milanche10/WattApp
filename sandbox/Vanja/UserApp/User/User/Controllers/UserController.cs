using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace User.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly List<User> users = new List<User>()
       {
           new User { Id = 1, firstName="Luka", lastName="Nikolic", place="Kragujevac"},
           new User { Id = 2, firstName="Petar", lastName="Jovic", place="Beograd"},
           new User { Id = 3, firstName="Ivan", lastName="Simovic", place="Novi Sad"},
           new User { Id = 4,firstName="Milos", lastName="Ilic", place="Beograd"}

       };

        [HttpGet]
        public IEnumerable<User> GetUsers() {
         return users;        
        }

        [HttpPost]
        public void Create(User user)
        {
            user.Id = users.Count + 1;
            users.Add(user);
        }

        [HttpDelete]
        public IActionResult DeleteUser(int id)
        {
            var user=users.FirstOrDefault(u => u.Id == id);
            if (user == null)
                return NotFound();
            users.Remove(user);
            return Ok();
         
        }
    }
}
