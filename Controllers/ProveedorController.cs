using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Jalogycs.Controllers
{
    public class ProveedorController : Controller
    {
        // GET: Proveedor
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult CrearProveedor()
        {
            return View();
        }
        public ActionResult CrearTarifaProveedor()
        {
            return View();
        }
    }
}