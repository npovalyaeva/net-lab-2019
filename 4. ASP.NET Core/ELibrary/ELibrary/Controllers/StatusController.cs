using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Status.Commands;
using Status.Data;
using Status.Handlers;

namespace ELibrary.Controllers
{
    [Route("api/[controller]")]
    public class StatusController : Controller
    {
        [HttpGet("GetAllStatuses")]
        public IEnumerable<Status.Model.Status> GetAllBooks()
        {
            StatusContext context = HttpContext.RequestServices.GetService(typeof(StatusContext)) as StatusContext;
            GetAllStatusesHandler handler = new GetAllStatusesHandler(context);
            return handler.Handle();
        }
    }
}
