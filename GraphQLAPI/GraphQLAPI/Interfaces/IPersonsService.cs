using GraphQLAPI.Models;
using HotChocolate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GraphQLAPI.Interfaces
{
    public interface IPersonsService
    {
        Task<CreatePersonPayload> CreatePersonAsync(CreatePersonInput input);
        IExecutable<Person> GetPersonById(Guid id);
        IExecutable<Person> GetPersons();
    }
}