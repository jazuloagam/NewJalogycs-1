using Jalogycs.Models.Utilidades;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Utilidades.BLL;

namespace Jalogycs.Controllers
{
    public class UtilidadesApiController : ApiController
    {
        [HttpPost]
        [ActionName("CrearTipoMercancia")]
        public IHttpActionResult CrearTipoMercancia(Item item)
        {
            DominioBLL.CrearTipoMercancia(item.tramite,item.otroTramite,item.nombre,item.codigo);
            return Json("");
        }
        [HttpPost]
        [ActionName("CrearDisposicionCarga")]
        public IHttpActionResult CrearDisposicionCarga(Item item)
        {
            DominioBLL.CrearDisposicionCarga(item.nombre, item.codigo);
            return Json("");
        }
        [HttpPost]
        [ActionName("CrearTipoOperacion")]
        public IHttpActionResult CrearTipoOperacion(Item item)
        {
            DominioBLL.CrearTipoOperacion(item.claseTipoOperacion, item.nombre, item.codigo);
            return Json("");
        }
        [HttpPost]
        [ActionName("CrearTipoEmbalaje")]
        public IHttpActionResult CrearTipoEmbalaje(Item item)
        {
            DominioBLL.CrearTipoEmbalaje(item.nombre, item.codigo);
            return Json("");
        }
        [HttpPost]
        [ActionName("CrearTipoContenedor")]
        public IHttpActionResult CrearTipoContenedor(Item item)
        {
            DominioBLL.CrearTipoContenedor(item.tipoEquipo, item.codigoTipoEquipo, item.tamanioEquipo, item.codigoTamanioEquipo);
            return Json("");
        }
        [HttpPost]
        [ActionName("CrearTipoVehiculo")]
        public IHttpActionResult CrearTipoVehiculo(Item item)
        {
            DominioBLL.CrearTipoVehiculo(item.nombre, item.codigo);
            return Json("");
        }
        [HttpPost]
        [ActionName("CrearTipoDocumento")]
        public IHttpActionResult CrearTipoDocumento(Item item)
        {
            DominioBLL.CrearTipoDocumento(item.tipoPermiso, item.codigoTipoPermiso, item.entidadPermiso, item.codigoEntidadPermiso, item.comentario);
            return Json("");
        }
    }
}
