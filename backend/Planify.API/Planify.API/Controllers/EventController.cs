using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Planify.API.Data;
using Planify.API.Dtos;
using Planify.API.Models;

namespace Planify.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly EventDbContext _context;
        public EventController(EventDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Event>>> GetAllEvents()
        {
            var events = await _context.Events.ToListAsync();
            return Ok(events);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Event>> GetEventById(int id)
        {
            var evnt = await _context.Events.FindAsync(id);
            if (evnt is null)
            {
                return NotFound();
            }
            return Ok(evnt);
        }

        [HttpPost]
        public async Task<ActionResult<Event>> AddEvent([FromBody] CreateEventDto newEventDto)
        {
            if (newEventDto is null)
            {
                return BadRequest();
            }
            Console.WriteLine($"Received new event: {newEventDto.Title}, {newEventDto.StartDate}");
            var newEvent = new Event
            {
                Title = newEventDto.Title,
                Description = newEventDto.Description,
                StartDate = newEventDto.StartDate,
                Location = newEventDto.Location,
                Category = newEventDto.Category,
                Status = "upcoming"
            };
            _context.Events.Add(newEvent);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(AddEvent), new { id = newEvent.Id }, newEvent);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateEvent(int id, Event updatedEvent)
        {
            Console.WriteLine($"Updating event with ID: {id}");
            var evnt = await _context.Events.FindAsync(id);

            if (evnt is null)
            {
                return NotFound();
            }

            evnt.Title = updatedEvent.Title;
            evnt.Description = updatedEvent.Description;
            evnt.StartDate = updatedEvent.StartDate;
            evnt.Location = updatedEvent.Location;
            evnt.Category = updatedEvent.Category;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEvent(int id)
        {
            var evnt = await _context.Events.FindAsync(id);
            if (evnt is null)
            {
                return NotFound();
            }
            _context.Events.Remove(evnt);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
