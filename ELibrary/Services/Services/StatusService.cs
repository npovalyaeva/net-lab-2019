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
        private readonly ELibraryContext _context;
        private readonly IMapper _mapper;

        public StatusService(ELibraryContext context)
        {
            _context = context;

            var config = new MappingConfiguration().Configure();
            _mapper = config.CreateMapper();
        }

        public async Task<List<StatusModel>> GetStatuses()
        {
            try
            {
                List<Status> statuses = await _context.Status
                    .ToListAsync();
                if (statuses == null)
                {
                    return null;
                }
                return _mapper.Map<List<Status>, List<StatusModel>>(statuses);
            }
            catch
            {
                return null;
            }
        }
    }
}
