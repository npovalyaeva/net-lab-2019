﻿using System.Collections.Generic;

namespace DataLayer.Entities
{
    public partial class Book
    {
        public Book()
        {
            Comments = new HashSet<Comment>();
            Reservations = new HashSet<Reservation>();
        }

        public int BookId { get; set; }
        public string Title { get; set; }
        public short AuthorId { get; set; }
        public short Year { get; set; }
        public byte[] Cover { get; set; }
        public byte CopiesCount { get; set; }
        public byte FreeCopiesCount { get; set; }

        public virtual Author Author { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Reservation> Reservations { get; set; }
    }
}
