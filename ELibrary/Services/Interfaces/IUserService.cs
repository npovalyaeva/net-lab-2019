using DataLayer.Entities;
using Models.ViewModels.User;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IUserService
    {
        Task<List<User>> GetBlockedUsers();
        Task<User> Authenticate(AuthenticationModel authenticationData);
        Task<bool> CheckIsLoginUnique(string login);
        Task<User> GetUserInfo(int id);
        Task<User> GetUserInfo(string email);
        Task<User> Create(User user);
        Task<User> Block(BlockUserModel user);
        Task<User> Unblock(int id);
    }
}
