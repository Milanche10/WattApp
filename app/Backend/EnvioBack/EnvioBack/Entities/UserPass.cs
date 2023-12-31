﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EnvioBack.Entities
{
    public class UserPass {

        public int Id { get; set; }

        [ForeignKey("UserID")]
        public int UserId { get; set; }

        public User User { get; set; }

        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }
    }
}
