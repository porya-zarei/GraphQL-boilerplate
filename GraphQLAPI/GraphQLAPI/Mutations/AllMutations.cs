using GraphQLAPI.DTOs;
using GraphQLAPI.Interfaces;
using GraphQLAPI.Models;
using GraphQLAPI.Services;
using HotChocolate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GraphQLAPI.Mutations
{
    public partial class AllMutations
    {
        private readonly IAuthService authService;
        private readonly IPersonsService personsService;

        public AllMutations([Service] IMongoCollection<Person> _persons, IConfiguration _configuration)
        {
            authService = new AuthService(_persons, _configuration);
            personsService = new PersonsService(_persons);
        }

        public async Task<LoginPersonPayload> LoginPerson(LoginPerson loginData)
        {
            return new LoginPersonPayload(await authService.LoginPerson(loginData));
        }

        public async Task<LoginPersonPayload> RegisterPerson(CreatePersonInput registerData)
        {
            return new LoginPersonPayload(await authService.RegisterPerson(registerData));
        }

        [Authorize]
        public async Task<CreatePersonPayload> CreatePersonAsync(CreatePersonInput newPerson)
        {
            return await personsService.CreatePersonAsync(newPerson);
        }
    }
}