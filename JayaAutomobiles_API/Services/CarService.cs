using JayaAutomobiles_API.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;

namespace JayaAutomobiles_API.Services
{
    public class CarService
    {
        private readonly IMongoCollection<Car> _carsCollection;

        public CarService(IConfiguration config)
        {
            // Get connection string from appsettings.json
            var connectionString = config.GetConnectionString("MongoDbConnection");
            var databaseName = config["DatabaseName"];

            var mongoClient = new MongoClient(connectionString);
            var mongoDatabase = mongoClient.GetDatabase(databaseName);

            // Connect to the "Cars" collection in the database
            _carsCollection = mongoDatabase.GetCollection<Car>("Cars");
        }

        // Method to get all cars
        public async Task<List<Car>> GetAsync() =>
            await _carsCollection.Find(_ => true).ToListAsync();

        // Method to get a single car by ID
        public async Task<Car?> GetAsync(string id) =>
            await _carsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        // Method to create a new car
        public async Task CreateAsync(Car newCar) =>
            await _carsCollection.InsertOneAsync(newCar);

        // Method to search cars by Brand or Model
        public async Task<List<Car>> SearchAsync(string text)
        {
            var filter = Builders<Car>.Filter.Or(
                Builders<Car>.Filter.Regex("Brand", new BsonRegularExpression(text, "i")),
                Builders<Car>.Filter.Regex("Model", new BsonRegularExpression(text, "i"))
            );

            return await _carsCollection.Find(filter).ToListAsync();
        }
    }
}