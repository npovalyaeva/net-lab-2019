using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using System.Threading.Tasks;

namespace ELibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusesController : ControllerBase
    {
        private readonly IStatusService _statusService;

        public StatusesController(IStatusService statusService)
        {
            _statusService = statusService;
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
            return Ok(statuses);
        }
    }
}
