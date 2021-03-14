using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Web;

namespace Jalogycs.Models.Logistica
{
    public class DoModel
    {
        public long? IdCliente { get; set; }
        public long? IdTipoOperacion { get; set; }
        public long? IdModoTransporte { get; set; }
        public long? IdFactorEstiba { get; set; }
        public long? IdTipoCarga { get; set; }
        public long? IdPuertoOrigen { get; set; }
        public long? IdPuertoDestino { get; set; }
        public string Numero { get; set; }
        public long? IdIncoterm { get; set; }
        public string EntregaIncoterm { get; set; }
        public int IdTipoMatriz { get; set; }
        public long? IdRazonSocial { get; set; }
        public long? IdTipoProveedor { get; set; }
        public long? IdVisualizacion { get; set; }
        public long? IdItem { get; set; }
        public long? IdItemMensajeria { get; set; }
        public int []IdTipoMatrizMultiple { get; set; }
        public long? IdCaracteristicasmercancia { get; set; }
    }
}