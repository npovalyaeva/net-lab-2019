using DataLayer;
using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;
using Services.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Repositories
{
    public class CommentRepository : IRepository<Comment>
    {
        private readonly ELibraryContext _context;

        public CommentRepository(ELibraryContext context)
        {
            _context = context;
        }

        public async Task<List<Comment>> GetAll()
        {
            return await _context.Comment.Include(c => c.User).ToListAsync();
        }

        public async Task<Comment> Get(long id)
        {
            return await _context.Comment.Include(c => c.User).FirstOrDefaultAsync(m => m.CommentId == id);
        }

        public async Task Create(Comment model)
        {
            _context.Comment.Add(model);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Comment model)
        {
            _context.Comment.Update(model);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(Comment model)
        {
            _context.Comment.Remove(model);
            await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
