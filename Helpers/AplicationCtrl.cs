using Logistica.Entidades;
using Personas.Entidades;
using Utilidades.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Jalogycs.Models.Objetos;

namespace Jalogycs.Helpers
{
    public class AplicationCtrl
    {
        public static List<TipoDocumento> TiposDocumento { get; set; }
        public static List<Pais> Paises { get; set; }
        public static List<Puerto> Puertos { get; set; }
        public static List<Ciudad> Ciudades { get; set; }
        //public static List<Incoterm> Incoterm { get; set; }
        public static List<dynamic> Matriz { get; set; }
        public static List<Dominio> TipoOperacion { get; set; }
        public static List<Dominio> TipoCarga { get; set; }
        public static List<Dominio> Modalidad { get; set; }
        public static List<Dominio> ModoTransporte { get; set; }
        public static List<Dominio> Incoterm { get; set; }        
        public static List<Dominio> TipoProveedor { get; set; }
        public static List<Dominio> RazonSocial { get; set; }
        public static List<Dominio> Item { get; set; }
        public static List<Dominio> Caracteristicasmercancia { get; set; }
        public static List<Dominio> RubroCotizacion { get; set; }
        public static List<Dominio> TipoMercancia { get; set; }
        public static List<Dominio> TipoContenedor { get; set; }
        public static List<Dominio> Moneda { get; set; }
        public static List<Dominio> TrayectoAsegurado { get; set; }
        public static List<Dominio> ItemMensajeria { get; set; }
        public static List<Dominio> RateClassCode { get; set; }
        public static List<Dominio> FactorEstiba { get; set; }
        public static List<Dominio> UndmedidaDistancia { get; set; }
        public static List<Dominio> UndmedidaVolumen { get; set; }
        public static List<Dominio> UndmedidaPeso { get; set; }
        public static List<Dominio> TipoEmbalaje { get; set; }
        public static List<Dominio> LugarBodega { get; set; }
        public static List<Dominio> TipoDocumento { get; set; }
        public static List<Dominio> UN { get; set; }
        public static List<Dominio> TipoDocumentoArchivo { get; set; }
        public static List<Cliente> Exportador { get; set; }
        public static List<Cliente> Importador { get; set; }

        public static List<ObjetoSeleccionable> ImprimirAplicationCtrl(List<Dominio> seleccion) {

            List<ObjetoSeleccionable> seleccionable = new List<ObjetoSeleccionable>();
            foreach (Dominio variable in seleccion) {
                seleccionable.Add(new ObjetoSeleccionable { Id = variable.idprograma, Nombre = variable.nombre });

            }
            return seleccionable;
        }
    }

}