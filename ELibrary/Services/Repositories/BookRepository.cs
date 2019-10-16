using DataLayer;
using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;
using Services.Interfaces;
using System.Linq;
using System.Threading.Tasks;

namespace Services.Repositories
{
    public class BookRepository : IRepository<Book>
    {
        private readonly ELibraryContext _context;

        public BookRepository(ELibraryContext context)
        {
            _context = context;
        }

        public IQueryable<Book> GetAll()
        {
            var entityList = _context.Book as IQueryable<Book>;
            return entityList.Include(b => b.Author);
        }

        public async Task<Book> Get(long id)
        {
            return await _context.Book.Include(b => b.Author).FirstOrDefaultAsync(m => m.BookId == id);
        }

        public async Task Create(Book model)
        {
            _context.Book.Add(model);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Book model)
        {
            _context.Book.Update(model);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(Book model)
        {
            _context.Book.Remove(model);
            await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
