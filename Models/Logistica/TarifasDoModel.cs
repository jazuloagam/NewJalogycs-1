using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Web;

namespace Jalogycs.Models.Logistica
{
    public class TarifasDoModel
    {
        public long? IdTipoOperacion { get; set; }
        public long IdModoTransporte { get; set; }
        public long? IdTipoCarga { get; set; }
        public string IdPuertoOrigen { get; set; }
        public string IdPuertoDestino { get; set; }
        public long? IdIncoterm { get; set; }
        public string IdRazonSocial { get; set; }
        public object[] DatoTablaConceptoTarifa { get; set; }
        public object[] DatoTablaMensajeriaTarifa { get; set; }
        public object[] DatoTablaSeguroTarifa { get; set; }
        public object[] DatoTablaAdjuntoTarifa { get; set; }
        public object[] DatoTablaAdjuntoSeguro { get; set; }
        public int [] IdCaracteristicasMercancia { get; set; }
        public long? IdModalidad { get; set; }
        public string Lugarentrega { get; set; }
        public DateTime Vigencia { get; set; }
        public long? IdTipoMercancia { get; set; }
        public string Opcion { get; set; }

    }
}