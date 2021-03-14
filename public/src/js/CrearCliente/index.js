import Vue from "vue";
import ElementUI from 'element-ui';
import VueToast from 'vue-toast-notification';
import axios from 'axios';
import VueAxios from 'vue-axios';
import autocomplete from '../../components/autocomplete.vue'
import seleccion from '../../components/seleccion.vue'
import tablainfo from '../../components/tablainfo.vue'
import tablaedit from '../../components/tablaedit.vue'

Vue.use(ElementUI);
Vue.use(VueToast);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

new Vue({
    el: '#app-crearcliente',
    components: { autocomplete, seleccion, tablainfo, tablaedit },
    data() {
        return {
            ruleForm1: {
                tipodocumento: [],
                documentoseleccionado: 1,
                numerodocumento: '',
                razonsocial: '',
                pais: '',
                fechaingreso: '',
                fechanacimiento: '',
                tablacontacto: [{ Ciudad: '', Direccion: '', CodigoPostal: '', Nombres: '', SeleccionContactoPrincipal: false, Telefono: '', Extension: '', Cargo: '', Correo: '', editable: true }],
                ciudadseleccionada: '',
                direccionseleccionada: '',
                codigopostalseleccionado: '',
                nombresseleccionado: '',
                contactoprincipal: false,
                telefonoseleccionado: '',
                extensionseleccionada: '',
                cargoseleccionado: '',
                correoseleccionado:''
            },
            rules1: {
                documentoseleccionado: [{ required: true, message: 'Por Favor seleccione un tipo de documento', trigger: ['blur', 'change'] }],
                numerodocumento: [{ required: true, message: 'Por favor selecciona un numero de documento', trigger: ['blur', 'change'] },
                { pattern: '^[0-9]{3,20}$', message: 'El numero documento debe ser entre 3 a 20 digitos', trigger: ['blur', 'change'] }],
                razonsocial: [{ required: true, message: 'Por favor seleccione un nombre', trigger: ['blur', 'change'] },
                { min: 0, max: 200, message: 'El nombre debe ser menor a 200 caracteres', trigger: ['blur', 'change'] }],
                pais: [{ required: true, message: 'Por favor seleccione un apellido', trigger: ['blur', 'change'] },
                { min: 0, max: 200, message: 'El apellido debe ser menor a 200 caracteres', trigger: ['blur', 'change'] }],
                fechaingreso: [{ required: true, message: 'Por favor seleccione un usuario', trigger: ['blur', 'change'] },
                /*{ pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$', message: 'Fecha de ingreso incorrecta', trigger: ['blur', 'change'] }*/],
                fechanacimiento: [{ required: true, message: 'Por favor seleccione una contraseña', trigger: ['blur', 'change'] },
                /*{ pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$', message: 'Fecha de nacimiento incorrecta', trigger: ['blur', 'change'] }*/]

            },
            ruleForm2: {
                relacioncliente: [],
                relacionclienteseleccionado: 0,
                tipodocumento: [],
                documentoseleccionado: 0,
                numerodocumento: '',
                razonsocial: '',
                pais: '',
                fechaingreso: '',
                fechanacimiento: '',
                tablacontacto: [{ Ciudad: '', Direccion: '', CodigoPostal: '', Nombres: '', SeleccionContactoPrincipal: false, Telefono: '', Extension: '', Cargo: '', Correo: '', editable: true }],
                ciudadseleccionada: '',
                direccionseleccionada: '',
                codigopostalseleccionado: '',
                nombresseleccionado: '',
                contactoprincipal: false,
                telefonoseleccionado: '',
                extensionseleccionada: '',
                cargoseleccionado: '',
                correoseleccionado: ''
            },
            rules2: {
                documentoseleccionado: [{ required: true, message: 'Por Favor seleccione un tipo de documento', trigger: ['blur', 'change'] }],
                numerodocumento: [{ required: true, message: 'Por favor selecciona un numero de documento', trigger: ['blur', 'change'] },
                { pattern: '^[0-9]{3,20}$', message: 'El numero documento debe ser entre 3 a 20 digitos', trigger: ['blur', 'change'] }],
                razonsocial: [{ required: true, message: 'Por favor seleccione un nombre', trigger: ['blur', 'change'] },
                { min: 0, max: 200, message: 'El nombre debe ser menor a 200 caracteres', trigger: ['blur', 'change'] }],
                pais: [{ required: true, message: 'Por favor seleccione un apellido', trigger: ['blur', 'change'] },
                { min: 0, max: 200, message: 'El apellido debe ser menor a 200 caracteres', trigger: ['blur', 'change'] }],
                fechaingreso: [{ required: true, message: 'Por favor seleccione un usuario', trigger: ['blur', 'change'] },
                /*{ pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$', message: 'Fecha de ingreso incorrecta', trigger: ['blur', 'change'] }*/],
                fechanacimiento: [{ required: true, message: 'Por favor seleccione una contraseña', trigger: ['blur', 'change'] },
                /*{ pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$', message: 'Fecha de nacimiento incorrecta', trigger: ['blur', 'change'] }*/]

            },
            activo: 1,
            status1: 'finish',
            status2: 'process',
            editar: 0,
            datotablacontactocliente: [{ Nombres: '', Ciudad: '', Direccion: '', CodigoPostal: '', SeleccionContactoPrincipal: false, Telefono: '', Extension: '', Cargo: '', Correo: '', editable: true }],
            datocolumnacontactocliente: [{ dato: '', prop: 'Nombres', regex: '^[0-9]{4}$' }, { dato: '', prop: 'Ciudad', regex: '^[0-9]{4}$' }, { dato: '', prop: 'Direccion', regex: '^[0-9]{4}$' }, { dato: '', prop: 'CodigoPostal', regex: '^[0-9]{4}$' }, { dato: false, prop: 'SeleccionContactoPrincipal' }, { dato: '', prop: 'Telefono', regex: '^[0-9]{4}$' }, { dato: '', prop: 'Extension', regex: '^[0-9]{4}$' }, { dato: '', prop: 'Cargo' }, { dato: '', prop: 'Correo', regex: '^[0-9]{4}$' }],
            columnatablacontactocliente: [{ id: 0, label: 'Nombre de contacto', prop: 'Nombres', tipo: 'input', fixed: true, width: '200px' },
                { id: 1, label: 'Ciudad', prop: 'Ciudad', tipo: 'input', fixed: false, width: '150px' },
                { id: 2, label: 'Direccion', prop: 'Direccion', tipo: 'input', fixed: false, width: '150px' },
                { id: 3, label: 'Codigo Postal', prop: 'CodigoPostal', tipo: 'input', fixed: false, width: '100px' },
                { id: 4, label: 'Selección contacto principal', prop: 'SeleccionContactoPrincipal', tipo: 'checkbox', fixed: false, width: '200px' },
                { id: 5, label: 'Telefono', prop: 'Telefono', tipo: 'input', fixed: false, width: '150px' },
                { id: 6, label: 'Extensión', prop: 'Extension', tipo: 'input', fixed: false, width: '100px' },
                { id: 7, label: 'Cargo', prop: 'Cargo', tipo: 'input', fixed: false, width: '150px' },
                { id: 8, label: 'Correo', prop: 'Correo', tipo: 'input', fixed: false, width: '150px' }],
            datotablacaracteristicacliente: [{ Caracteristica: 0, Valor: '', editable: true }],
            datocolumnacaracteristicacliente: [{ dato: 0, prop: 'Caracteristica', regex: '^.*$' }, { dato: '', prop: 'Valor', regex: '^[0-9]{4}$' }],
            columnatablacaracteristicacliente: [{ id: 0, label: 'Caracteristica', prop: 'Caracteristica', tipo: 'seleccion', tiposeleccion: 'CaracteristicaCliente', metodo: '../api/Login/CargarDatos', placeholder: 'Seleccione opción', width: '200px', fixed: false },
                { id: 1, label: 'Valor', prop: 'Valor', tipo: 'input', fixed: false, width: '150px' }],
            datotablacaracteristicaproveedor: [{ Caracteristica: 0, Valor: '', editable: true }],
            datocolumnacaracteristicaproveedor: [{ dato: 0, prop: 'Caracteristica', regex: '^.*$' }, { dato: '', prop: 'Valor', regex: '^[0-9]{4}$' }],
            columnatablacaracteristicaproveedor: [{ id: 0, label: 'Caracteristica', prop: 'Caracteristica', tipo: 'seleccion', tiposeleccion: 'CaracteristicaProveedor', metodo: '../api/Login/CargarDatos', placeholder: 'Seleccione opción', width: '200px', fixed: false },
            { id: 1, label: 'Valor', prop: 'Valor', tipo: 'input', fixed: false, width: '150px' }],
            datotablacontactoproveedor: [{ Nombres: '', Ciudad: '', Direccion: '', CodigoPostal: '', SeleccionContactoPrincipal: false, Telefono: '', Extension: '', Cargo: '', Correo: '', editable: true }],
            datocolumnacontactoproveedor: [{ dato: '', prop: 'Nombres', regex: '^[0-9]{4}$' }, { dato: '', prop: 'Ciudad', regex: '^[0-9]{4}$' }, { dato: '', prop: 'Direccion', regex: '^[0-9]{4}$' }, { dato: '', prop: 'CodigoPostal', regex: '^[0-9]{4}$' }, { dato: false, prop: 'SeleccionContactoPrincipal' }, { dato: '', prop: 'Telefono', regex: '^[0-9]{4}$' }, { dato: '', prop: 'Extension', regex: '^[0-9]{4}$' }, { dato: '', prop: 'Cargo', regex: '^[0-9]{4}$' }, { dato: '', prop: 'Correo', regex: '^[0-9]{4}$' }],
            columnatablacontactoproveedor: [{ id: 0, label: 'Nombre de contacto', prop: 'Nombres', tipo: 'input', fixed: true, width: '200px' },
            { id: 1, label: 'Ciudad', prop: 'Ciudad', tipo: 'input', fixed: false, width: '150px' },
            { id: 2, label: 'Direccion', prop: 'Direccion', tipo: 'input', fixed: false, width: '150px' },
            { id: 3, label: 'Codigo Postal', prop: 'CodigoPostal', tipo: 'input', fixed: false, width: '100px' },
            { id: 4, label: 'Selección contacto principal', prop: 'SeleccionContactoPrincipal', tipo: 'checkbox', fixed: false, width: '200px' },
            { id: 5, label: 'Telefono', prop: 'Telefono', tipo: 'input', fixed: false, width: '150px' },
            { id: 6, label: 'Extensión', prop: 'Extension', tipo: 'input', fixed: false, width: '100px' },
            { id: 7, label: 'Cargo', prop: 'Cargo', tipo: 'input', fixed: false, width: '150px' },
            { id: 8, label: 'Correo', prop: 'Correo', tipo: 'input', fixed: false, width: '150px' }],
            metodocrearcliente: '../api/ClienteApi/CrearCliente',
            columnatablaproveedores: [{ id: 0, label: 'Numero de Identificación', prop: 'NumeroIdentificacion' },
                { id: 1, label: 'Razón Social', prop: 'RazonSocial' },
                { id: 2, label: 'Pais', prop: 'Pais' }],
            datostablaproveedor: []
        };
    },
    methods: {
        cargartipodocumentocliente(value) {
            this.ruleForm1.tipodocumento = value;
        },
        cambiotipodocumentocliente(e) {
            var TipoDocumento = this.ruleForm1.tipodocumento.find(tipo => tipo.Id == e);
            this.rules1.numerodocumento[1].pattern = TipoDocumento.ExpresionRegular;
            this.rules1.numerodocumento[1].message = TipoDocumento.MensajeValidacion;
            this.ruleForm1.documentoseleccionado = e;
        },        
        cargartipodocumentoproveedor(value) {
            this.ruleForm2.tipodocumento = value;
        },
        cambiotipodocumentoproveedor(e) {
            var TipoDocumento = this.ruleForm2.tipodocumento.find(tipo => tipo.Id == e);
            this.rules2.numerodocumento[1].pattern = TipoDocumento.ExpresionRegular;
            this.rules2.numerodocumento[1].message = TipoDocumento.MensajeValidacion;
            this.ruleForm2.documentoseleccionado = e;
        },
        cargarrelacionproveedorcliente(value) {
            this.ruleForm2.relacioncliente = value;
        },
        cambiorelacion(e) {
            console.log(e);
            this.ruleForm2.relacionclienteseleccionado = e;
        },
        siguiente(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.activo++;
                    this.status1 = 'success';
                    this.status2 = 'finish';
                } else {
                    return false;
                }
            });            
        },
        adicionarotroproveedor(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let currentObj = this;
                    currentObj.datostablaproveedor.push(
                        {
                            RelacionCliente: currentObj.ruleForm2.relacionclienteseleccionado,
                            DocumentoSeleccionado: currentObj.ruleForm2.documentoseleccionado,
                            NumeroIdentificacion: currentObj.ruleForm2.numerodocumento,
                            RazonSocial: currentObj.ruleForm2.razonsocial,
                            Pais: currentObj.ruleForm2.pais,
                            Contacto: Object.assign({}, currentObj.datotablacontactoproveedor),
                            CaracteristicaProveedor: Object.assign({}, currentObj.datotablacaracteristicaproveedor) 
                        }
                    )
                } else {
                    return false;
                }
            });
        },
        crearcliente(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let currentObj = this;
                    this.axios.post(this.metodocrearcliente, {
                        RazonSocialCliente: currentObj.ruleForm1.razonsocial,
                        PaisCliente: currentObj.ruleForm1.pais,
                        TipoIdentificacionCliente: currentObj.ruleForm1.documentoseleccionado,
                        NumeroIdentificacionCliente: currentObj.ruleForm1.numerodocumento,
                        ContactoAsociadoCliente: currentObj.datotablacontactocliente,
                        CaracteristicasCliente: currentObj.datotablacaracteristicacliente,
                        Proveedor: currentObj.datostablaproveedor
                    }).then(function (response) {

                    }).catch(function (error) {

                    });
                } else {
                    return false;
                }
            });
        },
        atras() {
            this.activo--;
            this.status1 = 'finish';
            this.status2 = 'process';
        },
        handleSelectPaisCliente(item) {
            this.ruleForm1.pais = item.value;
        },
        handleSelectPaisProveedor(item) {
            this.ruleForm2.pais = item.value;
        }
    }
})