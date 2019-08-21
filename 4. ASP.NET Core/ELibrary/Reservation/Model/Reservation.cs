using System;

namespace Reservation.Model
{
    public class Reservation
    {
        public int Id { get; set; }

        public Status.Model.Status Status { get; set; }

        public Book.Model.Book Book { get; set; }

        public User.Model.User User { get; set; }

        public DateTime DateOfReservation { get; set; }
    }
}
