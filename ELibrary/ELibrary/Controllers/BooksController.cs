﻿using AutoMapper;
using ELibrary.Models;
using ELibrary.Models.ViewModels.Book;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ELibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : Controller
    {
        private readonly ELibraryContext _context;
        private readonly IMapper _mapper;

        public BooksController(ELibraryContext context)
        {
            _context = context;

            var config = new MappingConfiguration().Configure();
            _mapper = config.CreateMapper();
        }

        // GET: Books
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var eLibraryContext = _context.Book
                .Include(b => b.Author);
            var books = await eLibraryContext
                .ToListAsync();
            return Json(_mapper.Map<List<Book>, List<BookBriefInfoModel>>(books));
        }

        // GET: Books/Free
        [HttpGet("free")]
        public async Task<IActionResult> GetFreeBooks()
        {
            var eLibraryContext = _context.Book
                .Include(b => b.Author);
            var books = await eLibraryContext
                .Where(m => m.FreeCopiesCount > 0)
                .ToListAsync();

            if (books == null)
            {
                return NotFound();
            }

            return Json(_mapper.Map<List<Book>, List<BookBriefInfoModel>>(books));
        }

        // GET: Books/LastName/Dostoyevsky
        [HttpGet("author/{lastName}")]
        public async Task<IActionResult> GetBooksByAuthorLastName(string lastName)
        {
            if (lastName == null)
            {
                return NotFound();
            }

            var eLibraryContext = _context.Book
                .Include(b => b.Author);
            var books = await eLibraryContext
                .Where(m => m.Author.LastName == lastName)
                .ToListAsync();

            if (books == null)
            {
                return NotFound();
            }

            return Json(_mapper.Map<List<Book>, List<BookBriefInfoModel>>(books));
        }

        // GET: Books/Title/Demons
        [HttpGet("title/{title}")]
        public async Task<IActionResult> GetBooksByTitle(string title)
        {
            if (title == null)
            {
                return NotFound();
            }

            var eLibraryContext = _context.Book
                .Include(b => b.Author);
            var books = await eLibraryContext
                .Where(m => m.Title == title)
                .ToListAsync();

            if (books == null)
            {
                return NotFound();
            }

            return Json(_mapper.Map<List<Book>, List<BookBriefInfoModel>>(books));
        }

        // GET: Books/Year/1841
        [HttpGet("year/{year}")]
        public async Task<IActionResult> GetBooksByYear(short? year)
        {
            if (year == null)
            {
                return NotFound();
            }

            var eLibraryContext = _context.Book
                .Include(b => b.Author);
            var books = await eLibraryContext
                .Where(m => m.Year == year)
                .ToListAsync();

            if (books == null)
            {
                return NotFound();
            }

            return Json(_mapper.Map<List<Book>, List<BookBriefInfoModel>>(books));
        }

        // GET: Books/Details/5
        [HttpGet("details/{id}")]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var book = await _context.Book
                .Include(b => b.Author)
                .Include(b => b.Comments)
                .FirstOrDefaultAsync(m => m.BookId == id);

            if (book == null)
            {
                return NotFound();
            }

            //return Json(book);
            return Json(_mapper.Map<Book, BookFullInfoModel>(book));
        }





        // POST: Books/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("BookId,Title,AuthorId,Year,Cover,CopiesCount,FreeCopiesCount")] Book book)
        {
            if (ModelState.IsValid)
            {
                _context.Add(book);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["AuthorId"] = new SelectList(_context.Author, "AuthorId", "FirstName", book.AuthorId);
            return View(book);
        }

        private bool BookExists(int id)
        {
            return _context.Book.Any(e => e.BookId == id);
        }
    }
}
