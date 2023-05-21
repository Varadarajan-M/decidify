using Decidify.Repository.Models;

namespace Decidify.Repository.Interfaces;

public interface IPollRepository
{
    public Task<Object> InsertPollIntoDB(CreatePollRequest inputPollData);
    public Task<Object> UpdatePollandFetchResult(UpdatePollRequest updatePollData);
    public Task<Object> FetchPollData(string slug);


}