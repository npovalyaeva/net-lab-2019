using DataLayer.Entities;
using Services.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.Services
{
    public class StatusService : IStatusService
    {
        private readonly IRepository<Status> _statusRepository;

        public StatusService(IRepository<Status> statusRepository)
        {
            _statusRepository = statusRepository;
        }

        public async Task<List<Status>> GetStatuses()
        {
            try
            {
                var entityList = _statusRepository.GetAll();
                return entityList.ToList();
            }
            catch
            {
                return null;
            }
        }
    }
}
