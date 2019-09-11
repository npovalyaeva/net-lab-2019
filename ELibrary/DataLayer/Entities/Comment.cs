using System;

namespace DataLayer.Entities
{
    public partial class Comment
    {
        public int CommentId { get; set; }
        public int UserId { get; set; }
        public int BookId { get; set; }
        public string Text { get; set; }
        public DateTime Date { get; set; }

        public virtual Book Book { get; set; }
        public virtual User User { get; set; }
    }
}
