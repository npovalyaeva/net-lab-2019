using ELibrary.Models;
using ELibrary.Models.ViewModels.Author;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ELibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorsController : ELibraryController
    {
        public AuthorsController(ELibraryContext context) : base(context) { }

        // GET: Authors
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var authors = await _context.Author
                .ToListAsync();
            return Ok(_mapper.Map<List<Author>, List<AuthorModel>>(authors));
        }

        // POST: Authors
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateAuthorModel author)
        {
            var dbObject = _mapper.Map<CreateAuthorModel, Author>(author);

            if (ModelState.IsValid)
            {
                _context.Author
                    .Add(dbObject);
                await _context.SaveChangesAsync();
            }
            return CreatedAtAction(nameof(Details), new { id = dbObject.AuthorId }, _mapper.Map<Author, SuccessAuthorModel>(dbObject));
        }

        private async Task<IActionResult> Details(short? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var author = await _context.Author
                .FirstOrDefaultAsync(m => m.AuthorId == id);

            if (author == null)
            {
                return NotFound();
            }

            return Json(_mapper.Map<Author, AuthorModel>(author));
        }
    }
}
