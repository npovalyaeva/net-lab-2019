using AutoMapper;
using ELibrary.Data;
using ELibrary.Models;
using ELibrary.Models.ViewModels.User;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ELibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ELibraryController
    {
        public UsersController(ELibraryContext context) : base(context) { }

        // GET: Users/Blocked
        [HttpGet("blocked")]
        public async Task<IActionResult> GetBlockedUsers()
        {
            var users = await _context.User
                .Where(m => m.IsBlocked == true)
                .ToListAsync();

            if (users == null)
            {
                return NotFound();
            }

            return Json(_mapper.Map<List<User>, List<UserModel>>(users));
        }

        // GET: Users/Login
        [HttpGet("login")]
        public async Task<IActionResult> Login([FromBody] AuthorizationModel authorizationData)
        {
            var user = await _context.User
                .Where(m => (m.Email == authorizationData.Login || m.Username == authorizationData.Login))
                .Where(m => (m.PasswordHash == Hash.FindHash(authorizationData.Password)))
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound();
            }

            return Json(_mapper.Map<User, UserModel>(user));
        }

        // GET: Users/Checking
        [HttpGet("checking/{login}")]
        public async Task<IActionResult> Checking(string login)
        {
            LoginModel loginModel = new LoginModel();
            loginModel.Login = login;

            var user = await _context.User
                .Where(m => m.Email == login || m.Username == login)
                .FirstOrDefaultAsync();

            loginModel.IsUnique = (user == null) ? true : false;

            return Json(loginModel);
        }


        // GET: Users/Details/5
        [HttpGet("details/{id}")]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var user = await _context.User
                .FirstOrDefaultAsync(m => m.UserId == id);

            if (user == null)
            {
                return NotFound();
            }

            return Json(_mapper.Map<User, UserModel>(user));
        }

        // POST: Users/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost("create")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([FromBody] CreateUserModel user)
        {
            var dbObject = _mapper.Map<CreateUserModel, User>(user);

            dbObject.PasswordHash = Hash.FindHash(user.Password);
            dbObject.RoleId = 1;
            dbObject.IsBlocked = false;

            if (ModelState.IsValid)
            {
                _context.Add(dbObject);
                await _context.SaveChangesAsync();
            }
            return Json(_mapper.Map<User, SuccessUserModel>(dbObject));
        }

        // POST: Users/Block/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost("block")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Block([FromBody] BlockUserModel user)
        {
            var dbObject = await _context.User
                .FirstOrDefaultAsync(m => m.UserId == user.UserId);

            dbObject.BlockedReason = user.BlockingReason;
            dbObject.IsBlocked = true;
            _context.User.Update(dbObject);

            var reservations = await _context.Reservation
                .Where(m => m.UserId == user.UserId)
                .ToListAsync();
            foreach (var reservation in reservations)
            {
                var book = await _context.Book
                    .FirstOrDefaultAsync(m => m.BookId == reservation.BookId);
                book.FreeCopiesCount++;
                _context.Book.Update(book);
                _context.Reservation.Remove(reservation);
            }
            await _context.SaveChangesAsync();

            return Json(CreatedAtAction(nameof(Details), new { id = dbObject.UserId }, _mapper.Map<User, UserBlockingStatusModel>(dbObject)));
        }

        // POST: Users/Unblock/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost("unblock/{id}")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Unblock(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var dbObject = await _context.User
                .FirstOrDefaultAsync(m => m.UserId == id);
            
            dbObject.BlockedReason = null;
            dbObject.IsBlocked = false;
            _context.User.Update(dbObject);
            await _context.SaveChangesAsync();

            return Json(CreatedAtAction(nameof(Details), new { id = dbObject.UserId }, _mapper.Map<User, UserBlockingStatusModel>(dbObject)));
        }
    }
}
