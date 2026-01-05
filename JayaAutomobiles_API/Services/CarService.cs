using JayaAutomobiles_API.Models;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using MongoDB.Bson;

namespace JayaAutomobiles_API.Services
{
    // This class handles all Database operations related to 'Cars'
    public class CarService
    {
        // MongoDB Collection reference
        private readonly IMongoCollection<Car> _carsCollection;

        // Constructor: Initializes the MongoDB connection
        public CarService(IConfiguration config)
        {
            // 1. Get the connection string from appsettings.json
            var mongoClient = new MongoClient(config.GetConnectionString("MongoDbConnection"));

            // 2. Connect to the specific Database
            var mongoDatabase = mongoClient.GetDatabase(config["DatabaseName"]);

            // 3. Connect to the 'Cars' collection (Table)
            _carsCollection = mongoDatabase.GetCollection<Car>("Cars");
        }

        // --- CRUD Operations ---

        // Get all cars from the database
        public async Task<List<Car>> GetAsync() =>
            await _carsCollection.Find(_ => true).ToListAsync();

        // Get a single car by its ID
        public async Task<Car?> GetAsync(string id) =>
            await _carsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        // Add a new car to the database
        public async Task CreateAsync(Car newCar) =>
            await _carsCollection.InsertOneAsync(newCar);

        // Update an existing car's details
        public async Task UpdateAsync(string id, Car updatedCar) =>
            await _carsCollection.ReplaceOneAsync(x => x.Id == id, updatedCar);

        // Remove a car from the database
        public async Task RemoveAsync(string id) =>
            await _carsCollection.DeleteOneAsync(x => x.Id == id);


        // --- Search Functionality ---

        // Search cars by 'Brand' or 'Model'
        public async Task<List<Car>> SearchAsync(string term)
        {
            // We use 'Builders' to create a complex filter query.
            // This logic checks if the search term matches EITHER the Brand OR the Model.
            var filter = Builders<Car>.Filter.Or(
                // "i" flag indicates Case-Insensitive search (e.g., "toyota" matches "Toyota")
                Builders<Car>.Filter.Regex(x => x.Brand, new BsonRegularExpression(term, "i")),
                Builders<Car>.Filter.Regex(x => x.Model, new BsonRegularExpression(term, "i"))
            );

            return await _carsCollection.Find(filter).ToListAsync();
        }
    }
}