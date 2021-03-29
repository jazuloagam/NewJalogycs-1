using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Jalogycs.Controllers
{
    public class LogisticaController : Controller
    {
        // GET: Logistica
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult CrearDO()
        {
            return View();
        }
        public ActionResult CrearWarehouse()
        {
            return View();
        }
        public ActionResult AdjuntarWarehouse()
        {
            return View();
        }
    }
}