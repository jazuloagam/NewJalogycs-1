using Jalogycs.Helpers;
using Jalogycs.Models.Logistica;
using Jalogycs.Models.Cliente;
using Personas.BLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using Personas.Entidades;

namespace Jalogycs.Controllers
{
    public class ClienteApiController : ApiController
    {
        private object contacto;

        [HttpPost]
        [ActionName("Obtenercontactoscliente")]
        public IHttpActionResult Obtenercontactoscliente(ClienteModel modeloCliente)
        {
            List<Personas.Entidades.Cliente> clientescontactos = ClienteBLL.ConsultarClientesPorCuenta(1);

            dynamic Retorno = new
            {
                Contactos = clientescontactos
            };
            return Json(JsonConvert.SerializeObject(Retorno));
        }
        [HttpPost]
        [ActionName("Guardarcrearnuevocontacto")]
        public IHttpActionResult Guardarcrearnuevocontacto(Cliente modeloCliente)
        {
            List<ContactoCliente> contactosnew = new List<ContactoCliente>();
            List <Personas.Entidades.Cliente> clientescontactos = ClienteBLL.ConsultarClientesPorCuenta(1);
            List<Personas.Entidades.Cliente> newclientescontactos = ClienteBLL.ConsultarClientesPorCuenta(1);
            
            foreach (Cliente contacto in clientescontactos)
            {
                if (modeloCliente.razonsocial == contacto.razonsocial) {
                    contactosnew = contacto.contactos;
                    contactosnew.Add(new ContactoCliente { contacto = new Contacto { nombre = modeloCliente.contactos[0].contacto.nombre, telefono = modeloCliente.contactos[0].contacto.telefono, correo = modeloCliente.contactos[0].contacto.correo } });
                    var x = newclientescontactos.FindIndex(element => element.razonsocial == modeloCliente.razonsocial);
                    newclientescontactos[x].contactos = contactosnew;
                }            
            }
            
            dynamic Retorno = new
            {
                Contactos = newclientescontactos
            };
            return Json(JsonConvert.SerializeObject(Retorno));

        }

        [HttpPost]
        [ActionName("CrearCliente")]
        public IHttpActionResult CrearCliente(ClienteModel modeloCliente)
        {
            List<object> Contacto = modeloCliente.ContactoAsociadoCliente.ToList();
            List<object> Caracteristica = modeloCliente.CaracteristicasCliente.ToList();
            Contacto.RemoveAt(0); // Usado para eliminar el primer elemento de la lista
            Caracteristica.RemoveAt(0); // Usado para eliminar el primer elemento de la lista
            modeloCliente.ContactoAsociadoCliente = Contacto.ToArray();
            modeloCliente.CaracteristicasCliente = Caracteristica.ToArray();
            List<object> Proveedores = new List<object>();
            List<object> ContactoProveedor =new List<object>();
            List<object> CaracteristicaProveedor =new List<object>();
            int numproveedor = 0;
            int numcontactoproveedor = 0; // Usado para eliminar el primer elemento de la lista
            int numcaracteristicaproveedor = 0; // Usado para eliminar el primer elemento de la lista
            foreach (dynamic p in modeloCliente.Proveedor)
            {
                numcontactoproveedor = 0;
                numcaracteristicaproveedor = 0;
                Proveedores.Add(new
                {
                    proveedor = numproveedor,
                    RelacionCliente = p.RelacionCliente.Value,
                    DocumentoSeleccionado = p.DocumentoSeleccionado.Value,
                    NumeroIdentificacion = p.NumeroIdentificacion.Value,
                    RazonSocial = p.RazonSocial.Value,
                    Pais = AplicationCtrl.Paises.Find(x => x.Nombre.Equals(p.Pais.Value)).IdPais
                });
                foreach(dynamic c in p.Contacto)
                {
                    if (numcontactoproveedor > 0)
                    {
                        var elemento = System.Linq.Enumerable.FirstOrDefault(c);
                        ContactoProveedor.Add(new
                        {
                            proveedor = numproveedor,
                            Nombres = elemento.Nombres.Value,
                            Ciudad = elemento.Ciudad.Value,
                            Direccion = elemento.Direccion.Value,
                            CodigoPostal = elemento.CodigoPostal.Value,
                            SeleccionContactoPrincipal = elemento.SeleccionContactoPrincipal.Value,
                            Telefono = elemento.Telefono.Value,
                            Extension = elemento.Extension.Value,
                            Cargo = elemento.Cargo.Value,
                            Correo = elemento.Correo.Value
                        });
                    }
                    numcontactoproveedor++;
                }
                foreach (dynamic c in p.CaracteristicaProveedor)
                {
                    if (numcaracteristicaproveedor > 0)
                    {
                        var elemento = System.Linq.Enumerable.FirstOrDefault(c);
                        CaracteristicaProveedor.Add(new
                        {
                            proveedor = numproveedor,
                            Caracteristica = elemento.Caracteristica.Value,
                            Valor = elemento.Valor.Value
                        });
                    }                    
                    numcaracteristicaproveedor++;
                }
                numproveedor++;
            }
            ClienteBLL.CrearCliente(modeloCliente.TipoIdentificacionCliente,modeloCliente.NumeroIdentificacionCliente,
                modeloCliente.RazonSocialCliente, AplicationCtrl.Paises.FirstOrDefault(x => x.Nombre.Equals(modeloCliente.PaisCliente)).IdPais, 
                modeloCliente.ContactoAsociadoCliente.ToList(),modeloCliente.CaracteristicasCliente.ToList(),Proveedores,ContactoProveedor,CaracteristicaProveedor,SesionCtrl.CuentaActual.IdCuentaCliente);
            return Json("");
        }
    }
}
