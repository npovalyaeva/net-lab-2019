using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Reservation.Commands;
using Reservation.Data;
using Reservation.Handlers;

namespace ELibrary.Controllers
{
    [Route("api/[controller]")]
    public class ReservationController : Controller
    {
        [HttpPost]
        public bool CreateReservation([FromBody] CreateReservationCommand request)
        {
            ReservationContext context = HttpContext.RequestServices.GetService(typeof(ReservationContext)) as ReservationContext;
            CreateReservationHandler handler = new CreateReservationHandler(context);
            return handler.Handle(request);
        }

        [HttpPut("UpdateReservationStatus")]
        public bool UpdateReservationStatus(int reservationId, int statusId)
        {
            ReservationContext context = HttpContext.RequestServices.GetService(typeof(ReservationContext)) as ReservationContext;
            UpdateReservationStatusHandler handler = new UpdateReservationStatusHandler(context);
            return handler.Handle(reservationId, statusId);
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
            return handler.Handle(reservationId);
        }
    }
}
