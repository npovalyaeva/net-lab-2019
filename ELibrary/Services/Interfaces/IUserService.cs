using Models.ViewModels.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ELibrary.Services.Interfaces
{
    public interface IUserService
    {
        Task<List<UserModel>> GetBlockedUsers();
        Task<UserModel> Authenticate(AuthenticationModel authenticationData);
        Task<LoginModel> CheckIsLoginUnique(string login);
        Task<UserModel> GetUserInfo(int id);
        Task<SuccessUserModel> Create(CreateUserModel user);
        Task<UserBlockingStatusModel> Block(BlockUserModel user);
        Task<UserBlockingStatusModel> Unblock(int id);
    }
}
