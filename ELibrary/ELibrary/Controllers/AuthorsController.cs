using AutoMapper;
using ELibrary.Models;
using ELibrary.Models.ViewModels.Author;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace ELibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorsController : Controller
    {
        private readonly ELibraryContext _context;
        private readonly IMapper _mapper;

        public AuthorsController(ELibraryContext context)
        {
            _context = context;

            var config = new MappingConfiguration().Configure();
            _mapper = config.CreateMapper();
        }

        // GET: Authors
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var authors = await _context.Author.ToListAsync();

            return Json(_mapper.Map<List<Author>, List<AuthorModel>>(authors));
        }

        // GET: Authors/Details/5
        [HttpGet("details/{id}")]
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






        // GET: Authors/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Authors/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost("create")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([FromBody] Author author)
        {
            if (ModelState.IsValid)
            {
                _context.Author.Add(author);
                await _context.SaveChangesAsync();
            }
            return Json(CreatedAtAction(nameof(Details), new { id = author.AuthorId }, author));
        }

        // GET: Authors/Edit/5
        public async Task<IActionResult> Edit(short? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var author = await _context.Author.FindAsync(id);
            if (author == null)
            {
                return NotFound();
            }
            return View(author);
        }

        // POST: Authors/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(short id, [Bind("AuthorId,LastName,FirstName,Patronymic")] Author author)
        {
            if (id != author.AuthorId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(author);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!AuthorExists(author.AuthorId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(author);
        }

        // GET: Authors/Delete/5
        public async Task<IActionResult> Delete(short? id)
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

            return View(author);
        }

        // POST: Authors/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(short id)
        {
            var author = await _context.Author.FindAsync(id);
            _context.Author.Remove(author);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool AuthorExists(short id)
        {
            return _context.Author.Any(e => e.AuthorId == id);
        }
    }
}
