using Microsoft.AspNetCore.Mvc;
using Models.ViewModels.Comment;
using Services.Interfaces;
using System.Threading.Tasks;

namespace ELibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentService _commentService;

        public CommentsController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        // GET: API/Comments/Book/15
        [HttpGet("book/{bookId}")]
        public async Task<IActionResult> GetCommentByBookId(int? bookId)
        {
            if (bookId == null)
            {
                return BadRequest();
            }
            var comment = await _commentService.GetCommentsByBookId((int)bookId);
            if (comment == null)
            {
                return NotFound();
            }
            return Ok(comment);
        }

        // GET: API/Comments/3
        [HttpGet]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return BadRequest();
            }
            var comment = await _commentService.GetCommentInfo((int)id);
            if (comment == null)
            {
                return NotFound();
            }
            return Ok(comment);
        }

        // POST: API/Comments
        [HttpPost]
        public async Task<IActionResult> Create(CreateCommentModel comment)
        {
            var dbObject = await _commentService.Create(comment);
            if (dbObject == null)
            {
                return BadRequest();
            }
            return CreatedAtAction("Created", dbObject);
        }

        // PUT: API/Comments/5
        [HttpPut("{commentId}")]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return BadRequest();
            }
            var dbObject = await _commentService.EditByModerator((int)id);
            if (dbObject == null)
            {
                return NotFound();
            }
            return CreatedAtAction("Updated", dbObject);
        }
    }
}
