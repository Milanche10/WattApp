using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace API.Controllers
{

    public class DeleteController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;

        public DeleteController(DataContext context,ITokenService tokenService)
        {
            _context=context;
            _tokenService = tokenService;
        }

        [AllowAnonymous]
        [HttpGet("{Id}")]
        /*public int temp(int id){

            var temp = GetItem(id);
            ToDoItems item = Newtonsoft.Json.JsonConvert.DeserializeObject<ToDoItems>(JsonSerializer.Serialize(temp));

            return item.Id;
        }*/
        public async Task<ActionResult<bool>> DeleteItem(int id){
            
            _context.Itemi.Remove(_context.Itemi.Find(id));
            await _context.SaveChangesAsync();
            return true;
            
        }

    }
}