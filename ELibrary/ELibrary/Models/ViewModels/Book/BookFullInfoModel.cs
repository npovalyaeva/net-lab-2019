using ELibrary.Models.ViewModels.Author;
using ELibrary.Models.ViewModels.Comment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ELibrary.Models.ViewModels.Book
{
    public class BookFullInfoModel
    {
        public int BookId { get; set; }
        public string Title { get; set; }
        public AuthorNameModel AuthorName { get; set; }
        public short Year { get; set; }
        public byte[] Cover { get; set; }
        public byte CopiesCount { get; set; }
        public byte FreeCopiesCount { get; set; }

        public List<CommentForBookModel> Comments { get; set; }
    }
}
