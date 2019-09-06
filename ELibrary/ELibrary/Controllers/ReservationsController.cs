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
    public class ReservationsController : ELibraryController
    {
        public ReservationsController(ELibraryContext context) : base(context) { }

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

        // GET: Reservations/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var comment = await _context.Reservation
                .Include(c => c.Book)
                .Include(c => c.Status)
                .Include(c => c.User)
                .FirstOrDefaultAsync(m => m.ReservationId == id);
            if (comment == null)
            {
                return NotFound();
            }

            return Json(comment);
        }

        // POST: Reservations/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost("create")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([FromBody] CreateReservationModel reservation)
        {
            var dbObject = _mapper.Map<CreateReservationModel, Reservation>(reservation);
            
            if (ModelState.IsValid)
            {
                var dbBookObject = await _context.Book
                .FirstOrDefaultAsync(m => m.BookId == reservation.BookId);

                dbBookObject.FreeCopiesCount--;
                dbObject.DateOfReservation = DateTime.Now;

                _context.Reservation
                    .Add(dbObject);
                _context.Book
                    .Update(dbBookObject);
                await _context.SaveChangesAsync();
            }
            return Json(CreatedAtAction(nameof(Details), new { id = dbObject.ReservationId }, _mapper.Map<Reservation, SuccessfulReservationModel>(dbObject)));
        }

        // POST: Reservations/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost("edit")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit([FromBody] EditReservationModel reservation)
        {
            var dbObject = await _context.Reservation
                .FirstOrDefaultAsync(m => m.ReservationId == reservation.ReservationId);
            dbObject.StatusId = reservation.StatusId;
            dbObject.DateOfReservation = DateTime.Now;
            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(dbObject);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ReservationExists(dbObject.ReservationId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }
            return Json(CreatedAtAction(nameof(Details), new { id = dbObject.ReservationId }, _mapper.Map<Reservation, SuccessfulReservationModel>(dbObject)));
        }

        private bool ReservationExists(long id)
        {
            return _context.Reservation.Any(e => e.ReservationId == id);
        }
    }
}
