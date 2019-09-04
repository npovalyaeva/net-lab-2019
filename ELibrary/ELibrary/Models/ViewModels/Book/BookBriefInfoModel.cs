using ELibrary.Models.ViewModels.Author;

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
