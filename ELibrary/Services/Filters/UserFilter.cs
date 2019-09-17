using DataLayer.Entities;
using System.Linq;

namespace Services.Filters
{
    public static class UserFilter
    {
        public static IQueryable<User> FilterByBlockingStatus(IQueryable<User> list, bool isBlocked)
        {
            return list.Where(m => m.IsBlocked == isBlocked);
        }
    }
}
