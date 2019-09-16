using AutoMapper;
using DataLayer.Entities;
using Microsoft.AspNetCore.Mvc;
using Models.ViewModels.Author;
using Services;
using Services.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ELibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IAuthorService _authorService;

        public AuthorsController(IAuthorService authorService)
        {
            _authorService = authorService;
            _mapper = new MappingConfiguration().Configure().CreateMapper();
        }

        // GET: API/Authors
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            List<Author> authors = await _authorService.GetAuthors();
            if (authors == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<List<Author>, List<AuthorModel>>(authors));
        }

        // POST: API/Authors
        [HttpPost]
        public async Task<IActionResult> Create(CreateAuthorModel author)
        {
            Author model = _mapper.Map<CreateAuthorModel, Author>(author);
            Author dbObject = await _authorService.Create(model);
            if (dbObject == null)
            {
                return BadRequest();
            }
            return Created("Created", _mapper.Map<Author, SuccessAuthorModel>(dbObject));
        }

        // GET: API/Authors/7
        [HttpGet("{id}")]
        public async Task<IActionResult> Details(short id)
        {
            Author author = await _authorService.GetAuthorInfo(id);
            if (author == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<Author, AuthorModel>(author));
        }
    }
}
