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

        [HttpGet("GetAllBlockedUsers")]
        public IEnumerable<User.Model.User> GetAllBlockedUsers()
        {
            UserContext context = HttpContext.RequestServices.GetService(typeof(UserContext)) as UserContext;
            GetAllBlockedUsersHandler handler = new GetAllBlockedUsersHandler(context);
            return handler.Handle();
        }

        [HttpGet("GetUserByLoginAndPassword")]
        public IEnumerable<User.Model.User> GetUserByLoginAndPasswordHandler(string login, string password)
        {
            UserContext context = HttpContext.RequestServices.GetService(typeof(UserContext)) as UserContext;
            GetUserByLoginAndPasswordHandler handler = new GetUserByLoginAndPasswordHandler(context);
            return handler.Handle(login, password);
        }

        [HttpGet("CheckIsUsernameUnique")]
        public bool CheckUsernameIsUniqueHandler(string username)
        {
            UserContext context = HttpContext.RequestServices.GetService(typeof(UserContext)) as UserContext;
            CheckIsUsernameUniqueHandler handler = new CheckIsUsernameUniqueHandler(context);
            return handler.Handle(username);
        }

        [HttpGet("CheckIsEmailUnique")]
        public bool CheckEmailIsUniqueHandler(string email)
        {
            UserContext context = HttpContext.RequestServices.GetService(typeof(UserContext)) as UserContext;
            CheckIsEmailUniqueHandler handler = new CheckIsEmailUniqueHandler(context);
            return handler.Handle(email);
        }

        [HttpPut("BlockUser")]
        public bool BlockUser(int userId, string blockedReason)
        {
            UserContext context = HttpContext.RequestServices.GetService(typeof(UserContext)) as UserContext;
            BlockUserHandler handler = new BlockUserHandler(context);
            return handler.Handle(userId, blockedReason);
        }

        [HttpPut("UnblockUser")]
        public bool UnblockUser(int userId)
        {
            UserContext context = HttpContext.RequestServices.GetService(typeof(UserContext)) as UserContext;
            UnblockUserHandler handler = new UnblockUserHandler(context);
            return handler.Handle(userId);
        }
    }
}
