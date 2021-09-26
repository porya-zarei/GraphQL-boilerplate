using HotChocolate.Types.Relay;
using System;
using System.Collections.Generic;
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
        public Guid Id { get; init; }

        public string Name { get; init; }

        public IReadOnlyList<Address> Addresses { get; init; }

        public Address MainAddress { get; init; }
    }
}