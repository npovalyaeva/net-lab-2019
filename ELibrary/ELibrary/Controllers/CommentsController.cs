using AutoMapper;
using DataLayer.Entities;
using Microsoft.AspNetCore.Mvc;
using Models.ViewModels.Comment;
using Services;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ELibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ICommentService _commentService;

        public CommentsController(ICommentService commentService)
        {
            _commentService = commentService;
            _mapper = new MappingConfiguration().Configure().CreateMapper();
        }

        // GET: API/Comments/Book/15
        [HttpGet("book/{bookId}")]
        public async Task<IActionResult> GetCommentsByBookId(int? bookId)
        {
            if (bookId == null)
            {
                return BadRequest();
            }
            var comments = await _commentService.GetCommentsByBookId((int)bookId);
            if (comments == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<List<Comment>, List<CommentForBookModel>>(comments));
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
            return Ok(_mapper.Map<Comment, CommentForBookModel>(comment));
        }

        // POST: API/Comments
        [HttpPost]
        public async Task<IActionResult> Create(CreateCommentModel comment)
        {
            Comment dbObject = _mapper.Map<CreateCommentModel, Comment>(comment);
            dbObject.Date = DateTime.Now;

            var dbAnswer = await _commentService.Create(dbObject);
            if (dbAnswer == null)
            {
                return BadRequest();
            }
            return CreatedAtAction("Created", _mapper.Map<Comment, SuccessCommentModel>(dbAnswer));
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
            return CreatedAtAction("Updated", _mapper.Map<Comment, SuccessCommentModel>(dbObject));
        }
    }
}
