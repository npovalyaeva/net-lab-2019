using AutoMapper;
using DataLayer;
using DataLayer.Entities;
using Models.ViewModels.Comment;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services
{
    public class CommentService : ICommentService
    {
        private const string _text = "Deleted by Moderator";
        private readonly ELibraryContext _context;
        private readonly IMapper _mapper;

        public CommentService(ELibraryContext context)
        {
            _context = context;

            var config = new MappingConfiguration().Configure();
            _mapper = config.CreateMapper();
        }

        public async Task<List<CommentForBookModel>> GetCommentsByBookId(int bookId)
        {
            try
            {
                List<Comment> comments = await _context.Comment
                    .Include(c => c.UserNameModel)
                    .FirstOrDefaultAsync(m => m.BookId == bookId);
                if (comments == null)
                {
                    return null;
                }
                return _mapper.Map< List<Comment>, List<CommentForBookModel>>(comments);
            }
            catch
            {
                return null;
            }
        }

        public async Task<CommentForBookModel> GetCommentInfo(int id)
        {
            try
            {
                Comment comment = await _context.Comment
                    .Include(c => c.UserNameModel)
                    .FirstOrDefaultAsync(m => m.CommentId == id);
                if (comment == null)
                {
                    return null;
                }
                return _mapper.Map<Comment, CommentForBookModel>(comment);
            }
            catch
            {
                return null;
            }
        }

        public async Task<SuccessCommentModel> Create(CreateCommentModel comment)
        {
            if (comment == null)
            {
                return null;
            }

            try
            {
                Comment dbObject = _mapper.Map<CreateCommentModel, Comment>(comment);

                await _context.Comment.AddAsync(dbObject);
                await _context.Comment.SaveChangesAsync();

                // TODO: Where is Id?
                return _mapper.Map<Comment, SuccessCommentModel>(dbObject);
            }
            catch
            {
                return null;
            }
        }

        public async Task<SuccessCommentModel> EditByModerator(int id)
        {
            try
            {
                Comment dbObject = await _context.Comment.FindAsync(id);
                if (dbObject == null)
                {
                    return null;
                }
                dbObject.Text = _text;

                await _context.Comment.Update(dbObject);
                await _context.Comment.SaveChangesAsync();
                return _mapper.Map<Comment, SuccessCommentModel>(dbObject);
            }
            catch
            {
                return null;
            }
        }
    }
}
