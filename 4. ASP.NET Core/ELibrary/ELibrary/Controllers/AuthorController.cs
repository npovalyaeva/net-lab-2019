using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Author.Commands;
using Author.Data;
using Author.Handlers;

namespace ELibrary.Controllers
{
    [Route("api/[controller]")]
    public class AuthorController : Controller
    {

        [HttpPost]
        public bool CreateAuthor([FromBody] CreateAuthorCommand request)
        {
            AuthorContext context = HttpContext.RequestServices.GetService(typeof(AuthorContext)) as AuthorContext;
            CreateAuthorHandler handler = new CreateAuthorHandler(context);
            return handler.Handle(request);
        }
    }
}
