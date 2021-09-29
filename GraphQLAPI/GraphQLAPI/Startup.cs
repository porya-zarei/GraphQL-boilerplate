using GraphQLAPI.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using MongoDB.Driver.Core.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Data.MongoDb;
using GraphQLAPI.Queries;
using GraphQLAPI.Mutations;
using MongoDB.Bson;
using GraphQLAPI.Interfaces;
using GraphQLAPI.Services;

namespace GraphQLAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton(sp =>
            {
                const string connectionString = "mongodb://localhost:27017";
                var mongoConnectionUrl = new MongoUrl(connectionString);
                var mongoClientSettings = MongoClientSettings.FromUrl(mongoConnectionUrl);
                mongoClientSettings.ClusterConfigurator = cb =>
                {
                    // This will print the executed command to the console
                    cb.Subscribe<CommandStartedEvent>(e =>
                    {
                        Console.WriteLine($"{e.CommandName} - {e.Command.ToJson()}");
                    });
                };
                var client = new MongoClient(mongoClientSettings);
                var database = client.GetDatabase("ShopDB");
                return database.GetCollection<Person>("persons");
            });

            services.AddSingleton<IPersonsService, PersonsService>();

            services
                .AddGraphQLServer()
                .AddQueryType<PersonsQuery>()
                .AddMutationType<PersonsMutation>()
                .EnableRelaySupport()
                // Registers the filter convention of MongoDB
                .AddMongoDbFiltering()
                // Registers the sorting convention of MongoDB
                .AddMongoDbSorting()
                // Registers the projection convention of MongoDB
                .AddMongoDbProjections();

            services.AddCors(options =>
            {
                options.AddPolicy("ClientPermission", policy =>
                {
                    policy.AllowAnyHeader()
                        .AllowAnyMethod()
                        .WithOrigins("http://localhost:3000")
                        .AllowCredentials();
                });
            });

            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("ClientPermission");

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapGraphQL();
            });
        }
    }
}