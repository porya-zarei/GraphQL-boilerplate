using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GraphQLAPI.Models
{
    public record CreatePersonInput
    (
        string Name,
        IReadOnlyList<Address> Addresses,
        Address MainAddress
    );
}