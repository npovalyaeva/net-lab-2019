using DataLayer.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IStatusService
    {
        Task<List<Status>> GetStatuses();
    }
}
