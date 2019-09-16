using DataLayer;
using DataLayer.Entities;
using Services.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace Services.Repositories
{
    public class ReservationRepository : IRepository<Reservation>
    {
        private readonly ELibraryContext _context;

        public ReservationRepository(ELibraryContext context)
        {
            _context = context;
        }

        public List<Reservation> GetAll()
        {
            return _context.Reservation.ToList();
        }

        public Reservation Get(long id)
        {
            return _context.Reservation.FirstOrDefault(m => m.ReservationId == id);
        }

        public void Create(Reservation model)
        {
            _context.Reservation.Add(model);
            _context.SaveChanges();
        }

        public void Update(Reservation model)
        {
            _context.Reservation.Update(model);
            _context.SaveChanges();
        }

        public void Delete(Reservation model)
        {
            _context.Reservation.Remove(model);
            _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
