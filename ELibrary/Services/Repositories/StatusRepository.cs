using DataLayer;
using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;
using Services.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Repositories
{
    public class StatusRepository : IRepository<Status>
    {
        private readonly ELibraryContext _context;

        public StatusRepository(ELibraryContext context)
        {
            _context = context;
        }

        public async Task<List<Status>> GetAll()
        {
            return await _context.Status.ToListAsync();
        }

        public async Task<Status> Get(long id)
        {
            return await _context.Status.FirstOrDefaultAsync(m => m.StatusId == id);
        }

        public async Task Create(Status model)
        {
            _context.Status.Add(model);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Status model)
        {
            _context.Status.Update(model);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(Status model)
        {
            _context.Status.Remove(model);
            await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
