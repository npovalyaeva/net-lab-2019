using Microsoft.AspNetCore.Mvc;
using Models.ViewModels.Book;
using Services.Interfaces;
using System.Threading.Tasks;

namespace ELibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IBookService _bookService;

        public BooksController(IBookService bookService)
        {
            _bookService = bookService;
        }

        // GET: API/Books
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var books = await _bookService.GetBooks();
            if (books == null)
            {
                return NotFound();
            }
            return Ok(books);
        }

        // GET: API/Books/Free
        [HttpGet("free")]
        public async Task<IActionResult> GetFreeBooks()
        {
            var books = await _bookService.GetFreeBooks();
            if (books == null)
            {
                return NotFound();
            }
            return Ok(books);
        }

        // GET: API/Books/Author/Dostoyevsky
        [HttpGet("author/{lastName}")]
        public async Task<IActionResult> GetBooksByAuthorLastName(string lastName)
        {
            var books = await _bookService.GetBooksByAuthorLastName(lastName);
            if (books == null)
            {
                return NotFound();
            }
            return Ok(books);
        }

        // GET: API/Books/Title/Demons
        [HttpGet("title/{title}")]
        public async Task<IActionResult> GetBooksByTitle(string title)
        {
            var books = await _bookService.GetBooksByTitle(title);
            if (books == null)
            {
                return NotFound();
            }
            return Ok(books);
        }

        // GET: API/Books/Year/1841
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
                return NotFound();
            }
            return Ok(books);
        }

        // GET: API/Books/5
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
            return Ok(book);
        }

        // POST: API/Books
        [HttpPost]
        public async Task<IActionResult> Create(CreateBookModel book)
        {
            var dbObject = await _bookService.Create(book);
            if (dbObject == null)
            {
                return BadRequest();
            }
            return Created("Created", dbObject);
        }
    }
}
