using GraphQLAPI.Interfaces;
using GraphQLAPI.Models;
using GraphQLAPI.Services;
using HotChocolate;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GraphQLAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService authService;

        public AuthController([Service] IMongoCollection<Person> _persons, IConfiguration _configuration)
        {
            authService = new AuthService(_persons, _configuration);
        }
    }
}