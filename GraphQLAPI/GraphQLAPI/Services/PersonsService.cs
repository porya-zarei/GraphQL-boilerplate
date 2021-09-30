using GraphQLAPI.Interfaces;
using GraphQLAPI.Models;
using HotChocolate;
using HotChocolate.Data;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GraphQLAPI.Services
{
    public class PersonsService : IPersonsService
    {
        private readonly IMongoCollection<Person> persons;

        public PersonsService(IMongoCollection<Person> _persons)
        {
            persons = _persons;
        }

        public IExecutable<Person> GetPersons()
        {
            return persons.AsExecutable();
        }

        public IExecutable<Person> GetPersonById(Guid id)
        {
            return persons.Find(x => x.Id == id).AsExecutable();
        }

        public async Task<CreatePersonPayload> CreatePersonAsync(CreatePersonInput newPerson)
        {
            var person = new Person()
            {
                PersonID = Guid.NewGuid(),
                FirstName = newPerson.FirstName,
                LastName = newPerson.LastName,
                Email = newPerson.Email,
                Password = newPerson.Password,
                Address = newPerson.Address
            };

            await persons.InsertOneAsync(person);

            return new CreatePersonPayload(person);
        }
    }
}