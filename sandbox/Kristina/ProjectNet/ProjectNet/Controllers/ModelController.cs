using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectNet.Controllers.Data;

namespace ProjectNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ModelController : ControllerBase
    {

        private readonly Dbc _context;
        public ModelController(Dbc context)
        {
            _context = context;
        }
        [HttpPost]  
        public async Task<ActionResult<List<Model>>> AddModel(Model model)
        {
            _context.Models.Add(model);
            await _context.SaveChangesAsync();

            return Ok(await _context.Models.ToListAsync());
        }

        [HttpGet]

        public async Task<ActionResult<List<Model>>> getAllModels()
        {
            return Ok(await _context.Models.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Model>>GetModel(int id)
        {
            var mod = await _context.Models.FindAsync(id);
            if(mod==null)
            {
                return BadRequest("Model not found.");
            }
            return Ok(mod);
        }
    }
}
