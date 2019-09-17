using AutoMapper;
using DataLayer;
using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;
using Models.ViewModels.Comment;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.Services
{
    public class CommentService : ICommentService
    {
        private const string _text = "Deleted by Moderator";
        private readonly IRepository<Comment> _commentRepository;

        public CommentService(IRepository<Comment> commentRepository)
        {
            _commentRepository = commentRepository;
        }

        public async Task<List<CommentForBookModel>> GetCommentsByBookId(int bookId)
        {
            try
            {
                List<Comment> comments = await _context.Comment
                    .Include(c => c.User)
                    .Where(m => m.BookId == bookId)
                    .ToListAsync();
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
                    .Include(c => c.User)
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
                dbObject.Date = DateTime.Now;
                _context.Comment.Add(dbObject);
                await _context.SaveChangesAsync();
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

                _context.Comment.Update(dbObject);
                await _context.SaveChangesAsync();
                return _mapper.Map<Comment, SuccessCommentModel>(dbObject);
            }
            catch
            {
                return null;
            }
        }
    }
}
