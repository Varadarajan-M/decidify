
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Decidify.Repository.Models
{
    [Table("PollData")]
    public class PollData
    {
        [Key]
        public int Poll_Id { get; set; }
        // [Required(ErrorMessage = "Poll Question is required")]
        // [StringLength(60, ErrorMessage = "Question can't be longer than 60 characters")]
        public string Poll_Question { get; set; }
        //[Required(ErrorMessage = "Poll Owner is required")]
        public string Poll_Owner { get; set; }
        //[Required(ErrorMessage = "Poll Options is required")]
        public string Poll_Options { get; set; }
        //[Required(ErrorMessage = "Poll Slug is required")]
        public string Poll_Slug { get; set; }

    }
}