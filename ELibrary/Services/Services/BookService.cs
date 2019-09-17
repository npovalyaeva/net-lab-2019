using DataLayer.Entities;
using Services.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.Services
{
    public class BookService : IBookService
    {
        private readonly IRepository<Book> _bookRepository;

        public BookService(IRepository<Book> bookRepository)
        {
            _bookRepository = bookRepository;
        }

        public async Task<List<Book>> GetBooks()
        {
            try
            {
                var books = await _bookRepository.GetAll();
                if (books == null)
                {
                    return null;
                }
                return books;
            }
            catch
            {
                return null;
            }
        }

        public async Task<List<Book>> GetFreeBooks()
        {
            try
            {
                var dbList = await _bookRepository.GetAll();
                var books = dbList.Where(m => m.FreeCopiesCount > 0);

                if (books == null)
                {
                    return null;
                }
                return books.ToList();
            }
            catch
            {
                return null;
            }
        }

        public async Task<List<Book>> GetBooksByAuthorLastName(string lastName)
        {
            if (string.IsNullOrEmpty(lastName))
            {
                return null;
            }

            try
            {
                var dbList = await _bookRepository.GetAll();
                var books = dbList.Where(m => m.Author.LastName.ToLower() == lastName.ToLower());
                if (books == null)
                {
                    return null;
                }
                return books.ToList();
            }
            catch
            {
                return null;
            }
        }

        public async Task<List<Book>> GetBooksByTitle(string title)
        {
            if (string.IsNullOrEmpty(title))
            {
                return null;
            }

            try
            {
                var dbList = await _bookRepository.GetAll();
                var books = dbList.Where(m => m.Title.ToLower() == title.ToLower());
                if (books == null)
                {
                    return null;
                }
                return books.ToList();
            }
            catch
            {
                return null;
            }

        }

        public async Task<List<Book>> GetBooksByYear(short year)
        {
            try
            {
                var dbList = await _bookRepository.GetAll();
                var books = dbList.Where(m => m.Year == year);
                if (books == null)
                {
                    return null;
                }
                return books.ToList();
            }
            catch
            {
                return null;
            }
        }

        public async Task<Book> GetBookInfo(int id)
        {
            try
            {
                Book book = await _bookRepository.Get(id);
                if (book == null)
                {
                    return null;
                }
                return book;
            }
            catch
            {
                return null;
            }
        }

        public async Task<Book> Create(Book book)
        {
            if (book == null)
            {
                return null;
            }

            try
            {
                await _bookRepository.Create(book);
                return book;
            }
            catch
            {
                return null;
            }
        }
    }
}
