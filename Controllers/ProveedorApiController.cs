using Jalogycs.Models.Proveedor;
using Personas.BLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Jalogycs.Controllers
{
    public class ProveedorApiController : ApiController
    {
        [HttpPost]
        [ActionName("CrearProveedor")]
        public IHttpActionResult CrearProveedor(Proveedor modeloProveedor)
        {
            List<object> Contacto = modeloProveedor.Contacto.ToList();
            List<object> Caracteristica = modeloProveedor.Caracteristica.ToList();
            ProveedorBLL.CrearProveedor(modeloProveedor.TipoDocumento,modeloProveedor.TipoProveedor,
                modeloProveedor.ModoTransporte,modeloProveedor.NumeroDocumento,
                modeloProveedor.RazonSocial,modeloProveedor.Pais,modeloProveedor.PaginaWeb,
                Caracteristica,Contacto);
            return Json("");
        }
    }
}
