using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Jalogycs.Models.Cliente
{
    public class ClienteModel
    {
        public string RazonSocialCliente { get; set; }
        public string PaisCliente { get; set; }
        public string TipoIdentificacionCliente { get; set; }
        public string NumeroIdentificacionCliente { get; set; }
        public object[] ContactoAsociadoCliente { get; set; }
        public object[] CaracteristicasCliente { get; set; }
        public object[] Proveedor { get; set; }

    }
}