using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto.Auth
{
    // RegisterDto | Email | FullName | Password | ConfirmPassword | Roles  
    //This is where we add the items that we will want when a register POST is made
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email  { get; set; } = string.Empty;

        [Required]
        public string FullName { get; set; } = string.Empty;

        [Required]
        //[MinLength(8)]
        //[DataType(DataType.Password)]
        public string Password { get; set; } = string.Empty;

        //[Required]
        //[Compare("Password")]
        //[DataType(DataType.Password)]
        //public string ConfirmPassword { get; set; } = string.Empty;

        [Required]
        public List<string>? Roles { get; set; }

    }
}