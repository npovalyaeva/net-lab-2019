using ELibrary.Models.ViewModels.Author;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ELibrary.Models.ViewModels.Book
{
    public class BookBriefInfoModel
    {
        public int BookId { get; set; }
        public string Title { get; set; }
        public AuthorNameModel AuthorName { get; set; }
        public byte[] Cover { get; set; }
        public byte FreeCopiesCount { get; set; }
    }
}
