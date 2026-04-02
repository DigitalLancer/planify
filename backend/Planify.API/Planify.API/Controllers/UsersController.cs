using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Planify.API.Data;
using Planify.API.Dtos;
using Planify.API.Models;

namespace Planify.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;

        public UsersController(ApplicationDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [Authorize (Roles ="Admin")]
        [HttpGet]
        public async Task<ActionResult<List<User>>> GetAllUser()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserById(string id) { 
            var user=await _context.Users.FindAsync(id);
            if (user is null) {
                return NotFound();
            }
            var dto = new UserInformationDto
            {
                id=user.Id,
                email = user.Email,
                username = user.UserName
            };
            
            return Ok(dto);
        }

        [Authorize]
        [HttpGet("{id}/events")]
        public async Task<ActionResult<Event>> GetEventByUserId(string id)
        {
            var events = await _context.Events.Where(e => e.UserId == id && !e.IsDeleted).ToListAsync();
            return Ok(events);
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> Me()
        {
            if (!User.Identity?.IsAuthenticated ?? true)
                return Unauthorized(new { message = "Unauthenticated" });

            var user = await _userManager.GetUserAsync(User);

            if (user == null)
                return Unauthorized(new { message = "User not found" });

            var dto = new UserInformationDto
            {
                id = user.Id,
                email = user.Email,
                username = user.UserName
            };

            return Ok(dto);
        }
    }
}
