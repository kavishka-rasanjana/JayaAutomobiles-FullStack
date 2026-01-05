using JayaAutomobiles_API.Models;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace JayaAutomobiles_API.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _usersCollection;

        public UserService(IConfiguration config)
        {
            var mongoClient = new MongoClient(config.GetConnectionString("MongoDbConnection"));
            var mongoDatabase = mongoClient.GetDatabase(config["DatabaseName"]);

            _usersCollection = mongoDatabase.GetCollection<User>("Users");
        }

        // Username එක හරියටම ගැලපෙන කෙනා හොයනවා
        public async Task<User?> GetByUsernameAsync(string username) =>
            await _usersCollection.Find(x => x.Username == username).FirstOrDefaultAsync();

        public async Task CreateAsync(User newUser) =>
            await _usersCollection.InsertOneAsync(newUser);
    }
}