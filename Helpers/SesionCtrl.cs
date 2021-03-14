using ControlAcceso.Entidades;
using Notificaciones.Entidades;
using Pagos.Entidades;
using Personas.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace Jalogycs.Helpers
{
    public class SesionCtrl
    {
        private static HttpSessionState Sesion = HttpContext.Current.Session;
        public static List<Modulo> OpcionUsuario
        {            
            get
            {
                return (List<Modulo>)Sesion["OpcionesUsuario"];
            }
            set
            {
                Sesion["OpcionesUsuario"] = value;
            }
        }
        public static Usuario UsuarioActual
        {
            get
            {
                return (Usuario)Sesion["UsuarioActual"];
            }
            set
            {
                Sesion["UsuarioActual"] = value;
            }
        }
        public static Contrato ContratoActual
        {
            get
            {
                return (Contrato)Sesion["ContratoActual"];
            }
            set
            {
                Sesion["ContratoActual"] = value;
            }
        }
        public static CuentaCliente CuentaActual
        {
            get
            {
                return (CuentaCliente)Sesion["CuentaActual"];
            }
            set
            {
                Sesion["CuentaActual"] = value;
            }
        }
        public static Persona PersonaActual
        {
            get
            {
                return (Persona)Sesion["PersonaActual"];
            }
            set
            {
                Sesion["PersonaActual"] = value;
            }
        }
        public static List<Cliente> ClientesCuentaActual
        {
            get
            {
                return (List<Cliente>)Sesion["ClientesCuentaActual"];
            }
            set
            {
                Sesion["ClientesCuentaActual"] = value;
            }
        }
        public static Notificacion NotificacionOlvideUsuario
        {
            get
            {
                return (Notificacion)Sesion["NotificacionOlvideUsuario"];
            }
            set
            {
                Sesion["NotificacionOlvideUsuario"] = value;
            }
        }
        public static List<Usuario> UsuariosOlvideUsuario
        {
            get
            {
                return (List<Usuario>)Sesion["UsuariosOlvideUsuario"];
            }
            set
            {
                Sesion["UsuariosOlvideUsuario"] = value;
            }
        }
        public static List<Persona> PersonasOlvideUsuario
        {
            get
            {
                return (List<Persona>)Sesion["PersonasOlvideUsuario"];
            }
            set
            {
                Sesion["PersonasOlvideUsuario"] = value;
            }
        }
        public static LicenciaUsuario LicenciaCrearUsuario
        {
            get
            {
                return (LicenciaUsuario)Sesion["LicenciaCrearUsuario"];
            }
            set
            {
                Sesion["LicenciaCrearUsuario"] = value;
            }
        }
        public static List<TipoUsuario> OpcionTipoUsuario
        {   
            get
            {
                return (List<TipoUsuario>)Sesion["OpcionTipoUsuario"];
            }
            set
            {
                Sesion["OpcionTipoUsuario"] = value;
            }
        }

    }
}