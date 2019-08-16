using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using User.Commands;
using User.Data;
using User.Handlers;

namespace ELibrary.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        [HttpPost]
        public bool CreateUser([FromBody] CreateUserCommand request)
        {
            UserContext context = HttpContext.RequestServices.GetService(typeof(UserContext)) as UserContext;
            CreateUserHandler handler = new CreateUserHandler(context);
            return handler.Handle(request);
        }
    }
}
