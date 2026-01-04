using JayaAutomobiles_API.Models;
using JayaAutomobiles_API.Services;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace JayaAutomobiles_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly CarService _carService;

        public CarsController(CarService carService)
        {
            _carService = carService;
        }

        // කාර් ඔක්කොම ගන්න (GET)
        [HttpGet]
        public async Task<List<Car>> Get() =>
            await _carService.GetAsync();

        // තනි කාර් එකක් ගන්න (GET by ID)
        [HttpGet("{id}")]
        public async Task<ActionResult<Car>> Get(string id)
        {
            var car = await _carService.GetAsync(id);

            if (car is null)
            {
                return NotFound();
            }

            return car;
        }

       
        [HttpPost]
        public async Task<IActionResult> Post(Car newCar)
        {
            await _carService.CreateAsync(newCar);
            return CreatedAtAction(nameof(Get), new { id = newCar.Id }, newCar);
        }

        // කාර් Search කරන්න
        [HttpGet("search/{text}")]
        public async Task<List<Car>> Search(string text)
        {
            return await _carService.SearchAsync(text);
        }
    }
}