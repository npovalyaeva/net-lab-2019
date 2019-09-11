using DataLayer;
using DataLayer.Entities;
using ELibrary.Data;
using ELibrary.Services.Interfaces;
using Models.ViewModels.User;
using Services.Services;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ELibrary.Services.Services
{
    public class UserService : ELibraryService, IUserService
    {
        public UserService(ELibraryContext context) : base(context) { }

        public async Task<List<UserModel>> GetBlockedUsers()
        {
            try
            {
                List<User> users = await _context.User
                    .Where(m => m.IsBlocked == true)
                    .ToListAsync();
                if (users == null)
                {
                    return null;
                }
                return _mapper.Map<List<User>, List<UserModel>>(users);
            }
            catch
            {
                return null;
            }
        }

        public async Task<UserModel> Authenticate(AuthenticationModel authenticationData)
        {
            if (string.IsNullOrEmpty(authenticationData.Login) || string.IsNullOrEmpty(authenticationData.Password))
            {
                return null;
            }
            try
            {
                User user = await _context.User
                    .Where(m => (m.Email == authenticationData.Login || m.Username == authenticationData.Login))
                    .Where(m => (m.PasswordHash == Hash.FindHash(authenticationData.Password)))
                    .FirstOrDefaultAsync();
                if (user == null)
                {
                    return null;
                }
                return _mapper.Map<User, UserModel>(user);
            }
            catch
            {
                return null;
            }
        }

        public async Task<LoginModel> CheckIsLoginUnique(string login)
        {
            if (string.IsNullOrEmpty(login))
            {
                return null;
            }
            try
            {
                LoginModel loginModel = new LoginModel();
                loginModel.Login = login;

                User user = await _context.User
                    .Where(m => m.Email == login || m.Username == login)
                    .FirstOrDefaultAsync();

                loginModel.IsUnique = (user == null) ? true : false;
                return loginModel;
            }
            catch
            {
                return null;
            }

        }

        public async Task<UserModel> GetUserInfo(int id)
        {
            try
            {
                User user = await _context.User
                    .FirstOrDefaultAsync(m => m.UserId == id);
                if (user == null)
                {
                    return null;
                }
                return _mapper.Map<User, UserModel>(user);
            }
            catch
            {
                return null;
            }
        }

        public async Task<SuccessUserModel> Create(CreateUserModel user)
        {
            if (string.IsNullOrEmpty(user.Username) || string.IsNullOrEmpty(user.Email) || string.IsNullOrEmpty(user.Password) ||
                string.IsNullOrEmpty(user.FirstName) || string.IsNullOrEmpty(user.LastName))
            {
                return null;
            }

            bool isUserExists = await _context.User
                .AnyAsync(m => (m.Email = user.Email || user.Username == m.Username));

            if (isUserExists)
            {
                return null;
            }
            else
            {
                User dbObject = _mapper.Map<CreateUserModel, User>(user);

                dbObject.RoleId = 1;
                dbObject.PasswordHash = Hash.FindHash(user.Password);
                dbObject.IsBlocked = false;

                await _context.User.AddAsync(dbObject);
                await _context.User.SaveChangesAsync();

                // TODO: Where is Id?
                return _mapper.Map<User, SuccessUserModel>(dbObject);
            }

        }

        public async Task<UserBlockingStatusModel> Block(BlockUserModel user)
        {
            if (string.IsNullOrEmpty(user.BlockingReason))
            {
                return null;
            }
            try
            {
                User dbObject = await _context.User
                    .FirstOrDefaultAsync(m => m.UserId == user.UserId);

                if (dbObject == null)
                {
                    return null;
                }

                dbObject.BlockedReason = user.BlockingReason;
                dbObject.IsBlocked = true;

                await _context.User.UpdateAsync(dbObject);

                List<Reservation> reservations = await _context.Reservation
                    .Where(m => m.UserId == user.UserId)
                    .ToListAsync();
                foreach (var reservation in reservations)
                {
                    Book book = await _context.Book
                        .FirstOrDefaultAsync(m => m.BookId == reservation.BookId);
                    book.FreeCopiesCount++;
                    await _context.Book.UpdateAsync(book);
                    await _context.Reservation.RemoveAsync(reservation);
                }
                //             !!!!
                await _context.Book.SaveChangesAsync();

                return _mapper.Map<User, UserBlockingStatusModel>(dbObject);
            }
            catch
            {
                return null;
            }
        }

        public async Task<UserBlockingStatusModel> Unblock(int id)
        {
            try
            {
                User dbObject = await _context.User
                    .FirstOrDefaultAsync(m => m.UserId == id);
                
                if (dbObject == null)
                {
                    return null;
                }
                else
                {
                    dbObject.BlockedReason = null;
                    dbObject.IsBlocked = false;
                    await _context.User.UpdateAsync(dbObject);
                    await _context.User.SaveChangesAsync();

                    return _mapper.Map<User, UserBlockingStatusModel>(dbObject);
                }
            }
            catch
            {
                return null;
            }
        }
    }
}
