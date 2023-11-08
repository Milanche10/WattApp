using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoList.API.Data;

namespace ToDoList.API.Controllers
{
    public class TaskController : ControllerBase
    {
        private readonly DataContext _context;

        public TaskController(DataContext context)
        {
            _context = context; 
        }

        [HttpPost]
        public async Task<ActionResult<List<Task>>> CreateTask(Task task)
        {
            _context.Add(task);
            await _context.SaveChangesAsync();

            return Ok(await _context.taskovi.ToListAsync());
        }

        [HttpPost]
        public async Task<ActionResult<List<Task>>> UpdateTask(Task task)
        {
            var dbTask = await _context.taskovi.FindAsync(task.Id);
            if (dbTask == null)
                return BadRequest("Task not found.");

            dbTask.Input = task.Input;

            await _context.SaveChangesAsync();

            return Ok(await _context.taskovi.ToListAsync());
        }

        [HttpDelete]
        public async Task<ActionResult<List<Task>>> DeleteTask(Task task)
        {
            var dbTask = await _context.taskovi.FindAsync(task.Id);
            if (dbTask == null)
                return BadRequest("Task not found.");

            _context.taskovi.Remove(dbTask);
            await _context.SaveChangesAsync();

            return Ok(await _context.taskovi.ToListAsync());
        }
    }
}
