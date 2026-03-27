using System.ComponentModel.DataAnnotations;

namespace Planify.API.Dtos
{
    public class CreateEventDto
    {
        public string Title { get; set; }
        public DateTime StartDate { get; set; }
        public string? Location { get; set; }
        public string? Description { get; set; }
        public string? Status { get; set; }
        [Required]
        public string Category { get; set; }
    }
}
