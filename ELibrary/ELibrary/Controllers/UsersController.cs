using Microsoft.AspNetCore.Mvc;
using Models.ViewModels.User;
using Services.Interfaces;
using System.Threading.Tasks;

namespace ELibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        // GET: API/Users/Blocked
        [HttpGet("blocked")]
        public async Task<IActionResult> GetBlockedUsers()
        {
            var users = await _userService.GetBlockedUsers();
            if (users == null)
            {
                return NotFound();
            }
            return Ok(users);
        }

        // GET: API/Users/Login
        [HttpGet("login")]
        public async Task<IActionResult> Authenticate(AuthenticationModel authenticationData)
        {
            var user = await _userService.Authenticate(authenticationData);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // GET: API/Users/Checking
        [HttpGet("checking/{login}")]
        public async Task<IActionResult> CheckLogin(string login)
        {
            var loginModel = await _userService.CheckIsLoginUnique(login);
            return Ok(loginModel);
        }

        // GET: API/Users/5
        [HttpGet("details/{id}")]
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
            return Ok(user);
        }

        // POST: API/Users
        [HttpPost]
        public async Task<IActionResult> Create(CreateUserModel user)
        {
            var userModel = await _userService.Create(user);
            if (userModel == null)
            {
                return BadRequest();
            }
            return Created("Created", userModel);
        }

        // PUT: API/Users/Block/5

        // TODO: Review

        [HttpPut("block")]
        public async Task<IActionResult> Block(BlockUserModel user)
        {
            var userModel = await _userService.Block(user);
            if (userModel == null)
            {
                return BadRequest();
            }
            return Created("Updated", userModel);
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
            return Created("Updated", userModel);
        }
    }
}
