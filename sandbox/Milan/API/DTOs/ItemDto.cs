using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class ItemDto
    {
        [Required]
        public string Naziv { get; set; }

        [Required]
        public int UserId { get; set; }
    }
}