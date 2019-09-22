using System.Collections.Generic;

namespace DataLayer.Entities
{
    public partial class Status
    {
        public Status()
        {
            Reservations = new HashSet<Reservation>();
        }

        public byte StatusId { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Reservation> Reservations { get; set; }
    }
}
