using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using ControlAcceso.BLL;
using ControlAcceso.Entidades;
using Jalogycs.Helpers;
using Jalogycs.Models.InicioSesion;
using Notificaciones.BLL;
using Notificaciones.Entidades;
using Pagos.Entidades;
using Personas.Entidades;
using Utilidades.Entidades;

namespace Jalogycs.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Inicio(InicioSesionModel model)
        {
            return View();
        }

        public ActionResult OlvideUsuario()
        {
            return View();
        }
        public ActionResult Registro()
        {
            return View();
        }
        public ActionResult RecuperarContrasenia(RecuperarContraseña recuperarContraseña)
        {
            if (recuperarContraseña.Id != null)
            {
                try
                {
                    Guid Id = new Guid(recuperarContraseña.Id);
                    Tuple<Notificacion, List<Usuario>, List<Persona>> resultado = NotificacionesBLL<InterCorreo>.ObtenerNotificacionPorIdYEstado(Id, Convert.ToInt64(Notificaciones.Entidades.Enumeraciones.EstadoNotificacion.EnVigencia));
                    if (resultado.Item1.Correo != null)
                    {
                        if (resultado.Item1.FechaVigencia <= DateTime.Now)
                        {
                            return RedirectToAction("Index");
                        }
                        else
                        {
                            SesionCtrl.NotificacionOlvideUsuario = resultado.Item1;
                            SesionCtrl.UsuariosOlvideUsuario = UsuarioBLL.CompletarUsuarioPorPersona(resultado.Item2, resultado.Item3);
                            return View();
                        }
                    }
                    else
                    {
                        return RedirectToAction("Index");
                    }
                }
                catch (Exception)
                {
                    return RedirectToAction("Index");
                }

            }
            else
            {
                return RedirectToAction("Index");
            }

        }
        public ActionResult CrearUsuario(Licencia licencia)
        {
            return ObtenerLicencia(licencia);
        }
        public ActionResult ActivarUsuario(Licencia licencia)
        {
            return ObtenerLicencia(licencia);
        }
        public ActionResult ObtenerLicencia(Licencia licencia)
        {
            try
            {
                if (licencia.Id != null)
                {
                    Guid Id = new Guid(licencia.Id);
                    LicenciaUsuario Lic = UsuarioBLL.ObtenerLicencia(Id);
                    if (Lic != null)
                    {
                        SesionCtrl.LicenciaCrearUsuario = Lic;
                        return View();
                    }
                    else
                    {
                        return RedirectToAction("Index");
                    }
                }
                else
                {
                    return RedirectToAction("Index");
                }
            }
            catch (Exception e)
            {
                return RedirectToAction("Index");
            }
        }

    }
}