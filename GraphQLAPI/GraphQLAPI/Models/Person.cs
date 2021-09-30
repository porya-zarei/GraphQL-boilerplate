using HotChocolate.Types.Relay;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GraphQLAPI.Models
{
    [Node(
        IdField = nameof(Id),
        NodeResolverType = typeof(PersonNodeResolver),
        NodeResolver = nameof(PersonNodeResolver.ResolveAsync))]
    public class Person
    {
        [BsonId]
        public Guid Id { get; init; }

        public Guid PersonID { get; init; }

        public string FirstName { get; init; }
        public string LastName { get; init; }

        public string Email { get; init; }
        public string Password { get; init; }

        public Address Address { get; init; }
    }
}