﻿using AutoMapper;
using DataLayer;
using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;
using Models.ViewModels.Book;
using Services.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.Services
{
    public class BookService : IBookService
    {
        private readonly IRepository<Book> _bookRepository;

        public BookService(IRepository<Book> bookRepository)
        {
            _bookRepository = bookRepository;
        }

        public async Task<List<BookBriefInfoModel>> GetBooks()
        {
            try
            {
                List<Book> books = await _context.Book
                    .Include(b => b.Author)
                    .ToListAsync();
                if (books == null)
                {
                    return null;
                }
                return _mapper.Map<List<Book>, List<BookBriefInfoModel>>(books);
            }
            catch
            {
                return null;
            }
        }

        public async Task<List<BookBriefInfoModel>> GetFreeBooks()
        {
            try
            {
                List<Book> books = await _context.Book
                    .Include(b => b.Author)
                    .Where(m => m.FreeCopiesCount > 0)
                    .ToListAsync();
                if (books == null)
                {
                    return null;
                }
                return _mapper.Map<List<Book>, List<BookBriefInfoModel>>(books);
            }
            catch
            {
                return null;
            }
        }

        public async Task<List<BookBriefInfoModel>> GetBooksByAuthorLastName(string lastName)
        {
            if (string.IsNullOrEmpty(lastName))
            {
                return null;
            }

            try
            {
                List<Book> books = await _context.Book
                    .Include(b => b.Author)
                    .Where(m => m.Author.LastName == lastName)
                    .ToListAsync();
                if (books == null)
                {
                    return null;
                }
                return _mapper.Map<List<Book>, List<BookBriefInfoModel>>(books);
            }
            catch
            {
                return null;
            }
        }

        public async Task<List<BookBriefInfoModel>> GetBooksByTitle(string title)
        {
            if (string.IsNullOrEmpty(title))
            {
                return null;
            }

            try
            {
                List<Book> books = await _context.Book
                    .Include(b => b.Author)
                    .Where(m => m.Title == title)
                    .ToListAsync();
                if (books == null)
                {
                    return null;
                }
                return _mapper.Map<List<Book>, List<BookBriefInfoModel>>(books);
            }
            catch
            {
                return null;
            }

        }

        public async Task<List<BookBriefInfoModel>> GetBooksByYear(short year)
        {
            try
            {
                List<Book> books = await _context.Book
                    .Include(b => b.Author)
                    .Where(m => m.Year == year)
                    .ToListAsync();
                if (books == null)
                {
                    return null;
                }
                return _mapper.Map<List<Book>, List<BookBriefInfoModel>>(books);
            }
            catch
            {
                return null;
            }
        }


        public async Task<BookFullInfoModel> GetBookInfo(int id)
        {
            try
            {
                Book book = await _context.Book
                    .Include(b => b.Author)
                    .FirstOrDefaultAsync(m => m.BookId == id);
                if (book == null)
                {
                    return null;
                }
                return _mapper.Map<Book, BookFullInfoModel>(book);
            }
            catch
            {
                return null;
            }
        }

        public async Task<SuccessBookModel> Create(CreateBookModel book)
        {
            if (book == null)
            {
                return null;
            }

            try
            {
                Book dbObject = _mapper.Map<CreateBookModel, Book>(book);

                _context.Book.Add(dbObject);
                await _context.SaveChangesAsync();

                return _mapper.Map<Book, SuccessBookModel>(dbObject);
            }
            catch
            {
                return null;
            }
        }
    }
}
