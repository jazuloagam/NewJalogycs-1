using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Jalogycs.Models.Objetos
{
    public class ObjetoAutocomplete
    {
        public long id { get; set; }
        public string value { get; set; }
        public string OpcionParametro { get; set; }
        public object objeto { get; set; }
    }
}