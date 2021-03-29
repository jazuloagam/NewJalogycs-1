using ControlAcceso.BLL;
using ControlAcceso.Entidades;
using Jalogycs.Helpers;
using Jalogycs.Models.InicioSesion;
using Jalogycs.Models.Objetos;
using Jalogycs.Models.Utilidades;
using Logistica.Entidades;
using Newtonsoft.Json;
using Notificaciones.BLL;
using Pagos.Entidades;
using Personas.BLL;
using Personas.Entidades;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web.Http;
using Utilidades.BLL;
using Utilidades.Entidades;

namespace Jalogycs.Controllers
{
    [AllowAnonymous]
    public class LoginController : ApiController
    {
        [HttpPost]
        [ActionName("IniciarSesion")]
        public IHttpActionResult IniciarSesion(InicioSesionModel inicio)
        {
            try
            {
                Tuple<List<Usuario>, List<OpcionUsuario>, List<Modulo>, List<Persona>, List<CuentaCliente>, List<Contrato>,
            List<Pago>> InicioSesion = ControlAccesoBLL.IniciarSesion(inicio.Username, inicio.Password);
                if (InicioSesion.Item1.Count != 0)
                {
                    if (InicioSesion.Item1.Where(x => x.IdEstado == Convert.ToInt64(Utilidades.Entidades.Enumeraciones.EstadoUsuario.Activo)).Count() > 0
                        && InicioSesion.Item7.Where(x => x.IdEstado == Convert.ToInt64(Utilidades.Entidades.Enumeraciones.EstadoPago.Terminado)).Count() > 0)
                    {
                        SesionCtrl.OpcionUsuario = InicioSesion.Item3;
                        SesionCtrl.CuentaActual = InicioSesion.Item5.FirstOrDefault();
                        SesionCtrl.PersonaActual = InicioSesion.Item4.FirstOrDefault();
                        SesionCtrl.ContratoActual = InicioSesion.Item6.FirstOrDefault();
                        SesionCtrl.UsuarioActual = InicioSesion.Item1.FirstOrDefault();
                        SesionCtrl.OpcionTipoUsuario = UsuarioBLL.ObtenerOpcionesTipoUsuario();
                        return Ok("Iniciar sesion");
                    }
                    //else
                    {
                        return Unauthorized();
                    }
                }
                //else
                {
                    return Unauthorized();
                }
            }
            catch (SqlException sql)
            {
                return NotFound();
            }
            catch (Exception e)
            {
                return NotFound();
            }
            
        }
        [HttpPost]
        [ActionName("CargarOpciones")]
        public IHttpActionResult CargarOpciones()
        {
            List<Modulo> PaginasMenu = new List<Modulo>();
            List<Modulo> PaginasPrincipal = new List<Modulo>();
            //List<Modulo> PaginasMenu = SesionCtrl.OpcionUsuario.Where(x => x.Padre == 0 && x.IdTipoModulo== Convert.ToInt64(ControlAcceso.Entidades.Enumeraciones.TipoModulo.OpcionMenu)).ToList();
            //List<Modulo> PaginasPrincipal = SesionCtrl.OpcionUsuario.Where(x => x.Padre == 0 && x.IdTipoModulo == Convert.ToInt64(ControlAcceso.Entidades.Enumeraciones.TipoModulo.OpcionPrincipal)).ToList();
            foreach(Modulo Pagina in PaginasMenu)
            {
                Pagina.Hijos = SesionCtrl.OpcionUsuario.Where(x => x.Padre == Pagina.IdModulo).ToList();
            }
            foreach (Modulo Pagina in PaginasPrincipal)
            {
                Pagina.Hijos = SesionCtrl.OpcionUsuario.Where(x => x.Padre == Pagina.IdModulo).ToList();
            }
            var Retorno = new { PaginasMenu = PaginasMenu, PaginasPrincipal = PaginasPrincipal,
                PersonaUsuario = PersonaBLL.ObtenerNombrePersona(SesionCtrl.PersonaActual), RazonSocial=SesionCtrl.CuentaActual.RazonSocial,
                FotoPersona=SesionCtrl.PersonaActual.FotoUrl};
            return Json(JsonConvert.SerializeObject(Retorno));
        }
        [HttpPost]
        [ActionName("EnviarCorreoOlvideUsuario")]
        public IHttpActionResult EnviarCorreoOlvideUsuario(InicioSesionModel inicio)
        {
            var Retorno = new { Notificacion = NotificacionesBLL<InterCorreo>.EnviarCorreo(inicio.Correo, new OlvideUsuarioBLL()) };
            return Json(JsonConvert.SerializeObject(Retorno));
        }
        [HttpPost]
        [ActionName("ObtenerOlvideUsuario")]
        public IHttpActionResult ObtenerOlvideUsuario()
        {
            var Retorno = new { Usuario = SesionCtrl.UsuariosOlvideUsuario };
            return Json(JsonConvert.SerializeObject(Retorno));
        }
        [HttpPost]
        [ActionName("ObtenerLicencia")]
        public IHttpActionResult ObtenerLicencia()
        {
            var Retorno = new { Licencia = SesionCtrl.LicenciaCrearUsuario };
            return Json(JsonConvert.SerializeObject(Retorno));
        }
        [HttpPost]
        [ActionName("CambiarPassword")]
        public IHttpActionResult CambiarPassword(InicioSesionModel inicio)
        {
            var Retorno = new { Respuesta = false };
            OlvideUsuarioBLL olvideUsuario = new OlvideUsuarioBLL();
            if(olvideUsuario.TerminarNotificacion(new Guid(inicio.IdNotificacion)))
            {
                Retorno = new { Respuesta = ControlAccesoBLL.CambiarPassword(inicio.Id, inicio.Password) };
            }            
            return Json(JsonConvert.SerializeObject(Retorno));
        }
        public IHttpActionResult CargarDatos(ObjetoAutocomplete tipo)
        {
            List<ObjetoAutocomplete> objeto = new List<ObjetoAutocomplete>();
            List<ObjetoSeleccionable> seleccionable = new List<ObjetoSeleccionable>();
            switch (tipo.OpcionParametro)
            {
                case "Pais":
                    foreach(Pais pais in AplicationCtrl.Paises)
                    {
                        objeto.Add(new ObjetoAutocomplete { id = pais.IdPais, value = pais.value, objeto=pais });
                    }
                    break;
                case "PaisCuenta":
                    List<Pais> paisescuenta = PaisBLL.ConsultarPaisesPorCuenta(SesionCtrl.CuentaActual.IdCuentaCliente);
                    foreach(Pais pais in paisescuenta)
                    {
                        objeto.Add(new ObjetoAutocomplete { id = pais.IdPais, value = pais.value, objeto=pais });
                    }
                    break;
                case "TipoUsuario":
                    TipoUsuario superadmin = SesionCtrl.OpcionTipoUsuario.Where(x => x.IdTipoUsuario == Convert.ToInt64(ControlAcceso.Entidades.Enumeraciones.TipoUsuario.SuperAdministrador)).Single();
                    List<TipoUsuario> seleccion = new List<TipoUsuario>(SesionCtrl.OpcionTipoUsuario);
                    seleccion.Remove(superadmin);
                    foreach (TipoUsuario tipousuario in seleccion)
                    {
                        seleccionable.Add(new ObjetoSeleccionable { Id = tipousuario.IdTipoUsuario, Nombre = tipousuario.Nombre, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
                    }
                    break;
                case "RelacionProveedorCliente":
                    List<Dominio> dominios = DominioBLL.ObtenerDominioPorTipoDominio(Convert.ToInt64(Utilidades.Entidades.Enumeraciones.TipoDominio.RelacionProveedorCliente),null);
                    foreach (Dominio dominio in dominios)
                    {
                        seleccionable.Add(new ObjetoSeleccionable { Id = dominio.id_dominio, Nombre = dominio.nombre, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
                    }
                    break;
                case "TipoDocumento":
                    List<Dominio> TipoDocumento = AplicationCtrl.TipoDocumento;
                    foreach (Dominio dominio in TipoDocumento)
                    {
                        seleccionable.Add(new ObjetoSeleccionable { Id = dominio.idprograma, Nombre = dominio.nombre, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
                    }
                    //foreach(dynamic tipodocumento in AplicationCtrl.TiposDocumento)
                    //{
                    //    seleccionable.Add(new ObjetoSeleccionable { Id = Convert.ToInt64(tipodocumento.Id), Nombre = tipodocumento.Nombre, ExpresionRegular= tipodocumento.ExpresionRegular,MensajeValidacion= tipodocumento.MensajeValidacion });
                    //}
                    break;
                case "CaracteristicaCliente":
                    List<Caracteristica> caracteristicascliente = CaracteristicaBLL.ObtenerCaracteristicaPorTipoCaracteristica(Convert.ToInt32(Utilidades.Entidades.Enumeraciones.TipoCaracteristica.Cliente));
                    foreach (Caracteristica caracteristica in caracteristicascliente)
                    {
                        seleccionable.Add(new ObjetoSeleccionable { Id = Convert.ToInt64(caracteristica.idcaracteristica), Nombre = caracteristica.nombre, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
                    }
                    break;
                case "CaracteristicaProveedor":
                    List<Caracteristica> caracteristicasproveedor = CaracteristicaBLL.ObtenerCaracteristicaPorTipoCaracteristica(Convert.ToInt32(Utilidades.Entidades.Enumeraciones.TipoCaracteristica.Proveedor));
                    foreach (Caracteristica caracteristica in caracteristicasproveedor)
                    {
                        seleccionable.Add(new ObjetoSeleccionable { Id = Convert.ToInt64(caracteristica.idcaracteristica), Nombre = caracteristica.nombre, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
                    }
                    break;
                case "TipoProveedor":
                    List<Dominio> tipoproveedor = AplicationCtrl.TipoProveedor;
                    //List<Dominio> tipoproveedor = DominioBLL.ObtenerDominioPorTipoDominio(Convert.ToInt64(Utilidades.Entidades.Enumeraciones.TipoDominio.TipoProveedor), null);
                    foreach (Dominio dominio in tipoproveedor)
                    {
                        //seleccionable.Add(new ObjetoSeleccionable { Id = dominio.id_dominio, Nombre = dominio.nombre, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
                        seleccionable.Add(new ObjetoSeleccionable { Id = dominio.idprograma, Nombre = dominio.nombre, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
                    }
                    break;
                case "ModoTransporte":
                    List<Dominio> modotransporte = AplicationCtrl.ModoTransporte;                                        
                    foreach (Dominio dominio in modotransporte)
                    {
                        seleccionable.Add(new ObjetoSeleccionable { Id = dominio.idprograma, Nombre = dominio.nombre, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
                        
                    }
                    break;
                case "TipoDocumentoArchivo":
                    List<Dominio> tipodocumentoarchivo = AplicationCtrl.TipoDocumentoArchivo;
                    foreach (Dominio dominio in tipodocumentoarchivo)
                    {
                        seleccionable.Add(new ObjetoSeleccionable { Id = dominio.idprograma, Nombre = dominio.nombre, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });

                    }
                    break;
                case "Contactosinternos":
                    List<Dominio> contactosinternos = AplicationCtrl.Contactosinternos;
                    foreach (Dominio dominio in contactosinternos)
                    {
                        seleccionable.Add(new ObjetoSeleccionable { Id = dominio.idprograma, Nombre = dominio.nombre, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
                    }
                    break;
                case "TipoOperacion":
                    List<Dominio> tipooperacion = AplicationCtrl.TipoOperacion;
                    foreach (Dominio dominio in tipooperacion)
                    {
                        seleccionable.Add(new ObjetoSeleccionable { Id = dominio.idprograma, Nombre = dominio.nombre, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
                    }
                    break;
                case "Modalidad":
                    
                    List<Dominio> modalidad = AplicationCtrl.Modalidad;
                    foreach (Dominio dominio in modalidad)
                    {
                        seleccionable.Add(new ObjetoSeleccionable { Id = dominio.idprograma, Nombre = dominio.nombre, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
                    }
                    break;
                case "UN":

                    List<Dominio> UN = AplicationCtrl.UN;
                    foreach (Dominio dominio in UN)
                    {
                        seleccionable.Add(new ObjetoSeleccionable { Id = dominio.idprograma, Nombre = dominio.nombre, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
                    }
                    break;

                case "LugarBodega":                    


                    List<Dominio> lugarbodega = AplicationCtrl.LugarBodega;
                    foreach (Dominio dominio in lugarbodega)
                    {
                        seleccionable.Add(new ObjetoSeleccionable { Id = dominio.idprograma, Nombre = dominio.nombre, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
                    }
                    break;
                case "TipoCarga":
                    List<Dominio> tipocarga = AplicationCtrl.TipoCarga;                   
                    //List<Dominio> tipocarga = DominioBLL.ObtenerDominioPorTipoDominio(Convert.ToInt64(Utilidades.Entidades.Enumeraciones.TipoDominio.TipoCarga), null);
                    foreach (Dominio dominio in tipocarga)
                    {
                        seleccionable.Add(new ObjetoSeleccionable { Id = dominio.idprograma, Nombre = dominio.nombre, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
                    }
                    break;
                case "Item":
                    List<Dominio> item = AplicationCtrl.Item;
                    //List<Dominio> tipocarga = DominioBLL.ObtenerDominioPorTipoDominio(Convert.ToInt64(Utilidades.Entidades.Enumeraciones.TipoDominio.TipoCarga), null);
                    foreach (Dominio dominio in item)
                    {
                        seleccionable.Add(new ObjetoSeleccionable { Id = dominio.idprograma, Nombre = dominio.nombre, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
                    }
                    break;
                case "TipoEmbalaje":
                    List<Dominio> tipoembalaje = AplicationCtrl.TipoEmbalaje;
                    //List<Dominio> tipocarga = DominioBLL.ObtenerDominioPorTipoDominio(Convert.ToInt64(Utilidades.Entidades.Enumeraciones.TipoDominio.TipoCarga), null);
                    foreach (Dominio dominio in tipoembalaje)
                    {
                        seleccionable.Add(new ObjetoSeleccionable { Id = dominio.idprograma, Nombre = dominio.nombre, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
                    }
                    break;
                case "ItemMensajeria":
                    List<Dominio> itemMensajeria = AplicationCtrl.ItemMensajeria;
                    //List<Dominio> tipocarga = DominioBLL.ObtenerDominioPorTipoDominio(Convert.ToInt64(Utilidades.Entidades.Enumeraciones.TipoDominio.TipoCarga), null);
                    foreach (Dominio dominio in itemMensajeria)
                    {
                        seleccionable.Add(new ObjetoSeleccionable { Id = dominio.idprograma, Nombre = dominio.nombre, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
                    }
                    break;
                case "RubroCotizacion":
                    List<Dominio> rubroCotizacion = AplicationCtrl.RubroCotizacion;
                    //List<Dominio> tipocarga = DominioBLL.ObtenerDominioPorTipoDominio(Convert.ToInt64(Utilidades.Entidades.Enumeraciones.TipoDominio.TipoCarga), null);
                    foreach (Dominio dominio in rubroCotizacion)
                    {
                        seleccionable.Add(new ObjetoSeleccionable { Id = dominio.idprograma, Nombre = dominio.nombre, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
                    }
                    break;
                case "RateClassCode":
                    List<Dominio> rateClassCode = AplicationCtrl.RateClassCode;
                    //List<Dominio> tipocarga = DominioBLL.ObtenerDominioPorTipoDominio(Convert.ToInt64(Utilidades.Entidades.Enumeraciones.TipoDominio.TipoCarga), null);
                    foreach (Dominio dominio in rateClassCode)
                    {
                        seleccionable.Add(new ObjetoSeleccionable { Id = dominio.idprograma, Nombre = dominio.nombre, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
                    }
                    break;
                case "TipoContenedor":
                    List<Dominio> tipoContenedor = AplicationCtrl.TipoContenedor;
                    //List<Dominio> tipocarga = DominioBLL.ObtenerDominioPorTipoDominio(Convert.ToInt64(Utilidades.Entidades.Enumeraciones.TipoDominio.TipoCarga), null);
                    foreach (Dominio dominio in tipoContenedor)
                    {
                        seleccionable.Add(new ObjetoSeleccionable { Id = dominio.idprograma, Nombre = dominio.nombre, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
                    }
                    break;
                case "Moneda":
                    List<Dominio> moneda = AplicationCtrl.Moneda;
                    //List<Dominio> tipocarga = DominioBLL.ObtenerDominioPorTipoDominio(Convert.ToInt64(Utilidades.Entidades.Enumeraciones.TipoDominio.TipoCarga), null);
                    foreach (Dominio dominio in moneda)
                    {
                        seleccionable.Add(new ObjetoSeleccionable { Id = dominio.idprograma, Nombre = dominio.nombre, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
                    }
                    break;
                case "UndmedidaDistancia":
                    List<Dominio> undmedidadistancia = AplicationCtrl.UndmedidaDistancia;
                    //List<Dominio> tipocarga = DominioBLL.ObtenerDominioPorTipoDominio(Convert.ToInt64(Utilidades.Entidades.Enumeraciones.TipoDominio.TipoCarga), null);
                    foreach (Dominio dominio in undmedidadistancia)
                    {
                        seleccionable.Add(new ObjetoSeleccionable { Id = dominio.idprograma, Nombre = dominio.nombre, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
                    }
                    break;
                case "UndmedidaVolumen":
                    List<Dominio> undmedidavolumen = AplicationCtrl.UndmedidaVolumen;
                    //List<Dominio> tipocarga = DominioBLL.ObtenerDominioPorTipoDominio(Convert.ToInt64(Utilidades.Entidades.Enumeraciones.TipoDominio.TipoCarga), null);
                    foreach (Dominio dominio in undmedidavolumen)
                    {
                        seleccionable.Add(new ObjetoSeleccionable { Id = dominio.idprograma, Nombre = dominio.nombre, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
                    }
                    break;
                case "UndmedidaPeso":
                    List<Dominio> undmedidapeso = AplicationCtrl.UndmedidaPeso;
                    //List<Dominio> tipocarga = DominioBLL.ObtenerDominioPorTipoDominio(Convert.ToInt64(Utilidades.Entidades.Enumeraciones.TipoDominio.TipoCarga), null);
                    foreach (Dominio dominio in undmedidapeso)
                    {
                        seleccionable.Add(new ObjetoSeleccionable { Id = dominio.idprograma, Nombre = dominio.nombre, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
                    }
                    break;
                case "FactorEstiba":                    
                    //List<Dominio> factorestiba = DominioBLL.ObtenerDominioPorTipoDominio(Convert.ToInt64(Utilidades.Entidades.Enumeraciones.TipoDominio.FactorEstiba), null);
                    foreach (Dominio dominio in AplicationCtrl.ModoTransporte)
                    {
                        if (dominio.caracteristicas.Exists(caracteristica => caracteristica.nombrecaracteristica.Equals("ValorFactor")))
                        {
                            seleccionable.Add(new ObjetoSeleccionable { Id = dominio.idprograma, Nombre = dominio.nombre, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
                        }
                    }
                    seleccionable.Add(new ObjetoSeleccionable { Id = 0, Nombre = "Ingrese valor", ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
                    break;
                case "Cliente":
                    SesionCtrl.ClientesCuentaActual = ClienteBLL.ConsultarClientesPorCuenta(/*SesionCtrl.CuentaActual.IdCuentaCliente*/1);
                    foreach (Cliente cliente in SesionCtrl.ClientesCuentaActual)
                    {
                        objeto.Add(new ObjetoAutocomplete { id = cliente.idcliente, value = cliente.razonsocial, objeto=cliente });
                    }
                    break;
                case "Ciudad":
                    foreach (Ciudad ciudad in AplicationCtrl.Ciudades)
                    {
                        //foreach (Ciudad ciudad in pais.Ciudades)
                        //{
                            objeto.Add(new ObjetoAutocomplete { id = ciudad.idciudad, value = ciudad.nombreciudad+" "+"("+ciudad.paisciudad.Codigo+ciudad.codigociudad+")", objeto = ciudad });
                        //}
                    }
                    break;
                
                case "Exportador":

                    List<Cliente> clientescuentaclienteexportador= ClienteBLL.ConsultarClientesPorCuenta(/*SesionCtrl.CuentaActual.IdCuentaCliente*/1);
                    foreach (Cliente exportador in clientescuentaclienteexportador.Where(x=>x.idtipocliente==2).ToList())
                    {
                        objeto.Add(new ObjetoAutocomplete { id = exportador.idcliente, value = exportador.razonsocial, objeto= exportador });
                    }
                    break;
                case "Importador":
                    List<Cliente> clientescuentaclienteimportador = ClienteBLL.ConsultarClientesPorCuenta(/*SesionCtrl.CuentaActual.IdCuentaCliente*/1);
                    foreach (Cliente importador in clientescuentaclienteimportador.Where(x => x.idtipocliente == 1).ToList())
                    {
                        objeto.Add(new ObjetoAutocomplete { id = importador.idcliente, value = importador.razonsocial, objeto = importador });
                    }
                    break;
                case "exportadoreimportador":
                    List<Cliente> exportadoreimportador = AplicationCtrl.Exportador;
                    List<Cliente> importadorsolo = AplicationCtrl.Importador;
                    exportadoreimportador.AddRange(importadorsolo);
                    foreach (Cliente dominio in exportadoreimportador)
                    {
                        objeto.Add(new ObjetoAutocomplete { id = dominio.idcliente, value = dominio.razonsocial, objeto = dominio });
                    }
                    break;
                case "Incoterm":
                    List<Dominio> incoterm = AplicationCtrl.Incoterm;
                
                    
                    //foreach (Incoterm incoterm in AplicationCtrl.Incoterm)
                    foreach (Dominio dominio in incoterm)
                    {
                        seleccionable.Add(new ObjetoSeleccionable { Id = dominio.idprograma, Nombre = dominio.nombre, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });

                        //seleccionable.Add(new ObjetoSeleccionable { Id = incoterm.idincoterm, Nombre = incoterm.codigo, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
                    }
                    break;
                case "Caracteristicasmercancia":
                    List<Dominio> caracteristicasmercancia = AplicationCtrl.Caracteristicasmercancia;

                    foreach (Dominio dominio in caracteristicasmercancia)
                    {
                        seleccionable.Add(new ObjetoSeleccionable { Id = dominio.idprograma, Nombre = dominio.nombre, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });

                        //seleccionable.Add(new ObjetoSeleccionable { Id = incoterm.idincoterm, Nombre = incoterm.codigo, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
                    }
                    break;
                case "TipoMercancia":
                    List<Dominio> tipomercancia = AplicationCtrl.TipoMercancia;

                    foreach (Dominio dominio in tipomercancia)
                    {
                        seleccionable.Add(new ObjetoSeleccionable { Id = dominio.idprograma, Nombre = dominio.nombre, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });

                        
                    }
                    break;
                case "TrayectoAsegurado":
                    List<Dominio> trayectoAsegurado = AplicationCtrl.TrayectoAsegurado;

                    foreach (Dominio dominio in trayectoAsegurado)
                    {
                        seleccionable.Add(new ObjetoSeleccionable { Id = dominio.idprograma, Nombre = dominio.nombre, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });

                        
                    }
                    break;
                case "ClienteProveedor":
                    List<Cliente> clienteproveedor = new List<Cliente>();
                    clienteproveedor.Add(new Cliente() { idcliente = 1, razonsocial = "cliente 1", idtipodocumento = 2, numerodocumento = 900187654, pais = new Pais { IdPais = 1, Nombre = "Colombia" }, notificacion= "asd" });
                    clienteproveedor.Add(new Cliente() { idcliente = 2, razonsocial = "cliente 2", idtipodocumento = 1, numerodocumento = 900123456, pais = new Pais { IdPais = 1, Nombre = "Colombia" }, notificacion = "asd" });
                    clienteproveedor.Add(new Cliente() { idcliente = 3, razonsocial = "cliente 3", idtipodocumento = 2, numerodocumento = 900456321, pais = new Pais { IdPais = 1, Nombre = "Colombia" }, notificacion = "asd" });
                    foreach (Cliente dominio in clienteproveedor)
                    {
                        objeto.Add(new ObjetoAutocomplete { id = dominio.idcliente, value = dominio.razonsocial, objeto = dominio });                                                
                    }
                    break;
                case "RazonSocial":
                    List<ProveedorAgente> proveedores = new List<ProveedorAgente>();
                    proveedores.Add(new ProveedorAgente()
                    {
                        
                        RazonSocial = "Naviera",
                        IsAseguradora = false,
                        //IsTraspor = true,
                        IsModal = false,
                        //IsTiop = true,
                        IsIncot = true,
                        IdProveedorAgente = 1,
                        IdTipoProveedor=1
                    });
                    proveedores.Add(new ProveedorAgente()
                    {
                        IsVer=false,
                        IsAseguradora = false,                        
                        //IsTraspor = true,
                        IsModal = false,
                        //IsTiop = false,
                        IsIncot = true,                        
                        RazonSocial = "Aerolinea",
                        IdProveedorAgente = 2,
                        IdTipoProveedor=2
                    });
                    proveedores.Add(new ProveedorAgente()
                    {
                        IsAseguradora = true,                       
                        //IsTraspor = true,
                        IsModal = false,
                        //IsTiop = false,
                        IsIncot = false,
                        RazonSocial = "Aseguradora",
                        IdProveedorAgente = 3,
                        IdTipoProveedor=3
                    });
                    proveedores.Add(new ProveedorAgente()
                    {
                        IsAseguradora = false,
                        //IsTraspor = false,
                        IsModal = true,
                        //IsTiop = false,
                        IsIncot = true,
                        RazonSocial = "Aduana",
                        IdProveedorAgente = 4,
                        IdTipoProveedor=4
                    });
                    proveedores.Add(new ProveedorAgente()
                    {
                        IsAseguradora = false,
                        //IsTraspor = false,
                        IsModal = false,
                        //IsTiop = true,
                        IsIncot = true,
                        RazonSocial = "Transportador ",
                        IdProveedorAgente = 5,
                        IdTipoProveedor=5
                    });
                    proveedores.Add(new ProveedorAgente()
                    {
                        IsAseguradora = false,
                        //IsTraspor = true,
                        IsModal = false,
                        //IsTiop = true,
                        IsIncot = false,
                        RazonSocial = "Deposito",
                        IdProveedorAgente = 6,
                        IdTipoProveedor=6
                    });
                    proveedores.Add(new ProveedorAgente()
                    {
                        IsAseguradora = false,
                        //IsTraspor = false,
                        IsModal = true,
                        //IsTiop = true,
                        IsIncot = true,
                        RazonSocial = "Agente de Carga",
                        IdProveedorAgente = 7,
                        IdTipoProveedor=7
                    });
                    proveedores.Add(new ProveedorAgente()
                    {
                        IsAseguradora = false,
                        //IsTraspor = true,
                        IsModal = false,
                        //IsTiop = true,
                        IsIncot = false,
                        RazonSocial = "Mensajeria",
                        IdProveedorAgente = 8,
                        IdTipoProveedor=8
                    });
                    proveedores.Add(new ProveedorAgente()
                    {
                        IsAseguradora = false,
                        //IsTraspor = true,
                        IsModal = false,
                        //IsTiop = true,
                        IsIncot = false,
                        RazonSocial = "Agente de carga consolidador NVOCC ",
                        IdProveedorAgente = 9,
                        IdTipoProveedor = 9
                    });
                    proveedores.Add(new ProveedorAgente()
                    {
                        IsAseguradora = false,
                        //IsTraspor = true,
                        IsModal = false,
                        //IsTiop = true,
                        IsIncot = false,
                        RazonSocial = "Compañía de transporte Ferroviario",
                        IdProveedorAgente = 10,
                        IdTipoProveedor = 10
                    }); 
                    proveedores.Add(new ProveedorAgente()
                    {
                        IsAseguradora = false,
                        //IsTraspor = true,
                        IsModal = false,
                        //IsTiop = true,
                        IsIncot = false,
                        RazonSocial = "naviera 2.0",
                        IdProveedorAgente = 11,
                        IdTipoProveedor = 1
                    });
                    proveedores.Add(new ProveedorAgente()
                    {
                        IsAseguradora = false,
                        //IsTraspor = false,
                        IsModal = true,
                        //IsTiop = false,
                        IsIncot = true,
                        RazonSocial = "Aduana gran colombia",
                        IdProveedorAgente = 12,
                        IdTipoProveedor = 4
                    });
                    foreach (ProveedorAgente dominio in proveedores)
                    {
                        objeto.Add(new ObjetoAutocomplete { id = dominio.IdProveedorAgente, value = dominio.RazonSocial, objeto=dominio });

                        //seleccionable.Add(new ObjetoSeleccionable { Id = incoterm.idincoterm, Nombre = incoterm.codigo, ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
                    }
                    //List < ProveedorAgente> proveedores = ProveedorBLL.ObtenerProveedores(SesionCtrl.CuentaActual.IdCuentaCliente);
                    break;
         
            }
            dynamic Retorno=new { TipoDocumento = AplicationCtrl.TiposDocumento,
                Paises = AplicationCtrl.Paises,
                ObjetoAutocomplete =objeto,
                ObjetoSeleccionable=seleccionable};
            return Json(JsonConvert.SerializeObject(Retorno));
        }


        [HttpPost]
        [ActionName("CrearSeleccionablePrecargado")]
        public IHttpActionResult CrearSeleccionablePrecargado(ListaSeleccionable lista)
        {
            List<ObjetoSeleccionable> seleccionable = new List<ObjetoSeleccionable>();
            //for(int i = 0; i < datos.Length; i++)
            //{
            //    string nombre = datos[i].ToString();
            //    seleccionable.Add(new ObjetoSeleccionable { Id = i, Nombre = nombre, ExpresionRegular = string.Empty,MensajeValidacion=string.Empty });
            //}
            int contador = 1;
            foreach(object dato in lista.datos)
            {
                seleccionable.Add(new ObjetoSeleccionable { Id = contador, Nombre = dato.ToString(), ExpresionRegular = string.Empty, MensajeValidacion = string.Empty });
                contador++;
            }


            dynamic Retorno;
            Retorno = new { ObjetoSeleccionable = seleccionable };
            return Json(JsonConvert.SerializeObject(Retorno));

            
        }









        [HttpPost]
        [ActionName("Preregistrar")]
        public IHttpActionResult Preregistrar(Registro registro)
        {
            dynamic Retorno;
            try
            {
                foreach (dynamic p in registro.Pais)
                {
                    string NombrePais=p.Pais;
                    Pais k=AplicationCtrl.Paises.FirstOrDefault(x => x.Nombre == NombrePais);
                    p.ValorPais = k.ValorPais;
                }
                ControlAccesoBLL.PreRegistrarUsuario(registro.TipoDocumento,registro.NumeroDocumento,
                    registro.RazonSocial,registro.Telefono,registro.Direccion,registro.CorreoElectronico,registro.Pais,
                    registro.Nombres,registro.Apellidos,registro.Archivo,registro.NombreArchivo);
                RegistroBLL.CorreoPreRegistrarUsuario(registro.CorreoElectronico,registro.RazonSocial, registro.Telefono,
                    registro.Direccion,registro.Nombres,registro.Apellidos,registro.TipoDocumento+"",registro.NumeroDocumento);
                Retorno = new { OpcionRegistro = true };
                return Json(JsonConvert.SerializeObject(Retorno));
            }
            catch(Exception e)
            {
                Retorno = new { OpcionRegistro = false };
                return Json(JsonConvert.SerializeObject(Retorno));
            }
        }
        [HttpPost]
        [ActionName("ActivarUsuario")]
        public IHttpActionResult ActivarUsuario(UsuarioModel usuario)
        {
            try
            {
                ControlAccesoBLL.ActivarUsuario(usuario.TipoDocumento, usuario.NumeroDocumento, usuario.Nombres, usuario.Apellidos,
                    usuario.NombreUsuario, Utilidades.BLL.UtilidadesBLL.Encriptar(usuario.Password),usuario.LicenciaUsuario,usuario.Tipo);
            }
            catch(Exception e)
            {
                var Retorno = new { Mensaje = e.Message };
                return Json(JsonConvert.SerializeObject(Retorno));
            }
            return Json("");
        }
        [HttpPost]
        [ActionName("ObtenerOpcionesTipoUsuario")]
        public IHttpActionResult ObtenerOpcionesTipoUsuario()
        {
            try
            {
                List<TipoUsuario> tiposusuarios = SesionCtrl.OpcionTipoUsuario;
                List<long?> opcionesseleccionadas = new List<long?>();
                string NombreModulo = string.Empty;
                bool isAdmin = false;
                bool isSuperAdmin = false;
                TipoUsuario superadmin = null;
                List<OpcionesArboles> arboles = new List<OpcionesArboles>();
                foreach(TipoUsuario tipo in tiposusuarios)
                {
                    isAdmin = false;
                    isSuperAdmin = false;
                    if (tipo.IdTipoUsuario == Convert.ToInt64(ControlAcceso.Entidades.Enumeraciones.TipoUsuario.SuperAdministrador))
                    {
                        superadmin = tipo;
                        isSuperAdmin = true;
                    }
                    else if(tipo.IdTipoUsuario == Convert.ToInt64(ControlAcceso.Entidades.Enumeraciones.TipoUsuario.Administrativo))
                    {
                        isAdmin = true;
                    }
                    foreach (Modulo modulo in tipo.Opciones)
                    {
                        OpcionesArboles arbol = new OpcionesArboles();
                        arbol.id = modulo.IdModulo;
                        arbol.label = modulo.Pagina;
                        arbol.children = new List<OpcionesArboles>();
                        if (isSuperAdmin)
                        {
                            if ((modulo.Padre is null))
                            {
                                arboles.Add(arbol);
                            }
                            else
                            {
                                OpcionesArboles arbolsup = arboles.FirstOrDefault(p => p.id == modulo.Padre);
                                arbolsup.children.Add(arbol);
                            }
                        }else if (isAdmin)
                        {
                            opcionesseleccionadas.Add(arbol.id);
                        }                        
                    }
                }
                var Retorno = new { Arbol= arboles, Seleccion= opcionesseleccionadas, IdAdmin = Convert.ToInt64(ControlAcceso.Entidades.Enumeraciones.TipoUsuario.Administrativo) };
                return Json(JsonConvert.SerializeObject(Retorno));
            }
            catch(Exception e)
            {
                var Retorno = new { Mensaje = e.Message };
                return Json(JsonConvert.SerializeObject(Retorno));
            }
        }
        [HttpPost]
        [ActionName("SeleccionarModuloPorTipoUsuario")]
        public IHttpActionResult SeleccionarModuloPorTipoUsuario(TipoUsuario TipoUsuario)
        {
            List<OpcionesArboles> arboles = new List<OpcionesArboles>();
            List<long?> opcionesseleccionadas = new List<long?>();
            TipoUsuario tipo = SesionCtrl.OpcionTipoUsuario.FirstOrDefault(x => x.IdTipoUsuario == TipoUsuario.IdTipoUsuario);
            foreach (Modulo modulo in tipo.Opciones)
            {
                opcionesseleccionadas.Add(modulo.IdModulo);
            }
            var Retorno = new { Seleccion = opcionesseleccionadas };
            return Json(JsonConvert.SerializeObject(Retorno));
        }
        [HttpPost]
        [ActionName("CrearUsuario")]
        public IHttpActionResult CrearUsuario(UsuarioModel user)
        {
            try
            {
                if (PaisBLL.ObtenerDetalleUsuariosPais(Convert.ToInt64(user.Pais), SesionCtrl.CuentaActual.IdCuentaCliente))
                {
                    List<object> Modulos=new List<object>();
                    foreach(long? x in user.Opciones)
                    {
                        Modulos.Add( new { Modulo=x });
                    }
                    Tuple<string,Guid> crearUsuario = ControlAccesoBLL.CrearUsuario(user.Nombres, user.Apellidos, user.TipoUsuario, user.Cargo, user.NombreUsuario, user.Pais, user.Correo, Modulos, SesionCtrl.CuentaActual.IdCuentaCliente);
                    ActivarUsuarioBLL.EnviarCorreo(user.Correo,user.Nombres,crearUsuario.Item2);
                    string MensajeRetornado = crearUsuario.Item1;
                    var Retorno = new { Mensaje = MensajeRetornado };
                    return Json(JsonConvert.SerializeObject(Retorno));
                }
                else
                {
                    var Retorno = new { Mensaje = "El usuario no puede ser registrado para el país ingresado porque se ha excedido el número de usuarios." };
                    return Json(JsonConvert.SerializeObject(Retorno));
                }               
            }
            catch(Exception e)
            {
                var Retorno = new { Mensaje = e.Message };
                return Json(JsonConvert.SerializeObject(Retorno));
            }
        }
    }
}
