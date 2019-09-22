using DataLayer.Entities;
using System.Linq;

namespace Services.Filters
{
    public static class CommentFilter
    {
        public static IQueryable<Comment> FilterByBookId(IQueryable<Comment> list, int bookId)
        {
            return list.Where(m => m.BookId == bookId);
        }
    }
}
