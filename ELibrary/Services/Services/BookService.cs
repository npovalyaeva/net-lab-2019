using DataLayer.Entities;
using Services.Filters;
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
                var books = _bookRepository.GetAll();
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

        public async Task<List<Book>> GetFreeBooks()
        {
            try
            {
                var entityList = _bookRepository.GetAll();
                var books = BookFilter.FilterFreeBooks(entityList);
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
                var entityList = _bookRepository.GetAll();
                var books = BookFilter.FilterByAuthorLastName(entityList, lastName);
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
                var entityList = _bookRepository.GetAll();
                var books = BookFilter.FilterByTitle(entityList, title);
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
                var entityList = _bookRepository.GetAll();
                var books = BookFilter.FilterByYear(entityList, year);
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
            book.FreeCopiesCount = book.CopiesCount;
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
