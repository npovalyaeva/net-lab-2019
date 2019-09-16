using Microsoft.AspNetCore.Mvc;
using Models.ViewModels.Author;
using Services.Interfaces;
using System.Threading.Tasks;

namespace ELibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorsController : ControllerBase
    {
        private readonly IAuthorService _authorService;

        public AuthorsController(IAuthorService authorService)
        {
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

        // POST: API/Authors
        [HttpPost]
        public async Task<IActionResult> Create(CreateAuthorModel author)
        {
            var dbObject = await _authorService.Create(author);
            if (dbObject == null)
            {
                return BadRequest();
            }
            return Created("Created", dbObject);
        }

        // GET: API/Authors/7
        [HttpGet("{id}")]
        public async Task<IActionResult> Details(short id)
        {

            var author = await _authorService.GetAuthorInfo(id);

            if (author == null)
            {
                return NotFound();
            }
            return Ok(author);
        }
    }
}
