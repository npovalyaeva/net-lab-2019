using AutoMapper;
using ELibrary.Models;
using ELibrary.Models.ViewModels.Status;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace ELibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusesController : Controller
    {
        private readonly ELibraryContext _context;
        private readonly IMapper _mapper;

        public StatusesController(ELibraryContext context)
        {
            _context = context;

            var config = new MappingConfiguration().Configure();
            _mapper = config.CreateMapper();
        }

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
