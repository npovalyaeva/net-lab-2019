using AutoMapper;
using DataLayer;
using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;
using Models.ViewModels.Author;
using Services.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Services
{
    public class AuthorService : IAuthorService
    {
        private readonly ELibraryContext _context;
        private readonly IMapper _mapper;

        public AuthorService(ELibraryContext context)
        {
            _context = context;

            var config = new MappingConfiguration().Configure();
            _mapper = config.CreateMapper();
        }

        public async Task<List<AuthorModel>> GetAuthors()
        {
            try
            {
                List<Author> authors = await _context.Author
                    .ToListAsync();
                if (authors == null)
                {
                    return null;
                }
                return _mapper.Map<List<Author>, List <AuthorModel>>(authors);
            }
            catch
            {
                return null;
            }
        }

        public async Task<AuthorModel> GetAuthorInfo(short id)
        {
            try
            {
                Author author = await _context.Author
                    .FirstOrDefaultAsync(m => m.AuthorId == id);
                if (author == null)
                {
                    return null;
                }
                return _mapper.Map<Author, AuthorModel>(author);
            }
            catch
            {
                return null;
            }
        }

        public async Task<SuccessAuthorModel> Create(CreateAuthorModel author)
        {
            if (author == null)
            {
                return null;
            }
            Author dbObject = _mapper.Map<CreateAuthorModel, Author>(author);
            _context.Author.Add(dbObject);
            await _context.SaveChangesAsync();

            return _mapper.Map<Author, SuccessAuthorModel>(dbObject);

        }
    }
}
