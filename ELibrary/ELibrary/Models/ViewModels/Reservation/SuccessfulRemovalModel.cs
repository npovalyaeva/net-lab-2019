using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ELibrary.Models.ViewModels.Reservation
{
    public class SuccessfulRemovalModel
    {
        public long ReservationId { get; set; }
        public bool IsRemoved { get; set; }
    }
}
