using Models.ViewModels.Author;

namespace Models.ViewModels.Book
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
    }
}
