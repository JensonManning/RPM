using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.Auth;
using API.Models;

namespace API.Mappers
{
    public static class AppUsersMapper
    {
        public static UserDetailDto ToUserDetailDto(this AppUser appUser)
        {
            return new UserDetailDto
            {
                Id = appUser.Id,
                Email = appUser.Email,
                FullName = appUser.FullName
            };
        }
    }
}