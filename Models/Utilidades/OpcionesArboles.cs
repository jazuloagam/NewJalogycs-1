using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Jalogycs.Models.Utilidades
{
    public class OpcionesArboles
    {
        public long id { get; set; }
        public string label { get; set; }
        public List<OpcionesArboles> children { get; set; }
    }
}