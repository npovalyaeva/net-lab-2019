//using ELibrary.Models;
//using ELibrary.Models.ViewModels.Reservation;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.Extensions.Logging;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;

//namespace ELibrary.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class ReservationsController : ELibraryController
//    {
//        private readonly ILogger<ReservationsController> _logger;

//        public ReservationsController(ELibraryContext context, ILogger<ReservationsController> logger) : base(context)
//        {
//            _logger = logger;
//        }

//        // GET: Reservations
//        [HttpGet]
//        public async Task<IActionResult> Index()
//        {
//            var eLibraryContext = _context.Reservation
//                .Include(r => r.Book)
//                .Include(r => r.Status)
//                .Include(r => r.User);
//            var reservations = await eLibraryContext
//                .ToListAsync();
//            return Ok(_mapper.Map<List<Reservation>, List<ReservationModel>>(reservations));
//        }

//        // GET: Reservations/Book/3
//        [HttpGet("book/{bookid}")]
//        public async Task<IActionResult> ByBookId(int? bookId)
//        {
//            if (bookId == null)
//            {
//                return NotFound();
//            }
//            var eLibraryContext = _context.Reservation
//                .Include(r => r.Book)
//                .Include(r => r.Status)
//                .Include(r => r.User);
//            var reservations = await eLibraryContext
//                .Where(m => m.BookId == bookId)
//                .ToListAsync();
//            return Ok(_mapper.Map<List<Reservation>, List<ReservationModel>>(reservations));
//        }

//        // GET: Reservations/User/3
//        [HttpGet("user/{userid}")]
//        public async Task<IActionResult> ByUserId(int? userId)
//        {
//            if (userId == null)
//            {
//                return NotFound();
//            }
//            var eLibraryContext = _context.Reservation
//                .Include(r => r.Book)
//                .Include(r => r.Status)
//                .Include(r => r.User);
//            var reservations = await eLibraryContext
//                .Where(m => m.UserId == userId)
//                .ToListAsync();
//            return Ok(_mapper.Map<List<Reservation>, List<ReservationModel>>(reservations));
//        }

//        // GET: Reservations/HandedOut
//        [HttpGet("handedout")]
//        public async Task<IActionResult> HandedOut()
//        {
//            var eLibraryContext = _context.Reservation
//                .Include(r => r.Book)
//                .Include(r => r.Status)
//                .Include(r => r.User);
//            var reservations = await eLibraryContext
//                .Where(m => m.StatusId == 2)
//                .ToListAsync();
//            return Ok(_mapper.Map<List<Reservation>, List<ReservationModel>>(reservations));
//        }

//        // GET: Reservations/HandedOut/Author/Bulgakov
//        [HttpGet("handedout/author/{lastname}")]
//        public async Task<IActionResult> HandedOutByAuthorName(string lastname)
//        {
//            var eLibraryContext = _context.Reservation
//                .Include(r => r.Book)
//                .Include(r => r.Status)
//                .Include(r => r.User);
//            var reservations = await eLibraryContext
//                .Where(m => m.StatusId == 2)
//                .Where(m => m.Book.Author.LastName == lastname)
//                .ToListAsync();
//            return Ok(_mapper.Map<List<Reservation>, List<ReservationModel>>(reservations));
//        }

//        // GET: Reservations/HandedOut/Days/5
//        [HttpGet("handedout/days/{count}")]
//        public async Task<IActionResult> HandedOutByCountOfDays(int? count)
//        {
//            if (count == null)
//            {
//                return NotFound();
//            }
//            var eLibraryContext = _context.Reservation
//                .Include(r => r.Book)
//                .Include(r => r.Status)
//                .Include(r => r.User);
//            var reservations = await eLibraryContext
//                .Where(m => m.StatusId == 2)
//                .Where(m => m.DateOfReservation <= DateTime.Now.AddDays(Convert.ToDouble(-count)))
//                .ToListAsync();
//            return Ok(_mapper.Map<List<Reservation>, List<ReservationModel>>(reservations));
//        }

//        // GET: Reservations/HandedOut/Title/Demons
//        [HttpGet("handedout/title/{title}")]
//        public async Task<IActionResult> HandedOutByTitle(string title)
//        {
//            var eLibraryContext = _context.Reservation
//                .Include(r => r.Book)
//                .Include(r => r.Status)
//                .Include(r => r.User);
//            var reservations = await eLibraryContext
//                .Where(m => m.StatusId == 2)
//                .Where(m => m.Book.Title == title)
//                .ToListAsync();
//            return Ok(_mapper.Map<List<Reservation>, List<ReservationModel>>(reservations));
//        }

//        public async Task<IActionResult> Details(int? id)
//        {
//            if (id == null)
//            {
//                return NotFound();
//            }

//            var comment = await _context.Reservation
//                .Include(c => c.Book)
//                .Include(c => c.Status)
//                .Include(c => c.User)
//                .FirstOrDefaultAsync(m => m.ReservationId == id);
//            if (comment == null)
//            {
//                return NotFound();
//            }

//            return Json(comment);
//        }

//        // POST: Reservations
//        [HttpPost]
//        public async Task<IActionResult> Create([FromBody] CreateReservationModel reservation)
//        {
//            var dbObject = _mapper.Map<CreateReservationModel, Reservation>(reservation);

//            if (ModelState.IsValid)
//            {
//                var dbBookObject = await _context.Book
//                .FirstOrDefaultAsync(m => m.BookId == reservation.BookId);

//                dbBookObject.FreeCopiesCount--;
//                dbObject.DateOfReservation = DateTime.Now;

//                _context.Reservation.Add(dbObject);
//                _context.Book.Add(dbBookObject);
//                await _context.SaveChangesAsync();
//                _logger.LogInformation(string.Format("New copy was added to the 'Reservations' table. Reservation ID: {0}, Book: {1}, User ID: {2}, Status ID: {3}", dbObject.ReservationId, dbBookObject.Title, dbObject.UserId, dbObject.StatusId));
//            }
//            return Json(CreatedAtAction(nameof(Details), new { id = dbObject.ReservationId }, _mapper.Map<Reservation, SuccessfulReservationModel>(dbObject)));
//        }

//        // PUT: Reservations
//        [HttpPut]
//        public async Task<IActionResult> Edit([FromBody] EditReservationModel reservation)
//        {
//            var dbObject = await _context.Reservation
//                .FirstOrDefaultAsync(m => m.ReservationId == reservation.ReservationId);
//            dbObject.StatusId = reservation.StatusId;
//            dbObject.DateOfReservation = DateTime.Now;
//            if (ModelState.IsValid)
//            {
//                try
//                {
//                    _context.Update(dbObject);
//                    await _context.SaveChangesAsync();
//                    _logger.LogInformation(string.Format("Reservation was updated. Reservation ID: {0}, Status ID: {1}", dbObject.ReservationId, dbObject.StatusId));
//                }
//                catch (DbUpdateConcurrencyException)
//                {
//                    if (!ReservationExists(dbObject.ReservationId))
//                    {
//                        return NotFound();
//                    }
//                    else
//                    {
//                        throw;
//                    }
//                }
//            }
//            return Json(CreatedAtAction(nameof(Details), new { id = dbObject.ReservationId }, _mapper.Map<Reservation, SuccessfulReservationModel>(dbObject)));
//        }

//        // DELETE: Reservations/5
//        [HttpDelete]
//        public async Task<IActionResult> Delete(long id)
//        {
//            var reservation = await _context.Reservation.FindAsync(id);
//            var book = await _context.Book
//                    .FirstOrDefaultAsync(m => m.BookId == reservation.BookId);
//            book.FreeCopiesCount++;
//            _context.Book.Update(book);
//            _context.Reservation.Remove(reservation);
//            await _context.SaveChangesAsync();
//            return NoContent();
//        }

//        private bool ReservationExists(long id)
//        {
//            return _context.Reservation.Any(e => e.ReservationId == id);
//        }
//    }
//}
