using AutoMapper;
using DataLayer;
using DataLayer.Entities;
using ELibrary.Data;
using Models.ViewModels.User;
using Services.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.Services
{
    public class UserService : IUserService
    {
        private readonly ELibraryContext _context;
        private readonly IMapper _mapper;

        public UserService(ELibraryContext context)
        {
            _context = context;

            var config = new MappingConfiguration().Configure();
            _mapper = config.CreateMapper();
        }

        public async Task<List<UserModel>> GetBlockedUsers()
        {
            try
            {
                var context = _context.User as IQueryable<List<User>>;

                var users = context
                    .Where(m => m.IsBlocked == true);
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
                var context = _context.User as IQueryable<User>;

                var user = context
                    .Where(m => (m.Email == authenticationData.Login || m.Username == authenticationData.Login))
                    .Where(m => (m.PasswordHash == Hash.FindHash(authenticationData.Password)))
                    .FirstOrDefault();
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
            if (user == null)
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
