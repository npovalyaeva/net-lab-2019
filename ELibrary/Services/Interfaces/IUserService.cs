using Models.ViewModels.User;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Interfaces
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
