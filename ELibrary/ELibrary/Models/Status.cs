using System;
using System.Collections.Generic;

namespace ELibrary.Models
{
    public partial class Status
    {
        public Status()
        {
            Reservation = new HashSet<Reservation>();
        }

        public byte StatusId { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Reservation> Reservation { get; set; }
    }
}
