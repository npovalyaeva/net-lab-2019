using AutoMapper;
using DataLayer.Entities;
using Microsoft.AspNetCore.Mvc;
using Models.ViewModels.Status;
using Services;
using Services.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ELibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusesController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IStatusService _statusService;

        public StatusesController(IStatusService statusService)
        {
            _statusService = statusService;
            _mapper = new MappingConfiguration().Configure().CreateMapper();
        }

        // GET: API/Statuses
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var statuses = await _statusService.GetStatuses();
            if (statuses == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<List<Status>, List<StatusModel>>(statuses));
        }
    }
}
