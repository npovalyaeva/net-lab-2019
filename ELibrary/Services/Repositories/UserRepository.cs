using DataLayer;
using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;
using Services.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.Repositories
{
    public class UserRepository : IRepository<User>
    {
        private readonly ELibraryContext _context;

        public UserRepository(ELibraryContext context)
        {
            _context = context;
        }

        public IQueryable<User> GetAll()
        {
            var entityList = _context.User as IQueryable<User>;
            return entityList;
        }

        public async Task<User> Get(long id)
        {
            return await _context.User.FirstOrDefaultAsync(m => m.UserId == id);
        }

        public async Task Create(User model)
        {
            _context.User.Add(model);
            await _context.SaveChangesAsync();
        }

        public async Task Update(User model)
        {
            _context.User.Update(model);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(User model)
        {
            _context.User.Remove(model);
            await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
