namespace Models.ViewModels.Comment
{
    public class CreateCommentModel
    {
        public int UserId { get; set; }
        public int BookId { get; set; }
        public string Text { get; set; }
    }
}
