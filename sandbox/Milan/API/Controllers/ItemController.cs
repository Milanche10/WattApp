using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ItemController : BaseApiController
    {
        private readonly DataContext _context;

        private readonly ITokenService _tokenService;
        public ItemController(DataContext context,ITokenService tokenService)
        {
            _context=context;
            _tokenService = tokenService;
        }
        [AllowAnonymous]
        [HttpGet("{UserId}")]
        public async Task<ActionResult<IEnumerable<ToDoItems>>> GetUserList(int UserId)
        {
            return await _context.Itemi.Where(x=>x.UserId==UserId).ToListAsync();
        }

        /*
        [HttpPost("register")]
        public async Task<bool> AddUser(int UserId){
            
            
        }*/
    }
}