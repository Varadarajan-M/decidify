using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace Decidify.Repository.Models;


public class CreatePollRequest
{
    [Required(ErrorMessage = "Poll_Question is required and cannot be empty.", AllowEmptyStrings = false)]
    public string Poll_Question { get; set; }
    [Required(ErrorMessage = "Poll_Options is required")]
    [MinLength(1, ErrorMessage = "Poll_Options cannot be empty or null.")]
    [NotNull]
    public List<string> Poll_Options { get; set; }
    public string Poll_Owner { get; set; }
}
