using System;

namespace Models.ViewModels.Reservation
{
    public class SuccessfulReservationModel
    {
        public long ReservationId { get; set; }
        public byte StatusId { get; set; }
        public DateTime DateOfReservation { get; set; }
    }
}
