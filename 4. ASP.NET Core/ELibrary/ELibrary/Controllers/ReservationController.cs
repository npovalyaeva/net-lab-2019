using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Reservation.Commands;
using Reservation.Data;
using Reservation.Handlers;
using Microsoft.Extensions.Logging;

namespace ELibrary.Controllers
{
    [Route("api/[controller]")]
    public class ReservationController : Controller
    {
        private readonly ILogger<ReservationController> _logger;

        public ReservationController(ILogger<ReservationController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public bool CreateReservation([FromBody] CreateReservationCommand request)
        {
            ReservationContext context = HttpContext.RequestServices.GetService(typeof(ReservationContext)) as ReservationContext;
            CreateReservationHandler handler = new CreateReservationHandler(context);
            bool isSuccess = handler.Handle(request);
            if (isSuccess) _logger.LogInformation(string.Format("New copy was added to the 'Reservations' table. Book ID: {0}, User ID: {1}, Status ID: {2}", request.Book.Id, request.User.Id, request.Status.Id));
            return isSuccess;
        }

        [HttpPut("UpdateReservationStatus")]
        public bool UpdateReservationStatus(int reservationId, int statusId)
        {
            ReservationContext context = HttpContext.RequestServices.GetService(typeof(ReservationContext)) as ReservationContext;
            UpdateReservationStatusHandler handler = new UpdateReservationStatusHandler(context);
            bool isSuccess = handler.Handle(reservationId, statusId);
            if (isSuccess) _logger.LogInformation(string.Format("Reservation was updated. Reservation ID: {0}, Status ID: {1}", reservationId, statusId));
            return isSuccess;
        }

        [HttpGet("GetAllHandedOutReservations")]
        public IEnumerable<Reservation.Model.Reservation> GetAllHandedOutReservations()
        {
            ReservationContext context = HttpContext.RequestServices.GetService(typeof(ReservationContext)) as ReservationContext;
            GetAllHandedOutReservationsHandler handler = new GetAllHandedOutReservationsHandler(context);
            return handler.Handle();
        }

        [HttpGet("GetHandedOutReservationsByAuthorLastName")]
        public IEnumerable<Reservation.Model.Reservation> GetHandedOutReservationsByAuthorLastName(string authorLastName)
        {
            ReservationContext context = HttpContext.RequestServices.GetService(typeof(ReservationContext)) as ReservationContext;
            GetHandedOutReservationsByAuthorLastNameHandler handler = new GetHandedOutReservationsByAuthorLastNameHandler(context);
            return handler.Handle(authorLastName);
        }

        [HttpGet("GetHandedOutReservationsByBookTitle")]
        public IEnumerable<Reservation.Model.Reservation> GetHandedOutReservationsByBookTitle(string bookTitle)
        {
            ReservationContext context = HttpContext.RequestServices.GetService(typeof(ReservationContext)) as ReservationContext;
            GetHandedOutReservationsByBookTitleHandler handler = new GetHandedOutReservationsByBookTitleHandler(context);
            return handler.Handle(bookTitle);
        }

        [HttpGet("GetHandedOutReservationsByCountOfDays")]
        public IEnumerable<Reservation.Model.Reservation> GetHandedOutReservationsByCountOfDays(int countOfDays)
        {
            ReservationContext context = HttpContext.RequestServices.GetService(typeof(ReservationContext)) as ReservationContext;
            GetHandedOutReservationsByCountOfDaysHandler handler = new GetHandedOutReservationsByCountOfDaysHandler(context);
            return handler.Handle(countOfDays);
        }

        [HttpGet("GetReservationsByBookId")]
        public IEnumerable<Reservation.Model.Reservation> GetReservationsByBookId(int bookId)
        {
            ReservationContext context = HttpContext.RequestServices.GetService(typeof(ReservationContext)) as ReservationContext;
            GetReservationsByBookIdHandler handler = new GetReservationsByBookIdHandler(context);
            return handler.Handle(bookId);
        }

        [HttpGet("GetReservationsByUserId")]
        public IEnumerable<Reservation.Model.Reservation> GetReservationsByUserId(int userId)
        {
            ReservationContext context = HttpContext.RequestServices.GetService(typeof(ReservationContext)) as ReservationContext;
            GetReservationsByUserIdHandler handler = new GetReservationsByUserIdHandler(context);
            return handler.Handle(userId);
        }

        [HttpDelete("DeleteReservation")]
        public bool DeleteTopic(int reservationId)
        {
            ReservationContext context = HttpContext.RequestServices.GetService(typeof(ReservationContext)) as ReservationContext;
            DeleteReservationHandler handler = new DeleteReservationHandler(context);
            bool isSuccess = handler.Handle(reservationId);
            if (isSuccess) _logger.LogInformation(string.Format("Reservation was deleted. Reservation ID: {0}", reservationId));
            return isSuccess;
        }
    }
}
