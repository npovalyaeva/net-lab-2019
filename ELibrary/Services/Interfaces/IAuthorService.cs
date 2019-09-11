using Models.ViewModels.Author;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IAuthorService
    {
        Task<List<AuthorModel>> GetAuthors();
        Task<AuthorModel> GetAuthorInfo(short id);
        Task<SuccessAuthorModel> Create(CreateAuthorModel author);
    }
}
