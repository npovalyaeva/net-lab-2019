//using ELibrary.Models;
//using ELibrary.Models.ViewModels.Comment;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;

//namespace ELibrary.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class CommentsController : ELibraryController
//    {
//        private const string _text = "Deleted by Moderator";

//        public CommentsController(ELibraryContext context) : base(context) { }

//        // GET: Comments/Book/15
//        [HttpGet("book/{bookId}")]
//        public async Task<IActionResult> GetCommentByBookId(int? bookId)
//        {
//            if (bookId == null)
//            {
//                return NotFound();
//            }

//            var eLibraryContext = _context.Comment
//                .Include(b => b.User);
//            var comments = await eLibraryContext
//                .Where(m => m.BookId == bookId)
//                .ToListAsync();

//            if (comments == null)
//            {
//                return NotFound();
//            }

//            return Ok(_mapper.Map<List<Comment>, List<CommentForBookModel>>(comments));
//        }

//        public async Task<IActionResult> Details(int? id)
//        {
//            if (id == null)
//            {
//                return NotFound();
//            }

//            var comment = await _context.Comment
//                .Include(c => c.Book)
//                .Include(c => c.User)
//                .FirstOrDefaultAsync(m => m.CommentId == id);
//            if (comment == null)
//            {
//                return NotFound();
//            }

//            return Json(comment);
//        }

//        // POST: Comments
//        [HttpPost]
//        public async Task<IActionResult> Create([FromBody] CreateCommentModel comment)
//        {
//            var dbObject = _mapper.Map<CreateCommentModel, Comment>(comment);

//            dbObject.Date = DateTime.Now;
//            if (ModelState.IsValid)
//            {
//                _context.Comment
//                    .Add(dbObject);
//                await _context.SaveChangesAsync();
//            }
//            return Json(CreatedAtAction(nameof(Details), new { id = dbObject.CommentId }, _mapper.Map<Comment, SuccessCommentModel>(dbObject)));
//        }

//        // PUT: Comments/5
//        [HttpPut("/{commentId}")]
//        public async Task<IActionResult> Delete(int? commentId)
//        {
//            var dbObject = await _context.Comment.FindAsync(commentId);
//            dbObject.Text = _text;

//            _context.Comment.Update(dbObject);
//            await _context.SaveChangesAsync();

//            return Json(CreatedAtAction(nameof(Details), new { id = dbObject.CommentId }, _mapper.Map<Comment, SuccessCommentModel>(dbObject)));
//        }
//    }
//}
