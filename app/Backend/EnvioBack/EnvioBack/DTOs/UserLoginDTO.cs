﻿using EnvioBack.Entities;

namespace EnvioBack.DTOs
{
    public class UserLoginDTO
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
