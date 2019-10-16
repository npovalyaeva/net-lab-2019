using DataLayer.Entities;

namespace Services.Interfaces
{
    public interface IJwtGenerator
    {
        string GenerateAccessToken(User user);
    }
}
