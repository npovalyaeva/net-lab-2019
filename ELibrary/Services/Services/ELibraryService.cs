using AutoMapper;
using DataLayer;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Services
{
    public class ELibraryService
    {
        protected readonly ELibraryContext _context;
        protected readonly IMapper _mapper;

        public ELibraryService(ELibraryContext context)
        {
            _context = context;

            var config = new MappingConfiguration().Configure();
            _mapper = config.CreateMapper();
        }
    }
}
