﻿using DataLayer.Entities;
using Services.Filters;
using Services.Interfaces;
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

        public async Task<List<Comment>> GetCommentsByBookId(int bookId)
        {
            try
            {
                var entityList = _commentRepository.GetAll();
                var comments = CommentFilter.FilterByBookId(entityList, bookId);
                return comments.ToList();
            }
            catch
            {
                return null;
            }
        }

        public async Task<Comment> GetCommentInfo(int id)
        {
            try
            {
                Comment comment = await _commentRepository.Get(id);
                if (comment == null)
                {
                    return null;
                }
                return comment;
            }
            catch
            {
                return null;
            }
        }

        public async Task<Comment> Create(Comment comment)
        {
            if (comment == null)
            {
                return null;
            }

            try
            {
                await _commentRepository.Create(comment);
                return comment;
            }
            catch
            {
                return null;
            }
        }

        public async Task<Comment> EditByModerator(int id)
        {
            try
            {
                Comment dbObject = await _commentRepository.Get(id);
                if (dbObject == null)
                {
                    return null;
                }
                dbObject.Text = _text;

                await _commentRepository.Update(dbObject);
                return dbObject;
            }
            catch
            {
                return null;
            }
        }
    }
}
