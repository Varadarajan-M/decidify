using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Decidify.Repository.Models
{
    [Table("PollData")]
    public class PollData
    {
        [Key]
        public int Poll_Id { get; set; }
        public string Poll_Question { get; set; }
        public string Poll_Owner { get; set; }
        public string Poll_Options { get; set; }
        public string Poll_Slug { get; set; }

    }
}