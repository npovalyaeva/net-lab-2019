using AutoMapper;
using DataLayer.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models.ViewModels.Reservation;
using Services;
using Services.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ELibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IReservationService _reservationService;

        public ReservationsController(IReservationService reservationService)
        {
            _reservationService = reservationService;
            _mapper = new MappingConfiguration().Configure().CreateMapper();
        }

        // GET: API/Reservations
        [Authorize(Policy = "AdminOnly")]
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var reservations = await _reservationService.GetReservations();
            if (reservations == null)
            {
                return BadRequest();
            }
            if (reservations.Count == 0)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<List<Reservation>, List<ReservationModel>>(reservations));
        }

        // GET: Reservations/Book/3
        [Authorize(Policy = "AdminOnly")]
        [HttpGet("book/{bookid}")]
        public async Task<IActionResult> GetByBookId(int? bookId)
        {
            if (bookId == null)
            {
                return NotFound();
            }
            var reservations = await _reservationService.GetReservationsByBookId((int)bookId);
            if (reservations == null)
            {
                return BadRequest();
            }
            if (reservations.Count == 0)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<List<Reservation>, List<ReservationModel>>(reservations));
        }

        // GET: API/Reservations/User/3
        [Authorize]
        [HttpGet("user/{userid}")]
        public async Task<IActionResult> GetByUserId(int? userId)
        {
            if (userId == null)
            {
                return NotFound();
            }
            var reservations = await _reservationService.GetReservationsByUserId((int)userId);
            if (reservations == null)
            {
                return BadRequest();
            }
            if (reservations.Count == 0)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<List<Reservation>, List<ReservationModel>>(reservations));
        }

        // GET: Reservations/HandedOut
        [Authorize(Policy = "AdminOnly")]
        [HttpGet("handedout")]
        public async Task<IActionResult> HandedOut()
        {
            var reservations = await _reservationService.GetHandedOutReservations();
            if (reservations == null)
            {
                return BadRequest();
            }
            if (reservations.Count == 0)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<List<Reservation>, List<ReservationModel>>(reservations));
        }

        // GET: Reservations/HandedOut/Author/Bulgakov
        [Authorize(Policy = "AdminOnly")]
        [HttpGet("handedout/author/{lastname}")]
        public async Task<IActionResult> HandedOutByAuthorName(string lastName)
        {
            var reservations = await _reservationService.GetHandedOutReservationsByAuthorName(lastName);
            if (reservations == null)
            {
                return BadRequest();
            }
            if (reservations.Count == 0)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<List<Reservation>, List<ReservationModel>>(reservations));
        }

        // GET: Reservations/HandedOut/Days/5
        [Authorize(Policy = "AdminOnly")]
        [HttpGet("handedout/days/{count}")]
        public async Task<IActionResult> HandedOutByCountOfDays(int? count)
        {
            if (count == null)
            {
                return NotFound();
            }
            var reservations = await _reservationService.GetHandedOutReservationsByCountOfDays((int)count);
            if (reservations == null)
            {
                return BadRequest();
            }
            if (reservations.Count == 0)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<List<Reservation>, List<ReservationModel>>(reservations));
        }

        // GET: Reservations/HandedOut/Title/Demons
        [Authorize(Policy = "AdminOnly")]
        [HttpGet("handedout/title/{title}")]
        public async Task<IActionResult> HandedOutByTitle(string title)
        {
            var reservations = await _reservationService.GetHandedOutReservationsByTitle(title);
            if (reservations == null)
            {
                return BadRequest();
            }
            if (reservations.Count == 0)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<List<Reservation>, List<ReservationModel>>(reservations));
        }

        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var reservation = await _reservationService.GetReservationInfo((int)id);
            if (reservation == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<Reservation, ReservationModel>(reservation));
        }

        // POST: API/Reservations
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create(CreateReservationModel reservation)
        {
            var dbObject = await _reservationService.Create(_mapper.Map<CreateReservationModel, Reservation>(reservation));
            if (dbObject == null)
            {
                return BadRequest();
            }
            return Created("Created", _mapper.Map<Reservation, SuccessfulReservationModel>(dbObject));
        }

        // PUT: API/Reservations
        [Authorize(Policy = "AdminOnly")]
        [HttpPut]
        public async Task<IActionResult> Edit(EditReservationModel reservation)
        {
            var dbObject = await _reservationService.Edit(reservation);
            if (dbObject == null)
            {
                return NotFound();
            }
            return Created("Updated", _mapper.Map<Reservation, SuccessfulReservationModel>(dbObject));
        }

        // DELETE: API/Reservations/5
        [Authorize(Policy = "AdminOnly")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long? id)
        {
            if (id == null)
            {
                return BadRequest();
            }
            bool isSuccessed = await _reservationService.Delete((long)id);
            if (!isSuccessed)
                return NotFound();
            return NoContent();
        }
    }
}
