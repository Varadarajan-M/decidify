namespace Decidify.Repository.Models;
public class UpdatePollRequest
{
    public string Poll_Slug { get; set; }
    public List<String> Poll_Options { get; set; }
}
