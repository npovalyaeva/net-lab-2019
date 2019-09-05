using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ELibrary.Models.ViewModels.Reservation
{
    public class SuccessfulReservationModel
    {
        public long ReservationId { get; set; }
        public byte StatusId { get; set; }
        public DateTime DateOfReservation { get; set; }
    }
}
