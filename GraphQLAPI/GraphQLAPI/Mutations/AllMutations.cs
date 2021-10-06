using GraphQLAPI.DTOs;
using GraphQLAPI.Interfaces;
using GraphQLAPI.Models;
using GraphQLAPI.Services;
using GraphQLAPI.Utils;
using HotChocolate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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

        public async Task<LoginPersonPayload> LoginPerson(LoginPerson loginData, [Service] IHttpContextAccessor contextAccessor)
        {
            var token = await authService.LoginPerson(loginData);
            var cookie = new CookieOptions
            {
                Expires = DateTime.Now.AddHours(3),
                HttpOnly = true,
                Secure = false,
                SameSite = SameSiteMode.None,
                Path = "/",
                Domain = APIConfigs.ClientHost,
                IsEssential = true
            };
            contextAccessor.HttpContext.Response.Cookies.Append("token", token, cookie);
            return new LoginPersonPayload(token);
        }

        public async Task<LoginPersonPayload> RegisterPerson(CreatePersonInput registerData, [Service] IHttpContextAccessor contextAccessor)
        {
            var token = await authService.RegisterPerson(registerData);
            var cookie = new CookieOptions
            {
                Expires = DateTime.Now.AddHours(3),
                HttpOnly = true,
                Secure = false,
                SameSite = SameSiteMode.None,
                Path = "/",
                Domain = APIConfigs.ClientHost,
                IsEssential = true
            };
            contextAccessor.HttpContext.Response.Cookies.Append("token", token, cookie);

            return new LoginPersonPayload(token);
        }

        [Authorize]
        public async Task<CreatePersonPayload> CreatePersonAsync(CreatePersonInput newPerson)
        {
            return await personsService.CreatePersonAsync(newPerson);
        }
    }
}