using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Jalogycs.Models.Objetos
{
    public class ObjetoSeleccionable
    {
        public long Id { get; set; }
        public string Nombre { get; set; }
        public string ExpresionRegular { get; set; }
        public string MensajeValidacion { get; set; }


    }
}