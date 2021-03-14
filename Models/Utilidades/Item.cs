using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Jalogycs.Models.Utilidades
{
    public class Item
    {
        public string codigo { get; set; }
        public string nombre { get; set; }
        public string tramite { get; set; }
        public string otroTramite { get; set; }
        public string claseTipoOperacion { get; set; }
        public string tipoEquipo { get; set; }
        public string codigoTipoEquipo { get; set; }
        public string tamanioEquipo { get; set; }
        public string codigoTamanioEquipo { get; set; }
        public string tipoPermiso { get; set; }
        public string codigoTipoPermiso { get; set; }
        public string entidadPermiso { get; set; }
        public string codigoEntidadPermiso { get; set; }
        public string comentario { get; set; }

    }
}