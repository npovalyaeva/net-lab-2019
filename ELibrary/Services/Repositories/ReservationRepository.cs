using DataLayer;
using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;
using Services.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Repositories
{
    public class ReservationRepository : IRepository<Reservation>
    {
        private readonly ELibraryContext _context;

        public ReservationRepository(ELibraryContext context)
        {
            _context = context;
        }

        public async Task<List<Reservation>> GetAll()
        {
            return await _context.Reservation
                .Include(c => c.Book)
                .Include(c => c.Status)
                .Include(c => c.User)
                .ToListAsync();
        }

        public async Task<Reservation> Get(long id)
        {
            return await _context.Reservation
                .Include(c => c.Book)
                .Include(c => c.Status)
                .Include(c => c.User)
                .FirstOrDefaultAsync(m => m.ReservationId == id);
        }

        public async Task Create(Reservation model)
        {
            _context.Reservation.Add(model);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Reservation model)
        {
            _context.Reservation.Update(model);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(Reservation model)
        {
            _context.Reservation.Remove(model);
            await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
