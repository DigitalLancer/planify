using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Planify.API.Data;
using Planify.API.Dtos;
using Planify.API.Models;
using System.Security.Claims;

namespace Planify.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public EventsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [Authorize (Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<List<Event>>> GetAllEvents()
        {
            var events = await _context.Events.ToListAsync();
            return Ok(events);
        }

        [Authorize]
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

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Event>> AddEvent([FromBody] CreateEventDto newEventDto)
        {
            if (newEventDto is null)
            {
                return BadRequest();
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var newEvent = new Event
            {
                Title = newEventDto.Title,
                Description = newEventDto.Description,
                StartDate = newEventDto.StartDate,
                Location = newEventDto.Location,
                Category = newEventDto.Category,
                Status = "upcoming",
                UserId = userId,
            };
            _context.Events.Add(newEvent);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(AddEvent), new { id = newEvent.Id }, newEvent);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateEvent(int id, CreateEventDto updatedEvent)
        {
            Console.WriteLine($"Received update for event ID {id}: {updatedEvent.Title}, {updatedEvent.Description}, {updatedEvent.StartDate}, {updatedEvent.Location}, {updatedEvent.Category}");
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

        [Authorize]
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
