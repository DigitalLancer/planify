using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Planify.API.Models
{
    public class Event
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public DateTime StartDate { get; set; }

        [MaxLength(500)]
        public string? Location { get; set; }

        public string? Description { get; set; }

        public string? Status { get; set; }
        
        [Required]
        public string Category { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        public DateTime? LastModifiedAt { get; set; }

        [Required]
        public bool IsDeleted { get; set; } = false;
        
        public string UserId { get; set; }
        
        public User User { get; set; }
    }
}
