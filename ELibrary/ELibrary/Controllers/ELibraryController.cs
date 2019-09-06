using AutoMapper;
using ELibrary.Models;
using Microsoft.AspNetCore.Mvc;

namespace ELibrary.Controllers
{
    public class ELibraryController : Controller
    {
        protected readonly ELibraryContext _context;
        protected readonly IMapper _mapper;

        public ELibraryController(ELibraryContext context)
        {
            _context = context;

            var config = new MappingConfiguration().Configure();
            _mapper = config.CreateMapper();
        }
    }
}
