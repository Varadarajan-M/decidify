using Decidify.Repository.Interfaces;
using Decidify.Repository.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
            PollData pollData=null ;
            
            if(pollDetails!= null)
            {
                pollData = new PollData
                {
                    Poll_Slug = pollDetails.Poll_Question.ToLower().Replace(" ", "-"), //id to be appended with slug
                    Poll_Owner = pollDetails.Poll_Owner,
                    Poll_Question = pollDetails.Poll_Question,
                    Poll_Options =  JsonConvert.SerializeObject(pollDetails.Poll_Options)
                };
            }
            // await _dbContext..AddAsync(pollData);

            var result = await _dbContext.PollDetails.AddAsync(pollData);
            await _dbContext.SaveChangesAsync();
            return result;
        }
    }
}
