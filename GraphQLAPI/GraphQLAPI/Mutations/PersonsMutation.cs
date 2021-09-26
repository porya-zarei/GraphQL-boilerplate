using GraphQLAPI.Interfaces;
using GraphQLAPI.Models;
using GraphQLAPI.Services;
using HotChocolate;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GraphQLAPI.Mutations
{
    public class PersonsMutation
    {
        private readonly IPersonsService personsService;

        public PersonsMutation([Service] IMongoCollection<Person> _persons)
        {
            personsService = new PersonsService(_persons);
        }

        public async Task<CreatePersonPayload> CreatePersonAsync(CreatePersonInput input)
        {
            return await personsService.CreatePersonAsync(input);
        }
    }
}