using AutoMapper;
using DataLayer;
using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;
using Models.ViewModels.Book;
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
                List<Book> books = await _bookRepository.GetAll();
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
                // ???
                List<Book> dbList = await _bookRepository.GetAll();
                IEnumerable<Book> books = dbList.Where(m => m.FreeCopiesCount > 0);

                if (books == null)
                {
                    return null;
                }
                return books as List<Book>;
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
                List<Book> books = await _context.Book
                    .Include(b => b.Author)
                    .Where(m => m.Author.LastName == lastName)
                    .ToListAsync();
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

        public async Task<List<Book>> GetBooksByTitle(string title)
        {
            if (string.IsNullOrEmpty(title))
            {
                return null;
            }

            try
            {
                List<Book> books = await _context.Book
                    .Include(b => b.Author)
                    .Where(m => m.Title == title)
                    .ToListAsync();
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

        public async Task<List<Book>> GetBooksByYear(short year)
        {
            try
            {
                List<Book> books = await _context.Book
                    .Include(b => b.Author)
                    .Where(m => m.Year == year)
                    .ToListAsync();
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


        public async Task<Book> GetBookInfo(int id)
        {
            try
            {
                Book book = await _context.Book
                    .Include(b => b.Author)
                    .FirstOrDefaultAsync(m => m.BookId == id);
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
                Book dbObject = _mapper.Map<CreateBookModel, Book>(book);

                _context.Book.Add(dbObject);
                await _context.SaveChangesAsync();

                return _mapper.Map<Book, SuccessBookModel>(dbObject);
            }
            catch
            {
                return null;
            }
        }
    }
}
