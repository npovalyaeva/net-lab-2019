using Models.ViewModels.Book;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IBookService
    {
        Task<List<BookBriefInfoModel>> GetBooks();
        Task<List<BookBriefInfoModel>> GetFreeBooks();
        Task<List<BookBriefInfoModel>> GetBooksByAuthorLastName(string lastName);
        Task<List<BookBriefInfoModel>> GetBooksByTitle(string title);
        Task<List<BookBriefInfoModel>> GetBooksByYear(short year);

        Task<BookFullInfoModel> GetBookInfo(int id);

        Task<SuccessBookModel> Create(CreateBookModel book);
    }
}
