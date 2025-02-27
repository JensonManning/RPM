using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;

namespace API.Dto
{
    public class AuthResponseDto
    {
        public string? Token { get; set; } = string.Empty;
        public bool IsSuccess { get; set; }
        public string? Message { get; set; }
    }
}