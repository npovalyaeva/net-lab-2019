using Microsoft.AspNetCore.Mvc;

namespace ELibrary.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}