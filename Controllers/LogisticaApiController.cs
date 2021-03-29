using Jalogycs.Helpers;
using Jalogycs.Models.Logistica;
using Jalogycs.Models.Objetos;
using Logistica.BLL;
using Logistica.Entidades;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Utilidades.BLL;
using Personas.Entidades;
using Utilidades.Entidades;
using System.Security.Cryptography.X509Certificates;

namespace Jalogycs.Controllers
{
    public class LogisticaApiController : ApiController
    {
        //[HttpPost]
        //[ActionName("CrearDo")]
        //public IHttpActionResult CrearDo(DoModel modelo)
        //{
        //    return Json(JsonConvert.SerializeObject(DOBLL.CrearDo(modelo.IdCliente,modelo.IdModoTransporte,
        //        modelo.IdTipoOperacion,modelo.IdModoTransporte,modelo.IdFactorEstiba,modelo.IdTipoCarga,
        //        modelo.IdPuertoOrigen,modelo.IdPuertoDestino,modelo.Numero,modelo.IdIncoterm,modelo.EntregaIncoterm)));
        //}
        //[HttpPost]
        //[ActionName("ObtenerIncotermPorTransporte")]
        //public IHttpActionResult ObtenerIncotermPorTransporte(DoModel modelo)
        //{
        //    //List<ObjetoSeleccionable> seleccionable = new List<ObjetoSeleccionable>();
        //    //foreach (Incoterm incoterm in DOBLL.ObtenerIncotermPorTransporte(AplicationCtrl.Incoterm, modelo.IdModoTransporte))
        //    //{
        //    //    seleccionable.Add(new ObjetoSeleccionable { Id = incoterm.idincoterm, Nombre = incoterm.codigo, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
        //    //}
        //    //dynamic Retorno = new
        //    //{
        //    //    ObjetoSeleccionable = seleccionable
        //    //};
        //    //return Json(JsonConvert.SerializeObject(Retorno));
        //}

        [HttpPost]
        [ActionName("ObtenerModalidadTransporteTipoOperacion")]
        public IHttpActionResult ObtenerModalidadTransporteTipoOperacion(DoModel modelo)
        {
            List<dynamic> matrizfiltrada = AplicationCtrl.Matriz.Where(x => x.idorigen == modelo.IdTipoOperacion && x.tipo == modelo.IdTipoMatriz).ToList();
            List<ObjetoSeleccionable> seleccionable = new List<ObjetoSeleccionable>();
            foreach(dynamic filtro in matrizfiltrada)
            {
                seleccionable.Add(new ObjetoSeleccionable { Id = AplicationCtrl.Modalidad.SingleOrDefault(x => x.idprograma == filtro.iddestino).idprograma, Nombre = AplicationCtrl.Modalidad.SingleOrDefault(x => x.idprograma == filtro.iddestino).nombre, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
            }
            dynamic Retorno = new
            {
                ObjetoSeleccionable = seleccionable
               
            };
            return Json(JsonConvert.SerializeObject(Retorno));
        }



        [HttpPost]
        [ActionName("Obtenertipoproveedorrazonsocial")]
        public IHttpActionResult Obtenertipoproveedorrazonsocial(DoModel modelo)
        {
            List<dynamic> matrizfiltrada = AplicationCtrl.Matriz.Where(x => x.idorigen == modelo.IdRazonSocial && x.tipo == modelo.IdTipoMatriz).ToList();
            List<ObjetoAutocomplete> objeto = new List<ObjetoAutocomplete>();
            foreach (dynamic filtro in matrizfiltrada)
            {
                objeto.Add(new ObjetoAutocomplete { id = AplicationCtrl.TipoProveedor.SingleOrDefault(x => x.idprograma == filtro.iddestino).idprograma, value = AplicationCtrl.TipoProveedor.SingleOrDefault(x => x.idprograma == filtro.iddestino).nombre, objeto = AplicationCtrl.TipoProveedor });
            }
            dynamic Retorno = new
            {
                ObjetoAutocomplete = objeto,

            };
            return Json(JsonConvert.SerializeObject(Retorno));
        }


        [HttpPost]
        [ActionName("Obtenertipoproveedormodotransporte")]
        public IHttpActionResult Obtenertipoproveedormodotransporte(DoModel modelo)
        {
            List<dynamic> matrizfiltrada = AplicationCtrl.Matriz.Where(x => x.idorigen == modelo.IdTipoProveedor && x.tipo == modelo.IdTipoMatriz).ToList();
            List < ObjetoSeleccionable > seleccionable = new List<ObjetoSeleccionable>();
            foreach (dynamic filtro in matrizfiltrada)
            {
                seleccionable.Add(new ObjetoSeleccionable { Id = AplicationCtrl.ModoTransporte.SingleOrDefault(x => x.idprograma == filtro.iddestino).idprograma, Nombre = AplicationCtrl.ModoTransporte.SingleOrDefault(x => x.idprograma == filtro.iddestino).nombre, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
            }
            dynamic Retorno = new
            {
                ObjetoSeleccionable = seleccionable

            };
            return Json(JsonConvert.SerializeObject(Retorno));
        }

        [HttpPost]
        [ActionName("Obtenertipoproveedorincoterm")]
        public IHttpActionResult Obtenertipoproveedorincoterm(DoModel modelo)
        {
            List<dynamic> matrizfiltrada = AplicationCtrl.Matriz.Where(x => x.idorigen == modelo.IdTipoProveedor && x.tipo == modelo.IdTipoMatriz).ToList();
            List<ObjetoSeleccionable> seleccionable = new List<ObjetoSeleccionable>();
            foreach (dynamic filtro in matrizfiltrada)
            {
                seleccionable.Add(new ObjetoSeleccionable { Id = AplicationCtrl.Incoterm.SingleOrDefault(x => x.idprograma == filtro.iddestino).idprograma, Nombre = AplicationCtrl.Incoterm.SingleOrDefault(x => x.idprograma == filtro.iddestino).nombre, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
            }
            dynamic Retorno = new
            {
                ObjetoSeleccionable = seleccionable

            };
            return Json(JsonConvert.SerializeObject(Retorno));
        }
        [HttpPost]
        [ActionName("Obtenertipoproveedortipooperacion")]
        public IHttpActionResult Obtenertipoproveedortipooperacion(DoModel modelo)
        {
            List<dynamic> matrizfiltrada = AplicationCtrl.Matriz.Where(x => x.idorigen == modelo.IdTipoProveedor && x.tipo == modelo.IdTipoMatriz).ToList();
            List<ObjetoSeleccionable> seleccionable = new List<ObjetoSeleccionable>();
            foreach (dynamic filtro in matrizfiltrada)
            {
                seleccionable.Add(new ObjetoSeleccionable { Id = AplicationCtrl.TipoOperacion.SingleOrDefault(x => x.idprograma == filtro.iddestino).idprograma, Nombre = AplicationCtrl.TipoOperacion.SingleOrDefault(x => x.idprograma == filtro.iddestino).nombre, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
            }
            dynamic Retorno = new
            {
                ObjetoSeleccionable = seleccionable

            };
            return Json(JsonConvert.SerializeObject(Retorno));
        }

        [HttpPost]
        [ActionName("Obtenertipoproveedortipocarga")]
        public IHttpActionResult Obtenertipoproveedortipocarga(DoModel modelo)
        {
            List<dynamic> matrizfiltrada = AplicationCtrl.Matriz.Where(x => x.idorigen == modelo.IdTipoProveedor && x.tipo == modelo.IdTipoMatriz).ToList();
            List<ObjetoSeleccionable> seleccionable = new List<ObjetoSeleccionable>();
            foreach (dynamic filtro in matrizfiltrada)
            {
                seleccionable.Add(new ObjetoSeleccionable { Id = AplicationCtrl.TipoCarga.SingleOrDefault(x => x.idprograma == filtro.iddestino).idprograma, Nombre = AplicationCtrl.TipoCarga.SingleOrDefault(x => x.idprograma == filtro.iddestino).nombre, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
            }
            dynamic Retorno = new
            {
                ObjetoSeleccionable = seleccionable

            };
            return Json(JsonConvert.SerializeObject(Retorno));
        }

        [HttpPost]
        [ActionName("Obtenermodotransportetipocarga")]
        public IHttpActionResult Obtenermodotransportetipocarga(DoModel modelo)
        {
            List<dynamic> matrizfiltrada = AplicationCtrl.Matriz.Where(x => x.idorigen == modelo.IdModoTransporte && x.tipo == modelo.IdTipoMatriz).ToList();
            List<ObjetoSeleccionable> seleccionable = new List<ObjetoSeleccionable>();
            foreach (dynamic filtro in matrizfiltrada)
            {
                seleccionable.Add(new ObjetoSeleccionable { Id = AplicationCtrl.TipoCarga.SingleOrDefault(x => x.idprograma == filtro.iddestino).idprograma, Nombre = AplicationCtrl.TipoCarga.SingleOrDefault(x => x.idprograma == filtro.iddestino).nombre, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
            }
            dynamic Retorno = new
            {
                ObjetoSeleccionable = seleccionable

            };
            return Json(JsonConvert.SerializeObject(Retorno));
        }

        [HttpPost]
        [ActionName("Obtenermodotransporteincoterm")]
        public IHttpActionResult Obtenermodotransporteincoterm(DoModel modelo)
        {
            List<dynamic> matrizfiltrada = AplicationCtrl.Matriz.Where(x => x.idorigen == modelo.IdModoTransporte && x.tipo == modelo.IdTipoMatriz).ToList();
            List<ObjetoSeleccionable> seleccionable = new List<ObjetoSeleccionable>();
            foreach (dynamic filtro in matrizfiltrada)
            {
                seleccionable.Add(new ObjetoSeleccionable { Id = AplicationCtrl.Incoterm.SingleOrDefault(x => x.idprograma == filtro.iddestino).idprograma, Nombre = AplicationCtrl.Incoterm.SingleOrDefault(x => x.idprograma == filtro.iddestino).nombre, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
            }
            dynamic Retorno = new
            {
                ObjetoSeleccionable = seleccionable

            };
            return Json(JsonConvert.SerializeObject(Retorno));
        }

        [HttpPost]
        [ActionName("Obtenertipocargaitem")]
        public IHttpActionResult Obtenertipocargaitem(DoModel modelo)
        {
            List<ObjetoSeleccionable> matrizfiltradaprincipal = new List<ObjetoSeleccionable>();
            List<ObjetoSeleccionable> seleccionabletransporte = new List<ObjetoSeleccionable>();
            List<ObjetoSeleccionable> seleccionablecarga = new List<ObjetoSeleccionable>();
            if (modelo.IdModoTransporte != null)
            {
                List<dynamic> matrizfiltradatransporte = AplicationCtrl.Matriz.Where(x => x.idorigen == modelo.IdModoTransporte && x.tipo == modelo.IdTipoMatrizMultiple[0]).ToList();
                foreach (dynamic filtro in matrizfiltradatransporte)
                {
                    seleccionabletransporte.Add(new ObjetoSeleccionable { Id = AplicationCtrl.Item.SingleOrDefault(x => x.idprograma == filtro.iddestino).idprograma, Nombre = AplicationCtrl.Item.SingleOrDefault(x => x.idprograma == filtro.iddestino).nombre, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
                }

                
            }
            if (modelo.IdTipoCarga != null)
            {
                List<dynamic> matrizfiltradacarga = AplicationCtrl.Matriz.Where(x => x.idorigen == modelo.IdTipoCarga && x.tipo == modelo.IdTipoMatrizMultiple[1]).ToList();
                foreach (dynamic filtro in matrizfiltradacarga)
                {
                    seleccionablecarga.Add(new ObjetoSeleccionable { Id = AplicationCtrl.Item.SingleOrDefault(x => x.idprograma == filtro.iddestino).idprograma, Nombre = AplicationCtrl.Item.SingleOrDefault(x => x.idprograma == filtro.iddestino).nombre, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
                }
                                
            }
            if (seleccionabletransporte.Count == 0)
            {
                matrizfiltradaprincipal = seleccionablecarga;

            }
            else if (seleccionablecarga.Count == 0)
            {

                matrizfiltradaprincipal = seleccionabletransporte;
            }
            else {
                matrizfiltradaprincipal = seleccionabletransporte.Where(sd1 => seleccionablecarga.Select(sd2 => sd2.Id).Contains(sd1.Id)).ToList();
                //Enumerable.Intersect<ObjetoSeleccionable>(seleccionabletransporte,seleccionablecarga).ToList();
            }
            
            dynamic Retorno = new 
            {
                ObjetoSeleccionable = matrizfiltradaprincipal

            };
            return Json(JsonConvert.SerializeObject(Retorno));

        }
        [HttpPost]
        [ActionName("Obtenermodotrasporteitem")]
        public IHttpActionResult Obtenermodotrasporteitem(DoModel modelo)
        {
            List<dynamic> matrizfiltrada = AplicationCtrl.Matriz.Where(x => x.idorigen == modelo.IdModoTransporte && x.tipo == modelo.IdTipoMatriz).ToList();
            List<ObjetoSeleccionable> seleccionable = new List<ObjetoSeleccionable>();
            foreach (dynamic filtro in matrizfiltrada)
            {
                seleccionable.Add(new ObjetoSeleccionable { Id = AplicationCtrl.Item.SingleOrDefault(x => x.idprograma == filtro.iddestino).idprograma, Nombre = AplicationCtrl.Item.SingleOrDefault(x => x.idprograma == filtro.iddestino).nombre, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
            }
            dynamic Retorno = new
            {
                ObjetoSeleccionable = seleccionable

            };
            return Json(JsonConvert.SerializeObject(Retorno));
        }

        [HttpPost]
        [ActionName("Obtenertipoproveedormodalidad")]
        public IHttpActionResult Obtenertipoproveedormodalidad(DoModel modelo)
        {
            List<dynamic> matrizfiltrada = AplicationCtrl.Matriz.Where(x => x.idorigen == modelo.IdTipoProveedor && x.tipo == modelo.IdTipoMatriz).ToList();
            dynamic Retorno = new { Visibilidad = Convert.ToBoolean(matrizfiltrada.SingleOrDefault().iddestino) };
            //List<ObjetoSeleccionable> seleccionable = new List<ObjetoSeleccionable>();
            //foreach (dynamic filtro in matrizfiltrada)
            //{
            //    seleccionable.Add(new ObjetoSeleccionable { Id = AplicationCtrl.Visualizacion.SingleOrDefault(x => x.idprograma == filtro.iddestino).idprograma, Nombre = AplicationCtrl.Visualizacion.SingleOrDefault(x => x.idprograma == filtro.iddestino).nombre, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
            //}
            //dynamic Retorno = new
            //{
            //    ObjetoSeleccionable = seleccionable

            //};
            return Json(JsonConvert.SerializeObject(Retorno));
        }
        [HttpPost]
        [ActionName("Obteneritemcasillacontenedor")]
        public IHttpActionResult Obteneritemcasillacontenedor(DoModel modelo)
        {
            if (modelo.IdItem != null)
            {
                List<dynamic> matrizfiltrada = AplicationCtrl.Matriz.Where(x => x.idorigen == modelo.IdItem && x.tipo == modelo.IdTipoMatriz).ToList();
                dynamic Retorno = new { Visibilidad = Convert.ToBoolean(matrizfiltrada.SingleOrDefault().iddestino) };

                return Json(JsonConvert.SerializeObject(Retorno));
            }
            else {
                dynamic Retorno = new { Visibilidad = false };
                return Json(JsonConvert.SerializeObject(Retorno));
            }

        }
        [HttpPost]
        [ActionName("Datosselecciontarifa")]
        public IHttpActionResult Datosselecciontarifa(DoModel modelo)
        {
            List<dynamic> Selecciontarifa = new List<dynamic>();
            List<ObjetoPopoverbasico> CaracteristicasMercancia = new List<ObjetoPopoverbasico>();
            
            List<dynamic> IngresoTarifaColumna = new List<dynamic>();
            IngresoTarifaColumna.Add(new { id= 1, label= "Concepto", prop= "Concepto", cargardato=false });
            IngresoTarifaColumna.Add(new { id = 2, label = "Item", prop = "Item", cargardato=true, cargarlista = AplicationCtrl.ImprimirAplicationCtrl(AplicationCtrl.Item) });
            IngresoTarifaColumna.Add(new { id= 3, label= "Tipo de Contenedor", prop = "TipoContenedor", cargardato=true, cargarlista = AplicationCtrl.ImprimirAplicationCtrl(AplicationCtrl.TipoContenedor) });
            IngresoTarifaColumna.Add(new { id= 4, label= "Moneda", prop = "Moneda", cargardato=true, cargarlista = AplicationCtrl.ImprimirAplicationCtrl(AplicationCtrl.Moneda) });
            IngresoTarifaColumna.Add(new { id= 7, label= "Valor Unitario", prop= "ValorUnitario", cargardato=false});

            List<dynamic> TarifaSeleccionada = new List<dynamic>();
            TarifaSeleccionada.Add(new { Concepto = "textil", RubroCotizacion = 1, Item = 2, TipoContenedor = 1, Moneda = 1, RateClassCode = 1, TarifaMinima = "511", ValorUnitario = "51111", Observacion="mercancia enviada con exito" });
            TarifaSeleccionada.Add(new { Concepto = "flores", RubroCotizacion = 1, Item = 1, TipoContenedor = 1, Moneda = 3, RateClassCode = 2, TarifaMinima = "411", ValorUnitario = "5111111", Observacion="" });
            TarifaSeleccionada.Add(new { Concepto = "automotris", RubroCotizacion = 1, Item = 2, TipoContenedor = 1, Moneda = 1, RateClassCode = 1, TarifaMinima = "311", ValorUnitario = "2111", Observacion = "" });
            TarifaSeleccionada.Add(new { Concepto = "medicamentos", RubroCotizacion = 1, Item = 1, TipoContenedor = 1, Moneda = 3, RateClassCode = 2, TarifaMinima = "211", ValorUnitario = "15111111", Observacion = "" });
            TarifaSeleccionada.Add(new { Concepto = "electronica", RubroCotizacion = 1, Item = 3, TipoContenedor = 1, Moneda = 2, RateClassCode = 1, TarifaMinima = "111", ValorUnitario = "2111", Observacion = "" });

            List<dynamic> TarifaSeleccionada2 = new List<dynamic>();
            TarifaSeleccionada2.Add(new { Concepto = "textil", RubroCotizacion = 1, Item = 2, TipoContenedor = 1, Moneda = 1, RateClassCode = 1, TarifaMinima = "311", ValorUnitario = "2111", Observacion = "" });
            TarifaSeleccionada2.Add(new { Concepto = "textil", RubroCotizacion = 2, Item = 1, TipoContenedor = 1, Moneda = 3, RateClassCode = 2, TarifaMinima = "211", ValorUnitario = "5111111", Observacion = "mercancia enviada con exito" });
            TarifaSeleccionada2.Add(new { Concepto = "textil", RubroCotizacion = 3, Item = 3, TipoContenedor = 1, Moneda = 2, RateClassCode = 1, TarifaMinima = "111", ValorUnitario = "2111", Observacion = "" });

            foreach (Dominio dominio in AplicationCtrl.Caracteristicasmercancia)
            {
                CaracteristicasMercancia.Add(new ObjetoPopoverbasico {Id=dominio.idprograma,Nombre=dominio.nombre });
            }


            if (modelo.IdRazonSocial != 11)
            {
                Selecciontarifa.Add(new { Origen = "Shangai, China", Destino = "Cartagena, Colombia", TipoOperacion = 1, Incoterm = 1, Tarifaingresada = IngresoTarifaColumna, CaracterísticasMercancía = CaracteristicasMercancia.Where(x => x.Id == 1 || x.Id == 3 || x.Id == 5).ToList(), DiaIngreso = "11/11/2121", VigenciaTarifa = "11/11/2141", TarifaSeleccionada = TarifaSeleccionada, ModoTransporte = 1 });
                Selecciontarifa.Add(new { Origen = "Shangai, China", Destino = "Bogota, Colombia", TipoOperacion = 1, Incoterm = 2, Tarifaingresada = IngresoTarifaColumna, CaracterísticasMercancía = CaracteristicasMercancia.Where(x => x.Id == 2 || x.Id == 4).ToList(), DiaIngreso = "12/13/2121", VigenciaTarifa = "11/11/2141", TarifaSeleccionada = TarifaSeleccionada2, ModoTransporte = 3 });
                Selecciontarifa.Add(new { Origen = "Shangai, China", Destino = "Colon, Panama", TipoOperacion = 1, Incoterm = 0, Tarifaingresada = IngresoTarifaColumna, CaracterísticasMercancía = CaracteristicasMercancia.Where(x => x.Id == 1 || x.Id == 2 || x.Id == 3 || x.Id == 4 || x.Id == 5).ToList(), DiaIngreso = "31/17/2121", VigenciaTarifa = "11/11/2141", TarifaSeleccionada = TarifaSeleccionada2, ModoTransporte = 1 });
                Selecciontarifa.Add(new { Origen = "Buenavetura, Colombia", Destino = "Bogota, Colombia", TipoOperacion = 2, Tarifaingresada = IngresoTarifaColumna, CaracterísticasMercancía = CaracteristicasMercancia.Where(x => x.Id == 0).ToList(), Incoterm = 4, DiaIngreso = "31/14/2121", VigenciaTarifa = "11/11/2141", TarifaSeleccionada = TarifaSeleccionada, ModoTransporte = 3 });
                Selecciontarifa.Add(new { Origen = "Colon, Panama", Destino = "Shangai, China", TipoOperacion = 2, Incoterm = 5, Tarifaingresada = IngresoTarifaColumna, CaracterísticasMercancía = CaracteristicasMercancia.Where(x => x.Id == 5).ToList(), DiaIngreso = "11/11/2121", VigenciaTarifa = "11/11/2140", TarifaSeleccionada = TarifaSeleccionada, ModoTransporte = 1 });
            }
            else { 
            
            }


            dynamic Retorno = new {
                Tarifas = Selecciontarifa
            };
            return Json(JsonConvert.SerializeObject(Retorno));
        }
        [HttpPost]
        [ActionName("Obtenermodotransportecasillatipocontenedor")]
        public IHttpActionResult Obtenermodotransportecasillartipocontenedor(DoModel modelo)
        {
            bool matrizfiltradabool = true;
            bool matrizfiltrada2bool = true;
            if (modelo.IdModoTransporte != null)
            {
                List<dynamic> matrizfiltrada = AplicationCtrl.Matriz.Where(x => x.idorigen == modelo.IdModoTransporte && x.tipo == modelo.IdTipoMatrizMultiple[0]).ToList();
                matrizfiltradabool = Convert.ToBoolean(matrizfiltrada.SingleOrDefault().iddestino);
            }
            if(modelo.IdTipoCarga != null)
            {
                List<dynamic> matrizfiltrada2 = AplicationCtrl.Matriz.Where(x => x.idorigen == modelo.IdTipoCarga && x.tipo == modelo.IdTipoMatrizMultiple[1]).ToList();
                matrizfiltrada2bool = Convert.ToBoolean(matrizfiltrada2.SingleOrDefault().iddestino);
            }

            dynamic Retorno = new { Visibilidad = matrizfiltradabool && matrizfiltrada2bool };

            return Json(JsonConvert.SerializeObject(Retorno));
        }
        [HttpPost]
        [ActionName("Obteneritemmensajeriacasillas")]
        public IHttpActionResult Obteneritemmensajeriacasillas(DoModel modelo)
        {
            if (modelo.IdItemMensajeria != null)
            {
                List<dynamic> matrizfiltrada = AplicationCtrl.Matriz.Where(x => x.idorigen == modelo.IdItemMensajeria && x.tipo == modelo.IdTipoMatriz).ToList();
                dynamic Retorno = new { Visibilidad = Convert.ToBoolean(matrizfiltrada.SingleOrDefault().iddestino) };

                return Json(JsonConvert.SerializeObject(Retorno));
            }
            else
            {
                dynamic Retorno = new { Visibilidad = false };
                return Json(JsonConvert.SerializeObject(Retorno));
            }
        }
        [HttpPost]
        [ActionName("Datostablaseleccionseguro")]
        public IHttpActionResult Datostablaseleccionseguro(DoModel modelo)
        {
            List<int> caracteristicasmercanciaprimero = new List<int>();
            caracteristicasmercanciaprimero.Add(1);
            caracteristicasmercanciaprimero.Add(2);
            caracteristicasmercanciaprimero.Add(3);
            caracteristicasmercanciaprimero.Add(4);
            caracteristicasmercanciaprimero.Add(5);

            List<int> caracteristicasmercanciaunico = new List<int>();
            caracteristicasmercanciaunico.Add(5);

            List<int> tipooperacion = new List<int>();
            tipooperacion.Add(1);
            tipooperacion.Add(2);
            tipooperacion.Add(3);

            List<int> tipooperacionunico = new List<int>();
            tipooperacionunico.Add(2);

           

            List<int> TrayectoAseguradounico = new List<int>();
            TrayectoAseguradounico.Add(3);

            List<int> ModoTransporte = new List<int>();
            ModoTransporte.Add(1);
            ModoTransporte.Add(2);
            ModoTransporte.Add(3);
            ModoTransporte.Add(4);
            ModoTransporte.Add(5);
            ModoTransporte.Add(6);
            ModoTransporte.Add(7);
            ModoTransporte.Add(8);
            ModoTransporte.Add(9);

            List<int> TrayectoAseguradoinf = new List<int>();
            TrayectoAseguradoinf.Add(1);
            TrayectoAseguradoinf.Add(2);
            TrayectoAseguradoinf.Add(3);
            TrayectoAseguradoinf.Add(4);

            List<int> ModoTransporteunico = new List<int>();
            ModoTransporteunico.Add(1);

            List<dynamic> IngresoSeguroColumna = new List<dynamic>();
            IngresoSeguroColumna.Add(new { id = 5, label = "Moneda", prop = "Moneda", cargardato = true, cargarlista = AplicationCtrl.ImprimirAplicationCtrl(AplicationCtrl.Moneda) });
            IngresoSeguroColumna.Add(new { id = 6, label = "Monto Asegurado", prop = "MontoAsegurado", cargardato = false });
            IngresoSeguroColumna.Add(new { id = 7, label = "Valor Deducible", prop = "ValorDeducible", cargardato = false });
            IngresoSeguroColumna.Add(new { id = 8, label = "% Deducible", prop = "PorcentajeDeducible", cargardato = false });
            IngresoSeguroColumna.Add(new { id = 9, label = "Tarifa Minima", prop = "TarifaMinima", cargardato = false });
            IngresoSeguroColumna.Add(new { id = 10, label = "% Seguro Cobrado", prop = "SeguroCobrado", cargardato = false });
            List<dynamic> Selecciontarifaseguro1 = new List<dynamic>();
            Selecciontarifaseguro1.Add(new { TrayectoAsegurado = TrayectoAseguradoinf, TipoMercancia = 3, TipoOperacion = tipooperacion, ModoTransporte = ModoTransporte, Tarifaingresada = IngresoSeguroColumna, DiaIngreso = DateTime.Now, VigenciaTarifa = DateTime.Now, Caracteristicasmercancia = caracteristicasmercanciaprimero, Moneda = 3, MontoAsegurado = 123, ValorDeducible = 1234, PorcentajeDeducible = 1235, TarifaMinima = 1236, SeguroCobrado = 1237, Observacion = "toma7" });
            List<dynamic> Selecciontarifaseguro2 = new List<dynamic>();                                                                                                            
            Selecciontarifaseguro2.Add(new { TrayectoAsegurado = TrayectoAseguradoinf, TipoMercancia = 4, TipoOperacion = tipooperacion, ModoTransporte = ModoTransporte, Tarifaingresada = IngresoSeguroColumna, DiaIngreso = DateTime.Now, VigenciaTarifa = DateTime.Now, Caracteristicasmercancia = caracteristicasmercanciaprimero, Moneda = 2, MontoAsegurado = 123.123, ValorDeducible = 123.432, PorcentajeDeducible = 123.555, TarifaMinima = 987654, SeguroCobrado = 1237, Observacion = "toma7" });
            List<dynamic> Selecciontarifaseguro3 = new List<dynamic>();                                                                                                            
            Selecciontarifaseguro3.Add(new { TrayectoAsegurado = TrayectoAseguradoinf, TipoMercancia = 1, TipoOperacion = tipooperacion, ModoTransporte = ModoTransporte, Tarifaingresada = IngresoSeguroColumna, DiaIngreso = DateTime.Now, VigenciaTarifa = DateTime.Now, Caracteristicasmercancia = caracteristicasmercanciaprimero, Moneda = 1, MontoAsegurado = 123.000, ValorDeducible = 123.499, PorcentajeDeducible = 123.511, TarifaMinima = 123456, SeguroCobrado = 0000, Observacion = "toma7" });
            List<dynamic> Selecciontarifaseguro4 = new List<dynamic>();                                                                                                            
            Selecciontarifaseguro4.Add(new { TrayectoAsegurado = TrayectoAseguradoinf, TipoMercancia = 2, TipoOperacion = tipooperacion, ModoTransporte = ModoTransporte, Tarifaingresada = IngresoSeguroColumna, DiaIngreso = DateTime.Now, VigenciaTarifa = DateTime.Now, Caracteristicasmercancia = caracteristicasmercanciaprimero, Moneda = 3, MontoAsegurado = 123.999, ValorDeducible = 123.444, PorcentajeDeducible = 123.500, TarifaMinima = 99999, SeguroCobrado = 987654, Observacion = "toma7" });
            List<dynamic> Selecciontarifaseguro5 = new List<dynamic>();                                                                                                           
            Selecciontarifaseguro5.Add(new { TrayectoAsegurado = TrayectoAseguradounico, TipoMercancia = 3, TipoOperacion = tipooperacionunico, ModoTransporte = ModoTransporteunico, Tarifaingresada = IngresoSeguroColumna, DiaIngreso = DateTime.Now, VigenciaTarifa = DateTime.Now, Caracteristicasmercancia = caracteristicasmercanciaunico, Moneda = 1, MontoAsegurado = 999.999, ValorDeducible = 123.400, PorcentajeDeducible = 123.543, TarifaMinima = 88888, SeguroCobrado = 123456, Observacion = "toma7" });

            List<dynamic> Selecciontarifaseguro = new List<dynamic>();
            Selecciontarifaseguro.Add(new { TrayectoAsegurado = TrayectoAseguradoinf, TipoMercancia = 3, TipoOperacion = tipooperacion, ModoTransporte = ModoTransporte, Tarifaingresada= IngresoSeguroColumna, DiaIngreso = DateTime.Now, VigenciaTarifa = DateTime.Now, Caracteristicasmercancia = caracteristicasmercanciaprimero, Moneda= 3, MontoAsegurado= 123, ValorDeducible=1234, PorcentajeDeducible=1235, TarifaMinima= 1236, SeguroCobrado=1237, Observacion= "toma7", Selecciontarifaseguro = Selecciontarifaseguro1 });
            Selecciontarifaseguro.Add(new { TrayectoAsegurado = TrayectoAseguradoinf, TipoMercancia = 4, TipoOperacion = tipooperacion, ModoTransporte = ModoTransporte, Tarifaingresada = IngresoSeguroColumna, DiaIngreso = DateTime.Now, VigenciaTarifa = DateTime.Now, Caracteristicasmercancia = caracteristicasmercanciaprimero, Moneda = 2, MontoAsegurado = 123.123, ValorDeducible = 123.432, PorcentajeDeducible = 123.555, TarifaMinima = 987654, SeguroCobrado = 1237, Observacion = "toma7", Selecciontarifaseguro = Selecciontarifaseguro2 });
            Selecciontarifaseguro.Add(new { TrayectoAsegurado = TrayectoAseguradoinf, TipoMercancia = 1, TipoOperacion = tipooperacion, ModoTransporte = ModoTransporte, Tarifaingresada = IngresoSeguroColumna, DiaIngreso = DateTime.Now, VigenciaTarifa = DateTime.Now, Caracteristicasmercancia = caracteristicasmercanciaprimero, Moneda = 1, MontoAsegurado = 123.000, ValorDeducible = 123.499, PorcentajeDeducible = 123.511, TarifaMinima = 123456, SeguroCobrado = 0000, Observacion = "toma7", Selecciontarifaseguro = Selecciontarifaseguro3 });
            Selecciontarifaseguro.Add(new { TrayectoAsegurado = TrayectoAseguradoinf, TipoMercancia = 2, TipoOperacion = tipooperacion, ModoTransporte = ModoTransporte, Tarifaingresada = IngresoSeguroColumna, DiaIngreso = DateTime.Now, VigenciaTarifa = DateTime.Now, Caracteristicasmercancia = caracteristicasmercanciaprimero, Moneda = 3, MontoAsegurado = 123.999, ValorDeducible = 123.444, PorcentajeDeducible = 123.500, TarifaMinima = 99999, SeguroCobrado = 987654, Observacion = "toma7", Selecciontarifaseguro = Selecciontarifaseguro4 });
            Selecciontarifaseguro.Add(new { TrayectoAsegurado = TrayectoAseguradounico, TipoMercancia = 3, TipoOperacion = tipooperacionunico, ModoTransporte = ModoTransporteunico, Tarifaingresada = IngresoSeguroColumna, DiaIngreso = DateTime.Now, VigenciaTarifa = DateTime.Now, Caracteristicasmercancia = caracteristicasmercanciaunico, Moneda = 1, MontoAsegurado = 999.999, ValorDeducible = 123.400, PorcentajeDeducible = 123.543, TarifaMinima = 88888, SeguroCobrado = 123456, Observacion = "toma7", Selecciontarifaseguro = Selecciontarifaseguro5 });
           
            dynamic Retorno = new
            {
                Tarifas = Selecciontarifaseguro
            };
            return Json(JsonConvert.SerializeObject(Retorno));
        }
        [HttpPost]
        [ActionName("Datosselecciontarifamensajeriaydeposito")]
        public IHttpActionResult Datosselecciontarifamensajeriaydeposito(DoModel modelo)
        {
            
            List<ObjetoPopoverbasico> CaracteristicasMercancia = new List<ObjetoPopoverbasico>();
            List<dynamic> IngresoTarifaColumnaMensajeria = new List<dynamic>();
            IngresoTarifaColumnaMensajeria.Add(new { id = 0, label = "Concepto", prop = "Concepto", cargardato = false });
            IngresoTarifaColumnaMensajeria.Add(new { id = 1, label = "Item", prop = "ItemMensajeria", cargardato = true, cargarlista = AplicationCtrl.ImprimirAplicationCtrl(AplicationCtrl.ItemMensajeria) });
            IngresoTarifaColumnaMensajeria.Add(new { id = 2, label = "Peso/Volumen Kg", prop = "PesoVolumen", cargardato = false });
            IngresoTarifaColumnaMensajeria.Add(new { id = 3, label = "Porcentaje", prop = "Porcentaje", cargardato = false });
            IngresoTarifaColumnaMensajeria.Add(new { id = 4, label = "Moneda", prop = "Moneda", cargardato = true, cargarlista = AplicationCtrl.ImprimirAplicationCtrl(AplicationCtrl.Moneda) });
            IngresoTarifaColumnaMensajeria.Add(new { id = 5, label = "Valor Unitario", prop = "ValorUnitario", cargardato = false });
            List<dynamic> IngresoTarifaColumnaDeposito = new List<dynamic>();
            IngresoTarifaColumnaDeposito.Add(new { id = 1, label = "Concepto", prop = "Concepto", cargardato = false });
            IngresoTarifaColumnaDeposito.Add(new { id = 2, label = "Item", prop = "Item", cargardato = true, cargarlista = AplicationCtrl.ImprimirAplicationCtrl(AplicationCtrl.Item) });
            IngresoTarifaColumnaDeposito.Add(new { id = 3, label = "Tipo de Contenedor", prop = "TipoContenedor", cargardato = true, cargarlista = AplicationCtrl.ImprimirAplicationCtrl(AplicationCtrl.TipoContenedor) });
            IngresoTarifaColumnaDeposito.Add(new { id = 4, label = "Moneda", prop = "Moneda", cargardato = true, cargarlista = AplicationCtrl.ImprimirAplicationCtrl(AplicationCtrl.Moneda) });
            IngresoTarifaColumnaDeposito.Add(new { id = 7, label = "Valor Unitario", prop = "ValorUnitario", cargardato = false });

            List<dynamic> TarifaSeleccionadadeposito = new List<dynamic>();
            TarifaSeleccionadadeposito.Add(new { Concepto = "textil", Item = 2, TipoContenedor = 1, Moneda = 1, ValorUnitario = "$50.000" });
            TarifaSeleccionadadeposito.Add(new { Concepto = "flores",  Item = 1, TipoContenedor = 1, Moneda = 3,  ValorUnitario = "$5'111.111" });
            TarifaSeleccionadadeposito.Add(new { Concepto = "automotris",  Item = 2, TipoContenedor = 1, Moneda = 1,  ValorUnitario = "$2.111" });
            TarifaSeleccionadadeposito.Add(new { Concepto = "medicamentos", Item = 1, TipoContenedor = 1, Moneda =3,  ValorUnitario = "$15'111.111" });
            TarifaSeleccionadadeposito.Add(new { Concepto = "electronica",  Item = 3, TipoContenedor = 1, Moneda =2,  ValorUnitario = "2'111.111" });

            List<dynamic> TarifaSeleccionadamensajeria = new List<dynamic>();
            TarifaSeleccionadamensajeria.Add(new { Concepto = "textil", ItemMensajeria = 2, PesoVolumen=1 , Porcentaje=1, Moneda =1 , TarifaMinima = "311", ValorUnitario = 2111 });
            TarifaSeleccionadamensajeria.Add(new { Concepto = "textil", ItemMensajeria = 1, PesoVolumen=1 , Porcentaje=1, Moneda =1 , TarifaMinima = "211", ValorUnitario = "$15'111.111" });
            TarifaSeleccionadamensajeria.Add(new { Concepto = "textil", ItemMensajeria = 3, PesoVolumen=1 , Porcentaje=1, Moneda =1 , TarifaMinima = "111", ValorUnitario = "2'111.111" });

            foreach (Dominio dominio in AplicationCtrl.Caracteristicasmercancia)
            {
                CaracteristicasMercancia.Add(new ObjetoPopoverbasico { Id = dominio.idprograma, Nombre = dominio.nombre });
            }

            List<dynamic> Selecciontarifamesnajeriaydeposito = new List<dynamic>();
            if (modelo.IdRazonSocial == 6)
            {

                Selecciontarifamesnajeriaydeposito.Add(new { TipoOperacion = 1, TipoMercancia = 1, Tarifaingresada = IngresoTarifaColumnaDeposito, CaracterísticasMercancía = CaracteristicasMercancia.Where(z => z.Id == 5), DiaIngreso = "19/11/2121", VigenciaTarifa = "11/11/2121", TarifaSeleccionada = TarifaSeleccionadadeposito });
                Selecciontarifamesnajeriaydeposito.Add(new { TipoOperacion = 1, TipoMercancia = 1, Tarifaingresada = IngresoTarifaColumnaDeposito, CaracterísticasMercancía = CaracteristicasMercancia.Where(z => z.Id == 1 || z.Id == 3 || z.Id == 4).ToList(), DiaIngreso = "19/11/2121", VigenciaTarifa = "12/11/2121", TarifaSeleccionada = TarifaSeleccionadadeposito });

        }
            else if (modelo.IdRazonSocial == 8)
            {
                Selecciontarifamesnajeriaydeposito.Add(new { TipoOperacion = 1, TipoMercancia = 1, Tarifaingresada = IngresoTarifaColumnaMensajeria, CaracterísticasMercancía = CaracteristicasMercancia.Where(x => x.Id == 1 || x.Id == 3 || x.Id == 4).ToList(), DiaIngreso = "19/11/2121", VigenciaTarifa = "13/11/2121", TarifaSeleccionada = TarifaSeleccionadamensajeria });
                Selecciontarifamesnajeriaydeposito.Add(new { TipoOperacion = 3, TipoMercancia = 1, Tarifaingresada = IngresoTarifaColumnaMensajeria, CaracterísticasMercancía = CaracteristicasMercancia.Where(x => x.Id == 1 || x.Id == 3 || x.Id == 4).ToList(), DiaIngreso = "19/11/2121", VigenciaTarifa = "14/11/2121", TarifaSeleccionada = TarifaSeleccionadamensajeria });
                Selecciontarifamesnajeriaydeposito.Add(new { TipoOperacion = 2, TipoMercancia = 1, Tarifaingresada = IngresoTarifaColumnaMensajeria, CaracterísticasMercancía = CaracteristicasMercancia.Where(x => x.Id == 1 || x.Id == 3 || x.Id == 4).ToList(), DiaIngreso = "19/11/2121", VigenciaTarifa = "15/11/2121", TarifaSeleccionada = TarifaSeleccionadamensajeria });
        }



        dynamic Retorno = new
            {
                Tarifas = Selecciontarifamesnajeriaydeposito
            };
            return Json(JsonConvert.SerializeObject(Retorno));
        }
        [HttpPost]
        [ActionName("Guardarcreartarifasproveedor")]
        public IHttpActionResult Guardarcreartarifasproveedor(TarifasDoModel modelo)
        {
            if (modelo.Opcion == "crearconcepto") {
                
            }else if (modelo.Opcion == "adjuntartarifa") {
                
            }
            else if(modelo.Opcion == "crearconceptoseguro") {
               
            }
            else if(modelo.Opcion == "adjuntartarifaseguro") {
               
            }
            else if(modelo.Opcion == "crearconceptomensajeria") {
                
            }
            return null;
        }
        [HttpPost]
        [ActionName("Datosseleccionwarehouse")]
        public IHttpActionResult Datosseleccionwarehouse(DoModel modelo)
        {

            List<dynamic> Dimensionesasd123 = new List<dynamic>();
            Dimensionesasd123.Add(new { largo = 50, ancho = 20, alto = 60 });
            List<dynamic> Dimensionesa123sd = new List<dynamic>();
            List<dynamic> volumenasd123 = new List<dynamic>();
            volumenasd123.Add(new { cbm = "35.315 cbm", pies = "1 pies", pulgadas = "1728 pulgadas" });
            List<dynamic> PesoVolumenasd123 = new List<dynamic>();
            PesoVolumenasd123.Add(new { kg = "1666.70 kg", lbs = "3675.07 lbs" });
            List<dynamic> pesoasd123 = new List<dynamic>();
            pesoasd123.Add(new { peso = "Peso Bruto", kg = "5000", tn = "5", lbs = "50000" });
            pesoasd123.Add(new { peso = "Peso Neto", kg = "2000", tn = "2", lbs = "20000" });
            List<dynamic> pesovolumetrico = new List<dynamic>();
            pesovolumetrico.Add(new { kg = "5000 kg", tn = "5 tn", lbs = "50000 lbs" });

            List<dynamic> infdimensiones = new List<dynamic>();
            infdimensiones.Add(new { PesoNeto = 50, UnidadMedidaPesoBrutoselecionado = 2, PesoBruto = 20, numeropiezas = 50, UnidadMedidaVolumenselecionado = 1, volumen = 564, volumencalculado = "56400", pesovolumentn = "", pesovolumenlbs = "", checkeddimensiones = false, UnidadMedidaDistancia = "", UnidadMedidaDistanciaselecionado = "", largo = "", ancho = "", alto = "", checkedvolumen = true, tex = "", texcbm = "", texvol = "", pesovolumenmetrico = "", pesovol = "", texseleccion = "", unidad = "" });
            List<dynamic> infdimesion = new List<dynamic>();
            infdimesion.Add(new { PesoNeto = 50, UnidadMedidaPesoBrutoselecionado = 2, PesoBruto = 20, numeropiezas = 50, UnidadMedidaVolumenselecionado = 1, volumen = 564, volumencalculado = "", pesovolumentn = "", pesovolumenlbs = "", checkeddimensiones = true, UnidadMedidaDistancia = "", UnidadMedidaDistanciaselecionado = 1, largo = 50, ancho = 50, alto = 50, checkedvolumen = false, tex = "", texcbm = "", texvol = "", pesovolumenmetrico = "", pesovol = "", texseleccion = "", unidad = "" });


            List<dynamic> pesovolumen = new List<dynamic>();
            pesovolumen.Add(new { kg = 50, lbs = 100 });

            List<dynamic> volumen = new List<dynamic>();
            volumen.Add(new { pulgadas = 5000, pies = 5000, cbm = 5000 });

            List<dynamic> peso = new List<dynamic>();
            peso.Add(new { kg = "5000 kg", tn = "5 tn", lbs = "50000 lbs" });

           
            List<dynamic> datostablawarehouse = new List<dynamic>();
            datostablawarehouse.Add(new { Dimensiones= infdimensiones, TipoEmbalaje =2 , numeropiezas= 50 , Volumen= volumen, PesoBruto= peso, pesovolumenmetrico= pesovolumetrico, PesoVolumen = pesovolumen, Descripcion ="ejemplo descripcion tabla ware house" });
            datostablawarehouse.Add(new { Dimensiones = infdimesion, TipoEmbalaje = 2, numeropiezas = 50, Volumen = volumen, PesoBruto = peso, pesovolumenmetrico = pesovolumetrico, PesoVolumen = pesovolumen, Descripcion = "ejemplo descripcion tabla ware house" });


            List<dynamic> datoscopiawarehouse = new List<dynamic>();
            datoscopiawarehouse.Add(new { Caracteristicasmercancia = 1, TipoMercancia = 4, UN= 5, Observacion = "ejemplo observaciones " });


            List<dynamic> DetallesWarehouseasd123 = new List<dynamic>();
            DetallesWarehouseasd123.Add(new { Descripcion = "ware house descripcon ejemplo", TipoEmbalaje = 1, Dimensiones = Dimensionesasd123,  numeropiezas = 50, Peso = pesoasd123, Volumen = volumenasd123, pesovolumenmetrico = pesovolumetrico,  PesoVolumen = PesoVolumenasd123,  });
            DetallesWarehouseasd123.Add(new { Descripcion = "ware house descripcon ejemplo", TipoEmbalaje = 1, Dimensiones = Dimensionesa123sd, numeropiezas = 50, Peso = pesoasd123, Volumen = volumenasd123, pesovolumenmetrico = pesovolumetrico, PesoVolumen = PesoVolumenasd123, });
            List<dynamic> DetallesWarehousea123sd = new List<dynamic>();
            DetallesWarehousea123sd.Add(new { Descripcion = "ware house descripcon ejemplo", TipoEmbalaje = 1, Dimensiones = Dimensionesasd123, numeropiezas = 50, Peso = pesoasd123, Volumen = volumenasd123, pesovolumenmetrico = pesovolumetrico, PesoVolumen = PesoVolumenasd123, });


            List<dynamic> WarehouseILAIM1023 = new List<dynamic>();
            WarehouseILAIM1023.Add(new { DOparcial="asd123-1", NumeroWarehosue = "asd123", Exportador = "OMAR", Importador = "JALEMCO", CantidadPiezas = 50, PesoVolumen ="45kg", Detalles= DetallesWarehouseasd123, datoswarehouse= datoscopiawarehouse, datostablawarehouse= datostablawarehouse});
            WarehouseILAIM1023.Add(new { DOparcial = "asd123-1", NumeroWarehosue = "a123sd", Exportador = "JORGE", Importador = "JALEMCO", CantidadPiezas = 20, PesoVolumen = "500kg", Detalles = DetallesWarehousea123sd, datoswarehouse = datoscopiawarehouse, datostablawarehouse = datostablawarehouse });
            List<dynamic> WarehouseILAIM1027 = new List<dynamic>();
            List<dynamic> Seleccionwarehouse = new List<dynamic>();
            if (modelo.IdCliente == 3)
            {


            }
            else if (modelo.IdCliente == 1)
            {
                Seleccionwarehouse.Add(new { DO = "ILAIM1023", TipoOperacion = 1, ModoTransporte = 3, tipocarga = 1, Origen = "Pekín (CHNBUN)", Destino = "Bogota (COLBOG)", Warehouse = WarehouseILAIM1023, Exportador = "OMAR", Importador = "JALEMCO", valorfactor= 166.67 });
                Seleccionwarehouse.Add(new { DO = "ILAIM1027", TipoOperacion = 1, ModoTransporte = 1, tipocarga = 1, Origen = "Pekín (CHNBUN)", Destino = "Bogota (COLBOG)", Warehouse = WarehouseILAIM1027, Exportador = "OMAR", Importador = "JALEMCO", valorfactor = 1 });
            }
            else if (modelo.IdCliente == 2)
            {
           


            }
            else { 
            
            
            }


            dynamic Retorno = new
            {
                Tarifas = Seleccionwarehouse
            };
            return Json(JsonConvert.SerializeObject(Retorno));
        }
        [HttpPost]
        [ActionName("Datoscopiawarehouse")]
        public IHttpActionResult Datoscopiawarehouse(DoModel modelo)
        {
            List<dynamic> datoscopiawarehouse = new List<dynamic>();
            datoscopiawarehouse.Add(new { Caracteristicasmercancia = 1, TipoMercancia = 4, UN = 1, Observacion = "ejemplo observaciones " });


            List<dynamic> Dimensionesasd123 = new List<dynamic>();
            Dimensionesasd123.Add(new { largo = 50, ancho = 20, alto = 60 });
            List<dynamic> Dimensionesa123sd = new List<dynamic>();
            List<dynamic> volumenasd123 = new List<dynamic>();
            volumenasd123.Add(new { cbm = "35.315 cbm", pies = "1 pies", pulgadas = "1728 pulgadas" });
            List<dynamic> PesoVolumenasd123 = new List<dynamic>();
            PesoVolumenasd123.Add(new { kg = "1666.70 kg", lbs = "3675.07 lbs" });
            List<dynamic> pesoasd123 = new List<dynamic>();
            pesoasd123.Add(new { peso = "Peso Bruto", kg = "5000", tn = "5", lbs = "50000" });
            pesoasd123.Add(new { peso = "Peso Neto", kg = "2000", tn = "2", lbs = "20000" });
            List<dynamic> pesovolumetrico = new List<dynamic>();
            pesovolumetrico.Add(new { kg = "5000 kg", tn = "5 tn", lbs = "50000 lbs" });
            List<dynamic> inftipomercancia = new List<dynamic>();
            inftipomercancia.Add(new { Caracteristicasmercancia = 1, TipoMercancia = 2});
            inftipomercancia.Add(new { Caracteristicasmercancia = 3, TipoMercancia = 2, UN=2 });

            List<dynamic> Exportadoreimportador = new List<dynamic>();
            Exportadoreimportador.Add(new { tipo = "Exportador", razonsocial = "JORGE" });
            Exportadoreimportador.Add(new { tipo = "Importador", razonsocial = "JALEMCO"});
            //Exportadoreimportador.Add(new { Exportador = "OMAR", Importador = "JALEMCO" });

            List<dynamic> pesovolumen = new List<dynamic>();
            pesovolumen.Add(new { kg = 50, lbs = 100 });

            List<dynamic> volumen = new List<dynamic>();
            volumen.Add(new { pulgadas = 5000, pies = 5000, cbm = 5000 });

            List<dynamic> peso = new List<dynamic>();
            peso.Add(new { kg = "5000 kg", tn = "5 tn", lbs = "50000 lbs" });

            List<dynamic> infdimensiones = new List<dynamic>();
            infdimensiones.Add(new { PesoNeto = 50, UnidadMedidaPesoBrutoselecionado = 2, PesoBruto = 20, numeropiezas = 50, UnidadMedidaVolumenselecionado = 1, volumen = 564, volumencalculado = "56400", pesovolumentn = "", pesovolumenlbs = "", checkeddimensiones = false, UnidadMedidaDistancia = "", UnidadMedidaDistanciaselecionado = "", largo = "", ancho = "", alto = "", checkedvolumen = true, tex = "", texcbm = "", texvol = "", pesovolumenmetrico = "", pesovol = "", texseleccion = "", unidad = "" });
            List<dynamic> infdimesion = new List<dynamic>();
            infdimesion.Add(new { PesoNeto = 50, UnidadMedidaPesoBrutoselecionado = 2, PesoBruto = 20, numeropiezas = 50, UnidadMedidaVolumenselecionado = 1, volumen = 564, volumencalculado = "", pesovolumentn = "", pesovolumenlbs = "", checkeddimensiones = true, UnidadMedidaDistancia = "", UnidadMedidaDistanciaselecionado = 1, largo = 50, ancho = 50, alto = 50, checkedvolumen = false, tex = "", texcbm = "", texvol = "", pesovolumenmetrico = "", pesovol = "", texseleccion = "", unidad = "" });


            List<dynamic> datostablawarehouse = new List<dynamic>();
            datostablawarehouse.Add(new { Dimensiones = infdimensiones, TipoEmbalaje = 2, numeropiezas = 50, Volumen = volumen, PesoBruto = peso, pesovolumenmetrico = pesovolumetrico, PesoVolumen = pesovolumen, Descripcion = "ejemplo descripcion tabla ware house" });
            datostablawarehouse.Add(new { Dimensiones = infdimesion, TipoEmbalaje = 2, numeropiezas = 50, Volumen = volumen, PesoBruto = peso, pesovolumenmetrico = pesovolumetrico, PesoVolumen = pesovolumen, Descripcion = "ejemplo descripcion tabla ware house" });



            string valorcondimensiones = "";
            bool tienedimensiones = false;
            
            List<dynamic> DetallesWarehouseasd123 = new List<dynamic>();
            DetallesWarehouseasd123.Add(new { Descripcion = "ware house descripcon ejemplo", TipoEmbalaje = 1, Dimensiones = Dimensionesasd123, numeropiezas = 50, Peso = pesoasd123, Volumen = volumenasd123, pesovolumenmetrico = pesovolumetrico, PesoVolumen = PesoVolumenasd123, });
            DetallesWarehouseasd123.Add(new { Descripcion = "ware house descripcon ejemplo", TipoEmbalaje = 2, Dimensiones = Dimensionesasd123, numeropiezas = 50, Peso = pesoasd123, Volumen = volumenasd123, pesovolumenmetrico = pesovolumetrico, PesoVolumen = PesoVolumenasd123, });
            DetallesWarehouseasd123.Add(new { Descripcion = "ware house descripcon ejemplo", TipoEmbalaje = 2, Dimensiones = Dimensionesasd123, numeropiezas = 50, Peso = pesoasd123, Volumen = volumenasd123, pesovolumenmetrico = pesovolumetrico, PesoVolumen = PesoVolumenasd123, });
            DetallesWarehouseasd123.Add(new { Descripcion = "ware house descripcon ejemplo", TipoEmbalaje = 2, Dimensiones = Dimensionesasd123, numeropiezas = 50, Peso = pesoasd123, Volumen = volumenasd123, pesovolumenmetrico = pesovolumetrico, PesoVolumen = PesoVolumenasd123, });
            DetallesWarehouseasd123.Add(new { Descripcion = "ware house descripcon ejemplo", TipoEmbalaje = 2, Dimensiones = Dimensionesasd123, numeropiezas = 50, Peso = pesoasd123, Volumen = volumenasd123, pesovolumenmetrico = pesovolumetrico, PesoVolumen = PesoVolumenasd123, });
            DetallesWarehouseasd123.Add(new { Descripcion = "ware house descripcon ejemplo", TipoEmbalaje = 3, Dimensiones = Dimensionesa123sd, numeropiezas = 50, Peso = pesoasd123, Volumen = volumenasd123, pesovolumenmetrico = pesovolumetrico, PesoVolumen = PesoVolumenasd123, });


            foreach (dynamic X in DetallesWarehouseasd123)
            {
                if (X.Dimensiones.Count == 0)
                {
                    if (string.IsNullOrEmpty(valorcondimensiones) && tienedimensiones == false)
                    {
                        valorcondimensiones = "NO";
                        tienedimensiones = false;
                    }
                    else if (tienedimensiones == false)
                    {
                        valorcondimensiones = "NO";
                        tienedimensiones = false;
                    }
                    else
                    {
                        valorcondimensiones = "SI – Con algunos datos pendientes";
                        tienedimensiones = true;
                    }
                }
                else
                {
                    if (string.IsNullOrEmpty(valorcondimensiones) && tienedimensiones == false)
                    {
                        valorcondimensiones = "SI";
                        tienedimensiones = true;
                    }
                    else if (tienedimensiones == false)
                    {
                        valorcondimensiones = "SI – Con algunos datos pendientes";
                        tienedimensiones = true;
                    }
                    else if (valorcondimensiones == "SI")
                    {
                        valorcondimensiones = "SI";
                        tienedimensiones = true;
                    }
                    else if (valorcondimensiones == "SI – Con algunos datos pendientes")
                    {
                        valorcondimensiones = "SI – Con algunos datos pendientes";
                        tienedimensiones = true;
                    }
                }
            }
            List<dynamic> documentotrasporteILAIM10233 = new List<dynamic>();
            
            List<dynamic> documentotrasporteILAIM10232 = new List<dynamic>();
            documentotrasporteILAIM10232.Add(new { documentotransporte = "Documento 001" });
            List<dynamic> documentotrasporteILAIM10231 = new List<dynamic>();
            documentotrasporteILAIM10231.Add(new { documentotransporte= "Documento 001"});
            documentotrasporteILAIM10231.Add(new { documentotransporte = "Documento 002" });

            List<dynamic> datoscopiaseleccionwarehouse = new List<dynamic>();
            if (modelo.IdCliente == 2|| modelo.IdCliente == 1)
            {
                datoscopiaseleccionwarehouse.Add(new { DOparcial = "ILAIM1023-1", Exportadoreimportador = Exportadoreimportador,Exportador="JORGE", Importador = "JALEMCO", documentotransporte = documentotrasporteILAIM10231, NumeroWarehosue = "ILAIM1023WH01", Origen = "Pekín (CHNBUN)", Destino = "Bogota (COLBOG)", condimensiones = valorcondimensiones, Detallescarga = DetallesWarehouseasd123, Detallestipomercancia = inftipomercancia, datostablawarehouse= datostablawarehouse, datoswarehouse= datoscopiawarehouse });
                datoscopiaseleccionwarehouse.Add(new { DOparcial = "ILAIM1023-2", Exportadoreimportador = Exportadoreimportador, Exportador = "JORGE", Importador = "JALEMCO", documentotransporte = documentotrasporteILAIM10232, NumeroWarehosue = "ILAIM1023WH01", Origen = "Pekín (CHNBUN)", Destino = "Bogota (COLBOG)", condimensiones = valorcondimensiones, Detallescarga = DetallesWarehouseasd123, Detallestipomercancia = inftipomercancia, datostablawarehouse = datostablawarehouse, datoswarehouse = datoscopiawarehouse });
                datoscopiaseleccionwarehouse.Add(new { DOparcial = "ILAIM1023-3", Exportadoreimportador = Exportadoreimportador, Exportador = "JORGE", Importador = "JALEMCO", documentotransporte = documentotrasporteILAIM10233, NumeroWarehosue = "ILAIM1023WH01", Origen = "Pekín (CHNBUN)", Destino = "Bogota (COLBOG)", condimensiones = valorcondimensiones, Detallescarga = DetallesWarehouseasd123, Detallestipomercancia = inftipomercancia, datostablawarehouse = datostablawarehouse, datoswarehouse = datoscopiawarehouse });
            }
            dynamic Retorno = new
            {
                Tarifas = datoscopiaseleccionwarehouse
            };
            return Json(JsonConvert.SerializeObject(Retorno));
        }
        [HttpPost]
        [ActionName("Datofactorestibas")]
        public IHttpActionResult Datofactorestibas(DoModel modelo)
        {
            List<Dominio> modotrasporte = AplicationCtrl.ModoTransporte;

            dynamic Retorno = new 
            {
                ModoTransporte = modotrasporte
            };
            return Json(JsonConvert.SerializeObject(Retorno));
        }
        [HttpPost]
        [ActionName("Obtenermodotrasportefactorestibasbloqueo")]
        public IHttpActionResult Obtenermodotrasportefactorestibasbloqueo(DoModel modelo)
        {
                List<dynamic> matrizfiltrada = AplicationCtrl.Matriz.Where(x => x.idorigen == modelo.IdModoTransporte && x.tipo == modelo.IdTipoMatriz).ToList();
                dynamic Retorno = new { Visibilidad = Convert.ToBoolean(matrizfiltrada.SingleOrDefault().iddestino) };

                return Json(JsonConvert.SerializeObject(Retorno));
           

        }
        [HttpPost]
        [ActionName("Guardarcrearcliente")]
        public IHttpActionResult Guardarcrearcliente(TarifasDoModel modelo)
        {
         
            return null;
        }
        [HttpPost]
        [ActionName("Observacionescorreo")]
        public IHttpActionResult Observacionescorreo(TarifasDoModel modelo)
        {
            List<dynamic> observaciones = new List<dynamic>();
           
            observaciones.Add(new {Observacion="carga recibida en bodega" });
            if (modelo.IdCliente == 1)
            {
                observaciones.Add(new { Observacion = "estimado cliente su carga llego a bodega exitosamente" });

            }
            dynamic Retorno = new
            {
                Observaciones = observaciones
            };
            return Json(JsonConvert.SerializeObject(Retorno));
        }
        [HttpPost]
        [ActionName("Obtenercaracteristicasmercanciavsnu")]
        public IHttpActionResult Obtenercaracteristicasmercanciavsnu(DoModel modelo)
        {

            if (modelo.IdCaracteristicasmercancia != null)
            {
                //List<dynamic> matrizfiltrada = AplicationCtrl.Matriz.Where(x => x.idorigen == modelo.IdCaracteristicasmercancia.Select(y => y == x.idorigen).Single() && x.tipo == modelo.IdTipoMatriz).ToList();
                //    dynamic Retorno = new { Visibilidad = Convert.ToBoolean(matrizfiltrada.SingleOrDefault().iddestino) };

                //    return Json(JsonConvert.SerializeObject(Retorno));
                List<dynamic> matrizfiltrada = AplicationCtrl.Matriz.Where(x => x.idorigen == modelo.IdCaracteristicasmercancia && x.tipo == modelo.IdTipoMatriz).ToList();
                dynamic Retorno = new { Visibilidad = Convert.ToBoolean(matrizfiltrada.SingleOrDefault().iddestino) };

                return Json(JsonConvert.SerializeObject(Retorno));
            }
            else
            {
                dynamic Retorno = new { Visibilidad = false };
                return Json(JsonConvert.SerializeObject(Retorno));
            }

        }
        [HttpPost]
        [ActionName("Notificacioninterna")]
        public IHttpActionResult Notificacioninterna(TarifasDoModel modelo)
        {
            List<dynamic> observaciones = new List<dynamic>();

            observaciones.Add(new { Observacion = "Status predeterminado usuario interno" });
            if (modelo.IdCliente == 1)
            {
                observaciones.Add(new { Observacion = "OTRO" });

            }
            dynamic Retorno = new
            {
                Observaciones = observaciones
            };
            return Json(JsonConvert.SerializeObject(Retorno));
        }
    }

    
}
