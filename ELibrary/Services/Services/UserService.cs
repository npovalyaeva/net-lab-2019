using AutoMapper;
using DataLayer;
using DataLayer.Entities;
using ELibrary.Data;
using Microsoft.EntityFrameworkCore;
using Models.ViewModels.User;
using Services.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.Services
{
    public class UserService : IUserService
    {
        private readonly IRepository<Book> _bookRepository;
        private readonly IRepository<Reservation> _reservationRepository;
        private readonly IRepository<User> _userRepository;

        public UserService(IRepository<Book> bookRepository, IRepository<Reservation> reservationRepository, IRepository<User> userRepository)
        {
            _bookRepository = bookRepository;
            _reservationRepository = reservationRepository;
            _userRepository = userRepository;
        }

        public async Task<List<User>> GetBlockedUsers()
        {
            try
            {
                var dbList = await _userRepository.GetAll();
                var users = dbList.Where(m => m.IsBlocked == true);
                if (users == null)
                {
                    return null;
                }
                return users as List<User>;
            }
            catch
            {
                return null;
            }
        }

        public async Task<User> Authenticate(AuthenticationModel authenticationData)
        {
            if (string.IsNullOrEmpty(authenticationData.Login) || string.IsNullOrEmpty(authenticationData.Password))
            {
                return null;
            }
            try
            {
                var dbList = await _userRepository.GetAll();
                var users = dbList.Where(m => m.Email == authenticationData.Login || m.Username == authenticationData.Login)
                    .Where(m => m.PasswordHash == Hash.FindHash(authenticationData.Password));
                if (users == null)
                {
                    return null;
                }
                return (users as List<User>)[0];
            }
            catch
            {
                return null;
            }
        }

        public async Task<bool> CheckIsLoginUnique(string login)
        {
            if (string.IsNullOrEmpty(login))
            {
                return false;
            }
            try
            {
                var dbList = await _userRepository.GetAll();
                var users = dbList.Where(m => m.Email == login || m.Username == login);
                return (users == null) ? true : false;
            }
            catch
            {
                return false;
            }

        }

        public async Task<User> GetUserInfo(int id)
        {
            try
            {
                var user = await _userRepository.Get(id);
                if (user == null)
                {
                    return null;
                }
                return user;
            }
            catch
            {
                return null;
            }
        }

        public async Task<User> Create(User user)
        {
            if (user == null)
            {
                return null;
            }
            var isUnique = await CheckIsLoginUnique(user.Email) && await CheckIsLoginUnique(user.Username);

            if (!isUnique)
            {
                return null;
            }
            else
            {
                user.RoleId = 1;
                user.PasswordHash = Hash.FindHash(user.PasswordHash);
                user.IsBlocked = false;
                await _userRepository.Create(user);
                return user;
            }

        }

        public async Task<User> Block(BlockUserModel user)
        {
            if (string.IsNullOrEmpty(user.BlockingReason))
            {
                return null;
            }
            try
            {
                var dbObject = await _userRepository.Get(user.UserId);

                if (dbObject == null)
                {
                    return null;
                }

                dbObject.BlockedReason = user.BlockingReason;
                dbObject.IsBlocked = true;

                await _userRepository.Update(dbObject);

                var dbReservationsList = await _reservationRepository.GetAll();
                var reservations = dbReservationsList.Where(m => m.UserId == user.UserId);

                foreach (var reservation in reservations)
                {
                    Book book = await _bookRepository.Get(reservation.BookId);
                    book.FreeCopiesCount++;
                    await _bookRepository.Update(book);
                    await _reservationRepository.Delete(reservation);
                }

                return dbObject;
            }
            catch
            {
                return null;
            }
        }

        public async Task<User> Unblock(int id)
        {
            try
            {
                User dbObject = await _userRepository.Get(id);            
                if (dbObject == null)
                {
                    return null;
                }
                else
                {
                    dbObject.BlockedReason = null;
                    dbObject.IsBlocked = false;
                    await _userRepository.Update(dbObject);

                    return dbObject;
                }
            }
            catch
            {
                return null;
            }
        }
    }
}
