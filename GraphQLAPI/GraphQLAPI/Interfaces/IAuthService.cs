using GraphQLAPI.DTOs;
using GraphQLAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GraphQLAPI.Interfaces
{
    public interface IAuthService
    {
        public Task<string> LoginPerson(LoginPerson login);

        Task<string> RegisterPerson(CreatePersonInput register);
    }
}