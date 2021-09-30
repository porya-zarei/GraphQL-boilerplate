using GraphQLAPI.DTOs;
using GraphQLAPI.Interfaces;
using GraphQLAPI.Models;
using GraphQLAPI.Utils;
using HotChocolate;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GraphQLAPI.Services
{
    public class AuthService : IAuthService
    {
        private readonly IMongoCollection<Person> persons;
        private readonly IConfiguration configoration;

        public AuthService([Service] IMongoCollection<Person> _persons, IConfiguration _configuration)
        {
            persons = _persons;
            configoration = _configuration;
        }

        public async Task<string> LoginPerson(LoginPerson login)
        {
            var person = await (await persons.FindAsync(p => p.Email == login.Email && p.Password == login.Password)).FirstOrDefaultAsync();
            var tokenData = new Dictionary<string, string>()
            {
                {"PersonID",person.Id.ToString() },
                {"FullName",person.FirstName + " "+person.LastName }
            };
            var token = JwtHelper.GetToken(tokenData, configoration);
            return token;
        }

        public async Task<string> RegisterPerson(CreatePersonInput register)
        {
            var person = new Person
            {
                PersonID = Guid.NewGuid(),
                FirstName = register.FirstName,
                LastName = register.LastName,
                Email = register.Email,
                Password = register.Password,
                Address = register.Address
            };

            await persons.InsertOneAsync(person);
            var registeredPerson = await (await persons.FindAsync(p => p.Email == person.Email && p.Password == person.Password)).FirstOrDefaultAsync();

            var tokenData = new Dictionary<string, string>()
            {
                {"PersonID",registeredPerson.Id.ToString() },
                {"FullName",registeredPerson.FirstName + " | "+registeredPerson.LastName }
            };
            var token = JwtHelper.GetToken(tokenData, configoration);
            return token;
        }
    }
}