using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
                Id = 5,
                Title = "Kış Kampı",
                Description = "Uludağ'da hafta sonu kamp etkinliği.",
                StartDate = new(2026, 1, 15, 14, 0, 0),
                Location = "Uludağ, Bursa",
                Status = "cancelled"
            },
            new Event
            {
                Id = 6,
                Title = "Yaz Festivali",
                Description = "Deniz kenarında yaz festivali.",
                StartDate = new(2026, 7, 20, 18, 0, 0),
                Location = "Çeşme, İzmir",
                Status = "active"
            },
            new Event
            {
                Id = 7,
                Title = "Sonbahar Pikniği",
                Description = "Parkta sonbahar temalı piknik.",
                StartDate = new(2026, 10, 5, 12, 0, 0),
                Location = "Gülhane Parkı, İstanbul",
                Status = "active"
            },
            new Event
            {
                Id = 7,
                Title = "Akşam Kahve Buluşması",
                Description = "Yeni projeler üzerine sohbet.",
                StartDate = new DateTime(2026, 2, 10, 19, 0, 0),
                Location = "Kadıköy",
                Status = "completed"
            },
            new Event
            {
                Id = 3,
                Title = "Hafta Sonu Pikniği",
                Description = "Arkadaşlarla sahilde piknik organizasyonu.",
                StartDate = new DateTime(2026, 3, 4, 11, 0, 0),
                Location = "Caddebostan Sahili",
                Status = "completed"
            },
            new Event
            {
                Id = 1,
                Title = "Doğa Yürüyüşü",
                Description = "Belgrad Ormanı'nda sabah yürüyüşü ve kahvaltı.",
                StartDate = new DateTime(2026, 3, 5, 9, 0, 0),
                Location = "Belgrad Ormanı, İstanbul",
                Status = "upcoming"
            },
            new Event
            {
                Id = 4,
                Title = "UI/UX Workshop",
                Description = "Modern dashboard tasarımı üzerine workshop.",
                StartDate = new DateTime(2026, 3, 12, 10, 0, 0),
                Location = "Online",
                Status = "upcoming"
            },
            new Event
            {
                Id = 6,
                Title = "Tech Career Day",
                StartDate = new DateTime(2026, 3, 25, 9, 30, 0),
                Location = "Bahçeşehir Üniversitesi",
                Status = "upcoming"
            }
        };

        [HttpGet]
        public ActionResult<List<Event>> GetAllEvents()
        {
            return Ok(events);

        }

        public ActionResult<Event> GetEventById(int id)
        {
            var evnt = events.FirstOrDefault(e => e.Id == id);
            if (evnt == null)
            {
                return NotFound();
            }
            return Ok(evnt);
        }
    }
}
