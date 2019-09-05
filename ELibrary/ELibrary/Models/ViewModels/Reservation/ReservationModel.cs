using ELibrary.Models.ViewModels.Book;
using ELibrary.Models.ViewModels.Status;
using ELibrary.Models.ViewModels.User;
using System;

namespace ELibrary.Models.ViewModels.Reservation
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
