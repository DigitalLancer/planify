using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Planify.API.Dtos;
using Planify.API.Models;

namespace Planify.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private static List<Event> events = new List<Event>
        {
            new Event
            {
                Id = 1,
                Title = "Kış Kampı",
                Description = "Uludağ'da hafta sonu kamp etkinliği.",
                StartDate = new(2026, 1, 15, 14, 0, 0),
                Location = "Uludağ, Bursa",
                Status = "cancelled",
                Category = "exercise"
            },
            new Event
            {
                Id = 2,
                Title = "Yaz Festivali",
                Description = "Deniz kenarında yaz festivali.",
                StartDate = new(2026, 7, 20, 18, 0, 0),
                Location = "Çeşme, İzmir",
                Status = "active",
                Category = "entertainment"
            },
            new Event
            {
                Id = 3,
                Title = "Sonbahar Pikniği",
                Description = "Parkta sonbahar temalı piknik.",
                StartDate = new(2026, 10, 5, 12, 0, 0),
                Location = "Gülhane Parkı, İstanbul",
                Status = "active",
                Category = "social"
            },
            new Event
            {
                Id = 4,
                Title = "Akşam Kahve Buluşması",
                Description = "Yeni projeler üzerine sohbet.",
                StartDate = new DateTime(2026, 2, 10, 19, 0, 0),
                Location = "Kadıköy",
                Status = "completed",
                Category = "social"
            },
            new Event
            {
                Id = 5,
                Title = "Hafta Sonu Pikniği",
                Description = "Arkadaşlarla sahilde piknik organizasyonu.",
                StartDate = new DateTime(2026, 3, 4, 11, 0, 0),
                Location = "Caddebostan Sahili",
                Status = "completed",
                Category = "social"
            },
            new Event
            {
                Id = 6,
                Title = "Doğa Yürüyüşü",
                Description = "Belgrad Ormanı'nda sabah yürüyüşü ve kahvaltı.",
                StartDate = new DateTime(2026, 3, 18, 9, 0, 0),
                Location = "Belgrad Ormanı, İstanbul",
                Status = "completed",
                Category = "exercise"
            },
            new Event
            {
                Id = 7,
                Title = "UI/UX Workshop",
                Description = "Modern dashboard tasarımı üzerine workshop.",
                StartDate = new DateTime(2026, 4, 20, 10, 0, 0),
                Location = "Online",
                Status = "upcoming",
                Category = "education"
            },
            new Event
            {
                Id = 8,
                Title = "Tech Career Day",
                StartDate = new DateTime(2026, 4, 25, 9, 30, 0),
                Location = "Bahçeşehir Üniversitesi",
                Status = "upcoming",
                Category = "work"
            }
        };

        [HttpGet]
        public ActionResult<List<Event>> GetAllEvents()
        {
            return Ok(events);

        }

        [HttpGet("{id}")]
        public ActionResult<Event> GetEventById(int id)
        {
            var evnt = events.FirstOrDefault(e => e.Id == id);
            if (evnt == null)
            {
                return NotFound();
            }
            return Ok(evnt);
        }

        [HttpPost]
        public ActionResult<Event> AddEvent([FromBody] CreateEventDto newEventDto)
        {
            if (newEventDto is null)
            {
                return BadRequest();
            }
            Console.WriteLine($"Received new event: {newEventDto.Title}, {newEventDto.StartDate}");
            var newEvent = new Event
            {
                Id = events.Any() ? events.Max(e => e.Id) + 1 : 1,
                Title = newEventDto.Title,
                Description = newEventDto.Description,
                StartDate = newEventDto.StartDate,
                Location = newEventDto.Location,
                Category = newEventDto.Category,
                Status = "upcoming"
            };
            events.Add(newEvent);
            return CreatedAtAction(nameof(AddEvent), new { id = newEvent.Id }, newEvent);
        }

        [HttpPut("{id}")]
        public ActionResult UpdateEvent(int id, Event updatedEvent)
        {
            var evnt = events.FirstOrDefault(e => e.Id == id);
            if (evnt == null)
            {
                return NotFound();
            }

            evnt.Title = updatedEvent.Title;
            evnt.Description = updatedEvent.Description;
            evnt.StartDate = updatedEvent.StartDate;
            evnt.Location = updatedEvent.Location;
            evnt.Status = updatedEvent.Status;
            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteEvent(int id)
        {
            var evnt = events.FirstOrDefault(e => e.Id == id);
            if (evnt == null)
            {
                return NotFound();
            }
            events.Remove(evnt);
            return NoContent();
        }
    }
}
