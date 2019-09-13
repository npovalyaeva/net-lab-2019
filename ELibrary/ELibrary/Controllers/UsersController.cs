using ELibrary.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Models.ViewModels.User;
using Services.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ELibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IConfiguration _configuration;
        private readonly IUserService _userService;

        public UsersController(IConfiguration configuration, IUserService userService)
        {
            _configuration = configuration;
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
        public async Task<IActionResult> Authenticate([FromBody] AuthenticationModel authenticationData)
        {
            var user = await _userService.Authenticate(authenticationData);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }










        //// GET: Users/Checking
        //[HttpGet("checking/{login}")]
        //public async Task<IActionResult> CheckLogin(string login)
        //{
        //    LoginModel loginModel = new LoginModel();
        //    loginModel.Login = login;

        //    var user = await _context.User
        //        .Where(m => m.Email == login || m.Username == login)
        //        .FirstOrDefaultAsync();

        //    loginModel.IsUnique = (user == null) ? true : false;

        //    return Ok(loginModel);
        //}


        //// GET: Users/Details/5
        //[HttpGet("details/{id}")]
        //public async Task<IActionResult> Details(int? id)
        //{
        //    if (id == null)
        //    {
        //        return NotFound();
        //    }

        //    var user = await _context.User
        //        .FirstOrDefaultAsync(m => m.UserId == id);

        //    if (user == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(_mapper.Map<User, UserModel>(user));
        //}

        //// POST: Users
        //[HttpPost]
        //public async Task<IActionResult> Create([FromBody] CreateUserModel user)
        //{
        //    var dbObject = _mapper.Map<CreateUserModel, User>(user);

        //    dbObject.PasswordHash = Hash.FindHash(user.Password);
        //    dbObject.RoleId = 1;
        //    dbObject.IsBlocked = false;

        //    if (ModelState.IsValid)
        //    {
        //        _context.Add(dbObject);
        //        await _context.SaveChangesAsync();
        //    }
        //    return CreatedAtAction(nameof(Details), new { id = dbObject.UserId }, _mapper.Map<User, SuccessUserModel>(dbObject));
        //}

        //// PUT: Users/Block/5
        //[HttpPut("block")]
        //public async Task<IActionResult> Block([FromBody] BlockUserModel user)
        //{
        //    var dbObject = await _context.User
        //        .FirstOrDefaultAsync(m => m.UserId == user.UserId);

        //    dbObject.BlockedReason = user.BlockingReason;
        //    dbObject.IsBlocked = true;
        //    _context.User.Update(dbObject);

        //    var reservations = await _context.Reservation
        //        .Where(m => m.UserId == user.UserId)
        //        .ToListAsync();
        //    foreach (var reservation in reservations)
        //    {
        //        var book = await _context.Book
        //            .FirstOrDefaultAsync(m => m.BookId == reservation.BookId);
        //        book.FreeCopiesCount++;
        //        _context.Book.Update(book);
        //        _context.Reservation.Remove(reservation);
        //    }
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction(nameof(Details), new { id = dbObject.UserId }, _mapper.Map<User, UserBlockingStatusModel>(dbObject));
        //}

        //// PUT: Users/Unblock/5
        //[HttpPut("unblock/{id}")]
        //public async Task<IActionResult> Unblock(int? id)
        //{
        //    if (id == null)
        //    {
        //        return NotFound();
        //    }
        //    var dbObject = await _context.User
        //        .FirstOrDefaultAsync(m => m.UserId == id);
            
        //    dbObject.BlockedReason = null;
        //    dbObject.IsBlocked = false;
        //    _context.User.Update(dbObject);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction(nameof(Details), new { id = dbObject.UserId }, _mapper.Map<User, UserBlockingStatusModel>(dbObject));
        //}
    }
}
