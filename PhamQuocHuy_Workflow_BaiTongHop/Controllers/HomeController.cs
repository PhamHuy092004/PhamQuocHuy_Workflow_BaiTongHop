using Microsoft.AspNetCore.Mvc;
using PhamQuocHuy_Workflow_BaiTongHop.Models;
using System.Diagnostics;

namespace PhamQuocHuy_Workflow_BaiTongHop.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult List()
        {
            return View();
        }

        [HttpPost]
        public JsonResult AddUser([FromBody] Users user)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    StaticClass.AddUser(user);
                    return Json(new { success = true });
                    
                }
                else
                {
                    var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                    return Json(new { success = false, message = "Dữ liệu khoông hợp lệ", errors });
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }

        public JsonResult GetUsers()
        {
            List<Users> userList = StaticClass.GetUsers();
            return Json(userList);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
