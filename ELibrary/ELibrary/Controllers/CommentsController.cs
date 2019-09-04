﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using ELibrary.Models;
using AutoMapper;
using ELibrary.Models.ViewModels.Comment;

namespace ELibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : Controller
    {
        private const string _text = "Deleted by Moderator";

        private readonly ELibraryContext _context;
        private readonly IMapper _mapper;

        public CommentsController(ELibraryContext context)
        {
            _context = context;

            var config = new MappingConfiguration().Configure();
            _mapper = config.CreateMapper();
        }

        // GET: Comments/Book/15
        [HttpGet("book/{bookId}")]
        public async Task<IActionResult> GetCommentByBookId(int? bookId)
        {
            if (bookId == null)
            {
                return NotFound();
            }

            var eLibraryContext = _context.Comment
                .Include(b => b.User);
            var comments = await eLibraryContext
                .Where(m => m.BookId == bookId)
                .ToListAsync();

            if (comments == null)
            {
                return NotFound();
            }

            return Json(_mapper.Map<List<Comment>, List<CommentForBookModel>>(comments));
        }

        // GET: Comments/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var comment = await _context.Comment
                .Include(c => c.Book)
                .Include(c => c.User)
                .FirstOrDefaultAsync(m => m.CommentId == id);
            if (comment == null)
            {
                return NotFound();
            }

            return Json(comment);
        }

        // POST: Comments/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost("create")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([FromBody] CreateCommentModel comment)
        {
            var dbModel = _mapper.Map<CreateCommentModel, Comment>(comment);

            dbModel.Date = DateTime.Now;
            if (ModelState.IsValid)
            {
                _context.Comment
                    .Add(dbModel);
                await _context.SaveChangesAsync();
            }
            return Json(CreatedAtAction(nameof(Details), new { id = dbModel.CommentId }, _mapper.Map<Comment, SuccessCommentModel>(dbModel)));
        }

        // POST: Comments/Delete/5
        [HttpPost("delete/{commentId}")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Delete(int? commentId)
        {
            var dbModel = await _context.Comment.FindAsync(commentId);
            dbModel.Text = _text;

            _context.Comment.Update(dbModel);
            await _context.SaveChangesAsync();

            return Json(CreatedAtAction(nameof(Details), new { id = dbModel.CommentId }, _mapper.Map<Comment, SuccessCommentModel>(dbModel)));;
        }
    }
}