using ELibrary.Models;
using ELibrary.Models.ViewModels.Status;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ELibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusesController : ELibraryController
    {
        public StatusesController(ELibraryContext context) : base(context) { }

        // GET: Statuses
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var statuses = await _context.Status
                .ToListAsync();
            return Json(_mapper.Map<List<Status>, List<StatusModel>>(statuses));
        }
    }
}
