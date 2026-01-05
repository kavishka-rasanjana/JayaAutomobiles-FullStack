using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace JayaAutomobiles_API.Models
{
    public class Car
    {
       
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("Brand")]
        public string Brand { get; set; } = string.Empty;

        [BsonElement("Model")]
        public string Model { get; set; } = string.Empty;

        [BsonElement("Year")]
        public int Year { get; set; }

        [BsonElement("Price")]
        public decimal Price { get; set; }

        [BsonElement("ImageUrl")]
        public string ImageUrl { get; set; } = string.Empty;
    }
}