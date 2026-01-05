using JayaAutomobiles_API.Models;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using MongoDB.Bson; // Regex සඳහා අවශ්‍යයි

namespace JayaAutomobiles_API.Services
{
    public class CarService
    {
        private readonly IMongoCollection<Car> _carsCollection;

        public CarService(IConfiguration config)
        {
            var mongoClient = new MongoClient(config.GetConnectionString("MongoDbConnection"));
            var mongoDatabase = mongoClient.GetDatabase(config["DatabaseName"]);
            _carsCollection = mongoDatabase.GetCollection<Car>("Cars");
        }

        // --- CRUD Operations ---

        public async Task<List<Car>> GetAsync() =>
            await _carsCollection.Find(_ => true).ToListAsync();

        public async Task<Car?> GetAsync(string id) =>
            await _carsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Car newCar) =>
            await _carsCollection.InsertOneAsync(newCar);

        public async Task UpdateAsync(string id, Car updatedCar) =>
            await _carsCollection.ReplaceOneAsync(x => x.Id == id, updatedCar);

        public async Task RemoveAsync(string id) =>
            await _carsCollection.DeleteOneAsync(x => x.Id == id);

        // --- 👇 අලුතෙන් එකතු කළ කොටස (Search Fix) 👇 ---
        public async Task<List<Car>> SearchAsync(string term)
        {
            // Brand එක හෝ Model එකේ වචන ගැලපේද බලනවා (Case-insensitive)
            var filter = Builders<Car>.Filter.Or(
                Builders<Car>.Filter.Regex(x => x.Brand, new BsonRegularExpression(term, "i")),
                Builders<Car>.Filter.Regex(x => x.Model, new BsonRegularExpression(term, "i"))
            );

            return await _carsCollection.Find(filter).ToListAsync();
        }
    }
}