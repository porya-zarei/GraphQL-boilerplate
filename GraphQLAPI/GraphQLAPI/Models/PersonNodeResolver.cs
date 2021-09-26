using HotChocolate;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GraphQLAPI.Models
{
    public class PersonNodeResolver
    {
        public Task<Person> ResolveAsync([Service] IMongoCollection<Person> collection, Guid id)
        {
            return collection.Find(x => x.Id == id).FirstOrDefaultAsync();
        }
    }
}