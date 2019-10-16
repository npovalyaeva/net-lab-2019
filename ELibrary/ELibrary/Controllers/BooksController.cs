using AutoMapper;
using DataLayer.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models.ViewModels.Book;
using Services;
using Services.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ELibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IBookService _bookService;

        public BooksController(IBookService bookService)
        {
            _bookService = bookService;
            _mapper = new MappingConfiguration().Configure().CreateMapper();
        }

        // GET: API/Books
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            List<Book> books = await _bookService.GetBooks();
            if (books == null)
            {
                return BadRequest();
            }
            if (books.Count == 0)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<List<Book>, List<BookBriefInfoModel>>(books));
        }

        // GET: API/Books/Free
        [AllowAnonymous]
        [HttpGet("free")]
        public async Task<IActionResult> GetFreeBooks()
        {
            var books = await _bookService.GetFreeBooks();
            if (books == null)
            {
                return BadRequest();
            }
            if (books.Count == 0)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<List<Book>, List<BookBriefInfoModel>>(books));
        }

        // GET: API/Books/Author/Dostoyevsky
        [AllowAnonymous]
        [HttpGet("author/{lastName}")]
        public async Task<IActionResult> GetBooksByAuthorLastName(string lastName)
        {
            var books = await _bookService.GetBooksByAuthorLastName(lastName);
            if (books == null)
            {
                return BadRequest();
            }
            if (books.Count == 0)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<List<Book>, List<BookBriefInfoModel>>(books));
        }

        // GET: API/Books/Title/Demons
        [AllowAnonymous]
        [HttpGet("title/{title}")]
        public async Task<IActionResult> GetBooksByTitle(string title)
        {
            var books = await _bookService.GetBooksByTitle(title);
            if (books == null)
            {
                return BadRequest();
            }
            if (books.Count == 0)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<List<Book>, List<BookBriefInfoModel>>(books));
        }

        // GET: API/Books/Year/1841
        [AllowAnonymous]
        [HttpGet("year/{year}")]
        public async Task<IActionResult> GetBooksByYear(short? year)
        {
            if (year == null)
            {
                return BadRequest();
            }
            var books = await _bookService.GetBooksByYear((short)year);
            if (books == null)
            {
                return BadRequest();
            }
            if (books.Count == 0)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<List<Book>, List<BookBriefInfoModel>>(books));
        }

        // GET: API/Books/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return BadRequest();
            }
            var book = await _bookService.GetBookInfo((int)id);
            if (book == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<Book, BookFullInfoModel>(book));
        }

        // POST: API/Books
        [Authorize(Policy = "AdminOnly")]
        [HttpPost]
        public async Task<IActionResult> Create(CreateBookModel book)
        {
            Book model = _mapper.Map<CreateBookModel, Book>(book);
            Book dbObject = await _bookService.Create(model);
            if (dbObject == null)
            {
                return BadRequest();
            }
            return Created("Created", _mapper.Map<Book, SuccessBookModel>(dbObject));
        }
    }
}
