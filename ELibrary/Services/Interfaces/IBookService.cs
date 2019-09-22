using DataLayer.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IBookService
    {
        Task<List<Book>> GetBooks();
        Task<List<Book>> GetFreeBooks();
        Task<List<Book>> GetBooksByAuthorLastName(string lastName);
        Task<List<Book>> GetBooksByTitle(string title);
        Task<List<Book>> GetBooksByYear(short year);

        Task<Book> GetBookInfo(int id);

        Task<Book> Create(Book book);
    }
}
