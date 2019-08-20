using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Comment.Commands;
using Comment.Data;
using Comment.Handlers;

namespace ELibrary.Controllers
{
    [Route("api/[controller]")]
    public class CommentController : Controller
    {
        [HttpPost]
        public bool CreateReservation([FromBody] CreateCommentCommand request)
        {
            CommentContext context = HttpContext.RequestServices.GetService(typeof(CommentContext)) as CommentContext;
            CreateCommentHandler handler = new CreateCommentHandler(context);
            return handler.Handle(request);
        }

        [HttpPut("DeleteComment")]
        public bool UpdateReservationStatus(int commentId)
        {
            CommentContext context = HttpContext.RequestServices.GetService(typeof(CommentContext)) as CommentContext;
            DeleteCommentHandler handler = new DeleteCommentHandler(context);
            return handler.Handle(commentId);
        }
    }
}
