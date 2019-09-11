using Models.ViewModels.Status;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IStatusInterface
    {
        Task<List<StatusModel>> GetStatuses();
    }
}
