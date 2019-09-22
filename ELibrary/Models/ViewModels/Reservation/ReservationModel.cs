using Models.ViewModels.Book;
using Models.ViewModels.Status;
using Models.ViewModels.User;
using System;

namespace Models.ViewModels.Reservation
{
    public class ReservationModel
    {
        public long ReservationId { get; set; }
        public StatusModel Status { get; set; }
        public BookBriefInfoModel Book { get; set; }
        public UserNameModel User { get; set; }
        public DateTime DateOfReservation { get; set; }
    }
}
