using DataLayer.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IAuthorService
    {
        Task<List<Author>> GetAuthors();
        Task<Author> GetAuthorInfo(short id);
        Task<Author> Create(Author author);
    }
}
