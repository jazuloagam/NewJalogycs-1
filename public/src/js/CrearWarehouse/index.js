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
import fechahoracalendario from '../../components/fechahoracalendario.vue'
import adjunto from '../../components/adjunto.vue'
import formulario from '../../components/formulario.vue'
import tabla from '../../components/tabla.vue'
import tablaformulario from '../../components/tablaformulario.vue'

Vue.use(VueAxios, axios);
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
    el: '#app-crearwarehouse',
    components: { autocomplete, seleccion, tablainfo, tablaedit, tablaseleccion, seleccionmultiple, fechacalendario, fechahoracalendario, adjunto, formulario, tabla, tablaformulario},
    data() {
        return {
            ruleForm: {
                cliente: '',
                DO: '',
                exportador: '',
                importador: '',
                fecharecepción: new Date(),
                fechadespacho: null,
                cargaentregada: '',
                cargarecibida: '',
                lugarbodega: [],
                lugarbodegaselecionado: null,
                descripcionlugarbodega: '',                
                factorestiba: '',
                UnidadMedidaDistancia: [],
                UnidadMedidaDistanciaselecionado: null,
                UnidadMedidaVolumen: [],
                UnidadMedidaVolumenselecionado: null,
                UnidadMedidaPesoNeto: [],
                UnidadMedidaPesoNetoselecionado: null,
                UnidadMedidaPesoBruto: [],
                UnidadMedidaPesoBrutoselecionado: null,
                PesoNeto: undefined,
                PesoBruto: undefined,
                numeropiezas: undefined,
                largo: undefined,
                ancho: undefined,
                alto: undefined,
                volumen: undefined,
                volumencalculado: '',
                visualizacion: [],
                descripciongeneralmercancia: '',
                
                valorseguro: undefined,
                descripcionseguro: '',
                Monedaseleccionada: null,
                Moneda: [],
            },
            rules: {
                exportador: [{ required: true, message: 'Ingresar exportador ', trigger: ['blur', 'change'] },
                    { min: 0, max: 200, message: 'El nombre debe ser menor a 200 caracteres', trigger: ['blur', 'change'] }],
                importador: [{ required: true, message: 'Ingresar importador', trigger: ['blur', 'change'] },
                    { min: 0, max: 200, message: 'El nombre debe ser menor a 200 caracteres', trigger: ['blur', 'change'] }],
                fecharecepción: [{ type: 'date', required: true, message: 'Por favor seleccione una fecha', trigger: ['blur', 'change'] }],
                fechadespacho: [{ type: 'date', required: false, message: 'Por favor seleccione una fecha', trigger: ['blur', 'change'] }],
                cargaentregada: [{ required: false, message: 'Ingresar un numero de DO', trigger: ['blur', 'change'] },
                    { min: 0, max: 200, message: 'El nombre debe ser menor a 200 caracteres', trigger: ['blur', 'change'] }],
                cargarecibida: [{ required: false, message: 'Ingresar un numero de DO', trigger: ['blur', 'change'] },
                    { min: 0, max: 200, message: 'El nombre debe ser menor a 200 caracteres', trigger: ['blur', 'change'] }],
                lugarbodegaselecionado: [{ required: false, message: 'Seleccione una Modalidad', trigger: ['blur', 'change'] }],
                descripcionlugarbodega: [{ required: false, message: 'Ingresar un numero de DO', trigger: ['blur', 'change'] },
                    { min: 0, max: 200, message: 'El nombre debe ser menor a 200 caracteres', trigger: ['blur', 'change'] }],                 
            },
            metododatosseleccionwarehouse: '../api/LogisticaApi/Datosseleccionwarehouse',
            metodocargardatos: '../api/Login/CargarDatos',
            metododatosdatofactorestibas: '../api/LogisticaApi/Datofactorestibas', 
            metodoobtenermodotrasportefactorestibasbloqueo: '../api/LogisticaApi/Obtenermodotrasportefactorestibasbloqueo',
            metodoguardarcrearcliente: '../api/LogisticaApi/Guardarcrearcliente',
            metododatoscopiawarehouse: '../api/LogisticaApi/Datoscopiawarehouse',

            datotablaseleccionwarehouse: [],            
            columnatablaseleccionwarehouse: [{ id: 0, label: 'DO', prop: 'DO', boton: false, popover: '', cargardato: false, cargarlista: [], width: '170px' },
                { id: 1, label: 'Tipo de Operación', prop: 'TipoOperacion', tiposeleccion: 'TipoOperacion', boton: false, popover: '', cargardato: true, metodo: '../api/Login/CargarDatos', cargarlista: [], width: '150px' },
                { id: 2, label: 'Modo de Transporte', prop: 'ModoTransporte', tiposeleccion: 'ModoTransporte', boton: false, popover: '', cargardato: true, metodo: '../api/Login/CargarDatos', cargarlista: [], width: '150px' },
                { id: 3, label: 'Tipo de Carga', prop: 'tipocarga', tiposeleccion: 'TipoCarga', boton: false, popover: '', cargardato: true, metodo: '../api/Login/CargarDatos', cargarlista: [], width: '120px' },
                { id: 4, label: 'Origen', prop: 'Origen', boton: false, popover: '', cargardato: false, fixed: true, cargarlista: [], width: '170px' },
                { id: 5, label: 'Destino', prop: 'Destino', boton: false, popover: '', cargardato: false, cargarlista: [], width: '170px' },
                { id: 6, label: 'Warehouse Creados', prop: 'Warehouse', boton: true, popover: 'boton', cargardato: false, cargarlista: [], width: '180px' }],
            componentKey: 0,
            active: 1,


            columnatabladetallesmercancia:[],
            columnatabladetallesmercanciainicial: [{ id: 0, label: 'Caracteristicas Mercancia', prop: 'Caracteristicasmercancia', tipocolumna: [], tipo: 'seleccion', tiposeleccion: 'Caracteristicasmercancia', metodo: '../api/Login/CargarDatos', placeholder: 'Seleccione opción', width: '250px', fixed: false, collapse: true, datoseleccion: [], cargarlista: [], arreglotablas: [{ id: 0, tipoopcion: 'deshabilitar', queafecta: 'UN', tipomatriz: 19, propiedadafectar: 'deshabilitar', nombremetodoconsulta: '../api/LogisticaApi/Obtenercaracteristicasmercanciavsnu' }]  },
                { id: 1, label: 'Tipo de mercancia', prop: 'TipoMercancia', tipocolumna: [], tipo: 'seleccion', tiposeleccion: 'TipoMercancia', metodo: '../api/Login/CargarDatos', placeholder: 'Seleccione opción', width: '250px', fixed: false, cargarlista: [], datoseleccion: [] },
                { id: 2, label: 'UN', prop: 'UN', tipo: 'seleccion', tiposeleccion: 'UN', metodo: '../api/Login/CargarDatos', placeholder: 'Seleccione opción', cargarlista: [], datoseleccion: [] , fixed: false, deshabilitar: true, tipocolumna: [{ id: 0, tipoopccion: 'tooltip', descripcion: 'Para habilitar el ingreso ingresar carga peligrosa en características mercancía', icono: 'el-icon-info', posicion: 'top' }] }],

            datocolumnadetallesmercancia: [{ dato: null, prop: 'Caracteristicasmercancia', regex: '^.*$', mensaje: 'Por favor seleccione una Caracteristica de mercancia', valdidaregex: false, validardato: true },
                { dato: null, prop: 'TipoMercancia', regex: '^[0-9]{1,2}$', mensaje: 'Por favor seleccione un TipoMercancia', valdidaregex: true, validardato: true },
                { dato: null, prop: 'UN', regex: '^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$', mensaje: 'Por favor seleccione un UN', valdidaregex: true, validardato: false }],

            datotabladetallesmercancia: [{ Caracteristicasmercancia: null, TipoMercancia: null, UN: null, editable: true }],

            columnatablamercanciaasegurada:[],
            columnatablamercanciaaseguradainicial: [{ id: 0, label: 'Moneda', prop: 'Moneda', tipocolumna: [], tipo: 'seleccion', tiposeleccion: 'Moneda', metodo: '../api/Login/CargarDatos', placeholder: 'Seleccione opción',  fixed: false, cargarlista: [] },
                { id: 1, label: 'Tarifa Minima', prop: 'TarifaMinima', tipocolumna: [{ id: 0, tipoopccion: 'tooltip', descripcion: 'para identificar decimales utilizar el punto', icono: 'el-icon-info', posicion: 'top' }], tipo: 'inputnumber', datotipo: 'moneda', min: 0, precision: 2, controls: false, width: '200px',  fixed: false },
                { id: 2, label: 'Observaciones', prop: 'Observacion', tipocolumna: [], tipo: 'input', fixed: false },
                { id: 3, label: 'Adjuntar', prop: 'Adjunto', tipocolumna: [], tipo: 'adjunto', width: '200px', fixed: false }],

            datocolumnamercanciaasegurada: [{ dato: null, prop: 'Moneda', datoseleccion: [], regex: '^[0-9]{1,2}$', mensaje: 'Por favor seleccione una Moneda', valdidaregex: false, validardato: false },
                { dato: 0, prop: 'TarifaMinima', regex: '^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$', mensaje: 'dato obligatorio TarifaMinima', valdidaregex: false, validardato: false },
                { dato: '', prop: 'Observacion', regex: '^.+$', mensaje: 'Por favor seleccione un Observacion', valdidaregex: false, validardato: false },
                { dato: [], prop: 'Adjunto', regex: '^.+$', mensaje: 'Por favor seleccione un Adjunto', valdidaregex: false, validardato: false }],
            datotablamercanciaasegurada: [{ Moneda: null, TarifaMinima: 0, Observacion: '  ', Adjunto: [] }],
            datotablamercanciaaseguradacolumna: [{ Moneda: null, TarifaMinima: 0, Observacion: '  ', Adjunto: [] }],

            columnatablawarehouse:[],
            columnatablawarehouseinicial: [{ id: 0, label: 'Dimensiones - Volumen', prop: 'Dimensiones', tipocolumna: [], unidad: 'unidad', dimenciones: 'checkeddimensiones' ,  sindatos:'Sin Dimensiones',  tipo: 'boton', width: '200px', fixed: false, columnastabla: [{ id: 0, label: 'largo', prop: 'largo' }, { id: 1, label: 'ancho', prop: 'ancho' }, { id: 2, label: 'alto', prop: 'alto' } ] }, 
                { id: 1, label: 'Tipo de Embalaje', prop: 'TipoEmbalaje', tipocolumna: [], tipo: 'seleccion', deshabilitar: false, tiposeleccion: 'TipoEmbalaje', datoseleccion: [], metodo: '../api/Login/CargarDatos', placeholder: 'Seleccione opción', width: '200px', fixed: false, filtro: true, cargarlista: [] },
                { id: 2, label: 'Numero de piezas', prop: 'numeropiezas', tipocolumna: [], tipo: 'label', width: '200px', fixed: false },
                { id: 3, label: 'Volumen', prop: 'Volumen', collapse: true, name: 0, tipocolumna: [], tipo: 'labeltabla', width: '200px', fixed: false, titulocollapse: 'cbm', validartitulocollapse:true, filtro:true, columnastabla: [{ id: 0, label: 'pies', prop: 'pies' }, { id: 1, label: 'pulgadas', prop: 'pulgadas'}]},    
                { id: 4, label: 'Peso Volumétrico', prop: 'pesovolumenmetrico', collapse: true, name: 1, tipocolumna: [], tipo: 'labeltabla', filtro: true, width: '200px', fixed: false, titulocollapse: 'kg', validartitulocollapse: true, columnastabla: [{ id: 0, label: 'lbs', prop: 'lbs' }] },
                { id: 5, label: 'Peso Bruto', prop: 'PesoBruto', collapse: true, name: 2, tipocolumna: [], tipo: 'labeltabla', width: '200px', fixed: false, titulocollapse: 'kg', validartitulocollapse: true, columnastabla: [{ id: 0, label: 'lbs', prop: 'lbs' }, { id: 1, label: 'tn', prop: 'tn' }] },                               
                { id: 6, label: 'Peso/Volumen', prop: 'PesoVolumen', collapse: true, name: 3, tipocolumna: [], tipo: 'labeltabla', width: '250px', fixed: false, titulocollapse: 'kg', validartitulocollapse: true, columnastabla: [{ id: 0, label: 'lbs', prop: 'lbs' }] },
                { id: 7, label: 'Descripción', prop: 'Descripcion', tipocolumna: [], tipo: 'input', width: '200px', fixed: false, filtro: false },
                { id: 8, label: 'Adjuntar fotos por cada embalaje', prop: 'Adjuntardocumento', tipocolumna: [], tipo: 'adjunto', width: '200px', fixed: false }],

            datocolumnawarehouse: [{ dato: [], prop: 'Dimensiones', regex: '^.+$', mensaje: 'Por favor ingrese dimensiones', valdidaregex: false, validardato: true},
                { dato: null, prop: 'TipoEmbalaje', regex: '^[0-9]{1,2}$', mensaje: 'Por favor seleccione un Tipo de Embalaje', valdidaregex: true, validardato: true },
                { dato: '', prop: 'numeropiezas', regex: '^[0-9]{1,2}$', mensaje: 'Por favor seleccione un RubroCotizacion', valdidaregex: false, validardato: false },
                { dato: '', prop: 'Volumen', regex: '^.+$', mensaje: 'Por favor seleccione un Observacion', valdidaregex: false, validardato: false },
                { dato: '', prop: 'pesovolumenmetrico', regex: '^.+$', mensaje: 'Por favor seleccione un Observacion', valdidaregex: false, validardato: false },
                { dato: '', prop: 'PesoBruto', regex: '^.+$', mensaje: 'Por favor seleccione un Observacion', valdidaregex: false, validardato: false },
                { dato: '', prop: 'PesoVolumen', regex: '^.+$', mensaje: 'Por favor seleccione un Observacion', valdidaregex: false, validardato: false },
                { dato: '', prop: 'Descripcion', regex: '^.+$', mensaje: 'Por favor agregar una Descripcion', valdidaregex: true, validardato: false },
                { dato: [], prop: 'Adjuntardocumento', regex: '^.+$', mensaje: 'Por favor seleccione un Adjunto', valdidaregex: false, validardato: false }],
            datotablawarehouse: [{ Dimensiones: [], TipoEmbalaje: null, numeropiezas: null, Volumen: [], pesovolumenmetrico: [], PesoBruto: [], PesoVolumen: [], Descripcion: '', Adjuntardocumento: [], editable: true }],

            columnatablaadjuntodomuento: [{ id: 0, label: 'Tipo de Documento', prop: 'TipoDocumentoArchivo', tipocolumna: [{ id: 0, tipoopccion: 'boton', descripcion: 'Para habilitar el ingreso ingresar carga peligrosa en características mercancía', icono: 'el-icon-info', posicion: 'top' }], tipo: 'seleccion', deshabilitar: false, tiposeleccion: 'TipoDocumentoArchivo', datoseleccion: [], metodo: '../api/Login/CargarDatos', placeholder: 'Seleccione opción', width: '200px', fixed: false, filtro: true, cargarlista: [] },
                { id: 1, label: 'No de documento', prop: 'nodocumentoadjunto', tipocolumna: [], tipo: 'input', fixed: false },
                { id: 2, label: 'Adjuntar Doc', prop: 'Adjunto', tipocolumna: [], tipo: 'adjunto', width: '100px', fixed: false }],
            datocolumnaadjuntodomuento: [{ dato: null, prop: 'TipoDocumento', regex: '^[0-9]{1,2}$', mensaje: 'Por favor seleccione un RubroCotizacion', valdidaregex: false, validardato: false },
                { dato: '', prop: 'nodocumentoadjunto', regex: '^.*$', mensaje: 'Por favor seleccione una Caracteristica de mercancia', valdidaregex: false, validardato: false },
                { dato: [], prop: 'Adjunto', regex: '^.+$', mensaje: 'Por favor seleccione un Observacion', valdidaregex: false, validardato: false }],
            datotablaadjuntodomuento: [{ TipoDocumento: null, nodocumentoadjunto: '', Adjunto: [], editable: true }],
            visualizacionprincipal: false,
            visualizacionstep: false,
            ocultarprincipal: true,
            dialogFormDimensionesvolumen: false,
            dialogFormexportador: false,
            dialogFormimportador: false,
            dialogFormExportadorbuscar: false,
            dialogFormImportadorbuscar: false,
            checkeddimensiones: false,
            checkedvolumen: false,
            pesovolumentn: '',
            pesovolumenkg: '',
            pesovolumenlbs:'',
            modotrasporte:[],
            seleccionwarehouse: [],
            modotransporteseleccionado: null,
            factorestiba: [],
            factorestibabloqueo: true,
            visibilidadfatorestivas: true,            
            tex: '',
            listadist: [],
            texseleccion: '',
            kg: '',
            tn: '',
            lbs: '',
            cmcubico: '',
            cbm: '',
            pies: '',
            pulgadas: '',
            texcbm: '',
            texvol:'',
            listapeso: [],
            texselecpeso: '',
            pesovolumenmetrico: '',
            pesovol: '',
            informacionformulario: [],
            deshabilitaraceptar: true,
            indexformulario: 10,
            datosvolumen: [],
            datospeso: [],
            datospesovolumen: [],
            datospesovolumenmetrico:[],
            pesvol: null,
            lbspesovol: null,
            totalpesovolumentn: null,
            totalpesovolumenlbs: null,
            summary: true,
            textunidadmedidadistancia: '',
            columnasuma: [],
            search: '',
            searchclientebasic: '',
            searchexportador: [],
            searchimportador: [],
            columnasumainicial: [{ id: 0, columna: 'PesoBruto', UnidadMedida: 'kg', suma: true, TocaValidarUnidadMedida: true, values: [], total: 0, mayor: true, visualizar: true },
                { id: 1, columna: 'PesoBruto', UnidadMedida: 'tn', suma: true, TocaValidarUnidadMedida: true, values: [], total: 0, mayor: false, visualizar: true },
                { id: 2, columna: 'PesoBruto', UnidadMedida: 'lbs', suma: true, TocaValidarUnidadMedida: true, values: [], total: 0, conversion: true, visualizar: true },
                { id: 3, columna: 'Volumen', UnidadMedida: 'cbm', suma: true, TocaValidarUnidadMedida: true, values: [], total: 0, mayor: false, visualizar: true },
                { id: 4, columna: 'Volumen', UnidadMedida: 'pies', suma: true, TocaValidarUnidadMedida: true, values: [], total: 0, conversion: false, visualizar: true },
                { id: 5, columna: 'Volumen', UnidadMedida: 'pulgadas', suma: true, TocaValidarUnidadMedida: true, values: [], total: 0, visualizar: true },
                { id: 6, columna: 'pesovolumenmetrico', UnidadMedida: 'kg', suma: true, TocaValidarUnidadMedida: true, values: [], total: 0, mayor: true, visualizar: true },
                { id: 7, columna: 'pesovolumenmetrico', UnidadMedida: 'lbs', suma: true, TocaValidarUnidadMedida: true, values: [], total: 0, conversion: true, visualizar: true},
                { id: 8, columna: 'PesoVolumen', UnidadMedida: '', suma: false, values: [], total: 0, UnidadMedidamayor: 'kg', UnidadMedidaconversion: 'lbs', visualizar: true },
                { id: 9, columna: 'numeropiezas', UnidadMedida: '', suma: true, TocaValidarUnidadMedida: false, visualizar: true }],


            exportador: [{ id: 0, label: 'Tipo de Documento', prop: 'idtipodocumento', tipo: 'seleccion', placeholder: 'seleccione tipo de documento', metodo: '../api/Login/CargarDatos', tiposeleccion: 'TipoDocumento', datoseleccion: [], visualizar: true },
                { id: 1, label: 'Numero de documento', prop: 'numerodedocumento', tipo: 'number', visualizar: true },
                { id: 2, label: 'Razon social', prop: 'razonsocial', tipo: 'input', visualizar: true },
                { id: 3, label: 'Pais', prop: 'pais', tipo: 'autocomplete', metodo: '../api/Login/CargarDatos', tipoautocomplete: 'Pais', visualizar: true }],

            ruleformexportador: {
                idtipodocumento: null,
                numerodedocumento: undefined,
                razonsocial: '',
                pais: ''
            },


            importador: [{ id: 0, label: 'Tipo de Documento', prop: 'TipoDocumento', tipo: 'seleccion', placeholder: 'seleccione tipo de documento', metodo: '../api/Login/CargarDatos', tiposeleccion: 'TipoDocumento', datoseleccion: [], visualizar: true },
                { id: 1, label: 'Numero de documento', prop: 'numerodedocumento', tipo: 'number', visualizar: true },
                { id: 2, label: 'Razon social', prop: 'razonsocial', tipo: 'input', visualizar: true },
                { id: 3, label: 'Pais', prop: 'pais', tipo: 'autocomplete', metodo: '../api/Login/CargarDatos', tipoautocomplete: 'Pais', visualizar: true }],
            ruleformimportador: {
                idtipodocumento: null,
                numerodedocumento: undefined,
                razonsocial: '',
                pais: ''
            },
            datostablaimportador: [],
            exportadordatos: [],
            importadordatos: [],
            page: 1,
            pageSize: 3,
            columnatablaexportadoreimportador: [{ id: 0, label: 'Tipo de Documento', prop: 'idtipodocumento', tiposeleccion: 'TipoDocumento', boton: false, cargardato: true, cargarlista: [], metodo: '../api/Login/CargarDatos' },
                { id: 1, label: 'Numero de documento', prop: 'numerodocumento', normal: true },
                { id: 2, label: 'Razon social', prop: 'razonsocial' },
                { id: 3, label: 'Pais', prop: 'pais' }],
            datostablaexportador: [],
            datostablaImportador: [],            
            valorautocomplete: '',
            datosexportadorseleccionado: [],
            datosimportadorseleccionado: [],
            dialogFormexportadoreditar: false,
            dialogFormimportadoreditar: false,
            ruleformeditarexportador: {
                idtipodocumento: null,
                numerodedocumento: undefined,
                razonsocial: '',
                pais: ''
            },
             ruleformeditarimportador: {
                idtipodocumento: null,
                numerodedocumento: undefined,
                razonsocial: '',
                pais: ''
            },
            visualizareditar: false,
            visualizarwarehouse: false,


            crearcliente: [{ id: 0, label: 'Tipo de Documento', prop: 'idtipodocumento', tipo: 'seleccion', placeholder: 'seleccione tipo de documento', metodo: '../api/Login/CargarDatos', tiposeleccion: 'TipoDocumento', datoseleccion: [], visualizar: true },
                { id: 1, label: 'Numero de documento', prop: 'numerodedocumento', tipo: 'number', visualizar: true },
                { id: 2, label: 'Razon social', prop: 'razonsocial', tipo: 'input', visualizar: true },
                { id: 3, label: 'Pais', prop: 'pais', tipo: 'autocomplete', metodo: '../api/Login/CargarDatos', tipoautocomplete: 'Pais', visualizar: true }],
            dialogFormcrearcliente: false,
            dialogFormcrearclientebuscar: false,
            columnatablacrearcliente: [{ id: 0, label: 'Tipo de Documento', prop: 'idtipodocumento', tipo: 'seleccion', tiposeleccion: 'TipoDocumento', boton: false, cargardato: true, cargarlista: [], metodo: '../api/Login/CargarDatos' },
            { id: 1, label: 'Numero de documento', prop: 'numerodocumento', normal: true },
            { id: 2, label: 'Razon social', prop: 'razonsocial' },
            { id: 3, label: 'Pais', prop: 'pais' }],
            datoscrearclienteseleccionado: [],
            searchcrearcliente: [],
            crearclientedatos: [],
            datostablacrearcliente: [],
            dialogFormeditarcliente: false,
  
            nuevodato: true,
            creardoform: [{ id: 0, label: 'NO. DO', prop: 'DO', tipo: 'input', visualizar: true },
                { id: 1, label: 'TipoOperacion', prop: 'TipoOperacion', tipo: 'seleccion', placeholder: 'seleccione tipo de documento', metodo: '../api/Login/CargarDatos', visualizar: true, tiposeleccion: 'TipoOperacion', datoseleccion: [], arreglotablas: [{ id: 0, tipoopcion: 'visualizar', queafecta: 'Modalidad', tipomatriz: 1, propiedadafectar: 'datoseleccion', propiedadvisualizar: 'visualizar', nombremetodoconsulta: '../api/LogisticaApi/ObtenerModalidadTransporteTipoOperacion' }] },
                { id: 2, label: 'Modalidad', prop: 'Modalidad', tipo: 'seleccion', placeholder: 'seleccione tipo de documento', metodo: '../api/Login/CargarDatos', tiposeleccion: 'Modalidad', datoseleccion: [], visualizar: false  },
                { id: 3, label: 'ModoTransporte', prop: 'ModoTransporte', tipo: 'seleccion', placeholder: 'seleccione tipo de documento', metodo: '../api/Login/CargarDatos', tiposeleccion: 'ModoTransporte', datoseleccion: [], visualizar: true, informacionlista: [], arreglotablas: [{ id: 0, tipoopcion: 'visualizar', queafecta: 'TipoCarga', tipomatriz: 8, propiedadafectar: 'datoseleccion', propiedadvisualizar: 'visualizar', nombremetodoconsulta: '../api/LogisticaApi/Obtenermodotransportetipocarga' }, { id: 1, tipoopcion: 'visualizar', queafecta: 'Incoterm', tipomatriz: 9, propiedadafectar: 'datoseleccion', propiedadvisualizar: 'visualizar', nombremetodoconsulta: '../api/LogisticaApi/Obtenermodotransporteincoterm' }, { id: 2, tipoopcion: 'visualizarsinlista', queafecta: 'FactorEstiba', tipomatriz: 17, propiedadafectar: 'datoseleccion', propiedadvisualizar: 'visualizar', nombremetodoconsulta: '../api/LogisticaApi/Obtenermodotrasportefactorestibasbloqueo' }, { id: 3, tipoopcion: 'visualizarsinlista', queafecta: 'ValorFactor', tipomatriz: 20, propiedadafectar: 'datoseleccion', propiedadvisualizar: 'deshabilitar', nombremetodoconsulta: '../api/LogisticaApi/Obtenermodotrasportefactorestibasbloqueo' }, { id: 4, tipoopcion: 'cargarvalor', queafecta: 'ValorFactor' }] },
                { id: 4, label: 'Factor de Estiba', prop: 'FactorEstiba', tipo: 'seleccion', placeholder: 'seleccione tipo de documento', metodo: '../api/Login/CargarDatos', tiposeleccion: 'FactorEstiba', datoseleccion: [], visualizar: false, informacionlista: [], arreglotablas: [{ id: 0, tipoopcion: 'visualizarsinlista', queafecta: 'ValorFactor', tipomatriz: 20, propiedadafectar: 'datoseleccion', propiedadvisualizar: 'deshabilitar', nombremetodoconsulta: '../api/LogisticaApi/Obtenermodotrasportefactorestibasbloqueo' }, { id: 1, tipoopcion: 'cargarvalor', queafecta: 'ValorFactor'}] },
                { id: 5, label: 'Valor Factor', prop: 'ValorFactor', tipo: 'number', visualizar: true, deshabilitar: true },
                { id: 6, label: 'TipoCarga', prop: 'TipoCarga', tipo: 'seleccion', placeholder: 'seleccione tipo de documento', metodo: '../api/Login/CargarDatos', tiposeleccion: 'TipoCarga', datoseleccion: [], visualizar: true },
                { id: 7, label: 'Origen', prop: 'Origen', tipo: 'autocomplete', metodo: '../api/Login/CargarDatos', tipoautocomplete: 'Ciudad', visualizar: true },
                { id: 8, label: 'Destino', prop: 'Destino', tipo: 'autocomplete', metodo: '../api/Login/CargarDatos', tipoautocomplete: 'Ciudad', visualizar: true },
                { id: 9, label: 'Incoterm', prop: 'Incoterm', tipo: 'seleccion', placeholder: 'seleccione tipo de documento', metodo: '../api/Login/CargarDatos', tiposeleccion: 'Incoterm', datoseleccion: [], visualizar: true, arreglotablas: [{ id: 0, tipoopcion: 'bloqueo', queafecta: 'Entrega', propiedadafectar: 'deshabilitar' }], borrado:true },
                { id: 10, label: 'Entrega', prop: 'Entrega', tipo: 'input', visualizar: true, deshabilitar:true }],
            dialogFormcreardo: false,
            IdCliente: 0,
            
            columnatablaconsultawarehouse: [{ id: 0, label: 'DO', prop: 'DOparcial' },
                { id: 1, label: 'NumeroWarehosue', prop: 'NumeroWarehosue' },
                { id: 2, label: 'Exportador', prop: 'Exportador' },
                { id: 3, label: 'Importador', prop: 'Importador' },
                { id: 4, label: 'CantidadPiezas', prop: 'CantidadPiezas' },
                { id: 5, label: 'PesoVolumen', prop: 'PesoVolumen' },
                { id: 6, label: 'Detalles', prop: 'Detalles', boton: true, popover: 'boton', texboton: 'Sin Warehouse'}],
            datosconsultawarehouse: [],
            dialogFormConsultawarehouse: false,
            dialogFormDetalleswarehouse: false,
            columnatabladetalleswarehouse: [{ id: 0, label: 'Descripcion', prop: 'Descripcion' },
                { id: 1, label: 'Tipo Embalaje', prop: 'TipoEmbalaje', cargardato: true, cargarlista: [], metodo: '../api/Login/CargarDatos', tiposeleccion: 'TipoEmbalaje' },
                { id: 2, label: 'Dimensiones', prop: 'Dimensiones', width: '150px', tipo: 'popover', sindatos:'sin dimensiones', columnastabla: [{ id: 0, label: 'largo', prop: 'largo' }, { id: 1, label: 'ancho', prop: 'ancho' }, { id: 2, label: 'alto', prop: 'alto' }] },            
                { id: 3, label: 'numero piezas', prop: 'numeropiezas' },
                { id: 4, label: 'Peso', prop: 'Peso', tipo: 'popover', columnastabla: [{ id: 0, label: 'peso', prop: 'peso' }, { id: 1, label: 'kg', prop: 'kg' }, { id: 2, label: 'tn', prop: 'tn' }, { id: 3, label: 'lbs', prop: 'lbs' }] },             
                { id: 5, label: 'Volumen', prop: 'Volumen', tipo: 'tooltip', columnatitulo: 'cbm' },
                { id: 6, label: 'peso volumetrico', prop: 'pesovolumenmetrico', tipo: 'tooltip', columnatitulo: 'kg' },
                { id: 7, label: 'Peso Volumen', prop: 'PesoVolumen', tipo:'tooltip', columnatitulo:'kg' }],           
            datosdetalleswarehouse: [],
            datosdetallescopiawarehouse:[],
            
            datosconsultawarehouseseleccionado: [],
            dialogFormSeleccioncopiawarehouse: false,
            columnatablaseleccioncopiawarehouse: [{ id: 0, label: 'DO', prop: 'DOparcial', width: '100px' },
                { id: 1, label: 'Exportador/importador', prop: 'Exportadoreimportador', lista: false, boton: true, popover: 'columnas', columnastabla: [{ id: 0, label: 'tipo', prop: 'tipo' }, { id: 1, label: 'razonsocial', prop: 'razonsocial'}],cargardato: false, cargarlista: [], width: '100px' },                
                { id: 2, label: 'Doc. Transporte', prop: 'documentotransporte', width: '150px', boton: true, popover: 'basic' },
                { id: 3, label: 'No de Warehouse', prop: 'NumeroWarehosue', width: '150px' },
                { id: 4, label: 'Origen', prop: 'Origen', boton: false, popover: '', cargardato: false, fixed: true, cargarlista: [], width: '100px' },
                { id: 5, label: 'Destino', prop: 'Destino', boton: false, popover: '', cargardato: false, cargarlista: [], width: '100px' },
                { id: 6, label: 'Con Dimensiones', prop: 'condimensiones', width: '150px' },
                { id: 7, label: 'Detalles carga', prop: 'Detallescarga', boton: true, popover: 'boton', texboton: 'Sin Warehouse', width: '120px' },
                { id: 8, label: 'Tipo Mercancia', prop: 'Detallestipomercancia', boton: true, popover: 'boton', texboton: 'Sin Warehouse', width: '125px' }],
            datosseleccioncopiawarehouse: [],
            datosseleccioncopiawarehouseseleccionado:[],
            dialogFormDetallescopiawarehouse: false,
            columnainfotipomercancia: [{ id: 0, label: 'Caracteristicasmercancia', prop: 'Caracteristicasmercancia', cargardato: true, cargarlista: [], metodo: '../api/Login/CargarDatos', tiposeleccion: 'Caracteristicasmercancia' },
                { id: 1, label: 'TipoMercancia', prop: 'TipoMercancia', cargardato: true, cargarlista: [], metodo: '../api/Login/CargarDatos', tiposeleccion: 'TipoMercancia' },
                { id: 2, label: 'UN', prop: 'UN', cargardato: true, cargarlista: [], vacio:true, metodo: '../api/Login/CargarDatos', tiposeleccion: 'UN' }],
            datosinftipomercancia: [],
            dialogFormTipomercanciawarehouse: false,
            crearclientebotonaceptar: false,
            reglascliente: {
                idtipodocumento: [{ required: false, message: 'Seleccione un modo de transporte', trigger: ['blur', 'change'] }],
                numerodocumento: [{ required: false, message: 'Ingresar Documento', trigger: ['blur', 'change'] },
                { min: 0, max: 200, message: 'El nombre debe ser menor a 200 caracteres', trigger: ['blur', 'change'] }],
                razonsocial: [{ required: true, message: 'Ingresar razon social', trigger: ['blur', 'change'] },
                { min: 0, max: 200, message: 'El nombre debe ser menor a 200 caracteres', trigger: ['blur', 'change'] }],
                pais: [{ required: true, message: 'Seleccione un Pais', trigger: ['blur', 'change'] }]
            },
            ruleformeditarcliente: {
                idtipodocumento: null,
                numerodedocumento: undefined,
                razonsocial: '',
                pais: ''  
            },
            ruleformcliente: {idtipodocumento: null,
                numerodedocumento: undefined,
                razonsocial: '',
                pais: ''                
            },
            ruleformcreardo: {
                DO: '',
                TipoOperacion: null,
                Modalidad: null,
                ModoTransporte: null,
                FactorEstiba: null,
                ValorFactor: undefined,
                TipoCarga: null,
                Origen: '',
                Destino: '',
                Incoterm: null,
                Entrega:"",             
            },
            reglasdo: {
                DO: [{ required: true, message: 'Ingresar un numero de DO', trigger: ['blur', 'change'] },
                { min: 0, max: 200, message: 'El nombre debe ser menor a 200 caracteres', trigger: ['blur', 'change'] }],
                TipoOperacion: [{ required: true, message: 'Seleccione un Tipo de Operacion', trigger: ['blur', 'change'] }],
                Modalidad: [{ required: false, message: 'Seleccione una Modalidad', trigger: ['blur', 'change'] }],
                ModoTransporte: [{ required: true, message: 'Seleccione un modo de transporte', trigger: ['blur', 'change'] }],
                FactorEstiba: [{ required: true, message: 'Seleccione un Factor de Estiba', trigger: ['blur', 'change'] }],
                ValorFactor: [{ required: true, message: 'Ingresar un valor Factor'},
                    { type: 'number', message: 'El nombre debe ser menor a 200 caracteres'}],
                TipoCarga: [{ required: true, message: 'Seleccione un Tipo de Carga', trigger: ['blur', 'change'] }],
                Origen: [{ required: true, message: 'Seleccionar Origen', trigger: ['blur', 'change'] },
                { min: 0, max: 200, message: 'El nombre debe ser menor a 200 caracteres', trigger: ['blur', 'change'] }],
                Destino: [{ required: true, message: 'Seleccionar Destino', trigger: ['blur', 'change'] },
                { min: 0, max: 200, message: 'El nombre debe ser menor a 200 caracteres', trigger: ['blur', 'change'] }],
                Incoterm: [{ required: true, message: 'Seleccione un Incoterm', trigger: ['blur', 'change'] }],
                Entrega: [{ required: false, message: 'Por favor seleccione un nombre', trigger: ['blur', 'change'] },
                { min: 0, max: 200, message: 'El nombre debe ser menor a 200 caracteres', trigger: ['blur', 'change'] }]                
            },
            validarformulario: 0,
            mensajemodalidad: 'Como no fue seleccionada la modalidad, por defecto se indica importacion o exportacion ordinaria respectivamente',
            mensajelugarentrega: 'Teniendo en cuenta que no se ingreso lugar de entrega para el incoterm se deja por defecto el origen',
            mensajefinal: '',
            botonnext: true,
            checkeddescripcioncasilla: false,
            checkeddescripciongeneral: true,
            Tipodedocumento: '',
            dialogFormtipodocumento: false,
            TipoDocumentoArchivoseleccionado: null,
            TipoDocumentoArchivo:[],

        };
    },
    computed: {

        displayDataExportador() {
            if (!this.exportadordatos || this.exportadordatos.length === 0) return [];
            this.searchexportador = this.exportadordatos.filter(data => !this.search || data.razonsocial.toLowerCase().includes(this.search.toLowerCase()) || data.pais.toLowerCase().includes(this.search.toLowerCase()) || data.numerodocumento.toLowerCase().includes(this.search.toLowerCase()) );
            return this.searchexportador.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
        },
        displayDataImportador() {
            if (!this.importadordatos || this.importadordatos.length === 0) return [];
            this.searchimportador = this.importadordatos.filter(data => !this.search || data.razonsocial.toLowerCase().includes(this.search.toLowerCase()) || data.pais.toLowerCase().includes(this.search.toLowerCase()) || data.numerodocumento.toLowerCase().includes(this.search.toLowerCase()));
            return this.searchimportador.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
        },
        displayDatacrearcliente() {
            if (!this.crearclientedatos || this.crearclientedatos.length === 0) return [];
            this.searchcrearcliente = this.crearclientedatos.filter(data => !this.search || data.razonsocial.toLowerCase().includes(this.search.toLowerCase()) || data.pais.toLowerCase().includes(this.search.toLowerCase()) || data.numerodocumento.toLowerCase().includes(this.search.toLowerCase()));
            return this.searchcrearcliente.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
        }
    },
    methods: {
        aceptartipodocumento() {

        },
        accionclicktipodocumento() {
            this.dialogFormtipodocumento = true;
        },
        cambiodescripciongeneral() {
            this.checkeddescripcioncasilla = false;
            this.checkeddescripciongeneral = true;
            const found = this.columnatablawarehouse.findIndex(element => element.prop == 'Descripcion');
            Reflect.set(this.columnatablawarehouse[found], 'filtro', this.checkeddescripcioncasilla); 
            const foundvali = this.datocolumnawarehouse.findIndex(element => element.prop == 'Descripcion');
            Reflect.set(this.datocolumnawarehouse[foundvali], 'validardato', this.checkeddescripcioncasilla);
        },
        cambiodescripcioncasilla() {
            this.checkeddescripciongeneral = false;
            this.checkeddescripcioncasilla = true;
            const found = this.columnatablawarehouse.findIndex(element => element.prop == 'Descripcion');
            Reflect.set(this.columnatablawarehouse[found], 'filtro', this.checkeddescripcioncasilla);
            this.ruleForm.descripciongeneralmercancia = '';
            const foundvali = this.datocolumnawarehouse.findIndex(element => element.prop == 'Descripcion');
            Reflect.set(this.datocolumnawarehouse[foundvali], 'validardato', this.checkeddescripcioncasilla);
        },
        validarformulariocliente() {
            console.log("validarformulariocliente");
            this.validarformulario = this.validarformulario + 1;
            console.log("validarformulariocliente despues de sumar", this.validarformulario);
        },
        consultawarehouse(valor,scope) {
            this.datosconsultawarehouse = Object.values(valor);
            this.dialogFormConsultawarehouse = true;           
        },
        cancelarconsultawarehouse() {
            this.dialogFormConsultawarehouse = false;
        },
        cancelarseleccioncopiawarehouse() {
            console.log("cancelarseleccioncopiawarehouse", this.dialogFormSeleccioncopiawarehouse);
            this.dialogFormSeleccioncopiawarehouse = false;
        },
        copiarconsultawarehouse() {
            this.$confirm(' Se han copiado los datos segun seleccion, si no corresponde puede cambiar la informacion y editarla en el ware house que va a copiar  <br/> No se copiaron fotos, ni documentos. Estos al ser un nuevo WR, deben ser ingresados o confirmados en el nuevo WR ','Confirmación', {
                distinguishCancelAndClose: true,
                dangerouslyUseHTMLString: true,
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                let currentObj = this;
                this.carguedeinformacion();
                const y = this.datosconsultawarehouseseleccionado['datostablawarehouse'];
                y.forEach(function callback(element) {
                    currentObj.datotablawarehouse.push({ Dimensiones: element.Dimensiones, TipoEmbalaje: element.TipoEmbalaje, numeropiezas: element.numeropiezas, Volumen: element.Volumen, pesovolumenmetrico: element.pesovolumenmetrico, PesoBruto: element.PesoBruto, PesoVolumen: element.PesoVolumen, Descripcion: element.Descripcion, Adjuntardocumento: [], editable: false })
                })

                const x = this.datosconsultawarehouseseleccionado['datoswarehouse'];
                
                x.forEach(function callback(element) {
                    currentObj.datotabladetallesmercancia.push({ Caracteristicasmercancia: element.Caracteristicasmercancia, TipoMercancia: element.TipoMercancia, UN: element.UN, Observacion: element.Observacion, editable: false });
                })
                this.visualizacionstep = true;
                this.dialogFormConsultawarehouse = false;
                this.ocultarprincipal = false;
                this.ruleForm.exportador = this.datosconsultawarehouseseleccionado['Exportador'];
                this.ruleForm.importador = this.datosconsultawarehouseseleccionado['Importador'];
            }).catch(action => {
                if (action === 'cancel') {

                }
            });
        },
        copiarseleccionwarehouse() {
            this.$confirm(' Se han copiado los datos segun seleccion, si no corresponde puede cambiar la informacion y editarla en el ware house que va a copiar  <br/> No se copiaron fotos, ni documentos. Estos al ser un nuevo WR, deben ser ingresados o confirmados en el nuevo WR ', 'Confirmación', {
                distinguishCancelAndClose: true,
                dangerouslyUseHTMLString: true,
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                let currentObj = this;
                this.carguedeinformacion();
                const y = this.datosseleccioncopiawarehouseseleccionado['datostablawarehouse'];
                y.forEach(function callback(element) {
                    currentObj.datotablawarehouse.push({ Dimensiones: element.Dimensiones, TipoEmbalaje: element.TipoEmbalaje, numeropiezas: element.numeropiezas, Volumen: element.Volumen, pesovolumenmetrico: element.pesovolumenmetrico, PesoBruto: element.PesoBruto, PesoVolumen: element.PesoVolumen, Descripcion: element.Descripcion, Adjuntardocumento: [], editable: false })
                })

                const x = this.datosseleccioncopiawarehouseseleccionado['datoswarehouse'];

                x.forEach(function callback(element) {
                    currentObj.datotabladetallesmercancia.push({ Caracteristicasmercancia: element.Caracteristicasmercancia, TipoMercancia: element.TipoMercancia, UN: element.UN, Observacion: element.Observacion, editable: false });
                })
                this.visualizacionstep = true;
                this.dialogFormSeleccioncopiawarehouse = false;
                this.ocultarprincipal = false;
                this.dialogFormcreardo = false;
                this.ruleForm.exportador = this.datosseleccioncopiawarehouseseleccionado['Exportador'];
                this.ruleForm.importador = this.datosseleccioncopiawarehouseseleccionado['Importador'];
            }).catch(action => {
                if (action === 'cancel') {

                }
            });
        },
        detalleswarehouse(valor, scope) {
            this.datosdetalleswarehouse = Object.values(valor);
            this.dialogFormDetalleswarehouse = true;
            this.dialogFormConsultawarehouse = false;
        },
        detallescopiawarehouse(valor, prop) {
            console.log("detallescopiawarehouse", valor)
            if (prop == 'Detallescarga') {
                this.datosdetallescopiawarehouse = Object.values(valor);
                this.dialogFormDetallescopiawarehouse = true;
                this.dialogFormSeleccioncopiawarehousea = false;
            } else if (prop == 'Detallestipomercancia') {
                this.datosinftipomercancia = Object.values(valor);
                this.dialogFormSeleccioncopiawarehousea = false;
                this.dialogFormTipomercanciawarehouse = true;
            }
            
        },
        cancelardetalleswarehouse() {
            this.dialogFormDetalleswarehouse = false;
            this.dialogFormConsultawarehouse = true;
        },
        cancelardetallescopiawarehouse() {
            this.dialogFormDetallescopiawarehouse = false;

        },
        cancelartipomercanciacopiawarehouse() {
            this.dialogFormTipomercanciawarehouse = false;
        },
        changecurrentconsultawarehouse(valor) {
            this.datosconsultawarehouseseleccionado = valor;
        },
        changecurrentconsultacopiawarehouse(valor) {
            console.log("changecurrentconsultacopiawarehouse", valor, this.datosseleccioncopiawarehouse);
            this.datosseleccioncopiawarehouseseleccionado = valor;
        },
        adicionarcliente() {
            this.dialogFormcrearcliente = true;
            this.visualizacionprincipal = false;
            
        },
        buscarcliente() {
            this.dialogFormcrearclientebuscar = true;
            this.crearclientedatos = [];
            this.search = '';            
            let currentObj = this;
            this.datostablacrearcliente.forEach(function callback(element) {
                currentObj.crearclientedatos.push({ idtipodocumento: element.idtipodocumento, numerodocumento: element.numerodocumento+'', razonsocial: element.razonsocial, pais: element.pais.Nombre, idcliente: element.idcliente });
            });
        },
        cancelarcrearcliente() {
            this.dialogFormcrearcliente = false;
        },
        aceptarcrearcliente() {
            this.validarformulariocliente();
        },
        validodatoscliente(valido) {
            if (valido = true) {
                this.IdCliente = 0;
                
                this.ruleForm.cliente = this.ruleformcliente.razonsocial;
                this.dialogFormcrearcliente = false;
                this.cargarinformaciontablas(true);
                this.dialogFormcreardo = true;
            }
        },
        changecurrentcrearcliente(value) {
            
            if (value != null) {
                this.datoscrearclienteseleccionado = value;
                
                this.IdCliente = this.datoscrearclienteseleccionado['idcliente'];
                this.visualizareditar = true;                
            }
            
           
        },
        cancelarseleccioncrearcliente() {
            this.visualizareditar = false;
            this.dialogFormcrearcliente = false;

        },
        confirmarseleccioncliente() {
            this.visualizareditar = false;
            
            this.cargarinformaciontablas(true);
            this.dialogFormcrearclientebuscar = false;
            this.ruleForm.cliente = this.datoscrearclienteseleccionado['razonsocial'];
              
        },
        editarcliente() {
            this.dialogFormeditarcliente = true;
            this.dialogFormcrearclientebuscar = false;

            
            this.ruleformeditarcliente.idtipodocumento = this.datoscrearclienteseleccionado['idtipodocumento'];
            
            this.ruleformeditarcliente.numerodedocumento = this.datoscrearclienteseleccionado['numerodocumento'];
            
            this.ruleformeditarcliente.razonsocial = this.datoscrearclienteseleccionado['razonsocial'];
            
            this.ruleformeditarcliente.pais = this.datoscrearclienteseleccionado['pais'];
        },
        cargarCliente(valor) {            
            this.datostablacrearcliente = Array.from(valor, x => x.objeto);            
        },
        validareditarcliente(valido) {
            if (valido = true) {
                
                this.ruleForm.cliente = this.ruleformeditarcliente.razonsocial;
                this.dialogFormeditarcliente = false;

                
                this.cargarinformaciontablas(true);
            }
        },
        aceptareditarcliente() {
            this.validarformulario = this.validarformulario + 1;
        },
        cancelareditarcliente() {
            this.dialogFormeditarcliente = false;

        },
        handleCurrentChange(val) {
            this.page = val;
        },
        cancelarseleccionexportador() {
            this.visualizareditar = false;
            this.dialogFormExportadorbuscar = false;
            
        },
        confirmarseleccionexportador() {
            this.visualizareditar = false;
            this.dialogFormExportadorbuscar = false;
            this.ruleForm.exportador = this.datosexportadorseleccionado['razonsocial'];
        },
        cancelarseleccionimportador() {
            this.visualizareditar = false;
            this.dialogFormImportadorbuscar = false;
            
        },
        confirmarseleccionimportador() {
            this.visualizareditar = false;
            this.dialogFormImportadorbuscar = false;
            this.ruleForm.importador = this.datosimportadorseleccionado['razonsocial'];
        },
        buscarexportador() {
            this.exportadordatos = [];
            this.search = '';
            this.dialogFormExportadorbuscar = true;
            let currentObj = this;
            this.datostablaexportador.forEach(function callback(element) {
                currentObj.exportadordatos.push({ idtipodocumento: element.idtipodocumento, numerodocumento: element.numerodocumento + '', razonsocial: element.razonsocial, pais: element.pais.Nombre });
                
            });
        },
        buscarimportador() {
            this.importadordatos = [];            
            this.search = '';
            this.dialogFormImportadorbuscar = true;
            let currentObj = this;
            this.datostablaimportador.forEach(function callback(element) {
                currentObj.importadordatos.push({ idtipodocumento: element.idtipodocumento, numerodocumento: element.numerodocumento+'', razonsocial: element.razonsocial, pais: element.pais.Nombre });

            });
        },
        handleSelectCliente(value) {
            
            this.IdCliente = value.id;
            this.ruleForm.cliente = value.value;
            
            this.cargarinformaciontablas(true);
    
        },
        handleSelectDO() {
           
        },
        
        adicionarexportador() {
            this.dialogFormexportador = true;
        },
        changecurrentexportador(value) {
            this.datosexportadorseleccionado = value;
            this.visualizareditar = true;
        },
        editarexportador() {
            
            this.ruleformeditarexportador.idtipodocumento = this.datosexportadorseleccionado['idtipodocumento'];
            
            this.ruleformeditarexportador.numerodocumento = this.datosexportadorseleccionado['numerodocumento'];
            
            this.ruleformeditarexportador.razonsocial = this.datosexportadorseleccionado['razonsocial'];
            
            this.ruleformeditarexportador.pais = this.datosexportadorseleccionado['pais'];

            this.dialogFormExportadorbuscar = false;
            this.dialogFormexportadoreditar = true;
            
        },
        editarimportador() {
            this.dialogFormimportadoreditar = true;
            this.dialogFormImportadorbuscar = false;
            
            this.ruleformeditarimportador.idtipodocumento = this.datosimportadorseleccionado['idtipodocumento'];
            
            this.ruleformeditarimportador.numerodocumento = this.datosimportadorseleccionado['numerodocumento'];
            
            this.ruleformeditarimportador.razonsocial = this.datosimportadorseleccionado['razonsocial'];
            
            this.ruleformeditarimportador.pais = this.datosimportadorseleccionado['pais'];
        },
        changecurrentimportador(value) {
            this.datosimportadorseleccionado = value;
            this.visualizareditar = true;
        },
        cargarImportador(valor) {
            this.datostablaimportador = Array.from(valor, x => x.objeto);

        },
        cargarExportador(valor) {
            this.datostablaexportador = Array.from(valor, x => x.objeto);           

        },
        recibirsearch(val) {
            this.search = val;
        },
        adicionarimportador() {
            this.dialogFormimportador = true;
        },
        creardo() {
            this.dialogFormcreardo = true;
        },
        cancelarcreardo() {
            this.dialogFormcreardo = false;
        },
        validodatosdo(valido) {
            this.mensajefinal = '';
            if (valido = true) {
                if (this.ruleformcreardo.Modalidad == null && this.creardoform[2].visualizar) {
                    this.mensajefinal = this.mensajefinal + '<hr>' + this.mensajemodalidad;
                }     
                console.log("datos para lugar de entrega que paso", this.ruleformcreardo.Entrega);
                if (this.ruleformcreardo.Entrega == undefined || this.ruleformcreardo.Entrega == ""  && (this.ruleformcreardo.Incoterm == 2 || this.ruleformcreardo.Incoterm == 8 || this.ruleformcreardo.Incoterm == 9)) {
                    this.mensajefinal = this.mensajefinal + '<hr>' + this.mensajelugarentrega;
                }
                if (this.mensajefinal.length != 0) {

                    this.$confirm(this.mensajefinal, 'Warning', {
                        dangerouslyUseHTMLString: true,
                        confirmButtonText: 'OK',
                        cancelButtonText: 'Cancel',
                        type: 'warning'
                    }).then(() => {
                        console.log("ingresa a okay de mensaje final ");
                        if (this.ruleformcreardo.Entrega == undefined && (this.ruleformcreardo.Incoterm == 2 || this.ruleformcreardo.Incoterm == 8 || this.ruleformcreardo.Incoterm == 9)) {
                            this.ruleformcreardo.Entrega = this.ruleformcreardo.Origen;
                        }
                        if (this.ruleformcreardo.Modalidad == null && this.creardoform[2].visualizar) {
                            if (this.ruleformcreardo.TipoOperacion == 1) {
                                
                                this.ruleformcreardo.Modalidad = 1;

                            } else if (this.ruleformcreardo.TipoOperacion == 2) {
                                
                                this.ruleformcreardo.Modalidad = 3;
                            }
                        }
                        this.datosnextdo();
                    }).catch(() => {

                    });
                } else {
                    this.datosnextdo();




                }

                
            }
        },
        aceptarcreardo() {
            this.validarformulario = this.validarformulario + 1;
            console.log("validar formulario crear do", this.validarformulario);
           
        },
        handleChangeAutoCompleteCliente(prop) {
            this.ruleForm.cliente = '';
        },
        handleChangeAutoCompleteexportador(prop) {
            this.ruleForm.exportador = '';
        },
        handleChangeAutoCompleteimportador(prop) {
            this.ruleForm.importador = '';
        },
        datosnextdo() {
            
            this.modotransporteseleccionado = this.ruleformcreardo.ModoTransporte;
            
            this.ruleForm.factorestiba = this.ruleformcreardo.ValorFactor;
            this.carguedeinformacion();
            if (this.datosseleccioncopiawarehouse.length == 0) {
                this.dialogFormcreardo = false;
                this.visualizacionstep = true;
                this.ocultarprincipal = false;
            }
            else {
                this.$confirm('¿Desea copiar los datos de carga de otros despachos?', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    this.dialogFormSeleccioncopiawarehouse = true;
                }).catch(action => {
                    if (action === 'cancel') {
                        this.visualizacionstep = true;
                        this.ocultarprincipal = false;
                        this.dialogFormcreardo = false;
                    }
                });
            }
        },
        
        next(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.active++ > 2) this.active = 0;
                    this.botonnext = false;
                } else {
                    this.$message.error('Quedaron pendientes datos por ingreso, favor validar y confirmar.');
                    return false;
                }
            });
        },
        previo() { 
            console.log("previo",this.active)
            this.active = 1;
            this.botonnext = true;

        },
        carguedeinformacion() {
            this.tablasinicial();
            let currentObj = this;
           
            if (this.modotransporteseleccionado == 1) {

                const volumen = this.columnatablawarehouse.findIndex(element => element.prop == 'pesovolumenmetrico');
                Reflect.set(this.columnatablawarehouse[volumen], 'filtro', false);

                const pesovolumen = this.columnatablawarehouse.findIndex(element => element.prop == 'PesoVolumen');
                Reflect.set(this.columnatablawarehouse[pesovolumen], 'titulocollapse', 'Mayor');
                Reflect.set(this.columnatablawarehouse[pesovolumen], 'validartitulocollapse', false);
                Reflect.set(this.columnatablawarehouse[pesovolumen], 'columnastabla', [{ id: 0, label: 'conversion', prop: 'conversion' }]);

                const PesoBruto = this.columnatablawarehouse.findIndex(element => element.prop == 'PesoBruto');
                Reflect.set(this.columnatablawarehouse[PesoBruto], 'titulocollapse', 'tn');
                Reflect.set(this.columnatablawarehouse[PesoBruto], 'columnastabla', [{ id: 0, label: 'lbs', prop: 'lbs' }, { id: 1, label: 'kg', prop: 'kg' }]);

                const invalidarmayor = this.columnasuma.findIndex(element => element.id == 6);
                Reflect.set(this.columnasuma[invalidarmayor], 'mayor', false);

                const invalidarconversion = this.columnasuma.findIndex(element => element.id == 7);
                Reflect.set(this.columnasuma[invalidarconversion], 'conversion', false);

                const validarmayor = this.columnasuma.findIndex(element => element.id == 3);
                Reflect.set(this.columnasuma[validarmayor], 'mayor', true);

                const validarconversion = this.columnasuma.findIndex(element => element.id == 4);
                Reflect.set(this.columnasuma[validarconversion], 'conversion', true);

                const unidadmedida = this.columnasuma.findIndex(element => element.id == 8);
                Reflect.set(this.columnasuma[unidadmedida], 'UnidadMedidamayor', 'cbm/tn');
                Reflect.set(this.columnasuma[unidadmedida], 'UnidadMedidaconversion', ' ');

                const invalidarmayorpeso = this.columnasuma.findIndex(element => element.id == 0);
                Reflect.set(this.columnasuma[invalidarmayorpeso], 'mayor', false);

                const validarmayorpeso = this.columnasuma.findIndex(element => element.id == 1);
                Reflect.set(this.columnasuma[validarmayorpeso], 'mayor', true);

            } else {
                this.tablasinicial();
            }
            
            this.axios.post(currentObj.metodoobtenermodotrasportefactorestibasbloqueo, {
                IdModoTransporte: currentObj.modotransporteseleccionado,
                IdTipoMatriz: 18
            })
                .then(function (response) {
                    currentObj.output = JSON.parse(response.data);
                    currentObj.visibilidadfatorestivas = currentObj.output["Visibilidad"];
                    
                })
                .catch(function (error) {
                    currentObj.output = error;
                });

        },
        crearnuevowarehouse() {
            
            this.carguedeinformacion();
            this.$confirm('¿Desea copiar los datos de carga de otros despachos?', {
                distinguishCancelAndClose: true,
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                this.dialogFormSeleccioncopiawarehouse = true;
            }).catch(action => {
                if (action === 'cancel') {
                    this.visualizacionstep = true;
                    this.ocultarprincipal = false;
                }
            });

        },
        changecurrentwarehouse(valor) {
            this.modotransporteseleccionado = valor.ModoTransporte;
            this.ruleForm.factorestiba = valor.valorfactor; 
            this.visualizarwarehouse = true;
            this.seleccionwarehouse = valor;
        },
        changeseleccionwarehouse(val) {
            
        },
        handleSelectExportador(value) {

            this.ruleForm.exportador = value.value;
        },
        handleSelectImportador(value) {
            this.ruleForm.importador = value.value;
        },
        guardarfecharecepción(value) {
            this.ruleForm.fecharecepción = value;
        },
        guardarfechadespacho() {

        },
        cargarlugarbodega() {

        },
        cambiolugarbodega() {

        },
        cargarUnidadMedidaDistancia(value) {
            this.ruleForm.UnidadMedidaDistancia = value;
        },
        cambioUnidadMedidaDistancia(value) {
            this.ruleForm.UnidadMedidaDistanciaselecionado = value;
            this.calculopesovolumen();
            this.habilitaraceptar();
        },
        cargarUnidadMedidaVolumen(value) {
            this.ruleForm.UnidadMedidaVolumen = value;
        },
        cambioUnidadMedidaVolumen(value) {
            this.ruleForm.UnidadMedidaVolumenselecionado = value;
            this.calculopesovolumen(this.ruleForm.volumen);
            this.habilitaraceptar();
        },
        cargarUnidadMedidaPesoBruto(value) {
            this.ruleForm.UnidadMedidaPesoBruto = value;
        },
        cambioUnidadMedidaPesoBruto(value) {            
            
            this.ruleForm.UnidadMedidaPesoBrutoselecionado = value;
            this.cambiopesobrutovalor(this.ruleForm.PesoBruto);
            this.habilitaraceptar();
        },
        cargarUnidadMedidapesoneto(value) {
            this.ruleForm.UnidadMedidaPesoNeto = value;
        },
        cambioUnidadMedidapesoneto(value) {
            this.ruleForm.UnidadMedidaPesoNetoselecionado = value;
            
        },
        cargarinformaciontablas(valor) {
            console.log("cargar inf", valor);
            let currentObj = this;           
            
            this.axios.post(this.metododatosseleccionwarehouse, {
                IdCliente: this.IdCliente
            })
                .then(function (response) {
                    currentObj.output = JSON.parse(response.data);
                    currentObj.datotablaseleccionwarehouse = currentObj.output["Tarifas"];
                    
                    if (currentObj.datotablaseleccionwarehouse.length != 0) {
                        currentObj.visualizacionprincipal = valor; 
                        currentObj.nuevodato = true;
                    } else {
                        currentObj.visualizacionprincipal = true;
                        currentObj.nuevodato = false;
                        currentObj.dialogFormcreardo = true;
                    }
                })
                .catch(function (error) {
                    currentObj.output = error;
                });


            this.axios.post(this.metododatoscopiawarehouse, {
                IdCliente: this.IdCliente
            })
                .then(function (response) {
                    currentObj.output = JSON.parse(response.data);
                    currentObj.datosseleccioncopiawarehouse = currentObj.output["Tarifas"];

                    if (currentObj.datosseleccioncopiawarehouse.length != 0) {
                        

                    } else {

                    }
                })
                .catch(function (error) {
                    currentObj.output = error;
                });

        },
        cargarlistas() {
            let currentObj = this; 
            
            
            this.columnatablaseleccionwarehouse.forEach(function callback(element) {                
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
            this.axios.post(this.metododatosdatofactorestibas, {

            })
                .then(function (response) {
                    currentObj.output = JSON.parse(response.data);
                    console.log("datofactorestibas", currentObj.output);
                    currentObj.modotrasporte = currentObj.output["ModoTransporte"];
                    const modotraspor = currentObj.creardoform.findIndex(element => element.prop == 'ModoTransporte');
                    Reflect.set(currentObj.creardoform[modotraspor], 'informacionlista', currentObj.output["ModoTransporte"]);
                    const factestiba = currentObj.creardoform.findIndex(element => element.prop == 'FactorEstiba');
                    Reflect.set(currentObj.creardoform[factestiba], 'informacionlista', currentObj.output["ModoTransporte"]);
                    console.log("creardoform", currentObj.creardoform[factestiba]);
                    
                })
                .catch(function (error) {
                    currentObj.output = error;
                });
            this.columnatablaexportadoreimportador.forEach(function callback(element) {
                
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
            this.columnatablacrearcliente.forEach(function callback(element) {

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
            this.columnatabladetallesmercanciainicial.forEach(function callback(element) {
                
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
            this.columnatablawarehouseinicial.forEach(function callback(element) {
                
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
            this.columnatabladetalleswarehouse.forEach(function callback(element) {
                if (element.cargardato == true) {
                    currentObj.axios.post(element.metodo, {
                        OpcionParametro: element.tiposeleccion
                    })
                        .then(function (response) {
                            currentObj.output = JSON.parse(response.data);
                            element.cargarlista = currentObj.output["ObjetoSeleccionable"];
                            console.log("cargar lista tabla detalles", element.cargarlista);

                        })
                        .catch(function (error) {
                            currentObj.output = error;
                        });
                }

            })
            this.columnainfotipomercancia.forEach(function callback(element) {
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
            
        },
        cargarfactorestiba() {

        },
        cambiopesobrutovalor(valor) {
            this.ruleForm.PesoBruto = valor;
            this.habilitaraceptar();
            
            if (this.ruleForm.UnidadMedidaPesoBrutoselecionado == 1) {
                this.kg = this.ruleForm.PesoBruto;
                this.tn = this.kg / 1000;
                this.lbs = this.kg * 2.205;
                this.calculopesovolumen(this.ruleForm.volumen);
            } else if (this.ruleForm.UnidadMedidaPesoBrutoselecionado == 2) {
                this.tn = this.ruleForm.PesoBruto;
                this.kg = this.tn * 1000;
                this.lbs = this.tn * 2205;
                this.calculopesovolumen(this.ruleForm.volumen);
            } else if (this.ruleForm.UnidadMedidaPesoBrutoselecionado == 3) {
                this.lbs = this.ruleForm.PesoBruto;
                this.tn = this.lbs / 2205;
                this.kg = this.lbs / 2.205;
                this.calculopesovolumen(this.ruleForm.volumen);
            }

            
        },
        cambionumeropiezas(valor) {
            this.ruleForm.numeropiezas = valor;
            this.calculopesovolumen();
            this.habilitaraceptar();
        },

        cambiovolumen(valor) {
            this.ruleForm.volumen = valor;
            this.calculopesovolumen(valor);
            this.habilitaraceptar();

        },
        cambiolargo(valor) {
            this.ruleForm.largo = valor;
            this.calculopesovolumen();
            this.habilitaraceptar();
        },
        cambioalto(valor) {
            this.ruleForm.alto = valor;
            this.calculopesovolumen();
            this.habilitaraceptar();
        },
        cambioancho(valor) {
            this.ruleForm.ancho = valor;
            this.calculopesovolumen();
            this.habilitaraceptar();
        },
        calculopesovolumen(valor) {

            if (this.checkeddimensiones == true) {
                if (this.ruleForm.UnidadMedidaPesoBrutoselecionado != null && this.ruleForm.PesoBruto != undefined && this.ruleForm.UnidadMedidaDistanciaselecionado != null && this.ruleForm.numeropiezas != undefined && this.ruleForm.alto != undefined && this.ruleForm.ancho != undefined && this.ruleForm.largo != undefined) {
                    let currentObj = this;
                    this.axios.post(this.metodocargardatos, {
                        OpcionParametro: 'UndmedidaDistancia'
                    })
                        .then(function (response) {
                            currentObj.output = JSON.parse(response.data);
                            currentObj.listadist = currentObj.output["ObjetoSeleccionable"];
                            currentObj.listadist.forEach(function callback(element) {
                                
                                
                                if (element.Id == currentObj.ruleForm.UnidadMedidaDistanciaselecionado) {
                                    currentObj.textunidadmedidadistancia = element.Nombre;
                                    if (currentObj.ruleForm.UnidadMedidaDistanciaselecionado == 3) {
                                        currentObj.texseleccion = "cbm";

                                    } else {
                                        currentObj.texseleccion = element.Nombre;

                                    }
                                }
                            })
                        })
                        .catch(function (error) {
                            currentObj.output = error;
                        });
                    var cal = this.ruleForm.largo * this.ruleForm.ancho * this.ruleForm.alto * this.ruleForm.numeropiezas;
                    this.tex = "3";

                    


                    if (currentObj.ruleForm.UnidadMedidaDistanciaselecionado == 1) {
                        this.ruleForm.volumencalculado = cal;
                        this.pies = this.ruleForm.volumencalculado;
                        this.cbm = this.pies / 35.315;
                        this.pulgadas = this.pies * 1728;
                        currentObj.texcbm = this.cbm.toFixed(2) + "cbm";
                        currentObj.texvol = "volumen cbm";
                    } else if (currentObj.ruleForm.UnidadMedidaDistanciaselecionado == 2) {

                        this.ruleForm.volumencalculado = cal;
                        this.pulgadas = this.ruleForm.volumencalculado;
                        this.pies = this.pulgadas / 1728;
                        this.cbm = this.pulgadas / 61024;
                        currentObj.texcbm = this.cbm.toFixed(2) + "cbm";
                        currentObj.texvol = "volumen cbm";
                    } else if (currentObj.ruleForm.UnidadMedidaDistanciaselecionado == 3) {

                        this.cmcubico = cal;
                        this.cbm = this.cmcubico / 1000000;
                        this.ruleForm.volumencalculado = this.cbm;
                        this.pies = this.cbm * 35.315;
                        this.pulgadas = this.cbm * 61024;
                        currentObj.texcbm = "";
                        currentObj.texvol = "";
                    }
                    if (this.modotransporteseleccionado == 1) {
                        this.pesovolumenmetrico = "Peso Volumétrico";
                        this.pesovol = parseFloat(this.ruleForm.factorestiba) * this.cbm;
                        if (this.pesovol < this.tn) {
                            this.totalpesovolumentn = this.tn.toFixed(2)+' tn';
                            this.totalpesovolumenlbs = this.lbs.toFixed(2)+ ' lbs';
                            this.pesovolumentn = this.tn.toFixed(2) + "tn" + "/" + this.cbm.toFixed(2) + "cbm" + "=" + this.tn.toFixed(2) + "tn";
                            this.pesovolumenlbs = this.lbs.toFixed(2) + "lbs" + "/" + this.pies.toFixed(2) + "cbm" + "=" + this.lbs.toFixed(2) + "lbs";

                        } else if (this.pesovol > this.tn) {
                            this.totalpesovolumentn = this.cbm.toFixed(2)+ ' cbm';
                            this.totalpesovolumenlbs = this.pies.toFixed(2)+ ' pies';
                            this.pesovolumentn = this.tn.toFixed(2) + "tn" + "/" + this.cbm.toFixed(2) + "cbm" + "=" + this.cbm.toFixed(2) + "cbm";
                            this.pesovolumenlbs = this.lbs.toFixed(2) + "lbs" + "/" + this.pies.toFixed(2) + "pies" + "=" + this.pies.toFixed(2) + "pies";
                        }

                    } else {
                        this.pesovolumenmetrico = "Peso Volumétrico";
                        this.pesvol = parseFloat(this.ruleForm.factorestiba) * this.cbm;
                        this.pesovol = this.pesvol.toFixed(2) + "kg";
                        
                        if (this.pesvol < this.kg) {
                            
                            this.pesovolumentn = this.kg.toFixed(2) + "kg" + "/" + this.pesvol.toFixed(2) + "kg" + "=" + this.kg.toFixed(2) + "kg";
                            var libraspeso = this.kg * 2.205;
                            this.lbspesovol = this.pesvol * 2.205;
                            this.pesovolumenlbs = libraspeso.toFixed(2) + "lbs" + "/" + this.lbspesovol.toFixed(2) + "lbs" + "=" + libraspeso.toFixed(2) + "lbs";
                            this.totalpesovolumentn = this.kg.toFixed(2);
                            this.totalpesovolumenlbs = libraspeso.toFixed(2);
                        } else if (this.pesvol > this.kg) {

                            this.pesovolumentn = this.kg.toFixed(2) + "kg" + "/" + this.pesvol.toFixed(2) + "kg" + "=" + this.pesvol.toFixed(2) + "kg";
                            var libraspeso = this.kg * 2.205;
                            this.lbspesovol = this.pesvol * 2.205;
                            this.pesovolumenlbs = libraspeso.toFixed(2) + "lbs" + "/" + this.lbspesovol.toFixed(2) + "lbs" + "=" + this.lbspesovol.toFixed(2) + "lbs";
                            this.totalpesovolumentn = this.pesvol.toFixed(2);
                            this.totalpesovolumenlbs = this.lbspesovol.toFixed(2);
                        }

                    }



                } else {
                    this.pesovolumentn = '';
                    this.pesovolumenlbs = '';
                    this.tex = '';
                    this.texcbm = '';
                    this.texvol = '';
                    this.pesovolumenmetrico = '';
                    this.pesovol = '';
                    this.texseleccion = '';
                    this.ruleForm.volumencalculado = '';

                }

            } else if (this.checkedvolumen == true) {
                if (this.ruleForm.volumen != undefined && this.ruleForm.PesoBruto != undefined && this.ruleForm.UnidadMedidaVolumenselecionado != null && this.ruleForm.UnidadMedidaPesoBrutoselecionado != null ) {
                    this.ruleForm.volumencalculado = valor;
                    if (this.modotransporteseleccionado == 1) {
                        if (this.ruleForm.UnidadMedidaVolumenselecionado == 1) {
                            this.cbm = valor;
                            this.pies = this.cbm * 35.315;
                            this.pulgadas = this.cbm * 61024;
                            this.pesvol = parseFloat(this.ruleForm.factorestiba) * valor;
                            if (this.pesvol < this.tn) {
                                this.pesovolumentn = this.tn.toFixed(2) + "tn" + "/" + this.pesvol.toFixed(2) + "cbm" + "=" + this.tn.toFixed(2) + "tn";
                                var libraspeso = this.tn * 2205;
                                var piespesovol = this.pesvol * 35.315;
                                this.pesovolumenlbs = libraspeso.toFixed(2) + "lbs" + "/" + piespesovol.toFixed(2) + "pies" + "=" + libraspeso.toFixed(2) + "lbs";
                                this.totalpesovolumentn = this.tn.toFixed(2) + ' tn';
                                this.totalpesovolumenlbs = libraspeso.toFixed(2) + ' lbs';
                            } else if (this.pesvol > this.tn) {
                                this.pesovolumentn = this.tn.toFixed(2) + "tn" + "/" + this.pesvol.toFixed(2) + "cbm" + "=" + this.pesvol.toFixed(2) + "cbm";
                                var libraspeso = this.tn * 2205;
                                var piespesovol = this.pesvol * 35.315;
                                this.pesovolumenlbs = libraspeso.toFixed(2) + "lbs" + "/" + piespesovol.toFixed(2) + "pies" + "=" + piespesovol.toFixed(2) + "pies";
                                this.totalpesovolumentn = this.pesvol.toFixed(2)+ ' cbm';
                                this.totalpesovolumenlbs = piespesovol.toFixed(2)+ ' pies';
                            }
                        } else if (this.ruleForm.UnidadMedidaVolumenselecionado == 2) {
                            this.pies = valor;
                            this.cbm = this.pies / 35.315;
                            this.pulgadas = this.pies * 1728;
                            this.pesvol = parseFloat(this.ruleForm.factorestiba) * (valor / 35.315);
                            if (this.pesvol < this.tn) {
                                this.pesovolumentn = this.tn.toFixed(2) + "tn" + "/" + this.pesvol.toFixed(2) + "cbm" + "=" + this.tn.toFixed(2) + "tn";
                                var libraspeso = this.tn * 2205;
                                var piespesovol = this.pesvol * 35.315;
                                this.pesovolumenlbs = libraspeso.toFixed(2) + "lbs" + "/" + piespesovol.toFixed(2) + "pies" + "=" + libraspeso.toFixed(2) + "lbs";
                                this.totalpesovolumentn = this.tn.toFixed(2) + ' tn';
                                this.totalpesovolumenlbs = libraspeso.toFixed(2) + ' lbs';
                            } else if (this.pesvol > this.tn) {
                                this.pesovolumentn = this.tn.toFixed(2) + "tn" + "/" + this.pesvol.toFixed(2) + "cbm" + "=" + this.pesvol.toFixed(2) + "cbm";
                                var libraspeso = this.tn * 2205;
                                var piespesovol = this.pesvol * 35.315;
                                this.pesovolumenlbs = libraspeso.toFixed(2) + "lbs" + "/" + piespesovol.toFixed(2) + "pies" + "=" + piespesovol.toFixed(2) + "pies";
                                this.totalpesovolumentn = this.pesvol.toFixed(2) + ' cbm';
                                this.totalpesovolumenlbs = piespesovol.toFixed(2) + ' pies';
                            }

                        } else if (this.ruleForm.UnidadMedidaVolumenselecionado == 3) {
                            this.pulgadas = valor;
                            this.pies = this.pulgadas / 1728;
                            this.cbm = this.pulgadas / 61024;
                            this.pesvol = parseFloat(this.ruleForm.factorestiba) * (valor / 61024);
                            if (this.pesvol < this.tn) {
                                this.pesovolumentn = this.tn.toFixed(2) + "tn" + "/" + this.pesvol.toFixed(2) + "cbm" + "=" + this.tn.toFixed(2) + "tn";
                                var libraspeso = this.tn * 2205;
                                var piespesovol = this.pesvol * 35.315;
                                this.pesovolumenlbs = libraspeso.toFixed(2) + "lbs" + "/" + piespesovol.toFixed(2) + "pies" + "=" + libraspeso.toFixed(2) + "lbs";
                                this.totalpesovolumentn = this.tn.toFixed(2) + ' tn';
                                this.totalpesovolumenlbs = libraspeso.toFixed(2) + ' lbs';
                            } else if (this.pesvol > this.tn) {
                                this.pesovolumentn = this.tn.toFixed(2) + "tn" + "/" + this.pesvol.toFixed(2) + "cbm" + "=" + this.pesvol.toFixed(2) + "cbm";
                                var libraspeso = this.tn * 2205;
                                var piespesovol = this.pesvol * 35.315;
                                this.pesovolumenlbs = libraspeso.toFixed(2) + "lbs" + "/" + piespesovol.toFixed(2) + "pies" + "=" + piespesovol.toFixed(2) + "pies";
                                this.totalpesovolumentn = this.pesvol.toFixed(2) + ' cbm';
                                this.totalpesovolumenlbs = piespesovol.toFixed(2) + ' pies';
                            }

                        }

                    } else {

                        if (this.ruleForm.UnidadMedidaVolumenselecionado == 1) {
                            this.cbm = valor;
                            this.pies = this.cbm * 35.315;
                            this.pulgadas = this.cbm * 61024;
                            this.pesvol = parseFloat(this.ruleForm.factorestiba) * valor;
                            if (this.pesvol < this.kg) {

                                this.pesovolumentn = this.kg.toFixed(2) + "kg" + "/" + this.pesvol.toFixed(2) + "kg" + "=" + this.kg.toFixed(2) + "kg";
                                var libraspeso = this.kg * 2.205;
                                this.lbspesovol = this.pesvol * 2.205;
                                this.pesovolumenlbs = libraspeso.toFixed(2) + "lbs" + "/" + this.lbspesovol.toFixed(2) + "lbs" + "=" + libraspeso.toFixed(2) + "lbs";
                                this.totalpesovolumentn = this.kg.toFixed(2);
                                this.totalpesovolumenlbs = libraspeso.toFixed(2);
                            } else if (this.pesvol > this.kg) {

                                this.pesovolumentn = this.kg.toFixed(2) + "kg" + "/" + this.pesvol.toFixed(2) + "kg" + "=" + this.pesvol.toFixed(2) + "kg";
                                var libraspeso = this.kg * 2.205;
                                this.lbspesovol = this.pesvol * 2.205;
                                this.pesovolumenlbs = libraspeso.toFixed(2) + "lbs" + "/" + this.lbspesovol.toFixed(2) + "lbs" + "=" + this.lbspesovol.toFixed(2) + "lbs";
                                this.totalpesovolumentn = this.pesvol.toFixed(2);
                                this.totalpesovolumenlbs = this.lbspesovol.toFixed(2);
                            }
                        } else if (this.ruleForm.UnidadMedidaVolumenselecionado == 2) {
                            this.pies = valor;
                            this.cbm = this.pies / 35.315;
                            this.pulgadas = this.pies * 1728;
                            this.pesvol = parseFloat(this.ruleForm.factorestiba) * (valor / 35.315);
                            if (this.pesvol < this.kg) {

                                this.pesovolumentn = this.kg.toFixed(2) + "kg" + "/" + this.pesvol.toFixed(2) + "kg" + "=" + this.kg.toFixed(2) + "kg";
                                var libraspeso = this.kg * 2.205;
                                this.lbspesovol = this.pesvol * 2.205;
                                this.pesovolumenlbs = libraspeso.toFixed(2) + "lbs" + "/" + this.lbspesovol.toFixed(2) + "lbs" + "=" + libraspeso.toFixed(2) + "lbs";
                                this.totalpesovolumentn = this.kg.toFixed(2);
                                this.totalpesovolumenlbs = libraspeso.toFixed(2);
                            } else if (this.pesvol > this.kg) {

                                this.pesovolumentn = this.kg.toFixed(2) + "kg" + "/" + this.pesvol.toFixed(2) + "kg" + "=" + this.pesvol.toFixed(2) + "kg";
                                var libraspeso = this.kg * 2.205;
                                this.lbspesovol = this.pesvol * 2.205;
                                this.pesovolumenlbs = libraspeso.toFixed(2) + "lbs" + "/" + this.lbspesovol.toFixed(2) + "lbs" + "=" + this.lbspesovol.toFixed(2) + "lbs";
                                this.totalpesovolumentn = this.pesvol.toFixed(2);
                                this.totalpesovolumenlbs = this.lbspesovol.toFixed(2);
                            }
                        } else if (this.ruleForm.UnidadMedidaVolumenselecionado == 3) {
                            this.pulgadas = valor;
                            this.pies = this.pulgadas / 1728;
                            this.cbm = this.pulgadas / 61024;
                            this.pesvol = parseFloat(this.ruleForm.factorestiba) * (valor / 61024);
                            if (this.pesvol < this.kg) {

                                this.pesovolumentn = this.kg.toFixed(2) + "kg" + "/" + this.pesvol.toFixed(2) + "kg" + "=" + this.kg.toFixed(2) + "kg";
                                var libraspeso = this.kg * 2.205;
                                this.lbspesovol = this.pesvol * 2.205;
                                this.pesovolumenlbs = libraspeso.toFixed(2) + "lbs" + "/" + this.lbspesovol.toFixed(2) + "lbs" + "=" + libraspeso.toFixed(2) + "lbs";
                                this.totalpesovolumentn = this.kg.toFixed(2);
                                this.totalpesovolumenlbs = libraspeso.toFixed(2);
                            } else if (this.pesvol > this.kg) {

                                this.pesovolumentn = this.kg.toFixed(2) + "kg" + "/" + this.pesvol.toFixed(2) + "kg" + "=" + this.pesvol.toFixed(2) + "kg";
                                var libraspeso = this.kg * 2.205;
                                this.lbspesovol = this.pesvol * 2.205;
                                this.pesovolumenlbs = libraspeso.toFixed(2) + "lbs" + "/" + this.lbspesovol.toFixed(2) + "lbs" + "=" + this.lbspesovol.toFixed(2) + "lbs";
                                this.totalpesovolumentn = this.pesvol.toFixed(2);
                                this.totalpesovolumenlbs = this.lbspesovol.toFixed(2);
                            }
                        }
                    }

                } else {
                    this.pesovolumentn = '';
                    this.pesovolumenlbs = '';

                }

            }
         
        },
        habilitaraceptar() {

            if (this.ruleForm.UnidadMedidaPesoBrutoselecionado != null && this.ruleForm.PesoBruto != undefined) {
                if (this.checkeddimensiones == true) {
                    if (this.ruleForm.UnidadMedidaPesoBrutoselecionado != null && this.ruleForm.PesoBruto != undefined && this.ruleForm.UnidadMedidaDistanciaselecionado != null && this.ruleForm.numeropiezas != undefined && this.ruleForm.alto != undefined && this.ruleForm.ancho != undefined && this.ruleForm.largo != undefined) {
                        this.deshabilitaraceptar = false;

                    } else {
                        this.deshabilitaraceptar = true;
                    }
                } else if (this.checkedvolumen == true) {
                    if (this.ruleForm.volumen != undefined && this.ruleForm.PesoBruto != undefined && this.ruleForm.UnidadMedidaVolumenselecionado != null && this.ruleForm.UnidadMedidaPesoBrutoselecionado != null && this.ruleForm.numeropiezas != undefined) {
                        this.deshabilitaraceptar = false;
                    } else {
                        this.deshabilitaraceptar = true;
                    }
                }
            } else {
                this.deshabilitaraceptar = true;
                
            }            
        },
        formularioaceptar() {
           
            
            this.informacionformulario = [];
            this.datosvolumen = [];
            this.datospeso = [];
            this.datospesovolumen = [];
            this.datospesovolumenmetrico = [];
            this.dialogFormDimensionesvolumen = false;
            this.informacionformulario.push({
                PesoNeto: this.ruleForm.PesoNeto,
                UnidadMedidaPesoBrutoselecionado: this.ruleForm.UnidadMedidaPesoBrutoselecionado,
                PesoBruto: this.ruleForm.PesoBruto,
                numeropiezas: this.ruleForm.numeropiezas,
                UnidadMedidaVolumenselecionado: this.ruleForm.UnidadMedidaVolumenselecionado,
                volumen: this.ruleForm.volumen,
                volumencalculado: this.ruleForm.volumencalculado,
                pesovolumentn: this.pesovolumentn, 
                pesovolumenlbs: this.pesovolumenlbs,
                checkeddimensiones: this.checkeddimensiones,
                UnidadMedidaDistancia: this.ruleForm.UnidadMedidaDistancia,
                UnidadMedidaDistanciaselecionado: this.ruleForm.UnidadMedidaDistanciaselecionado,
                largo: this.ruleForm.largo, ancho: this.ruleForm.ancho, alto: this.ruleForm.alto,
                checkedvolumen: this.checkedvolumen,
                tex: this.tex,
                texcbm: this.texcbm,
                texvol: this.texvol,
                pesovolumenmetrico: this.pesovolumenmetrico,
                pesovol: this.pesovol,
                texseleccion: this.texseleccion,
                unidad: 'Unidad de medida ' + this.textunidadmedidadistancia
            });
            
            const found = this.datocolumnawarehouse.findIndex(element => element.prop == 'Dimensiones');
            Reflect.set(this.datocolumnawarehouse[found], 'dato', this.informacionformulario);
            const foundnumero = this.datocolumnawarehouse.findIndex(element => element.prop == 'numeropiezas');
            Reflect.set(this.datocolumnawarehouse[foundnumero], 'dato', this.ruleForm.numeropiezas);
            this.datosvolumen.push({ pulgadas: this.pulgadas.toFixed(2), pies: this.pies.toFixed(2), cbm: this.cbm.toFixed(2)})
            const foundvolumen = this.datocolumnawarehouse.findIndex(element => element.prop == 'Volumen');
            Reflect.set(this.datocolumnawarehouse[foundvolumen], 'dato', this.datosvolumen);
            this.datospeso.push({ tn: this.tn.toFixed(2), kg: this.kg.toFixed(2), lbs: this.lbs.toFixed(2) })
            const foundpeso = this.datocolumnawarehouse.findIndex(element => element.prop == 'PesoBruto');
            Reflect.set(this.datocolumnawarehouse[foundpeso], 'dato', this.datospeso);
            if (this.modotransporteseleccionado != 1) {
                this.datospesovolumenmetrico.push({ kg: this.pesvol.toFixed(2), lbs: this.lbspesovol.toFixed(2) })
                const foundpesovolumenmetrico = this.datocolumnawarehouse.findIndex(element => element.prop == 'pesovolumenmetrico');
                Reflect.set(this.datocolumnawarehouse[foundpesovolumenmetrico], 'dato', this.datospesovolumenmetrico);
                this.datospesovolumen.push({ kg: this.totalpesovolumentn, lbs: this.totalpesovolumenlbs })
                const foundpesovolumen = this.datocolumnawarehouse.findIndex(element => element.prop == 'PesoVolumen');
                Reflect.set(this.datocolumnawarehouse[foundpesovolumen], 'dato', this.datospesovolumen);
            } else {
                this.datospesovolumen.push({ Mayor: this.totalpesovolumentn, conversion: this.totalpesovolumenlbs })
                const foundpesovolumen = this.datocolumnawarehouse.findIndex(element => element.prop == 'PesoVolumen');
                Reflect.set(this.datocolumnawarehouse[foundpesovolumen], 'dato', this.datospesovolumen);
            }                    
            
           
           
        },
        adicionardatoentablasuma(datos) {
            
            this.formulariocancelar();
            
        },
        editaropcion(datos) {
            this.formulariocancelar();
        },
        deshaceropcion() {
            this.formulariocancelar();
        },
        editardato(datos, index) {
            const dimensiones = this.datotablawarehouse[index]['Dimensiones'];
            this.ruleForm.PesoNeto = dimensiones[0]['PesoNeto'];
            this.ruleForm.UnidadMedidaPesoBrutoselecionado = dimensiones[0]['UnidadMedidaPesoBrutoselecionado'];
            this.ruleForm.PesoBruto = dimensiones[0]['PesoBruto'];
            this.ruleForm.numeropiezas = dimensiones[0]['numeropiezas'];
            this.ruleForm.UnidadMedidaVolumenselecionado = dimensiones[0]['UnidadMedidaVolumenselecionado'];
            this.ruleForm.volumen = dimensiones[0]['volumen'];
            this.ruleForm.volumencalculado = dimensiones[0]['volumencalculado'];
            this.pesovolumentn = dimensiones[0]['pesovolumentn'];
            this.pesovolumenlbs = dimensiones[0]['pesovolumenlbs'];
            this.checkeddimensiones = dimensiones[0]['checkeddimensiones'];
            this.ruleForm.UnidadMedidaDistancia = dimensiones[0]['UnidadMedidaDistancia'];
            this.ruleForm.UnidadMedidaDistanciaselecionado = dimensiones[0]['UnidadMedidaDistanciaselecionado'];
            this.ruleForm.largo = dimensiones[0]['largo'];
            this.ruleForm.ancho = dimensiones[0]['ancho'];
            this.ruleForm.alto = dimensiones[0]['alto']; 
            this.checkedvolumen = dimensiones[0]['checkedvolumen']; 
            this.tex = dimensiones[0]['tex'];
            this.texcbm = dimensiones[0]['texcbm'];
            this.texvol = dimensiones[0]['texvol'];
            this.pesovolumenmetrico = dimensiones[0]['pesovolumenmetrico'];
            this.pesovol = dimensiones[0]['pesovol'];
            this.texseleccion = dimensiones[0]['texseleccion'];
        
            

        },
        formulariocancelar() {
            this.dialogFormDimensionesvolumen = false;
            this.checkeddimensiones = false;
            this.ruleForm.UnidadMedidaDistancia = [];
            this.ruleForm.UnidadMedidaDistanciaselecionado = null;
            this.ruleForm.largo = undefined;
            this.ruleForm.ancho = undefined;
            this.ruleForm.alto = undefined;
            this.ruleForm.volumencalculado = '';
            this.texseleccion = '';
            this.tex = '';
            this.texcbm = '';
            this.texvol = '';
            this.pesovolumenmetrico = '';
            this.pesovol = '';
            this.pesovolumentn = '';
            this.pesovolumenkg = '';
            this.checkedvolumen = false;
            this.ruleForm.UnidadMedidaVolumen = [];
            this.ruleForm.UnidadMedidaVolumenselecionado = null;
            this.pesovolumentn = '';
            this.pesovolumenkg = '';
            this.pesovolumenlbs = '';
            this.ruleForm.PesoNeto = undefined;
            this.ruleForm.UnidadMedidaPesoNetoselecionado = null;
            this.ruleForm.PesoBruto = undefined;
            this.ruleForm.UnidadMedidaPesoBrutoselecionado = null;
            this.ruleForm.numeropiezas = undefined;
            this.ruleForm.volumen = undefined;
        },
        changedimensiones() {
            this.checkedvolumen = false;
            this.ruleForm.UnidadMedidaVolumen = [];
            this.ruleForm.UnidadMedidaVolumenselecionado = null;
            this.pesovolumentn = '';
            this.pesovolumenkg = '';
            this.pesovolumenlbs = '';
            this.ruleForm.volumen = undefined;
            this.ruleForm.volumencalculado = '';
            this.texseleccion = '';
            this.habilitaraceptar();
        },
        changevolumen() {
            this.checkeddimensiones = false;
            this.ruleForm.UnidadMedidaDistancia = [];
            this.ruleForm.UnidadMedidaDistanciaselecionado = null;
            this.ruleForm.largo = undefined;
            this.ruleForm.ancho = undefined;
            this.ruleForm.alto = undefined;
            this.ruleForm.volumencalculado = '';
            this.texseleccion = '';
            this.tex = '';
            this.texcbm = '';
            this.texvol = '';
            this.pesovolumenmetrico = '';
            this.pesovol = '';
            this.pesovolumentn = '';
            this.pesovolumenkg = '';
            this.pesovolumenlbs = '';
            this.habilitaraceptar();
        },
        accionclikc(datofilamodel, indice) {
            console.log("si ingresa")
            this.indexformulario = indice;
            this.dialogFormDimensionesvolumen = true;
        },
        tablasinicial() {
            this.columnatabladetallesmercancia = JSON.parse(JSON.stringify(this.columnatabladetallesmercanciainicial));
            this.columnatablamercanciaasegurada = JSON.parse(JSON.stringify(this.columnatablamercanciaaseguradainicial));
            this.columnatablawarehouse = JSON.parse(JSON.stringify(this.columnatablawarehouseinicial)); 
            this.columnasuma = JSON.parse(JSON.stringify(this.columnasumainicial));    
              
        },
        cancelarexportador() {
            this.dialogFormexportador = false;
            this.dialogFormexportadoreditar = false;
            this.visualizareditar = false;
        },
        validodatosexportador(valido) {
            if (valido = true) {
                
                this.ruleForm.exportador = this.ruleformexportador.razonsocial;
                let currentObj = this;
                this.axios.post(this.metodoguardarcrearcliente, {
                    Datocrearexportador: this.ruleForm.exportador,
                })
                    .then(function (response) {
                    })
                    .catch(function (error) {
                        currentObj.output = error;
                    });
                this.dialogFormexportador = false;
                this.visualizareditar = false;
            }
        },
        aceptarexportador() {
            this.validarformulario = this.validarformulario + 1;

        },
        validodatosexportadoreditar(valido) {
            if (valido = true) {
                
                this.ruleForm.exportador = this.ruleformeditarexportador.razonsocial;
                let currentObj = this;
                this.axios.post(this.metodoguardarcrearcliente, {
                    Datocrearexportador: this.ruleForm.exportador,
                })
                    .then(function (response) {
                    })
                    .catch(function (error) {
                        currentObj.output = error;
                    });
                this.dialogFormexportadoreditar = false;
                this.visualizareditar = false;
            }
        },
        aceptarexportadoreditar() {
            this.validarformulario = this.validarformulario + 1;            
        },
        cancelarimportador() {
            this.dialogFormimportador = false;
            this.dialogFormimportadoreditar = false;
            this.visualizareditar = false;
        },
        validodatosimportadoreditar(valido) {
            if (valido = true) {
                
                this.ruleForm.importador = this.ruleformeditarimportador.razonsocial;
                let currentObj = this;
                this.axios.post(this.metodoguardarcrearcliente, {
                    Datocrearimportador: this.ruleformeditarimportador,


                })

                    .then(function (response) {




                    })
                    .catch(function (error) {
                        currentObj.output = error;
                    });
                this.dialogFormimportadoreditar = false;
                this.visualizareditar = false;
            }
        },
        aceptarimportadoreditar() {
            this.validarformulario = this.validarformulario + 1;
        },
        validodatosimportador(valido) {
            if (valido = true) {
                
                this.ruleForm.importador = this.ruleformimportador.razonsocial;
                let currentObj = this;
                this.axios.post(this.metodoguardarcrearcliente, {
                    Datocrearimportador: this.ruleformimportador,


                })

                    .then(function (response) {




                    })
                    .catch(function (error) {
                        currentObj.output = error;
                    });
                this.dialogFormimportador = false;
                this.visualizareditar = false;
            }
        },
        aceptarimportador() {
            this.validarformulario = this.validarformulario + 1;

        },
        cargarmoneda() {


        },
        cambiomoneda() {

        },
    },
    mounted() {
        this.cargarlistas();
    }
})