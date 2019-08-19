using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Book.Commands;
using Book.Data;
using Book.Handlers;
using Book.Model;

namespace ELibrary.Controllers
{
    [Route("api/[controller]")]
    public class BookController : Controller
    {
        [HttpPost]
        public bool CreateBook([FromBody] CreateBookCommand request)
        {
            BookContext context = HttpContext.RequestServices.GetService(typeof(BookContext)) as BookContext;
            CreateBookHandler handler = new CreateBookHandler(context);
            return handler.Handle(request);
        }

        [HttpGet("GetAllBooks")]
        public IEnumerable<Book.Model.Book> GetAllBooks()
        {
            BookContext context = HttpContext.RequestServices.GetService(typeof(BookContext)) as BookContext;
            GetAllBooksHandler handler = new GetAllBooksHandler(context);
            return handler.Handle();
        }

        [HttpGet("GetFreeBooks")]
        public IEnumerable<Book.Model.Book> GetFreeBooks()
        {
            BookContext context = HttpContext.RequestServices.GetService(typeof(BookContext)) as BookContext;
            GetFreeBooksHandler handler = new GetFreeBooksHandler(context);
            return handler.Handle();
        }

        [HttpGet("GetBooksByAuthorLastName")]
        public IEnumerable<Book.Model.Book> GetBooksByAuthorLastName(string title)
        {
            BookContext context = HttpContext.RequestServices.GetService(typeof(BookContext)) as BookContext;
            GetBooksByAuthorLastNameHandler handler = new GetBooksByAuthorLastNameHandler(context);
            return handler.Handle(title);
        }

        [HttpGet("GetBooksByTitle")]
        public IEnumerable<Book.Model.Book> GetBooksByTitle(string title)
        {
            BookContext context = HttpContext.RequestServices.GetService(typeof(BookContext)) as BookContext;
            GetBooksByTitleHandler handler = new GetBooksByTitleHandler(context);
            return handler.Handle(title);
        }

        [HttpGet("GetBooksByYear")]
        public IEnumerable<Book.Model.Book> GetBooksByYear(int year)
        {
            BookContext context = HttpContext.RequestServices.GetService(typeof(BookContext)) as BookContext;
            GetBooksByYearHandler handler = new GetBooksByYearHandler(context);
            return handler.Handle(year);
        }
    }
}