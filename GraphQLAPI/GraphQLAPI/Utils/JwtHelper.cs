using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace GraphQLAPI.Utils
{
    internal static class JwtHelper
    {
        public static string GetToken(Dictionary<string, string> pairs, IConfiguration _configuration)
        {
            var claims = new[]
                           {
                            new Claim(JwtRegisteredClaimNames.Jti,_configuration["Jwt:Subject"]),
                            new Claim(JwtRegisteredClaimNames.Iat,Guid.NewGuid().ToString()),
                            new Claim(JwtRegisteredClaimNames.Sub,DateTime.UtcNow.ToString()),
                        };
            foreach (var _key in pairs.Keys)
            {
                claims = claims.Append(new Claim(_key, pairs[_key])).ToArray();
            }
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var SignIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddHours(5),
                signingCredentials: SignIn
            );

            var t = new JwtSecurityTokenHandler().WriteToken(token);
            return t;
        }
    }
}