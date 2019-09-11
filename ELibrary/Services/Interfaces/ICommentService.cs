using Models.ViewModels.Comment;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface ICommentService
    {
        Task<List<CommentForBookModel>> GetCommentsByBookId(int bookId);
        // TODO: return Comment?
        Task<Comment> GetCommentInfo(int id);
        Task<SuccessCommentModel> Create(CreateCommentModel comment);
        Task<SuccessCommentModel> Delete(int id);
    }
}
