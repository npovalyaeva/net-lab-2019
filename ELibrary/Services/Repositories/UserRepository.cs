using DataLayer;
using DataLayer.Entities;
using Services.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace Services.Repositories
{
    public class UserRepository : IRepository<User>
    {
        private readonly ELibraryContext _context;

        public UserRepository(ELibraryContext context)
        {
            _context = context;
        }

        public List<User> GetAll()
        {
            return _context.User.ToList();
        }

        public User Get(long id)
        {
            return _context.User.FirstOrDefault(m => m.UserId == id);
        }

        public void Create(User model)
        {
            _context.User.Add(model);
            _context.SaveChanges();
        }

        public void Update(User model)
        {
            _context.User.Update(model);
            _context.SaveChanges();
        }

        public void Delete(User model)
        {
            _context.User.Remove(model);
            _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
