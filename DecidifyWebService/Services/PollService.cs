/*using Decidify.Repository;
using Decidify.Repository.Models;
using Newtonsoft.Json;

namespace DecidifyWebService.Controllers.Services;

public class PollService : IPollService
{
    public ResponseMessageOutput CreatePoll(CreatePollRequest pollDataJson)
    {
        var result= 
        try
        {
            PollRepository _pollRepository = new PollRepository();
            
            
            var requestData = JsonConvert.SerializeObject(pollDataJson);

           
            var response = _pollRepository.InsertPollIntoDB(requestData);

            if(response != null)
            {
                result = response;
            }
        }
        catch (Exception ex)
        {
            result = null;
        }
        return result;
    }
}*/