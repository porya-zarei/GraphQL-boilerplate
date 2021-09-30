using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GraphQLAPI.Models
{
    public record CreatePersonInput
    (
        string FirstName,
        string LastName,
        string Email,
        string Password,
        Address Address
    );
}