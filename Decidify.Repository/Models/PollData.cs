using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Decidify.Repository.Models
{
    [Table("PollData")]
    public class PollData
    {
        [Key]
        public int Poll_Id { get; set; }
        [Required(ErrorMessage = "Poll_Question is required")]
        [StringLength(100, MinimumLength = 5, ErrorMessage = "Poll Question can't be longer than 100 characters")]
        public string Poll_Question { get; set; }
        [Required(ErrorMessage = "Poll_Owner is required")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Poll Owner should have atleast 3 characters")]
        public string Poll_Owner { get; set; }
        [Required(ErrorMessage = "Poll_Options is required")]
        public string Poll_Options { get; set; }
        public string? Poll_Slug { get; set; }
        public DateTime? Poll_CreatedDateTime { get; set; }

    }
}