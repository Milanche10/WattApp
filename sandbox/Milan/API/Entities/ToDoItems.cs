using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class ToDoItems
    {
        public int Id { get; set; }
        public string Naziv { get; set; }

        public int UserId { get; set; }
    }
}