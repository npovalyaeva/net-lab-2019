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

        [HttpPut("blockUser")]
        public bool BlockUser(string username, [FromBody] CreateUserCommand request)
        {
            UserContext context = HttpContext.RequestServices.GetService(typeof(UserContext)) as UserContext;
            BlockUserHandler handler = new BlockUserHandler(context);
            return handler.Handle(username, request);
        }

        [HttpPut("unblockUser")]
        public bool UnblockUser(string username, [FromBody] CreateUserCommand request)
        {
            UserContext context = HttpContext.RequestServices.GetService(typeof(UserContext)) as UserContext;
            UnblockUserHandler handler = new UnblockUserHandler(context);
            return handler.Handle(username, request);
        }
    }
}
