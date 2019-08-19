namespace Book.Commands
{
    public class CreateBookCommand
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public Author.Model.Author Author { get; set; }

        public int Year { get; set; }

        public byte?[] Cover { get; set; }

        public int CopiesCount { get; set; }

        public int FreeCopiesCount { get; set; }
    }
}
