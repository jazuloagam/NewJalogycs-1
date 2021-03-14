using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Jalogycs.Models.InicioSesion
{
    public class UsuarioModel
    {
        public string TipoDocumento { get; set; }
        public string NumeroDocumento { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string NombreUsuario { get; set; }
        public string Password { get; set; }
        public string RazonSocialCliente { get; set; }
        public string LicenciaUsuario { get; set; }
        public string Pais { get; set; }
        public string TipoUsuario { get; set; }
        public string Cargo { get; set; }
        public string Correo { get; set;}
        public long[] Opciones { get; set; }
        public int Tipo { get; set; }
    }
}