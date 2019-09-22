using DataLayer.Entities;
using Services.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.Services
{
    public class AuthorService : IAuthorService
    {
        private readonly IRepository<Author> _authorRepository;

        public AuthorService(IRepository<Author> authorRepository)
        {
            _authorRepository = authorRepository;
        }

        public async Task<List<Author>> GetAuthors()
        {
            try
            {
                var entityList = _authorRepository.GetAll();
                return entityList.ToList();
            }
            catch
            {
                return null;
            }
        }

        public async Task<Author> GetAuthorInfo(short id)
        {
            try
            {
                Author author = await _authorRepository.Get(id);
                if (author == null)
                {
                    return null;
                }
                return author;
            }
            catch
            {
                return null;
            }
        }

        public async Task<Author> Create(Author author)
        {
            if (author == null)
            {
                return null;
            }
            await _authorRepository.Create(author);
            return author;

        }
    }
}
