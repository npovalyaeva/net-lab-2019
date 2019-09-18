using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IRepository<T> : IDisposable where T : class
    {
        IQueryable<T> GetAll();
        Task<T> Get(long id);
        Task Create(T model);
        Task Update(T model);
        Task Delete(T model);
    }
}
