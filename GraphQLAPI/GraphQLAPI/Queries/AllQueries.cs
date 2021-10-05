using GraphQLAPI.Interfaces;
using GraphQLAPI.Models;
using GraphQLAPI.Services;
using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using HotChocolate.Types.Relay;
using HotChocolate.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GraphQLAPI.Queries
{
    public class AllQueries
    {
        private readonly IPersonsService personsService;

        public AllQueries([Service] IMongoCollection<Person> _persons)
        {
            personsService = new PersonsService(_persons);
        }

        [UseMongoDbPaging]
        [UseProjection]
        [UseSorting]
        [UseFiltering]
        public IExecutable<Person> GetPersons()
        {
            return personsService.GetPersons();
        }

        [Authorize]
        [UseFirstOrDefault]
        public IExecutable<Person> GetPersonById([ID] Guid id, [Service] IHttpContextAccessor contextAccessor)
        {
            var userId = new Guid(contextAccessor.HttpContext.User.FindFirst("PersonID").Value);
            return personsService.GetPersonById(id);
        }
    }
}