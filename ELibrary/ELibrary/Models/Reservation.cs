using System;

namespace ELibrary.Models
{
    public partial class Reservation
    {
        public long ReservationId { get; set; }
        public byte StatusId { get; set; }
        public int BookId { get; set; }
        public int UserId { get; set; }
        public DateTime DateOfReservation { get; set; }

        public virtual Book Book { get; set; }
        public virtual Status Status { get; set; }
        public virtual User User { get; set; }
    }
}
