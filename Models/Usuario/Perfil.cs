using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Jalogycs.Models.Usuario
{
    public class Perfil
    {
        public string Cargo { get; set; }
        public string Telefono { get; set; }
        public DateTime FechaIngreso { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public long IdUsuario { get; set; }
        public long IdPersona { get; set; }
        public long IdContrato { get; set; }
    }
}