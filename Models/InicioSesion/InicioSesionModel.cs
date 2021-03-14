using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Jalogycs.Models.InicioSesion
{
    public class InicioSesionModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Correo { get; set; }
        public string Id { get; set; }
        public string IdNotificacion { get; set; }
    }
}