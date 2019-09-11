﻿using DataLayer;
using DataLayer.Entities;
using Models.ViewModels.Author;
using Services.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Services
{
    public class AuthorService : ELibraryService, IAuthorService
    {
        public AuthorService(ELibraryContext context) : base(context) { }

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
                return _mapper.Map< List<Author>, List <AuthorModel>>(authors);
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

            await _context.Author.AddAsync(dbObject);
            await _context.Author.SaveChangesAsync();

            // TODO: Where is Id?
            return _mapper.Map<Author, SuccessAuthorModel>(dbObject);

        }
    }
}