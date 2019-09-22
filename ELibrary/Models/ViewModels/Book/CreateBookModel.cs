namespace Models.ViewModels.Book
{
    public class CreateBookModel
    {
        public string Title { get; set; }
        public short AuthorId { get; set; }
        public short Year { get; set; }
        public byte[] Cover { get; set; }
        public byte CopiesCount { get; set; }
    }
}
