using DataLayer;
using DataLayer.Entities;
using Services.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace Services.Repositories
{
    public class BookRepository : IRepository<Book>
    {
        private readonly ELibraryContext _context;

        public BookRepository(ELibraryContext context)
        {
            _context = context;
        }

        public List<Book> GetAll()
        {
            return _context.Book.ToList();
        }

        public Book Get(long id)
        {
            return _context.Book.FirstOrDefault(m => m.BookId == id);
        }

        public void Create(Book model)
        {
            _context.Book.Add(model);
            _context.SaveChanges();
        }

        public void Update(Book model)
        {
            _context.Book.Update(model);
            _context.SaveChanges();
        }

        public void Delete(Book model)
        {
            _context.Book.Remove(model);
            _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
