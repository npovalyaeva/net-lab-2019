using AutoMapper;
using ELibrary.Models;
using ELibrary.Models.ViewModels.Reservation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ELibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationsController : Controller
    {
        private readonly ELibraryContext _context;
        private readonly IMapper _mapper;

        public ReservationsController(ELibraryContext context)
        {
            _context = context;

            var config = new MappingConfiguration().Configure();
            _mapper = config.CreateMapper();
        }

        // GET: Reservations
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var eLibraryContext = _context.Reservation
                .Include(r => r.Book)
                .Include(r => r.Status)
                .Include(r => r.User);
            var reservations = await eLibraryContext
                .ToListAsync();
            return Json(_mapper.Map<List<Reservation>, List<ReservationModel>>(reservations));
        }

        // GET: Reservations/Book/3
        [HttpGet("book/{bookid}")]
        public async Task<IActionResult> ByBookId(int? bookId)
        {
            if (bookId == null)
            {
                return NotFound();
            }
            var eLibraryContext = _context.Reservation
                .Include(r => r.Book)
                .Include(r => r.Status)
                .Include(r => r.User);
            var reservations = await eLibraryContext
                .Where(m => m.BookId == bookId)
                .ToListAsync();
            return Json(_mapper.Map<List<Reservation>, List<ReservationModel>>(reservations));
        }

        // GET: Reservations/User/3
        [HttpGet("user/{userid}")]
        public async Task<IActionResult> ByUserId(int? userId)
        {
            if (userId == null)
            {
                return NotFound();
            }
            var eLibraryContext = _context.Reservation
                .Include(r => r.Book)
                .Include(r => r.Status)
                .Include(r => r.User);
            var reservations = await eLibraryContext
                .Where(m => m.UserId == userId)
                .ToListAsync();
            return Json(_mapper.Map<List<Reservation>, List<ReservationModel>>(reservations));
        }

        // GET: Reservations/HandedOut
        [HttpGet("handedout")]
        public async Task<IActionResult> HandedOut()
        {
            var eLibraryContext = _context.Reservation
                .Include(r => r.Book)
                .Include(r => r.Status)
                .Include(r => r.User);
            var reservations = await eLibraryContext
                .Where(m => m.StatusId == 2)
                .ToListAsync();
            return Json(_mapper.Map<List<Reservation>, List<ReservationModel>>(reservations));
        }

        // GET: Reservations/HandedOut/Author/Bulgakov
        [HttpGet("handedout/author/{lastname}")]
        public async Task<IActionResult> HandedOutByAuthorName(string lastname)
        {
            var eLibraryContext = _context.Reservation
                .Include(r => r.Book)
                .Include(r => r.Status)
                .Include(r => r.User);
            var reservations = await eLibraryContext
                .Where(m => m.StatusId == 2)
                .Where(m => m.Book.Author.LastName == lastname)
                .ToListAsync();
            return Json(_mapper.Map<List<Reservation>, List<ReservationModel>>(reservations));
        }

        // GET: Reservations/HandedOut/Days/5
        [HttpGet("handedout/days/{count}")]
        public async Task<IActionResult> HandedOutByCountOfDays(int? count)
        {
            if (count == null)
            {
                return NotFound();
            }
            var eLibraryContext = _context.Reservation
                .Include(r => r.Book)
                .Include(r => r.Status)
                .Include(r => r.User);
            var reservations = await eLibraryContext
                .Where(m => m.StatusId == 2)
                .Where(m => m.DateOfReservation <= DateTime.Now.AddDays(Convert.ToDouble(-count)))
                .ToListAsync();
            return Json(_mapper.Map<List<Reservation>, List<ReservationModel>>(reservations));
        }

        // GET: Reservations/HandedOut/Title/Demons
        [HttpGet("handedout/title/{title}")]
        public async Task<IActionResult> HandedOutByTitle(string title)
        {
            var eLibraryContext = _context.Reservation
                .Include(r => r.Book)
                .Include(r => r.Status)
                .Include(r => r.User);
            var reservations = await eLibraryContext
                .Where(m => m.StatusId == 2)
                .Where(m => m.Book.Title == title)
                .ToListAsync();
            return Json(_mapper.Map<List<Reservation>, List<ReservationModel>>(reservations));
        }
    }
}
