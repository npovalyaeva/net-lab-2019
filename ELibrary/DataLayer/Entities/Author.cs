﻿using System.Collections.Generic;

namespace DataLayer.Entities
{
    public partial class Author
    {
        public Author()
        {
            Books = new HashSet<Book>();
        }

        public short AuthorId { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Patronymic { get; set; }

        public virtual ICollection<Book> Books { get; set; }
    }
}
