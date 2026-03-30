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
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;

        public UserController(ApplicationDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> GetAllUser()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

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

        [HttpGet("me")]
        public async Task<IActionResult> Me()
        {
            if (!User.Identity?.IsAuthenticated ?? true)
                return Unauthorized();

            var user = await _userManager.GetUserAsync(User);

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
