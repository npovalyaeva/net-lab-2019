using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ELibrary.Models.ViewModels.Reservation
{
    public class CreateReservationModel
    {
        public byte StatusId { get; set; }
        public int BookId { get; set; }
        public int UserId { get; set; }
    }
}
