using Decidify.Repository.Interfaces;
using Decidify.Repository.Models;
using Microsoft.AspNetCore.Mvc;

namespace DecidifyWebService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PollController : ControllerBase
{
    private readonly IPollRepository _pollData;

    public PollController(IPollRepository Poll)
    {
        _pollData = Poll;
    }
    //Create Poll
    [HttpPost(Name = "CreatePoll")]
    public async Task<ActionResult> CreatePoll(CreatePollRequest pollRequestData)
    {
        try
        {
            await _pollData.InsertPollIntoDB(pollRequestData);
            return Ok("Create Poll Success");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut(Name = "Vote")]
    public bool UpdateVote(UpdatePollRequest pollRequestData)
    {
        try
        {
            // await _pollService.(pollRequestData);
            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }
}
