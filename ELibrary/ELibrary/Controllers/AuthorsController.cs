using AutoMapper;
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
            return Json(_mapper.Map<List<Author>, List<AuthorModel>>(authors));
        }

        // GET: Authors/Details/5
        public async Task<IActionResult> Details(short? id)
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

        // POST: Authors/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost("create")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([FromBody] CreateAuthorModel author)
        {
            var dbObject = _mapper.Map<CreateAuthorModel, Author>(author);

            if (ModelState.IsValid)
            {
                _context.Author
                    .Add(dbObject);
                await _context.SaveChangesAsync();
            }
            return Json(CreatedAtAction(nameof(Details), new { id = dbObject.AuthorId }, _mapper.Map<Author, SuccessAuthorModel>(dbObject)));
        }
    }
}
