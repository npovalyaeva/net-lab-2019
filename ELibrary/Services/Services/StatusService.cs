using AutoMapper;
using DataLayer;
using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;
using Models.ViewModels.Status;
using Services.Interfaces;
using System.Collections.Generic;
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
                List<Status> statuses = await _statusRepository.GetAll();
                if (statuses == null)
                {
                    return null;
                }
                return statuses;
            }
            catch
            {
                return null;
            }
        }
    }
}
