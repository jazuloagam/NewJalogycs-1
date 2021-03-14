using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Jalogycs.Models.Proveedor
{
    public class Proveedor
    {
        public string TipoProveedor { get; set; }
        public string ModoTransporte { get; set; }
        public string TipoDocumento { get; set; }
        public string NumeroDocumento { get; set; }
        public string RazonSocial { get; set; }
        public string Pais { get; set; }
        public string PaginaWeb { get; set; }
        public object[] Caracteristica { get; set; }
        public object[] Contacto { get; set; }
    }
}