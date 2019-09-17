using DataLayer.Entities;
using Models.ViewModels.Comment;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface ICommentService
    {
        Task<List<Comment>> GetCommentsByBookId(int bookId);
        Task<Comment> GetCommentInfo(int id);
        Task<Comment> Create(Comment comment);
        Task<Comment> EditByModerator(int id);
    }
}
