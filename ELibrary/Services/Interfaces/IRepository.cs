using System;
using System.Collections.Generic;

namespace Services.Interfaces
{
    public interface IRepository<T> : IDisposable where T : class
    {
        List<T> GetAll();
        T Get(long id);
        void Create(T model);
        void Update(T model);
        void Delete(T model);
    }
}
