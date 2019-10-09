using AutoMapper;
using DataLayer.Entities;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Models.ViewModels.User;
using Services;
using Services.Interfaces;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ELibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUserService _userService;
        private IJwtGenerator _jwtGenerator;

        public UsersController(IUserService userService, IJwtGenerator jwtGenerator)
        {
            _jwtGenerator = jwtGenerator;
            _userService = userService;
            _mapper = new MappingConfiguration().Configure().CreateMapper();
        }

        // GET: API/Users/Blocked
        [HttpGet("blocked")]
        public async Task<IActionResult> GetBlockedUsers()
        {
            var users = await _userService.GetBlockedUsers();
            if (users == null)
            {
                return BadRequest();
            }
            if (users.Count == 0)
            {
                return BadRequest();
            }
            return Ok(_mapper.Map<List<User>, List<UserModel>>(users));
        }

        // POST: API/Users/Login
        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Authenticate(AuthenticationModel authenticationData)
        {
            var user = await _userService.Authenticate(authenticationData);
            if (user == null)
            {
                return NotFound();
            }
            var token = _jwtGenerator.GenerateAccessToken(user);
            return Ok(new { token });
        }

        // GET: API/Users/Checking
        [HttpGet("checking/{login}")]
        public async Task<IActionResult> CheckLogin(string login)
        {
            LoginModel loginModel = new LoginModel();
            loginModel.Login = login;

            var isUnique = await _userService.CheckIsLoginUnique(login);
            loginModel.IsUnique = isUnique;
            return Ok(loginModel);
        }

        // GET: API/Users/Profile
        [Authorize]
        [HttpGet("profile")]
        public async Task<IActionResult> GetAccountInfo()
        {
            try
            {
                string email = HttpContext.User.FindFirst(ClaimTypes.Email).Value;
                var user = await _userService.GetUserInfo(email);

                if (user != null)
                {
                    return Ok(_mapper.Map<User, UserModel>(user));
                }
                else
                {
                    return BadRequest();
                }
            }
            catch
            {
                return BadRequest();
            }
        }

        // GET: API/Users/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var user = await _userService.GetUserInfo((int)id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<User, UserModel>(user));
        }

        // POST: API/Users
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Create(CreateUserModel user)
        {
            var userModel = await _userService.Create(_mapper.Map<CreateUserModel, User>(user));
            if (userModel == null)
            {
                return BadRequest();
            }
            return Created("Created", _mapper.Map<User, SuccessUserModel>(userModel));
        }

        // PUT: API/Users/Block/5
        [HttpPut("block")]
        public async Task<IActionResult> Block(BlockUserModel user)
        {
            var userModel = await _userService.Block(user);
            if (userModel == null)
            {
                return BadRequest();
            }
            return Created("Updated", _mapper.Map<User, UserBlockingStatusModel>(userModel));
        }

        // PUT: Users/Unblock/5
        [HttpPut("unblock/{id}")]
        public async Task<IActionResult> Unblock(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var userModel = await _userService.Unblock((int)id);
            if (userModel == null)
            {
                return BadRequest();
            }
            return Created("Updated", _mapper.Map<User, UserBlockingStatusModel>(userModel));
        }

        // POST: API/Users/Signout
        [HttpPost("signout")]
        [Authorize]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SignOut()
        {
            await HttpContext.SignOutAsync(JwtBearerDefaults.AuthenticationScheme);
            return Ok();
        }
    }
}
