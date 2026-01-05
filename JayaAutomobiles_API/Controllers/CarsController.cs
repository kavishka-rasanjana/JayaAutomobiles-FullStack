using JayaAutomobiles_API.Models;
using JayaAutomobiles_API.Services;
using Microsoft.AspNetCore.Mvc;

namespace JayaAutomobiles_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly CarService _carService;

        // Constructor: Injecting CarService dependency to handle database operations
        public CarsController(CarService carService)
        {
            _carService = carService;
        }

        // Endpoint: GET api/Cars
        // Summary: Retrieves a list of all available vehicles
        [HttpGet]
        public async Task<List<Car>> Get() =>
            await _carService.GetAsync();

        // Endpoint: GET api/Cars/{id}
        // Summary: Retrieves a specific vehicle by its unique ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Car>> Get(string id)
        {
            var car = await _carService.GetAsync(id);

            // If the car is not found, return a 404 Not Found response
            if (car is null)
            {
                return NotFound();
            }

            return car;
        }

        // Endpoint: POST api/Cars
        // Summary: Adds a new vehicle to the database
        [HttpPost]
        public async Task<IActionResult> Post(Car newCar)
        {
            await _carService.CreateAsync(newCar);

            // Returns a 201 Created response and includes the location of the new resource
            return CreatedAtAction(nameof(Get), new { id = newCar.Id }, newCar);
        }

        // Endpoint: GET api/Cars/search/{text}
        // Summary: Searches for vehicles matching the given text (Brand or Model)
        [HttpGet("search/{text}")]
        public async Task<List<Car>> Search(string text)
        {
            return await _carService.SearchAsync(text);
        }
    }
}