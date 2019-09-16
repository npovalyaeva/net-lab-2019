using DataLayer;
using DataLayer.Entities;
using Services.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace Services.Repositories
{
    public class CommentRepository : IRepository<Comment>
    {
        private readonly ELibraryContext _context;

        public CommentRepository(ELibraryContext context)
        {
            _context = context;
        }

        public List<Comment> GetAll()
        {
            return _context.Comment.ToList();
        }

        public Comment Get(long id)
        {
            return _context.Comment.FirstOrDefault(m => m.CommentId == id);
        }

        public void Create(Comment model)
        {
            _context.Comment.Add(model);
            _context.SaveChanges();
        }

        public void Update(Comment model)
        {
            _context.Comment.Update(model);
            _context.SaveChanges();
        }

        public void Delete(Comment model)
        {
            _context.Comment.Remove(model);
            _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
