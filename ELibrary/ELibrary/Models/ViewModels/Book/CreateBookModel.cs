using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ELibrary.Models.ViewModels.Book
{
    public class CreateBookModel
    {
        public int BookId { get; set; }
        public string Title { get; set; }
        public short AuthorId { get; set; }
        public short Year { get; set; }
        public byte[] Cover { get; set; }
        public byte CopiesCount { get; set; }
    }
}
