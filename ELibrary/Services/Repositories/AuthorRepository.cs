using DataLayer;
using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;
using Services.Interfaces;
using System.Linq;
using System.Threading.Tasks;

namespace Services.Repositories
{
    public class AuthorRepository : IRepository<Author>
    {
        private readonly ELibraryContext _context;

        public AuthorRepository(ELibraryContext context)
        {
            _context = context;
        }

        public IQueryable<Author> GetAll()
        {
            var entityList = _context.Author as IQueryable<Author>;
            return entityList;
        }

        public async Task<Author> Get(long id)
        {
            return await _context.Author.FirstOrDefaultAsync(m => m.AuthorId == id);
        }

        public async Task Create(Author model)
        {
            _context.Author.Add(model);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Author model)
        {
            _context.Author.Update(model);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(Author model)
        {
            _context.Author.Remove(model);
            await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
