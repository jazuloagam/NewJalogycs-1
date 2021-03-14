using ControlAcceso.BLL;
using ControlAcceso.Entidades;
using Jalogycs.Helpers;
using Jalogycs.Models.Usuario;
using Newtonsoft.Json;
using Pagos.Entidades;
using Personas.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Utilidades.BLL;
using Utilidades.Entidades;

namespace Jalogycs.Controllers
{
    [AllowAnonymous]
    public class UsuarioApiController : ApiController
    {
        [HttpPost]
        [ActionName("ObtenerPerfilUsuario")]
        public IHttpActionResult ObtenerPerfilUsuario()
        {
            var Retorno = new { Persona = SesionCtrl.PersonaActual, Usuario=SesionCtrl.UsuarioActual, Contrato=SesionCtrl.ContratoActual };
            return Json(JsonConvert.SerializeObject(Retorno));
        }
        [HttpPost]
        [ActionName("EditarPerfil")]
        public IHttpActionResult EditarPerfil(Perfil perfil)
        {
            bool isEditado = false;
            if(ControlAccesoBLL.EditarPerfilUsuario(new Usuario { IdUsuario = perfil.IdUsuario, IdPersona = perfil.IdPersona },
                new Persona { IdPersona = perfil.IdPersona, Telefono = perfil.Telefono, FechaNacimiento = perfil.FechaNacimiento },
                new Contrato { IdContrato = perfil.IdContrato, FechaIngreso = perfil.FechaIngreso, Cargo = perfil.Cargo }))
            {
                isEditado = true;
                SesionCtrl.PersonaActual.Telefono = perfil.Telefono;
                SesionCtrl.PersonaActual.FechaNacimiento = perfil.FechaNacimiento;
                SesionCtrl.ContratoActual.Cargo = perfil.Cargo;
                SesionCtrl.ContratoActual.FechaIngreso = perfil.FechaIngreso;
            }
            var Retorno = new
            {
                Respuesta = isEditado
            };
            return Json(JsonConvert.SerializeObject(Retorno));
        }
        [HttpPost]
        [ActionName("CargarDatosItems")]
        public IHttpActionResult CargarDatosItems()
        {
            List<Dominio> TramiteTipoMercancia = DominioBLL.ObtenerDominioPorTipoDominio(Convert.ToInt64(Utilidades.Entidades.Enumeraciones.TipoDominio.TramiteTipoMercancia),null);
            List<Dominio> ClaseTipoOperacion = DominioBLL.ObtenerDominioPorTipoDominio(Convert.ToInt64(Utilidades.Entidades.Enumeraciones.TipoDominio.TipoOperacion),null);
            var Retorno = new
            {
                TramiteTipoMercancia = TramiteTipoMercancia,
                ClaseTipoOperacion=ClaseTipoOperacion
            };
            return Json(JsonConvert.SerializeObject(Retorno));
        }
    }
}
