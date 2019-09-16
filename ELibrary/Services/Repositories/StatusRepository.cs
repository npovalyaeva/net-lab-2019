using DataLayer;
using DataLayer.Entities;
using Services.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace Services.Repositories
{
    public class StatusRepository : IRepository<Status>
    {
        private readonly ELibraryContext _context;

        public StatusRepository(ELibraryContext context)
        {
            _context = context;
        }

        public List<Status> GetAll()
        {
            return _context.Status.ToList();
        }

        public Status Get(long id)
        {
            return _context.Status.FirstOrDefault(m => m.StatusId == id);
        }

        public void Create(Status model)
        {
            _context.Status.Add(model);
            _context.SaveChanges();
        }

        public void Update(Status model)
        {
            _context.Status.Update(model);
            _context.SaveChanges();
        }

        public void Delete(Status model)
        {
            _context.Status.Remove(model);
            _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
