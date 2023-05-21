namespace Decidify.Repository.Models;

public class CreatePollRequest
{
    public string Poll_Question { get; set; }
    public List<string> Poll_Options { get; set; }
    public string Poll_Owner { get; set; }
}
