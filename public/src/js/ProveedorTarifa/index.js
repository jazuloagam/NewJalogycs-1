import Vue from "vue";
import axios from 'axios';
import VueAxios from 'vue-axios';
import ElementUI, { Tooltip } from 'element-ui';
import autocomplete from '../../components/autocomplete.vue'
import seleccion from '../../components/seleccion.vue'
import tablainfo from '../../components/tablainfo.vue'
import tablaedit from '../../components/tablaedit.vue'
import tablaseleccion from '../../components/tablaseleccion.vue'
import seleccionmultiple from '../../components/seleccionmultiple.vue'
import fechacalendario from '../../components/fechacalendario.vue'


Vue.use(VueAxios, axios);
Vue.use(ElementUI);
Vue.config.productionTip = false;





new Vue({
   
    el: '#app-tarifaproveedor',
    components: { autocomplete, seleccion, tablainfo, tablaedit, tablaseleccion, seleccionmultiple, fechacalendario },
    
    data() {
        return {
            ruleForm: {
                razonsocial: '',
                origen: '',
                destino: '',
                Lugarentrega: '',
                modotransporte: [],
                modotransporteseleccionado: null,
                tipooperacion: [],
                tipooperacionseleccionado: null,
                tipocarga: [],
                tipocargaseleccionado: null,
                incoterm: [],
                incotermseleccionado: null,
                modalidad: [],
                modalidadseleccionado: null,
                visualizacion: [],
                visualizacionseleccionado: null,
                caracteristicasmercancia: [],
                caracteristicasmercanciaseleccionada: [],
                vigencia: new Date(),
                tipomercancia: [],
                tipomercanciaseleccionado: null,



            },
            rules: {
                razonsocial: [{ required: true, message: 'Por favor seleccione un nombre', trigger: ['blur', 'change'] },
                { min: 0, max: 200, message: 'El nombre debe ser menor a 200 caracteres', trigger: ['blur', 'change'] }],
                origen: [{ required: true, message: 'Por favor seleccione un nombre', trigger: ['blur', 'change'] },
                { min: 0, max: 200, message: 'El nombre debe ser menor a 200 caracteres', trigger: ['blur', 'change'] }],
                destino: [{ required: true, message: 'Por favor seleccione un nombre', trigger: ['blur', 'change'] },
                { min: 0, max: 200, message: 'El nombre debe ser menor a 200 caracteres', trigger: ['blur', 'change'] }],
                modotransporteseleccionado: [{ required: true, message: 'Por favor seleccione un modo de transporte', trigger: ['blur', 'change'] }],
                tipooperacionseleccionado: [{ required: true, message: 'Por favor seleccione un tipo de operación', trigger: ['blur', 'change'] }],
                tipocargaseleccionado: [{ required: true, message: 'Por favor seleccione un tipo de carga', trigger: ['blur', 'change'] }],
                vigencia: [{ type: 'date',required: true, message: 'Por favor seleccione una fecha', trigger: ['blur', 'change'] }]
            },
            //metodoobtenerincotermportransporte: '../api/LogisticaApi/ObtenerIncotermPorTransporte',
            metodoobtenermodalidadtransportetipoperacion: '../api/LogisticaApi/ObtenerModalidadTransporteTipoOperacion',
            metodoobtenermodotransportetipocarga: '../api/LogisticaApi/Obtenermodotransportetipocarga',
            metodoobtenermodotransporteincoterm: '../api/LogisticaApi/Obtenermodotransporteincoterm',
            metodobtenertipoproveedorrazonsocial: '../api/LogisticaApi/Obtenertipoproveedorrazonsocial',
            metodoobtenertipoproveedormodotransporte: '../api/LogisticaApi/Obtenertipoproveedormodotransporte',
            metodoobtenertipoproveedortipooperacion: '../api/LogisticaApi/Obtenertipoproveedortipooperacion',
            metodoobtenertipoproveedortipocarga: '../api/LogisticaApi/Obtenertipoproveedortipocarga',
            metodoobtenertipoproveedormodalidad: '../api/LogisticaApi/Obtenertipoproveedormodalidad',
            metodoobtenertipocargaitem: '../api/LogisticaApi/Obtenertipocargaitem',
            metodoobteneritemcasillacontenedor: '../api/LogisticaApi/Obteneritemcasillacontenedor',
            metododatosselecciontarifa: '../api/LogisticaApi/Datosselecciontarifa', 
            metodoobtenermodotransportecasillatipocontenedor: '../api/LogisticaApi/Obtenermodotransportecasillatipocontenedor',
            metodoobtenertipoproveedorincoterm: '../api/LogisticaApi/Obtenertipoproveedorincoterm',
            metododatostablaseleccionseguro: '../api/LogisticaApi/Datostablaseleccionseguro',
            metododatosselecciontarifamensajeriaydeposito: '../api/LogisticaApi/Datosselecciontarifamensajeriaydeposito',
            metodocargardatos: '../api/Login/CargarDatos',
            metodoguardarcreartarifasproveedor:'../api/LogisticaApi/Guardarcreartarifasproveedor',
            origenseleccionado: '', 
            destinoseleccionado: '',
            dialogFormOrigenVisible: false,
            dialogFormDestinoVisible: false,
            dialogFormProveedorAgente: false,
            datostabladestino: [],
            datostablaorigen: [],
            datoautocompletepuerto: [],
            datostablaproveedoragente: [],
            columnatablaproveedoragente: [{ id: 0, label: 'Numero Documento', prop: 'NumeroDocumento' }, { id: 1, label: 'Razon Social', prop: 'RazonSocial' }],
            columnatablapuerto: [{ id: 0, label: 'Nombre', prop: 'nombreciudad' }, { id: 1, label: 'Codigo', prop: 'codigociudad' }, { id: 2, label: 'Nombre', prop: 'paisciudadnombre' }, { id: 3, label: 'Codigo', prop: 'paisciudadcodigo' }],
            datotablaselecciontarifa: [],
            columnatablaselecciontarifa: [{ id: 0, label: 'Origen', prop: 'Origen', boton: false, popover: '', cargardato: false, fixed: true, cargarlista: [], width: '170px' }, { id: 1, label: 'Destino', prop: 'Destino', boton: false, popover: '', cargardato: false, cargarlista: [], width: '170px' }, { id: 2, label: 'Tipo de Operación', prop: 'TipoOperacion', tiposeleccion: 'TipoOperacion', boton: false, popover: '', cargardato: true, metodo: '../api/Login/CargarDatos', cargarlista: [], width: '150px' }, { id: 3, label: 'INCOTERM', prop: 'Incoterm', tiposeleccion: 'Incoterm', boton: false, popover: '', cargardato: true, metodo: '../api/Login/CargarDatos', cargarlista: [], width: '120px' }, { id: 4, label: 'Tarifa ingresada', prop: 'Tarifaingresada', boton: true, popover: 'anidada', propiedaddatospopover: 'TarifaSeleccionada', cargardato: false, cargarlista: [], width: '150px' }, { id: 5, label: 'Características Mercancía', prop: 'CaracterísticasMercancía', boton: true, popover: 'basic', cargardato: false, cargarlista: [], width: '210px' }, { id: 6, label: 'Dia de Ingreso Tarifa', prop: 'DiaIngreso', boton: false, popover: '', cargardato: false, cargarlista: [], width: '180px' }, { id: 7, label: 'Vigencia Tarifa', prop: 'VigenciaTarifa', boton: false, popover: '', cargardato: false, cargarlista: [], width: '140px'}],
            datotablaseleccionmensajeriaydeposito: [],
            columnatablaseleccionmensajeriaydeposito: [{ id: 0, label: 'Tipo de Operación', prop: 'TipoOperacion', tiposeleccion: 'TipoOperacion', cargardato: true, cargarlista: [], metodo: '../api/Login/CargarDatos', width: '0px' }, { id: 1, label: 'Tipo de Mercancia', prop: 'TipoMercancia', tiposeleccion: 'TipoMercancia', cargardato: true, cargarlista: [], metodo: '../api/Login/CargarDatos', width: '0px' }, { id: 2, label: 'Tarifa ingresada', prop: 'Tarifaingresada', boton: true, popover: 'anidada', propiedaddatospopover: 'TarifaSeleccionada', cargardato: false, cargarlista: [], width: '0px' }, { id: 3, label: 'Características Mercancía', prop: 'CaracterísticasMercancía', cargardato: false, boton: true, popover: 'basic', cargarlista: [], width: '210px' }, { id: 4, label: 'Dia de Ingreso Tarifa', prop: 'DiaIngreso', cargardato: false, cargarlista: [], width: '0px' }, { id: 5, label: 'Vigencia Tarifa', prop: 'VigenciaTarifa', cargardato: false, cargarlista: [], width: '0px'}],
            datotablaseleccionseguro: [],
            columnatablaseleccionseguro: [{ id: 0, label: 'Tipo de Mercancia', prop: 'TipoMercancia', tiposeleccion: 'TipoMercancia', cargardato: true, cargarlista: [], metodo: '../api/Login/CargarDatos', width: '180px' }, { id: 2, label: 'Tipo de Operación', prop: 'TipoOperacion', tiposeleccion: 'TipoOperacion', cargardato: true, boton: false, popover: 'normal', cargarlista: [], metodo: '../api/Login/CargarDatos', width: '180px' }, { id: 3, label: 'Modo de Transporte', prop: 'ModoTransporte', tiposeleccion: 'ModoTransporte', cargardato: true, boton: true, popover: 'normal', cargarlista: [], metodo: '../api/Login/CargarDatos', width: '180px' }, { id: 4, label: 'Tarifa ingresada', prop: 'Tarifaingresada', boton: true, popover: 'anidada', propiedaddatospopover: 'Selecciontarifaseguro', cargardato: false, cargarlista: [], width: '150px' }, { id: 1, label: 'Trayecto Asegurado', prop: 'TrayectoAsegurado', tiposeleccion: 'TrayectoAsegurado', cargardato: true, boton: true, popover: 'normal', cargarlista: [], metodo: '../api/Login/CargarDatos', width: '160px' }, { id: 5, label: 'Dia de Ingreso Tarifa', prop: 'DiaIngreso', cargardato: false, cargarlista: [], width: '180px' }, { id: 6, label: 'Vigencia Tarifa', prop: 'VigenciaTarifa', cargardato: false, cargarlista: [], width: '150px' }],
            israzonsocialseleccionado: false,
            isaseguradora: true,
            columnaidcambiodatoseleccion: [],
            columnatablaconceptotarifa:[],
            columnatablaconceptotarifainicial: [{
                id: 0, label: 'Concepto', prop: 'Concepto', tipocolumna: [], tipo: 'input', fixed: false, width: '200px', filtro: true },
                { id: 1, label: 'Rubro Cotización', prop: 'RubroCotizacion', tipocolumna: [], tipo: 'seleccion', deshabilitar: false, tiposeleccion: 'RubroCotizacion', datoseleccion: [], metodo: '../api/Login/CargarDatos', placeholder: 'Seleccione opción', width: '200px', fixed: false, filtro: true, cargarlista: []},
                { id: 2, label: 'Item', prop: 'Item', tipocolumna: [], tipo: 'seleccion', arreglotablas: [{ id: 0, tipoopcion: 'deshabilitar', queafecta: 'TipoContenedor', tipomatriz: 10, propiedadafectar: 'deshabilitar', nombremetodoconsulta: '../api/LogisticaApi/Obteneritemcasillacontenedor' }], tiposeleccion: 'Item', metodo: '../api/Login/CargarDatos', datoseleccion: [], placeholder: 'Seleccione opción', fixed: false, width: '200px', filtro: true, cargarlista: []},
                { id: 3, label: 'Tipo de Contenedor', prop: 'TipoContenedor', tipocolumna: [], tipo: 'seleccion', deshabilitar: false, tiposeleccion: 'TipoContenedor', datoseleccion: [], metodo: '../api/Login/CargarDatos', placeholder: 'Seleccione opción', width: '200px', fixed: false, filtro: true, cargarlista: []},
                { id: 4, label: 'Moneda', prop: 'Moneda', tipocolumna: [], tipo: 'seleccion', deshabilitar: false, tiposeleccion: 'Moneda', datoseleccion: [], metodo: '../api/Login/CargarDatos', placeholder: 'Seleccione opción', width: '200px', fixed: false, filtro: true, cargarlista: []  },
                { id: 5, label: 'Rate Class code', prop: 'RateClassCode', tipocolumna: [], tipo: 'seleccion', tiposeleccion: 'RateClassCode', datoseleccion: [], metodo: '../api/Login/CargarDatos', borrado:true, placeholder: 'Seleccione opción', width: '200px', fixed: false, filtro: true, cargarlista: [] },
                { id: 6, label: 'Tarifa Minima', prop: 'TarifaMinima', tipocolumna: [{ id: 0, tipoopccion: 'tooltip', descripcion: 'para identificar decimales utilizar el punto', icono: 'el-icon-info', posicion:'top' }], tipo: 'inputnumber', datotipo: 'moneda', min: 0, width: '200px', fixed: false, filtro: true, precision: 2, controls: false, deshabilitar: false },
                { id: 7, label: 'Valor Unitario', prop: 'ValorUnitario', tipocolumna: [{ id: 0, tipoopccion: 'tooltip', descripcion: 'para identificar decimales utilizar el punto', icono: 'el-icon-info', posicion: 'top' }], tipo: 'inputnumber', datotipo: 'moneda', min: 0, width: '200px', fixed: false, filtro: true, precision: 2, controls: false }],
            datocolumnaconceptotarifa: [{ dato: '', prop: 'Concepto', regex: '^.+$', mensaje: 'dato obligatorio Concepto',valdidaregex:true, validardato:true },
                { dato: null, prop: 'RubroCotizacion', regex: '^[0-9]{1,2}$', datoseleccion: [], mensaje: 'Por favor seleccione un RubroCotizacion', valdidaregex: true, validardato: true },
                { dato: null, prop: 'Item', regex: '^[0-9]{1,2}$', datoseleccion: [], mensaje: 'Por favor seleccione un Item', valdidaregex: true, validardato: true },
                { dato: null, prop: 'TipoContenedor', regex: '^[0-9]{1,2}$', datoseleccion: [], mensaje: 'Por favor seleccione un Tipo de Contenedor', valdidaregex: true, validardato: true  },
                { dato: null, prop: 'Moneda', regex: '^[0-9]{1,2}$', datoseleccion: [], mensaje: 'Por favor seleccione una Moneda', valdidaregex: true, validardato: true },
                { dato: null, prop: 'RateClassCode', regex: '^[0-9]{1,2}$', datoseleccion: [], mensaje: 'Por favor seleccione un RateClassCode', valdidaregex: true, validardato: false },
                { dato: 0, prop: 'TarifaMinima', regex: '^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$', mensaje: 'dato obligatorio Tarifa Minima', valdidaregex: true, validardato: false},
                { dato: 0, prop: 'ValorUnitario', regex: '^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$', mensaje: 'dato obligatorio Valor Unitario', valdidaregex: true, validardato: true }],
            datotablaconceptotarifa: [{ Concepto: '', RubroCotizacion: null, Item: null, TipoContenedor: null, Moneda: null, RateClassCode: null, TarifaMinima: '', ValorUnitario: '', editable: true }],
            columnatablamensajeriatarifa:[],
            columnatablamensajeriatarifaincial: [{ id: 0, label: 'Concepto', prop: 'Concepto', tipocolumna: [], tipo: 'input', deshabilitar: false, fixed: true, width: '200px', filtro: true },
                {id: 1, label: 'Item', prop: 'ItemMensajeria', tipocolumna: [], tipo: 'seleccion', arreglotablas: [{ id: 0, tipoopcion: 'deshabilitar', queafecta: 'PesoVolumen', tipomatriz: 14, propiedadafectar: 'deshabilitar', nombremetodoconsulta: '../api/LogisticaApi/Obteneritemmensajeriacasillas' },
                                                                                                  { id: 1, tipoopcion: 'deshabilitar', queafecta: 'Porcentaje', tipomatriz: 15, propiedadafectar: 'deshabilitar', nombremetodoconsulta: '../api/LogisticaApi/Obteneritemmensajeriacasillas' },
                                                                                                  { id: 2, tipoopcion: 'deshabilitar', queafecta: 'Moneda', tipomatriz: 16, propiedadafectar: 'deshabilitar', nombremetodoconsulta: '../api/LogisticaApi/Obteneritemmensajeriacasillas' },
                                                                                                  { id: 3, tipoopcion: 'deshabilitar', queafecta: 'TarifaMinima', tipomatriz: 16, propiedadafectar: 'deshabilitar', nombremetodoconsulta: '../api/LogisticaApi/Obteneritemmensajeriacasillas' },
                                                                                                  { id: 4, tipoopcion: 'deshabilitar', queafecta: 'ValorUnitario', tipomatriz: 16, propiedadafectar: 'deshabilitar', nombremetodoconsulta: '../api/LogisticaApi/Obteneritemmensajeriacasillas' }], tiposeleccion: 'ItemMensajeria', metodo: '../api/Login/CargarDatos', datoseleccion: [], placeholder: 'Seleccione opción', fixed: false, width: '200px', filtro: true, cargarlista: []},
                { id: 2, label: 'Peso/Volumen Kg', prop: 'PesoVolumen', tipocolumna: [{ id: 0, tipoopccion: 'tooltip', descripcion: 'para identificar decimales utilizar el punto', icono: 'el-icon-info', posicion: 'top' }], tipo: 'inputnumber', datotipo: 'pesokgs', min: 0, deshabilitar: false, precision: 3, controls: false, width: '200px', fixed: false, filtro: true },
                { id: 3, label: 'Porcentaje', prop: 'Porcentaje',  tipocolumna: [{ id: 0, tipoopccion: 'tooltip', descripcion: 'para identificar decimales utilizar el punto', icono: 'el-icon-info', posicion:'top' }], tipo: 'inputnumber', datotipo: 'porcentaje', min: 0, max: 100, deshabilitar: false, precision: 2, controls: false, width: '200px', fixed: false, filtro: true },
                { id: 4, label: 'Moneda', prop: 'Moneda', tipocolumna: [], tipo: 'seleccion', deshabilitar: false, tiposeleccion: 'Moneda', datoseleccion: [], metodo: '../api/Login/CargarDatos', placeholder: 'Seleccione opción', width: '200px', fixed: false, filtro: true, cargarlista: []  },
                { id: 5, label: 'Tarifa Minima', prop: 'TarifaMinima', tipocolumna: [{ id: 0, tipoopccion: 'tooltip', descripcion: 'para identificar decimales utilizar el punto', icono: 'el-icon-info', posicion: 'top' }], deshabilitar: false, datotipo: 'moneda', min: 0, precision: 2, controls: false, tipo: 'inputnumber', width: '200px', fixed: false, filtro: true },
                { id: 6, label: 'Valor Unitario', prop: 'ValorUnitario', tipocolumna: [{ id: 0, tipoopccion: 'tooltip', descripcion: 'para identificar decimales utilizar el punto', icono: 'el-icon-info', posicion: 'top' }], deshabilitar: false, datotipo: 'moneda', min: 0, precision: 2, controls: false, tipo: 'inputnumber', width: '200px', fixed: false, filtro: true }],
            datocolumnamensajeriatarifa: [{ dato: '', prop: 'Concepto', regex: '^.+$', mensaje: 'dato obligatorio Concepto', valdidaregex: true, validardato: true  },                
                { dato: null, prop: 'ItemMensajeria', regex: '^[0-9]{1,2}$', datoseleccion: [], mensaje: 'Por favor seleccione un Item', valdidaregex: true, validardato: true  },
                { dato: 0, prop: 'PesoVolumen', regex: '^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$', mensaje: 'dato obligatorio PesoVolumen', valdidaregex: true, validardato: true  },
                { dato: 0, prop: 'Porcentaje', regex: '^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$', mensaje: 'dato obligatorio Porcentaje', valdidaregex: true, validardato: true  },
                { dato: null, prop: 'Moneda', datoseleccion: [], regex: '^[0-9]{1,2}$', mensaje: 'Por favor seleccione una Moneda', valdidaregex: true, validardato: true },
                { dato: 0, prop: 'TarifaMinima', regex: '^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$', mensaje: 'dato obligatorio TarifaMinima', valdidaregex: true, validardato: false },
                { dato: 0, prop: 'ValorUnitario', regex: '^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$', mensaje: 'dato obligatorio ValorUnitario', valdidaregex: true, validardato: true  }],
            datotablamensajeriatarifa: [{ Concepto: '', ItemMensajeria: null, PesoVolumen: '', Porcentaje: '', Moneda: null, TarifaMinima: '', ValorUnitario: '', editable: true }],

            //columnatipocontenedor: { id: 4, label: 'Tipo de Contenedor', prop: 'TipoContenedor', tipo: 'seleccion', tiposeleccion: 'TipoContenedor', metodo: '../api/Login/CargarDatos', placeholder: 'Seleccione opción', width: '200px', fixed: false },
            columnatablasegurotarifa:[],
            columnatablasegurotarifainicial: [{ id: 0, label: 'Tipo de Mercancia', prop: 'TipoMercancia', tipocolumna: [], tipo: 'seleccion', arreglotablas: [{ id: 0, tipoopcion: 'validacion', queafecta: 'Caracteristicasmercancia' }], tiposeleccion: 'TipoMercancia', borrado: true, metodo: '../api/Login/CargarDatos', placeholder: 'Seleccione opción', width: '200px', fixed: false, cargarlista: []  },
                { id: 1, label: 'Caracteristicas Mercancia', prop: 'Caracteristicasmercancia', tipocolumna: [], tipo: 'seleccionmultiple', arreglotablas: [{ id: 0, tipoopcion: 'validacion', queafecta: 'TipoMercancia' }], tiposeleccion: 'Caracteristicasmercancia', metodo: '../api/Login/CargarDatos', placeholder: 'Seleccione opción', width: '200px', fixed: false, datoseleccion: [], collapse: true, cargarlista: []  },
                { id: 2, label: 'Trayecto Asegurado', prop: 'TrayectoAsegurado', tipocolumna: [], tipo: 'seleccionmultiple', tiposeleccion: 'TrayectoAsegurado', metodo: '../api/Login/CargarDatos', placeholder: 'Seleccione opción', width: '200px', fixed: false, cargarlista: []  },
                { id: 3, label: 'Tipo de Operación', prop: 'TipoOperacion', tipocolumna: [], tipo: 'seleccionmultiple', popover: false, tiposeleccion: 'TipoOperacion', placeholder: 'Seleccione opción', metodo: '../api/Login/CargarDatos', width: '200px', fixed: false, cargarlista: [] },
                { id: 4, label: 'Modo Transporte', prop: 'ModoTransporte', tipocolumna: [], tipo: 'seleccionmultiple', tiposeleccion: 'ModoTransporte', placeholder: 'Seleccione opción', metodo: '../api/Login/CargarDatos', width: '200px', fixed: false, cargarlista: [] },
                { id: 5, label: 'Moneda', prop: 'Moneda', tipocolumna: [], tipo: 'seleccion', tiposeleccion: 'Moneda', metodo: '../api/Login/CargarDatos', placeholder: 'Seleccione opción', width: '200px', fixed: false, cargarlista: []  },
                { id: 6, label: 'Monto Asegurado', prop: 'MontoAsegurado', tipocolumna: [{ id: 0, tipoopccion: 'tooltip', descripcion: 'para identificar decimales utilizar el punto', icono: 'el-icon-info', posicion: 'top' }], tipo: 'inputnumber', datotipo: 'moneda', min: 0,   width: '200px', fixed: false, precision: 2, controls: false },
                { id: 7, label: 'Valor Deducible', prop: 'ValorDeducible', tipocolumna: [{ id: 0, tipoopccion: 'tooltip', descripcion: 'para identificar decimales utilizar el punto', icono: 'el-icon-info', posicion: 'top' }], tipo: 'inputnumber', datotipo: 'moneda', min: 0,  precision: 2, controls: false, arreglotablas: [{ id: 0, tipoopcion: 'validacion', queafecta: 'PorcentajeDeducible' }], width: '200px', fixed: false },
                { id: 8, label: '% Deducible', prop: 'PorcentajeDeducible', tipocolumna: [{ id: 0, tipoopccion: 'tooltip', descripcion: 'para identificar decimales utilizar el punto', icono: 'el-icon-info', posicion: 'top' }], tipo: 'inputnumber', datotipo: 'porcentaje', min: 0, max: 100, precision: 2, controls: false, arreglotablas: [{ id: 0, tipoopcion: 'validacion', queafecta: 'ValorDeducible' }], width: '200px', fixed: false },
                { id: 9, label: 'Tarifa Minima', prop: 'TarifaMinima', tipocolumna: [{ id: 0, tipoopccion: 'tooltip', descripcion: 'para identificar decimales utilizar el punto', icono: 'el-icon-info', posicion: 'top' }], tipo: 'inputnumber', datotipo: 'moneda', min: 0,  precision: 2, controls: false, width: '200px', fixed: false },
                { id: 10, label: '% Seguro Cobrado', prop: 'SeguroCobrado', tipocolumna: [{ id: 0, tipoopccion: 'tooltip', descripcion: 'para identificar decimales utilizar el punto', icono: 'el-icon-info', posicion: 'top' }], tipo: 'inputnumber', datotipo: 'porcentaje', min: 0, max: 100, precision: 2, controls: false, width: '200px', fixed: false },
                { id: 11, label: 'Vigencia Tarifa', prop: 'VigenciaTarifa', tipocolumna: [], tipo: 'fechacalendario', width: '300px', fixed: false },
                { id: 12, label: 'Observaciones', prop: 'Observacion', tipocolumna: [], tipo: 'input', width: '200px', fixed: false }],
            datocolumnasegurotarifa: [{ dato: null, prop: 'TipoMercancia', regex: '^[0-9]{1,2}$', mensaje: 'Por favor seleccione un TipoMercancia', valdidaregex: true, validardato: true },
                { dato: [], prop: 'Caracteristicasmercancia', regex: '^.*$', mensaje: 'Por favor seleccione una Caracteristica de mercancia', valdidaregex: false, validardato: true},
                { dato: [], prop: 'TrayectoAsegurado', regex: '^.*$', mensaje: 'Por favor seleccione un TrayectoAsegurado', valdidaregex: false, validardato: true },
                { dato: [], prop: 'TipoOperacion', regex: '^.*$', mensaje: 'Por favor seleccione un TipoOperacion', valdidaregex: false, validardato: true },
                { dato: [], prop: 'ModoTransporte', regex: '^.*$', mensaje: 'Por favor seleccione un ModoTransporte', valdidaregex: false, validardato: true},
                { dato: null, prop: 'Moneda', regex: '^[0-9]{1,2}$', mensaje: 'Por favor seleccione un Moneda', valdidaregex: true, validardato: true },
                { dato: 0, prop: 'MontoAsegurado', regex: '^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$', mensaje: 'Por favor seleccione un MontoAsegurado', valdidaregex: true, validardato: true },
                { dato: 0, prop: 'ValorDeducible', regex: '^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$', mensaje: 'Por favor seleccione un ValorDeducible', valdidaregex: true, validardato: true},
                { dato: 0, prop: 'PorcentajeDeducible', regex: '^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$', mensaje: 'Por favor seleccione un PorcentajeDeducible', valdidaregex: true, validardato: true },
                { dato: 0, prop: 'TarifaMinima', regex: '^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$', mensaje: 'Por favor seleccione un TarifaMinima', valdidaregex: true, validardato: false },
                { dato: 0, prop: 'SeguroCobrado', regex: '^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$', mensaje: 'Por favor seleccione un SeguroCobrado', valdidaregex: true, validardato: true },
                { dato: new Date(), prop: 'VigenciaTarifa', regex: ' ^.* $', mensaje: 'Por favor seleccione un VigenciaTarifa', valdidaregex: false, validardato: true },
                { dato: '', prop: 'Observacion', regex: '^.+$', mensaje: 'Por favor seleccione un Observacion', valdidaregex: false, validardato: false }],
            datotablasegurotarifa: [{ TipoMercancia: null, Caracteristicasmercancia: [], TrayectoAsegurado: [], TipoOperacion: [], ModoTransporte: [], Moneda: null, MontoAsegurado: '', ValorDeducible: '', PorcentajeDeducible: '', TarifaMinima: '', SeguroCobrado: '', VigenciaTarifa: new Date(), Observacion: '', editable: true }],
            columnatablaadjuntotarifa:[],
            columnatablaadjuntotarifainicial: [{ id: 0, label: 'Rubro de la Tarifa o Cotizacion', prop: 'RubroCotizacion', tipocolumna: [], tipo: 'seleccionmultiple', tiposeleccion: 'RubroCotizacion', metodo: '../api/Login/CargarDatos', placeholder: 'Seleccione opción', width: '250px', fixed: false, filtro: true, datoseleccion: [], cargarlista: [] },
                { id: 1, label: 'Número Cotización o Tarifario del proveedor', prop: 'NumeroCotizacion', tipocolumna: [], tipo: 'input', width: '200px', fixed: false},
                { id: 2, label: 'Adjuntar', prop: 'Adjunto', tipocolumna: [], tipo: 'adjunto', width: '200px', fixed: false },
                { id: 3, label: 'Observaciones generales tarifa', prop: 'Observacion', tipocolumna: [], tipo: 'input', width: '200px', fixed: false }],
            datocolumnaadjuntotarifa: [{ dato: null, prop: 'RubroCotizacion', regex: '^[0-9]{1,2}$', mensaje: 'Por favor seleccione un RubroCotizacion', valdidaregex: false, validardato: true},
                { dato: '', prop: 'NumeroCotizacion', regex: '^.+$', mensaje: 'Por favor seleccione un NumeroCotizacion', valdidaregex: true, validardato: false},
                { dato: [], prop: 'Adjunto', regex: '^.+$', mensaje: 'Por favor seleccione un Adjunto', valdidaregex: false, validardato: true},
                { dato: '', prop: 'Observacion', regex: '^.+$', mensaje: 'Por favor seleccione un Observacion', valdidaregex: true, validardato: false }],
            datotablaadjuntotarifa: [{ RubroCotizacion: null, NumeroCotizacion: '', Adjunto: [], Observacion: '', editable: true }],
            columnatablaadjuntoseguro:[],
            columnatablaadjuntoseguroinicial: [{ id: 0, label: 'Número cotización tarifario', prop: 'NumeroCotizacion', tipocolumna: [], tipo: 'input', width: '200px', fixed: false },
                { id: 1, label: 'Adjuntar tarifa', prop: 'Adjunto', tipocolumna: [],tipo: 'adjunto', tipobutton: 'primary', width: '200px', fixed: false },
                { id: 2, label: 'Vigencia tarifa', prop: 'Vigencia', tipocolumna: [],tipo: 'fechacalendario', width: '200px', fixed: false },
                { id: 3, label: 'Observaciones', prop: 'Observacion', tipocolumna: [],tipo: 'input', width: '200px', fixed: false },
                { id: 4, label: 'Caracteristicas Mercancia', prop: 'Caracteristicasmercancia', tipocolumna: [], tipo: 'seleccionmultiple', tiposeleccion: 'Caracteristicasmercancia', metodo: '../api/Login/CargarDatos', placeholder: 'Seleccione opción', width: '250px', fixed: false, collapse: true, datoseleccion: [], cargarlista: [] },
                { id: 5, label: 'Tipo de mercancia', prop: 'TipoMercancia', tipocolumna: [], tipo: 'seleccionmultiple', tiposeleccion: 'TipoMercancia', metodo: '../api/Login/CargarDatos', placeholder: 'Seleccione opción', width: '250px', fixed: false, cargarlista: [] },
                { id: 6, label: 'Trayecto Asegurado', prop: 'TrayectoAsegurado', tipocolumna: [], tipo: 'seleccionmultiple', tiposeleccion: 'TrayectoAsegurado', metodo: '../api/Login/CargarDatos', placeholder: 'Seleccione opción', width: '300px', fixed: false, cargarlista: [] }],
            datocolumnaadjuntoseguro: [{ dato: '', prop: 'NumeroCotizacion', regex: '^.+$', mensaje: 'Por favor seleccione un NumeroCotizacion', valdidaregex: false, validardato: false },
                { dato: [], prop: 'Adjunto', regex: '^.*$', mensaje: 'Por favor seleccione un Adjunto', valdidaregex: false, validardato: true },
                { dato: new Date(), prop: 'Vigencia', regex: '^.*$', mensaje: 'Por favor seleccione un Vigencia', valdidaregex: false, validardato: true },
                { dato: '', prop: 'Observacion', regex: '^.*$', mensaje: 'Por favor seleccione un Observacion', valdidaregex: false, validardato: false },
                { dato: [], prop: 'Caracteristicasmercancia', regex: '^.*$', mensaje: 'Por favor seleccione un Caracteristicasmercancia', valdidaregex: false, validardato: false },
                { dato: [], prop: 'TipoMercancia', regex: '^.*$', mensaje: 'Por favor seleccione un TipoMercancia', valdidaregex: false, validardato: false },
                { dato: [], prop: 'TrayectoAsegurado', regex: '^.*$', mensaje: 'Por favor seleccione un TrayectoAsegurado', valdidaregex: false, validardato: false }],
            datotablaadjuntoseguro: [{ NumeroCotizacion: '', Adjunto: [], Vigencia: new Date(), Observacion: '', Caracteristicasmercancia: [], TipoMercancia: [], TrayectoAsegurado: [], editable: true }],
            //Proveedor: [{ provee = false, nombre='xxxx' }, { provee = true, nombre='yyyy' }], 
            //ProveedorSeleccionado:null,                      
            seletarifaproveedor: true,
            conceptos: true,
            adjuntartarifas: true,
            seletarifaproveedorse: true,
            conceptosse: true,
            adjuntartarifasse: true,
            provee: true,
            botones: true,
            perecedera: false,
            extradimensionada: false,
            peligrosa: false,
            tipoproveedoraseguradora: 3,
            ismodalidad: false,
            istipocarga: false,
            isocultar: false,
            isincoterm: false,
            isocultartc: false,
            isocultarto: false,
            isvisualizacion: false,
            isvisualizacion2: false,
            isver: false,
            botonesprincipal: true,
            selecciontarifas: [],            
            componentKey: 0,
            tipoproveedordeposito: 6,
            isdeposito: false,
            tipoproveedormensajeria: 8,
            ismensajeria: false,
            deshabilitartipocarga: false,
            idtipoproveedor: 0,
            deshabilitar: false,
            deshabilitarlugardeentrega: true,
            mensajefinal: '',
            bottonhabilitar: true,
            mensajemodalidad: 'Como no fue seleccionada la modalidad, por defecto se indica importacion o exportacion ordinaria respectivamente',
            mensajelugarentrega: 'Teniendo en cuenta que no se ingreso lugar de entrega para el incoterm se deja por defecto el origen',
            page: 1,
            pageSize: 3,
            search: '',
            searchorigen: [],
            searchdestino: [],
            cancerlartarifaedit: 0,
            observacion: '',
            bottonhabilitarcreartarifa: true,
            bottonhabilitarcreartarifaaseguradora: true,
            bottonhabilitarcreartarifamensajeria: true,
            bottonhabilitarcreartarifaadjunto: true,
            bottonhabilitarcreartarifaadjuntoseguro: true,
            validarcreartarifa: 0,
            opcion: '',
            validacionessuma: 0,


                       
        };
    },
    computed: {

        displayDataOrigen() {
            if (!this.datostablaorigen || this.datostablaorigen.length === 0) return [];
            this.searchorigen = this.datostablaorigen.filter(data => !this.search || data.nombreciudad.toLowerCase().includes(this.search.toLowerCase()) || data.codigociudad.toLowerCase().includes(this.search.toLowerCase()) || data.paisciudadcodigo.toLowerCase().includes(this.search.toLowerCase()) || data.paisciudadnombre.toLowerCase().includes(this.search.toLowerCase()));
            return this.searchorigen.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
        },
        displayDataDestino() {
            if (!this.datostabladestino || this.datostabladestino.length === 0) return [];
            this.searchdestino = this.datostablaorigen.filter(data => !this.search || data.nombreciudad.toLowerCase().includes(this.search.toLowerCase()) || data.codigociudad.toLowerCase().includes(this.search.toLowerCase()) || data.paisciudadcodigo.toLowerCase().includes(this.search.toLowerCase()) || data.paisciudadnombre.toLowerCase().includes(this.search.toLowerCase()));
            return this.searchdestino.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
        }
    },
    
    methods: {
        recibirsearch(val) {
            this.search = val;
        },
        handleCurrentChange(val) {
            this.page = val;
        },
        conceptotablasinicial() {
            this.columnatablaconceptotarifa = this.columnatablaconceptotarifainicial;
            this.columnatablamensajeriatarifa = this.columnatablamensajeriatarifainicial 
        },
       
        cargarPuertos(valor) {
            this.datoautocompletepuerto = Array.from(valor, x => x.objeto);
        },
        abrirseleccionpuerto(valor) {
            this.search = '';
            this.datostablaorigen = [];
            this.datostabladestino = [];
            let currentObj = this;
            this.datoautocompletepuerto.forEach(function callback(element) {
                currentObj.datostablaorigen.push({ nombreciudad: element.nombreciudad, codigociudad: element.codigociudad, paisciudadnombre: element.paisciudad.Nombre, paisciudadcodigo: element.paisciudad.Codigo }); 
                currentObj.datostabladestino.push({ nombreciudad: element.nombreciudad, codigociudad: element.codigociudad, paisciudadnombre: element.paisciudad.Nombre, paisciudadcodigo: element.paisciudad.Codigo }); 
            });
            
            if (valor == 'origen') {
                this.ruleForm.origen = '';
                this.origenseleccionado = '';
                this.dialogFormOrigenVisible = true;
            } else if (valor == 'destino') {
                this.ruleForm.destino = '';
                this.destinoseleccionado = '';
                this.dialogFormDestinoVisible = true;
            }            
        },        
        handleSelectOrigen(item) {
            this.ruleForm.origen = item.value;
        },
        handleSelectDestino(item) {
            this.ruleForm.destino = item.value;
        },
        changecurrentorigen(value) {
            this.origenseleccionado = value;
        },
        cancelarseleccionorigen() {
            this.ruleForm.origen = '';
            this.origenseleccionado = '';
            this.dialogFormOrigenVisible = false;
        },
        confirmarseleccionorigen() {
            this.ruleForm.origen = this.origenseleccionado.nombreciudad + " " + "(" + this.origenseleccionado.paisciudadcodigo + this.origenseleccionado.codigociudad + ")";
            this.dialogFormOrigenVisible = false;
        },
        changecurrentdestino(value) {
            this.destinoseleccionado = value;
        },
        confirmarselecciondestino() {
            this.ruleForm.destino = this.destinoseleccionado.nombreciudad + " " + "(" + this.destinoseleccionado.paisciudadcodigo + this.destinoseleccionado.codigociudad + ")";;
            this.dialogFormDestinoVisible = false;
        },
        cancelarselecciondestino() {
            this.ruleForm.destino = '';
            this.destinoseleccionado = '';
            this.dialogFormDestinoVisible = false;
        },
        cargarmodotransporte(value) {
            this.ruleForm.modotransporte = value;
        },
        CambioRateClasscode(valor) {
            const found = this.columnatablaconceptotarifa.findIndex(element => element.prop == 'RateClassCode');            
            Reflect.set(this.columnatablaconceptotarifa[found], 'filtro', valor);
            this.columnatablaconceptotarifa;
            

        },
        cambiomodotransporte(value) {
            this.ruleForminicial();
            this.ruleForm.modotransporteseleccionado = value;
            this.istipocarga = false;
            this.isincoterm = false;
            this.cambiotipocargaitem();
            if (value == 3) {
                this.CambioRateClasscode(true);
                
            } else {
                this.CambioRateClasscode(false);
              
            }
            let currentObj = this;
            this.axios.post(this.metodoobtenermodotransportetipocarga, {
                IdModoTransporte: value,
                IdTipoMatriz:8
            })
                .then(function (response) {
                    currentObj.output = JSON.parse(response.data);
                    currentObj.ruleForm.tipocarga = currentObj.output["ObjetoSeleccionable"];
                    if (currentObj.ruleForm.tipocarga.length == 0) {
                        currentObj.istipocarga = true;
                    } else if (currentObj.ruleForm.tipocarga.length == 1) {
                        currentObj.istipocarga = false;
                        currentObj.tipocargaseleccionado = currentObj.ruleForm.tipocarga[0].Id;
                        currentObj.cambiotipocarga(currentObj.ruleForm.tipocargaseleccionado)
                    }
                })
                .catch(function (error) {
                    currentObj.output = error;
                });

            

            this.axios.post(this.metodoobtenermodotransporteincoterm, {
                IdModoTransporte: value,
                IdTipoMatriz: 9
            })
                .then(function (response) {
                    currentObj.output = JSON.parse(response.data);
                    currentObj.ruleForm.incoterm = currentObj.output["ObjetoSeleccionable"];
                    
                     if (currentObj.ruleForm.modotransporteseleccionado == 6) {    
                         currentObj.deshabilitarlugardeentrega = true;
                         currentObj.cambioincoterm(currentObj.ruleForm.incotermseleccionado);
                        
                    }
                    
                })
                .catch(function (error) {
                    currentObj.output = error;
                });
            this.axios.post(this.metodoobtenermodotransportecasillatipocontenedor, {
                IdModoTransporte: value,
                IdTipoCarga: this.ruleForm.tipocargaseleccionado,
                IdTipoMatrizMultiple: [11,12]
            })
                .then(function (response) {
                    currentObj.output = JSON.parse(response.data);
                    currentObj.Cambiotipocontenedor(currentObj.output.Visibilidad);                    
                })
                .catch(function (error) {
                    currentObj.output = error;
                    
                });

        },
        cargartipooperacion(value) {
            this.ruleForm.tipooperacion = value;
            
        },
        cambiotipooperacion(value) {            
            this.ruleForm.modalidadseleccionado = null;
            this.ismodalidad = false;
            this.ruleForm.tipooperacionseleccionado = value;
            if (this.idtipoproveedor == 8) {
                if (value == 3) {
                    this.isincoterm = true;
                } else {
                    this.isincoterm = false;
                }
            }
            let currentObj = this;
            this.axios.post(this.metodoobtenermodalidadtransportetipoperacion, {
                IdTipoOperacion: value,
                IdTipoMatriz:1
            })
                .then(function (response) {
                    currentObj.output = JSON.parse(response.data);
                    currentObj.ruleForm.modalidad = currentObj.output["ObjetoSeleccionable"];
                    if (currentObj.ruleForm.modalidad.length == 0) {
                        currentObj.ismodalidad = true;
                    } else if (currentObj.ruleForm.modalidad.length == 1) {
                        currentObj.ismodalidad = true;
                        currentObj.modalidadseleccionado = currentObj.ruleForm.modalidad[0].Id;
                        currentObj.cambiomodalidad(currentObj.ruleForm.modalidadseleccionado);
                    }
                })
                .catch(function (error) {
                    currentObj.output = error;
                });

        },
        Cambiotipocontenedor(value) {
            const found = this.columnatablaconceptotarifa.findIndex(element => element.prop == 'TipoContenedor');
            Reflect.set(this.columnatablaconceptotarifa[found], 'filtro', value);
            this.columnatablaconceptotarifa;
            const vali = this.datocolumnaconceptotarifa.findIndex(element => element.prop == 'TipoContenedor');
            Reflect.set(this.datocolumnaconceptotarifa[vali], 'validardato', value);
        },
        cargartipocarga(value) {
            this.ruleForm.tipocarga = value;
        },
        cambiotipocarga(value) {
            let currentObj = this;            
            this.ruleForm.tipocargaseleccionado = value;
            this.cambiotipocargaitem();
            this.axios.post(this.metodoobtenermodotransportecasillatipocontenedor, {
                IdModoTransporte: this.ruleForm.modotransporteseleccionado,
                IdTipoCarga: value,
                IdTipoMatrizMultiple: [11, 12]
            })
                .then(function (response) {
                    currentObj.output = JSON.parse(response.data);
                    currentObj.Cambiotipocontenedor(currentObj.output.Visibilidad);
                    const vali = this.datocolumnaconceptotarifa.findIndex(element => element.prop == 'TipoContenedor');
                    Reflect.set(this.datocolumnaconceptotarifa[vali], 'validardato', value);
                })
                .catch(function (error) {
                    currentObj.output = error;
                });

            
        },

        cambiotipocargaitem() {
            let currentObj = this;
            this.axios.post(this.metodoobtenertipocargaitem, {
                IdTipoCarga: this.ruleForm.tipocargaseleccionado,
                IdModoTransporte: this.ruleForm.modotransporteseleccionado,
                IdTipoMatrizMultiple: [13,2]
            })
                .then(function (response) {
                    currentObj.output = JSON.parse(response.data);
                    var posicionendatocolumna = currentObj.datocolumnaconceptotarifa.findIndex(element => element.prop == 'Item');
                    var posicionencolumna = currentObj.columnatablaconceptotarifa.findIndex(element => element.prop == 'Item');
                    Reflect.set(currentObj.datocolumnaconceptotarifa[posicionendatocolumna], 'datoseleccion', currentObj.output["ObjetoSeleccionable"]);
                    currentObj.columnaidcambiodatoseleccion = [{ IdColumna: posicionencolumna, IdDatoColumna: posicionendatocolumna}];
                  
                    if (currentObj.ruleForm.modalidad.length == 0) {

                    } else if (currentObj.ruleForm.modalidad.length == 1) {

                    }
                })
                .catch(function (error) {
                    currentObj.output = error;
                });


        },
        ocultarcolumna: function () {

            //if (value5 === 'suelta') {
                //this.columnatablaconceptotarifa = this.columnatablaconceptotarifa.filter(
                  //  filtros => {
                    //    return filtros.filtro === true
                    //});
            //} else {

            //}

        },

        cargarincoterm(value) {
            this.ruleForm.incoterm = value;
        },
        cambioincoterm(value) {
            if (value == "") {
                value = null;
            }
            this.ruleForm.incotermseleccionado = value;
            if (value == 12) {
                this.deshabilitarlugardeentrega = true;
            } else if (value != null) {
                this.deshabilitarlugardeentrega = false;

            } else {
                this.deshabilitarlugardeentrega = true;
            }
        },
        crearvalores() {

        },
        adjuntartarifa() {

        },
        cancelarvalorestarifa() {
            this.deshabilitar = !this.deshabilitar;
            location.reload()
        },
        cargarconceptostarifa() {
           
            this.seletarifaproveedor = !this.seletarifaproveedor
            this.conceptos = !this.conceptos         
            
            let currentObj = this;
            if (currentObj.IdTipoProveedor == 8) {
                currentObj.selecciontarifas.forEach(function callback(element) {
                    currentObj.datotablamensajeriatarifa.push({ Concepto: element.Concepto, ItemMensajeria: element.ItemMensajeria, PesoVolumen: element.PesoVolumen, Porcentaje: element.Porcentaje, Moneda: element.Moneda, TarifaMinima: element.TarifaMinima, ValorUnitario: element.ValorUnitario, editable: false });
                })
            } else {
                currentObj.selecciontarifas.forEach(function callback(element) {
                    currentObj.datotablaconceptotarifa.push({ Concepto: element.Concepto, RubroCotizacion: element.RubroCotizacion, Item: element.Item, TipoContenedor: element.TipoContenedor, Moneda: element.Moneda, RateClassCode: element.RateClassCode, TarifaMinima: element.TarifaMinima, ValorUnitario: element.ValorUnitario, Observacion: element.Observacion,  editable: false });
                })
            }
           
            
            this.cambiotipocargaitem();
            this.changetablaedit();
        },

        cancelarconceptotarifa() {
            this.deshabilitar = !this.deshabilitar;
            this.ocultartablas();
            this.seletarifaproveedor = !this.seletarifaproveedor;            
            this.botonesprincipal = !this.botonesprincipal;
        },
        cargarconceptostarifaseguro() {
            
            this.seletarifaproveedor = !this.seletarifaproveedor;
            this.conceptos = !this.conceptos;
            let currentObj = this;
            currentObj.selecciontarifas.forEach(function callback(element) {
                currentObj.datotablasegurotarifa.push({ TipoMercancia: element.TipoMercancia, Caracteristicasmercancia: element.Caracteristicasmercancia, TrayectoAsegurado: element.TrayectoAsegurado, TipoOperacion: element.TipoOperacion, ModoTransporte: element.ModoTransporte, Moneda: element.Moneda, MontoAsegurado: element.MontoAsegurado, ValorDeducible: element.ValorDeducible, PorcentajeDeducible: element.PorcentajeDeducible, TarifaMinima: element.TarifaMinima, SeguroCobrado: element.SeguroCobrado, VigenciaTarifa: element.VigenciaTarifa, Observacion: element.Observacion, editable: false });
            })
            this.changetablaedit();
        },
        cancelarconceptotarifaseguro() {
            this.deshabilitar = !this.deshabilitar;
            this.ocultartablas();
            this.seletarifaproveedor = !this.seletarifaproveedor
            this.botonesprincipal = !this.botonesprincipal;

        }, changetablaedit() {
            
            if (this.datotablaconceptotarifa.length > 1) {
                

                this.bottonhabilitarcreartarifa = false;

            } else {
                this.bottonhabilitarcreartarifa = true;
            }
            if (this.datotablaadjuntotarifa.length > 1) {
              
                this.bottonhabilitarcreartarifaadjunto = false;

            } else {
                this.bottonhabilitarcreartarifaadjunto = true;
            }
            if (this.datotablasegurotarifa.length > 1) {
                
                this.bottonhabilitarcreartarifaaseguradora = false;

            } else {
                this.bottonhabilitarcreartarifaaseguradora = true;
            }
            if (this.datotablaadjuntoseguro.length > 1) {
               
                this.bottonhabilitarcreartarifaadjuntoseguro = false;

            } else {
                this.bottonhabilitarcreartarifaadjuntoseguro = true;
            }
            if (this.datotablamensajeriatarifa.length > 1) {
                
                this.bottonhabilitarcreartarifamensajeria = false;

            } else {
                this.bottonhabilitarcreartarifamensajeria = true;
            }

        },
        changetablaediteliminacion(valor) {
            if (this.datotablaconceptotarifa.length == 1) {
                this.bottonhabilitarcreartarifa = true;
            } else {
                this.bottonhabilitarcreartarifa = false;
            }
            if (this.datotablaadjuntotarifa.length == 1) {
                this.bottonhabilitarcreartarifaadjunto = true;

            } else {
                this.bottonhabilitarcreartarifaadjunto = false;
            }
            if (this.datotablasegurotarifa.length == 1) {
                this.bottonhabilitarcreartarifaaseguradora = true;

            } else {
                this.bottonhabilitarcreartarifaaseguradora = false;
            }
            if (this.datotablaadjuntoseguro.length == 1) {
                this.bottonhabilitarcreartarifaadjuntoseguro = true;

            } else {
                this.bottonhabilitarcreartarifaadjuntoseguro = false;
            }
            if (this.datotablamensajeriatarifa.length == 1) {
                this.bottonhabilitarcreartarifamensajeria = true;

            } else {
                this.bottonhabilitarcreartarifamensajeria = false;
            }
        },
        validacionespaso(validacion, fila) {
            if (fila == this.datocolumnaconceptotarifa) {
                if (validacion == 'valido') {                    
                    this.validacionessuma = this.validacionessuma + 1;
                }
                
            }
            if (fila == this.datocolumnamensajeriatarifa) {
                if (validacion == 'valido') {
                    this.validacionessuma = this.validacionessuma + 1;
                }

            }
            if (fila == this.datocolumnasegurotarifa) {
                if (validacion == 'valido') {
                    this.validacionessuma = this.validacionessuma + 1;
                }

            }
            if (fila == this.datocolumnaadjuntotarifa) {
                if (validacion == 'valido') {
                    this.validacionessuma = this.validacionessuma + 1;
                }

            }
            if (fila == this.datocolumnaadjuntoseguro) {
                if (validacion == 'valido') {
                    this.validacionessuma = this.validacionessuma + 1;
                }

            }
            if (this.validacionessuma == 5) {
                let currentObj = this;
                this.axios.post(this.metodoguardarcreartarifasproveedor, {
                    IdTipoOperacion: this.ruleForm.tipooperacionseleccionado,
                    IdModoTransporte: this.ruleForm.modotransporteseleccionado,
                    IdTipoCarga: this.ruleForm.tipocargaseleccionado,
                    Vigencia: this.ruleForm.vigencia,
                    IdIncoterm: this.ruleForm.incotermseleccionado,
                    IdCaracteristicasMercancia: this.ruleForm.caracteristicasmercanciaseleccionada,
                    IdModalidad: this.ruleForm.modalidadseleccionado,
                    IdPuertoOrigen: this.ruleForm.origen,
                    IdPuertoDestino: this.ruleForm.destino,
                    IdRazonSocial: this.ruleForm.razonsocial,
                    Lugarentrega: this.ruleForm.Lugarentrega,
                    IdTipoMercancia: this.ruleForm.tipomercanciaseleccionado,
                    DatoTablaConceptoTarifa: this.datotablaconceptotarifa,
                    DatoTablaMensajeriaTarifa: this.datotablamensajeriatarifa,
                    DatoTablaSeguroTarifa: this.datotablasegurotarifa,
                    DatoTablaAdjuntoTarifa: this.datotablaadjuntotarifa,
                    DatoTablaAdjuntoSeguro: this.datotablaadjuntoseguro,
                    Opcion: this.opcion,

                })

                    .then(function (response) {




                    })
                    .catch(function (error) {
                        currentObj.output = error;
                    });

            }

        },
        creartarifa(valor) {

            this.validarcreartarifa = this.validarcreartarifa + 1;
            this.opcion = valor;
            this.validacionessuma = 0;
            
        },
        cancelartarifa() {
            this.cancerlartarifaedit = this.cancerlartarifaedit + 1;
            this.deshabilitar = !this.deshabilitar;
            this.ocultartablas();
            this.conceptos = !this.conceptos;
            this.botonesprincipal = !this.botonesprincipal;
        },
        creartarifaseguro() {
           
        },
        cancelartarifaseguro() {
            this.deshabilitar = !this.deshabilitar;
            this.ocultartablas();
            this.conceptos = !this.conceptos;
            this.botonesprincipal = !this.botonesprincipal;
        },
        cambiorazonsocial(valor) {
        },
        adjuntartarifa() {

        },
        cancelartarifaadjunto() {
            this.deshabilitar = !this.deshabilitar;
            this.ocultartablas();
            this.adjuntartarifas = !this.adjuntartarifas;
            this.botonesprincipal = !this.botonesprincipal;
        },
        adjuntartarifaseguro() {

        },
        cancelartarifaadjuntoseguro() {
            this.deshabilitar = !this.deshabilitar;
            this.ocultartablas();
            this.adjuntartarifas = !this.adjuntartarifas;
            this.botonesprincipal = !this.botonesprincipal;
        },
        cargarmodalidad(value) {
            this.ruleForm.modalidad = value;
        },
        cambiomodalidad(value) {
            this.ruleForm.modalidadseleccionado = value;
        },
        cargarselecciontablaconceptotarifa(scope, columnaid) {
        }, 
        llamadomatricestipoproveedor(valor) {
            let currentObj = this;
            this.axios.post(this.metodoobtenertipoproveedormodotransporte, {
                    IdTipoProveedor: valor.objeto.IdTipoProveedor,
                    IdTipoMatriz: 3
                })
                    .then(function (response) {
                        currentObj.output = JSON.parse(response.data);
                        currentObj.ruleForm.modotransporte = currentObj.output["ObjetoSeleccionable"];
                        if (currentObj.ruleForm.modotransporte.length == 0) {
                            currentObj.isocultar = true;
                        } else if (currentObj.ruleForm.modotransporte.length == 1) {
                            currentObj.isocultar = true;
                            currentObj.ruleForm.modotransporteseleccionado = currentObj.ruleForm.modotransporte[0].Id;
                            currentObj.cambiomodotransporte(currentObj.ruleForm.modotransporteseleccionado);
                        }
                    })
                    .catch(function (error) {
                        currentObj.output = error;
                    });
            

                valor.objeto.IdTipoProveedor;

                currentObj.axios.post(currentObj.metodoobtenertipoproveedortipooperacion, {
                    IdTipoProveedor: valor.objeto.IdTipoProveedor,
                    IdTipoMatriz: 4
                })
                    .then(function (response) {
                        currentObj.output = JSON.parse(response.data);
                        currentObj.ruleForm.tipooperacion = currentObj.output["ObjetoSeleccionable"];
                        if (currentObj.ruleForm.tipooperacion.length == 0) {
                            currentObj.isocultarto = true;
                        } else if (currentObj.ruleForm.tipooperacion.length == 1) {
                            currentObj.isocultarto = true;
                            currentObj.tipooperacionseleccionado = currentObj.ruleForm.tipooperacion[0].Id;
                            currentObj.cambiotipooperacion(currentObj.tipooperacionseleccionado);
                        }
                    })
                    .catch(function (error) {
                        currentObj.output = error;
                    });



                valor.objeto.IdTipoProveedor;
                currentObj.axios.post(currentObj.metodoobtenertipoproveedortipocarga, {
                    IdTipoProveedor: valor.objeto.IdTipoProveedor,
                    IdTipoMatriz: 6
                })
                    .then(function (response) {
                        currentObj.output = JSON.parse(response.data);
                        currentObj.ruleForm.tipocarga = currentObj.output["ObjetoSeleccionable"];
                        if (currentObj.ruleForm.tipocarga.length == 0) {
                            currentObj.isocultartc = true;
                        } else if (currentObj.ruleForm.tipocarga.length == 1) {
                            //currentObj.isocultartc = true;
                            currentObj.tipocargaseleccionado = currentObj.ruleForm.tipocarga[0].Id;
                            currentObj.cambiotipocarga(currentObj.tipocargaseleccionado);
                        }
                    })
                    .catch(function (error) {
                        currentObj.output = error;
                    })

                currentObj.axios.post(currentObj.metodoobtenertipoproveedormodalidad, {
                    IdTipoProveedor: valor.objeto.IdTipoProveedor,
                    IdTipoMatriz: 5
                })
                    .then(function (response) {
                        currentObj.output = JSON.parse(response.data);
                        currentObj.ruleForm.visualizacion = currentObj.output["Visibilidad"];
                        currentObj.isvisualizacion = !currentObj.ruleForm.visualizacion;

                    })
                    .catch(function (error) {
                        currentObj.output = error;
                    });
                currentObj.axios.post(currentObj.metodoobtenertipoproveedormodalidad, {
                    IdTipoProveedor: valor.objeto.IdTipoProveedor,
                    IdTipoMatriz: 7
                })
                    .then(function (response) {
                        currentObj.output = JSON.parse(response.data);
                        currentObj.ruleForm.visualizacion = currentObj.output["Visibilidad"];
                        currentObj.isvisualizacion2 = !currentObj.ruleForm.visualizacion;
                    })
                    .catch(function (error) {
                        currentObj.output = error;
                    });               
        
        },
        cambiorazonsocial(valor) {
            this.ruleForm.razonsocial = valor.value;
        },
       
        handleSelectRazonSocial(valor) {
            this.isver = true;
            this.cambiorazonsocial(valor);
            this.idtipoproveedor = valor.objeto.IdTipoProveedor;
            this.IdRazonSocial = valor.objeto.IdProveedorAgente;
            this.deshabilitarlugardeentrega = true;
            this.tablasinicial();
            this.ruleForminicial();
            this.ruleForm.origen = '';
            this.ruleForm.destino = '';
            this.ocultartablas();
            this.componentKey += 1  
            this.isincoterm = false;
            this.isocultar = false;
            this.isocultartc = false;
            this.isocultarto = false;
            this.isvisualizacion = false;
            this.isvisualizacion2 = false;
            this.isaseguradora = true;
            this.seletarifaproveedor = true;
            this.conceptos = true;
            this.adjuntartarifas = true;
            this.botonesprincipal = true;
            this.deshabilitartipocarga = false;
            valor.objeto.IdTipoProveedor;
            this.llamadomatricestipoproveedor(valor);
            this.condiconesproveedor(valor);
            //this.ruleForm.razonsocial = valor.value;
        },
        condiconesproveedor(valor) {
            
            let currentObj = this;
            this.IdTipoProveedor = valor.objeto.IdTipoProveedor;
            if (this.IdTipoProveedor == this.tipoproveedoraseguradora) {
                currentObj.isaseguradora = true;
            } else {
                currentObj.isaseguradora = false;
            }
            this.IdTipoProveedor = valor.objeto.IdTipoProveedor;
            if (this.IdTipoProveedor == this.tipoproveedordeposito) {
                currentObj.isdeposito = true;
                const found = this.columnatablaconceptotarifa.findIndex(element => element.prop == 'RubroCotizacion');
                Reflect.set(this.columnatablaconceptotarifa[found], 'filtro', valor);
                const valifound = this.datocolumnaconceptotarifa.findIndex(element => element.prop == 'RubroCotizacion');
                this.datocolumnaconceptotarifa[valifound].validardato= false;
                this.columnatablaconceptotarifa;
                const found2 = this.columnatablaconceptotarifa.findIndex(element => element.prop == 'RateClassCode');
                Reflect.set(this.columnatablaconceptotarifa[found2], 'filtro', valor);
                this.columnatablaconceptotarifa;
            } else {
                currentObj.isdeposito = false;
                const valifound = this.datocolumnaconceptotarifa.findIndex(element => element.prop == 'RubroCotizacion');
                this.datocolumnaconceptotarifa[valifound].validardato= true;
            }
            this.IdTipoProveedor = valor.objeto.IdTipoProveedor;
            if (this.IdTipoProveedor == this.tipoproveedormensajeria) {
                currentObj.deshabilitartipocarga = true;
                currentObj.isocultartc = false;
                currentObj.ismensajeria = true;
                const found3 = this.columnatablaadjuntotarifa.findIndex(element => element.prop == 'RubroCotizacion');
                Reflect.set(this.columnatablaadjuntotarifa[found3], 'filtro', valor);
                this.columnatablaadjuntotarifa;
                const valifound = this.datocolumnaadjuntotarifa.findIndex(element => element.prop == 'RubroCotizacion');
                this.datocolumnaadjuntotarifa[valifound].validardato = false;
            } else {
                currentObj.ismensajeria = false;
                const valifound = this.datocolumnaadjuntotarifa.findIndex(element => element.prop == 'RubroCotizacion');
                this.datocolumnaadjuntotarifa[valifound].validardato = true;
            }

            //this.razonsocial = valor.objeto.IdProveedorAgente;

            
        },
        ruleForminicial() {
                            
            this.ruleForm.modotransporteseleccionado = null;
            this.ruleForm.tipooperacionseleccionado = null;
            this.ruleForm.tipocargaseleccionado = null;
            this.ruleForm.incotermseleccionado = null;
            this.ruleForm.modalidadseleccionado = null;
            this.ruleForm.visualizacionseleccionado = null;
            this.ruleForm.caracteristicasmercanciaseleccionada = [];
            this.ruleForm.vigencia = new Date();
            this.ruleForm.tipomercanciaseleccionado = null;
           
            this.ruleForm.Lugarentrega = '';
        },
        abrirseleccionrazonsocial() {

        },
        changecurrentproveedor() {

        },
        cancelarseleccionproveedoragente() {

        },
        confirmarseleccionproveedoragente() {

        },
        mensajeseleccion() {
            this.$confirm('¿Desea utilizar la plantilla de conceptos con tarifas ingresadas previamente?', {
                distinguishCancelAndClose: true,
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                if (this.datotablaselecciontarifa.length != 0) {
                    this.seletarifaproveedor = !this.seletarifaproveedor;
                    this.botonesprincipal = !this.botonesprincipal;
                    this.deshabilitar = !this.deshabilitar;
                } else if (this.datotablaseleccionmensajeriaydeposito.length != 0) {
                    this.seletarifaproveedor = !this.seletarifaproveedor;
                    this.botonesprincipal = !this.botonesprincipal;
                    this.deshabilitar = !this.deshabilitar;
                } else if (this.datotablaseleccionseguro.length != 0) {
                    this.seletarifaproveedor = !this.seletarifaproveedor;
                    this.botonesprincipal = !this.botonesprincipal;
                    this.deshabilitar = !this.deshabilitar;

                } else {
                    this.$message.error('No existen tarifas relacionadas');
                    this.conceptos = !this.conceptos;
                    this.botonesprincipal = !this.botonesprincipal;
                    this.cambiotipocargaitem();
                    this.deshabilitar = !this.deshabilitar;
                }

            }).catch(action => {
                if (action === 'cancel') {
                    this.conceptos = !this.conceptos;
                    this.botonesprincipal = !this.botonesprincipal;
                    this.cambiotipocargaitem();
                    this.deshabilitar = !this.deshabilitar;
                }
            });
            this.mostrartablaconceptotarifa = true;
        },
        open(formName) {
            this.mensajefinal = "";
            this.cargainformaciontablas(this.IdRazonSocial);
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.ruleForm.modalidadseleccionado == null && this.ismodalidad == false && this.isvisualizacion==false) {

                        this.mensajefinal = this.mensajefinal + '<hr>' +   this.mensajemodalidad;                    

                    }
                    if (this.ruleForm.Lugarentrega == '' && this.isincoterm == false && (this.ruleForm.incotermseleccionado == 2 || this.ruleForm.incotermseleccionado == 8 || this.ruleForm.incotermseleccionado == 9)) {

                        this.mensajefinal = this.mensajefinal + '<hr>' + this.mensajelugarentrega;
                    }
                    if (this.mensajefinal.length != 0) {

                        this.$confirm(this.mensajefinal, 'Warning', {
                            dangerouslyUseHTMLString: true,
                            confirmButtonText: 'OK',
                            cancelButtonText: 'Cancel',
                            type: 'warning'
                        }).then(() => {
                            if (this.ruleForm.Lugarentrega == '' && this.isincoterm == false && (this.ruleForm.incotermseleccionado == 2 || this.ruleForm.incotermseleccionado == 8 || this.ruleForm.incotermseleccionado == 9)) {
                                this.ruleForm.Lugarentrega = this.ruleForm.origen;
                            }
                            if (this.ruleForm.modalidadseleccionado == null && this.ismodalidad == false && this.isvisualizacion == false) {
                                if (this.ruleForm.tipooperacionseleccionado == 1) {
                                    this.ruleForm.modalidadseleccionado = 1;

                                } else if (this.ruleForm.tipooperacionseleccionado == 2) {
                                    this.ruleForm.modalidadseleccionado = 3;
                                }
                            } 
                            
                            this.mensajeseleccion();
                        }).catch(() => {

                        });


                    } else {

                        this.mensajeseleccion();
                    }

                    
                } else {
                    return false;
                }
            });
        },       
        cambiarEstado(formName) {
            this.mensajefinal = "";
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.ruleForm.modalidadseleccionado == null && this.ismodalidad == false && this.isvisualizacion == false) {

                        this.mensajefinal = this.mensajefinal + '<hr>' + this.mensajemodalidad;

                    }
                    if (this.ruleForm.Lugarentrega == '' && this.isincoterm == false && (this.ruleForm.incotermseleccionado == 2 || this.ruleForm.incotermseleccionado == 8 || this.ruleForm.incotermseleccionado == 9)) {

                        this.mensajefinal = this.mensajefinal + '<hr>' + this.mensajelugarentrega;
                    }
                    if (this.mensajefinal.length != 0) {
                        this.$confirm(this.mensajefinal, 'Warning', {
                            dangerouslyUseHTMLString: true,
                            confirmButtonText: 'OK',
                            cancelButtonText: 'Cancel',
                            type: 'warning'
                        }).then(() => {
                            this.deshabilitar = !this.deshabilitar;
                            this.adjuntartarifas = !this.adjuntartarifas;
                            this.botonesprincipal = !this.botonesprincipal;
                        }).catch(() => {

                        });

                    } else {
                        this.deshabilitar = !this.deshabilitar;
                        this.adjuntartarifas = !this.adjuntartarifas;
                        this.botonesprincipal = !this.botonesprincipal;
                    }                     
                    
                } else {
                    return false;
                }
            });
        },
        cargararacteristicasmercancia(valor) {
            
        },
        
        cambioaracteristicasmercancia(valor) {
            this.ruleForm.caracteristicasmercanciaseleccionada = valor;
        },
        cargartipomercancia() {

        },
        cambiotipomercancia(valor) {
            this.ruleForm.tipomercanciaseleccionado = valor;
        },
        provedoor() {
            this.Provee = !this.Provee;
        },
        
        changeselecciontarifa(val) {
            this.selecciontarifas = val
            if (val.length !=0) {
                this.bottonhabilitar = false;

            } else {

                this.bottonhabilitar = true;
            }
        },
        ocultartablas() {
            this.datotablaconceptotarifa = [{ Concepto: '', RubroCotizacion: null, Item: null, TipoContenedor: null, Moneda: null, RateClassCode: null, TarifaMinima: 0, ValorUnitario: 0, Observacion:'', editable: true }];
            this.datotablaselecciontarifa = [];
            this.datotablaseleccionmensajeriaydeposito = [];
            this.datotablaseleccionseguro = [];
            this.datotablasegurotarifa = [{ TipoMercancia: null, Caracteristicasmercancia: [], TrayectoAsegurado: null, TipoOperacion: null, ModoTransporte: null, Moneda: null, MontoAsegurado: 0, ValorDeducible: 0, PorcentajeDeducible: 0, TarifaMinima: 0, SeguroCobrado: 0, VigenciaTarifa: new Date(), Observacion: '', editable: true }];
            this.datotablaadjuntotarifa = [{ RubroCotizacion: null, NumeroCotizacion: '', Adjunto: [], Observacion: '', editable: true }];
            this.datotablaadjuntoseguro = [{ NumeroCotizacion: '', Adjunto: [], Vigencia: new Date(), Observacion: '', Caracteristicasmercancia: [], TipoMercancia: [], TrayectoAsegurado: [] , editable: true }];
            
        },
        guardarfechavigencia(valor) {
            this.ruleForm.vigencia = valor;
        },
        changecurrenttarifa(valor) {
            if (valor != null) {
                this.bottonhabilitar = false;
                this.selecciontarifas = valor.TarifaSeleccionada;

            } else {

                this.bottonhabilitar = true;
            }
            
        },
        tablasinicial() {
            this.columnatablaconceptotarifa = JSON.parse(JSON.stringify(this.columnatablaconceptotarifainicial));
            this.columnatablamensajeriatarifa = JSON.parse(JSON.stringify(this.columnatablamensajeriatarifaincial));
            this.columnatablasegurotarifa = JSON.parse(JSON.stringify(this.columnatablasegurotarifainicial));
            this.columnatablaadjuntotarifa = JSON.parse(JSON.stringify(this.columnatablaadjuntotarifainicial));
            this.columnatablaadjuntoseguro = JSON.parse(JSON.stringify(this.columnatablaadjuntoseguroinicial));
        },
        cargainformaciontablas(valor) {
            let currentObj = this;
             if(valor==3) {
                this.axios.post(this.metododatostablaseleccionseguro, {
                    IdRazonSocial: valor
                })
                    .then(function (response) {
                        currentObj.output = JSON.parse(response.data);
                        currentObj.datotablaseleccionseguro = currentObj.output["Tarifas"];
                    })
                    .catch(function (error) {
                        currentObj.output = error;

                    });
             } else if (valor == 8 || valor ==6) {
                this.axios.post(this.metododatosselecciontarifamensajeriaydeposito, {
                    IdRazonSocial: valor,
                    IdTipoCarga: this.ruleForm.tipocargaseleccionado
                })
                    .then(function (response) {
                        currentObj.output = JSON.parse(response.data);
                        currentObj.datotablaseleccionmensajeriaydeposito = currentObj.output["Tarifas"];
                    })
                    .catch(function (error) {
                        currentObj.output = error;
                    });
            } else  {
                 this.axios.post(this.metododatosselecciontarifa, {
                     IdRazonSocial: valor,
                     IdModoTransporte: this.ruleForm.modotransporteseleccionado,
                     IdTipoCarga: this.ruleForm.tipocargaseleccionado
                })
                    .then(function (response) {
                        currentObj.output = JSON.parse(response.data);
                        currentObj.datotablaselecciontarifa = currentObj.output["Tarifas"];
                    })
                    .catch(function (error) {
                        currentObj.output = error;
                    });

            }
          

        },
        cargarlistatarifas() {
            let currentObj = this;
            this.columnatablasegurotarifainicial.forEach(function callback(element) {

                if (element.tipo == 'seleccion') {
                    currentObj.axios.post(element.metodo, {
                        OpcionParametro: element.tiposeleccion
                    })
                        .then(function (response) {
                            currentObj.output = JSON.parse(response.data);
                            element.cargarlista = currentObj.output["ObjetoSeleccionable"];


                        })
                        .catch(function (error) {
                            currentObj.output = error;
                        });
                } else if (element.tipo == 'seleccionmultiple') {
                    currentObj.axios.post(element.metodo, {
                        OpcionParametro: element.tiposeleccion
                    })
                        

                        .then(function (response) {
                            currentObj.output = JSON.parse(response.data);
                            element.cargarlista = currentObj.output["ObjetoSeleccionable"];


                        })
                        .catch(function (error) {
                            currentObj.output = error;
                        });
                }

            })
            this.columnatablamensajeriatarifaincial.forEach(function callback(element) {

                    if (element.tipo == 'seleccion') {
                        currentObj.axios.post(element.metodo, {
                            OpcionParametro: element.tiposeleccion
                        })
                            .then(function (response) {
                                currentObj.output = JSON.parse(response.data);
                                element.cargarlista = currentObj.output["ObjetoSeleccionable"];


                            })
                            .catch(function (error) {
                                currentObj.output = error;

                            });
                    }
                })
            this.columnatablaconceptotarifainicial.forEach(function callback(element) {
                if (element.tipo == 'seleccion') {
                    currentObj.axios.post(element.metodo, {
                        OpcionParametro: element.tiposeleccion
                    })
                        .then(function (response) {                           
                            currentObj.output = JSON.parse(response.data);                  
                            element.cargarlista = currentObj.output["ObjetoSeleccionable"];
                            element.datoseleccion = currentObj.output["ObjetoSeleccionable"];

                        })
                        .catch(function (error) {
                            currentObj.output = error;
                        });
                }
            })
            this.columnatablaadjuntoseguroinicial.forEach(function callback(element) {

                if (element.tipo == 'seleccionmultiple') {
                    currentObj.axios.post(element.metodo, {
                        OpcionParametro: element.tiposeleccion
                    })
                        .then(function (response) {
                            currentObj.output = JSON.parse(response.data);
                            element.cargarlista = currentObj.output["ObjetoSeleccionable"];


                        })
                        .catch(function (error) {
                            currentObj.output = error;
                        });
                }
            })
            this.columnatablaseleccionseguro.forEach(function callback(element) {
                if (element.cargardato == true) {
                    currentObj.axios.post(element.metodo, {
                        OpcionParametro: element.tiposeleccion
                    })
                        .then(function (response) {
                            currentObj.output = JSON.parse(response.data);
                            element.cargarlista = currentObj.output["ObjetoSeleccionable"];


                        })
                        .catch(function (error) {
                            currentObj.output = error;
                        });
                }

            })
            this.columnatablaselecciontarifa.forEach(function callback(element) {
              
                    if (element.cargardato == true) {
                        currentObj.axios.post(element.metodo, {
                            OpcionParametro: element.tiposeleccion
                        })
                            .then(function (response) {
                                currentObj.output = JSON.parse(response.data);
                                element.cargarlista = currentObj.output["ObjetoSeleccionable"];


                            })
                            .catch(function (error) {
                                currentObj.output = error;
                            });
                    }
                
            })
            this.columnatablaseleccionmensajeriaydeposito.forEach(function callback(element) {
                if (element.cargardato == true) {
                    currentObj.axios.post(element.metodo, {
                        OpcionParametro: element.tiposeleccion
                    })
                        .then(function (response) {
                            currentObj.output = JSON.parse(response.data);
                            element.cargarlista = currentObj.output["ObjetoSeleccionable"];


                        })
                        .catch(function (error) {
                            currentObj.output = error;
                        });
                }

            })
            this.columnatablaadjuntotarifainicial.forEach(function callback(element) {
                if (element.tipo == 'seleccionmultiple') {
                    currentObj.axios.post(element.metodo, {
                        OpcionParametro: element.tiposeleccion
                    })
                        .then(function (response) {
                            currentObj.output = JSON.parse(response.data);
                            element.cargarlista = currentObj.output["ObjetoSeleccionable"];


                        })
                        .catch(function (error) {
                            currentObj.output = error;
                        });
                }
            })

        },
        
        cambioselecciontabla(valor) {


        }
    },
    watch: {
        reglas() {
            this.rules;
        }
    },

    

    mounted() {
        this.cargarlistatarifas();
    }
})