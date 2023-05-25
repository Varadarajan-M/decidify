using Decidify.Repository.Interfaces;
using Decidify.Repository.Models;
using Newtonsoft.Json;

namespace Decidify.Repository
{
    public class PollRepository : IPollRepository
    {
        private readonly PollContext _dbContext;
        public PollRepository(PollContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<Object> InsertPollIntoDB(CreatePollRequest pollDetails)
        {
            PollData pollData = null;
            
            if(pollDetails!= null)
            {
                pollData = new PollData
                {
                    Poll_Slug = pollDetails.Poll_Question.ToLower().Replace(" ", "-"),
                    Poll_Owner = pollDetails.Poll_Owner,
                    Poll_Question = pollDetails.Poll_Question,
                    Poll_Options =  JsonConvert.SerializeObject(pollDetails.Poll_Options.ToDictionary(key=>key,value=>0))
                };

                var result = await _dbContext.PollDetails.AddAsync(pollData);

                var res = await _dbContext.SaveChangesAsync();

                pollData.Poll_Slug += "-" + pollData.Poll_Id.ToString();
                _dbContext.PollDetails.Update(pollData);
                await _dbContext.SaveChangesAsync();
            }
            return pollData.Poll_Slug;
        }

        public async Task<Object> UpdatePollandFetchResult(UpdatePollRequest updatePollDetails)
        {
            PollData updatedPoll = null;
            Dictionary<string, int> responseData = null;

            if (updatePollDetails != null)
            {
                updatedPoll = (from db in _dbContext.PollDetails where db.Poll_Slug == updatePollDetails.Poll_Slug select db).FirstOrDefault();
   
                responseData = JsonConvert.DeserializeObject <Dictionary<string, int>>(updatedPoll.Poll_Options);

                int value = (int)responseData[updatePollDetails.Poll_Option];
                
                responseData[updatePollDetails.Poll_Option] = value + 1;

                updatedPoll.Poll_Options = JsonConvert.SerializeObject(responseData);

                _dbContext.PollDetails.Update(updatedPoll);

                await _dbContext.SaveChangesAsync();
            }
            return responseData;  
        }

        public async Task<Object> FetchPollData(string slugData)
        {
            PollData pollRecord = null;

            if (slugData!= null)
            {
                pollRecord = (from db in _dbContext.PollDetails where db.Poll_Slug == slugData select db).FirstOrDefault();
            }
           
           return pollRecord;
        }
        public async Task<Object> FetchPollOptions(string slugData)
        {
            Dictionary<string, object> respObj = null;
            if (slugData != null)
            {
              var pollRecord = (from db in _dbContext.PollDetails where db.Poll_Slug == slugData select new { db.Poll_Options,db.Poll_Question }).FirstOrDefault();
              var json = JsonConvert.DeserializeObject<Dictionary<string, int>>(pollRecord.Poll_Options);
              var keysObj = json?.Keys;
              respObj = new Dictionary<string, object> 
              { 
                { "Poll_Question", pollRecord.Poll_Question },
                { "Poll_Options", keysObj } 
              };
            }
            
            return respObj;
        }
    }
}
