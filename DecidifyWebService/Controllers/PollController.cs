using Decidify.Repository.Interfaces;
using Decidify.Repository.Models;
using Microsoft.AspNetCore.Mvc;

namespace DecidifyWebService.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class PollController : ControllerBase
{
    private readonly IPollRepository _pollData;
    public PollController(IPollRepository Poll)
    {
        _pollData = Poll;
    }
    //create poll --> api/CreatePoll
    [HttpPost(Name = "CreatePoll")]
    public async Task<ActionResult> CreatePoll([FromBody] CreatePollRequest pollRequestData)
    {
        try
        {
            var response = await _pollData.InsertPollIntoDB(pollRequestData);
            var apiResponse = new ResponseMessageOutput(
                ok: true,
                message: "Poll Created Successfully",
                data: new Dictionary<string, object>() { { "slug", response.ToString() } }
                );
            return Ok(apiResponse);
        }

        catch (Exception ex)
        {
            var apiResponse = new ResponseMessageOutput(
                ok: false,
                message: "Poll Creation Failed",
                data: new Dictionary<string, object>() { { "message", ex.Message } }
                );
            return BadRequest(apiResponse);
        }
    }
    //update poll --> api/UpdateVote
    [HttpPut(Name = "UpdateVote")]
    public async Task<ActionResult> UpdateVote(UpdatePollRequest updatePollData)
    {
        try
        {
            var response = await _pollData.UpdatePollandFetchResult(updatePollData);
            var apiResponse = new ResponseMessageOutput(
                ok: true,
                message: "Poll Updated Successfully"
                );
            return Ok(apiResponse);
        }
        catch (Exception ex)
        {
            var apiResponse = new ResponseMessageOutput(
                ok: false,
                message: "Poll Updation Failed",
                data: new Dictionary<string, object> { { "slug", ex.Message } }
                );
            return BadRequest(apiResponse);
        }
    }
    //get poll details --> api/GetPollDetails
    [HttpGet(Name = "GetPollDetails")]
    public async Task<ActionResult> GetPollDetails(string slug)
    {
        try
        {
            var response = await _pollData.FetchPollData(slug);
            var apiResponse = new ResponseMessageOutput(
                ok: true,
                message: "Poll Fetched Successfully",
                data: new Dictionary<string, object>() { { "Poll_Details", response } }
                );
            return Ok(apiResponse);
        }
        catch (Exception ex)
        {
            var apiResponse = new ResponseMessageOutput(
                ok: false,
                message: "Poll Fetch Failed"
                );
            return BadRequest(apiResponse);
        }
    }
    //get poll options --> api/GetPollOptions
    [HttpGet(Name = "GetPollOptions")]
    public async Task<ActionResult> GetPollOptions(string slug)
    {
        try
        {
            var response = await _pollData.FetchPollOptions(slug);
            var apiResponse = new ResponseMessageOutput(
                ok: true,
                message: "Poll Question, Options Fetched Successfully",
                data: new Dictionary<string, object> { { "Poll_Details", response } }
                );

            return Ok(apiResponse);
        }
        catch (Exception ex)
        {
            var apiResponse = new ResponseMessageOutput(
                ok: false,
                message: "Poll Question, Options Fetch Failed"
                );
            return BadRequest(apiResponse);
        }
    }
}
