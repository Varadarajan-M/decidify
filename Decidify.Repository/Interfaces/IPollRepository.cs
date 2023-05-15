using Decidify.Repository.Models;

namespace Decidify.Repository.Interfaces;

public interface IPollRepository
{
    public Task<Object> InsertPollIntoDB(CreatePollRequest inputPollData);
    //public Task<string> UpdatePollData(PollData inputpollData);

}