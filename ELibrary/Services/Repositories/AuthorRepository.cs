using DataLayer;
using DataLayer.Entities;
using Services.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace Services.Repositories
{
    public class AuthorRepository : IRepository<Author>
    {
        private readonly ELibraryContext _context;

        public AuthorRepository(ELibraryContext context)
        {
            _context = context;
        }

        public List<Author> GetAll()
        {
            return _context.Author.ToList();
        }

        public Author Get(long id)
        {
            return _context.Author.FirstOrDefault(m => m.AuthorId == id);
        }

        public void Create(Author model)
        {
            _context.Author.Add(model);
            _context.SaveChanges();
        }

        public void Update(Author model)
        {
            _context.Author.Update(model);
            _context.SaveChanges();
        }

        public void Delete(Author model)
        {
            _context.Author.Remove(model);
            _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
