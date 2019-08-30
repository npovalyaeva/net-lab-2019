using System;
using System.Collections.Generic;

namespace ELibrary.Models
{
    public partial class Book
    {
        public Book()
        {
            Comment = new HashSet<Comment>();
            Reservation = new HashSet<Reservation>();
        }

        public int BookId { get; set; }
        public string Title { get; set; }
        public short AuthorId { get; set; }
        public short Year { get; set; }
        public byte[] Cover { get; set; }
        public byte CopiesCount { get; set; }
        public byte FreeCopiesCount { get; set; }

        public virtual Author Author { get; set; }
        public virtual ICollection<Comment> Comment { get; set; }
        public virtual ICollection<Reservation> Reservation { get; set; }
    }
}
