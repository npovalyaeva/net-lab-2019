using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Services.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ELibrary.Controllers
{
    [Route("api/authors")]
    [ApiController]
    public class AuthorsController : ControllerBase
    {
        private IConfiguration _configuration;
        private readonly IAuthorService _authorService;

        public AuthorsController(IConfiguration configuration, IAuthorService authorService)
        {
            _configuration = configuration;
            _authorService = authorService;
        }

        // GET: API/Authors
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var authors = await _authorService.GetAuthors();
            if (authors == null)
            {
                return NotFound();
            }
            return Ok(authors);
        }

        //        // POST: Authors
        //        [HttpPost]
        //        public async Task<IActionResult> Create([FromBody] CreateAuthorModel author)
        //        {
        //            var dbObject = _mapper.Map<CreateAuthorModel, Author>(author);

        //            if (ModelState.IsValid)
        //            {
        //                _context.Author
        //                    .Add(dbObject);
        //                await _context.SaveChangesAsync();
        //            }
        //            return CreatedAtAction(nameof(Details), new { id = dbObject.AuthorId }, _mapper.Map<Author, SuccessAuthorModel>(dbObject));
        //        }

        //        private async Task<IActionResult> Details(short? id)
        //        {
        //            if (id == null)
        //            {
        //                return NotFound();
        //            }

        //            var author = await _context.Author
        //                .FirstOrDefaultAsync(m => m.AuthorId == id);

        //            if (author == null)
        //            {
        //                return NotFound();
        //            }

        //            return Json(_mapper.Map<Author, AuthorModel>(author));
        //        }
    }
}
