using DataLayer.Entities;
using System.Linq;

namespace Services.Filters
{
    public static class BookFilter
    {
        public static IQueryable<Book> FilterFreeBooks(IQueryable<Book> list)
        {
            return list.Where(m => m.FreeCopiesCount > 0);
        }

        public static IQueryable<Book> FilterByAuthorLastName(IQueryable<Book> list, string lastName)
        {
            return string.IsNullOrEmpty(lastName) ? list : list.Where(m => m.Author.LastName.ToLower() == lastName.ToLower());
        }

        public static IQueryable<Book> FilterByTitle(IQueryable<Book> list, string title)
        {
            return string.IsNullOrEmpty(title) ? list : list.Where(m => m.Title.ToLower() == title.ToLower());
        }

        public static IQueryable<Book> FilterByYear(IQueryable<Book> list, short year)
        {
            return list.Where(m => m.Year == year);
        }
    }
}
