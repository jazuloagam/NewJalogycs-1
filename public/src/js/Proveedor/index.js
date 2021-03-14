import Vue from "vue";
import axios from 'axios';
import VueAxios from 'vue-axios';
import ElementUI from 'element-ui';
import autocomplete from '../../components/autocomplete.vue'
import seleccion from '../../components/seleccion.vue'
import tablainfo from '../../components/tablainfo.vue'
import tablaedit from '../../components/tablaedit.vue'

Vue.use(VueAxios, axios);
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
    el: '#app-proveedor',
    components: { autocomplete, seleccion, tablainfo, tablaedit },
    data() {
        return {
            ruleForm1: {
                tipoproveedor: [],
                tipoproveedorseleccionado: '',
                modotransporte: [],
                modotransporteseleccionado: '',
                tipodocumento: [],
                documentoseleccionado: '',
                numerodocumento: '',
                razonsocial: '',
                pais: '',
                paginaweb:''
            },
            rules1: {
                documentoseleccionado: [{ required: true, message: 'Por Favor seleccione un tipo de documento', trigger: ['blur', 'change'] }],
                numerodocumento: [{ required: true, message: 'Por favor selecciona un numero de documento', trigger: ['blur', 'change'] },
                { pattern: '^[0-9]{3,20}$', message: 'El numero documento debe ser entre 3 a 20 digitos', trigger: ['blur', 'change'] }],
                razonsocial: [{ required: true, message: 'Por favor seleccione un nombre', trigger: ['blur', 'change'] },
                { min: 0, max: 200, message: 'El nombre debe ser menor a 200 caracteres', trigger: ['blur', 'change'] }],
                pais: [{ required: true, message: 'Por favor seleccione un apellido', trigger: ['blur', 'change'] },
                { min: 0, max: 200, message: 'El apellido debe ser menor a 200 caracteres', trigger: ['blur', 'change'] }],
                tipoproveedorseleccionado: [{ required: true, message: 'Por Favor seleccione un tipo de proveedor', trigger: ['blur', 'change'] }],
                modotransporteseleccionado: [{ required: true, message: 'Por favor seleccione un modo de transporte', trigger: ['blur', 'change'] }],
                paginaweb: [{ required: true, message: 'Por favor selecciona un numero de documento', trigger: ['blur', 'change'] },
                { pattern: '^[0-9]{3,20}$', message: 'El numero documento debe ser entre 3 a 20 digitos', trigger: ['blur', 'change'] }],
            },
            //razonsocial: '',
            //numeroidentificacion: '',
            //codiata: '',
            //direccion: '',
            //telefono: '',
            //contacto: '',
            //cargocontacto: '',
            //correocontacto: '',
            //nombrecontactoadicional: '',
            //cargocontactoadicional: '',
            //correocontactoadicional: '',
            //telefonocontactoadicional: '',
            //paiscontactoadicional: '',
            //ciudadcontactoadicional: '',
            activo: 1,
            status1: 'finish',
            status2: 'process',
            datotablacaracteristica: [{ Caracteristica: 0, Valor: '', editable: true }],
            datocolumnacaracteristica: [{ dato: 0, prop: 'Caracteristica', regex: '^.*$' }, { dato: '', prop: 'Valor', regex: '^[0-9]{4}$' }],
            columnatablacaracteristica: [{ id: 0, label: 'Caracteristica', prop: 'Caracteristica', tipo: 'seleccion', tiposeleccion: 'CaracteristicaCliente', metodo: '../api/Login/CargarDatos', placeholder: 'Seleccione opción', width: '200px', fixed: false },
                { id: 1, label: 'Valor', prop: 'Valor', tipo: 'input', fixed: false, width: '150px' }],
            datotablacontacto: [{ Nombres: '', Ciudad: '', Direccion: '', CodigoPostal: '', SeleccionContactoPrincipal: false, Telefono: '', Extension: '', Cargo: '', Correo: '', editable: true }],
            datocolumnacontacto: [{ dato: '', prop: 'Nombres', regex: '^[0-9]{4}$' }, { dato: '', prop: 'Ciudad', regex: '^[0-9]{4}$' }, { dato: '', prop: 'Direccion', regex: '^[0-9]{4}$' }, { dato: '', prop: 'CodigoPostal', regex: '^[0-9]{4}$' }, { dato: false, prop: 'SeleccionContactoPrincipal' }, { dato: '', prop: 'Telefono', regex: '^[0-9]{4}$' }, { dato: '', prop: 'Extension', regex: '^[0-9]{4}$' }, { dato: '', prop: 'Cargo' }, { dato: '', prop: 'Correo', regex: '^[0-9]{4}$' }],
            columnatablacontacto: [{ id: 0, label: 'Nombre de contacto', prop: 'Nombres', tipo: 'input', fixed: true, width: '200px' },
            { id: 1, label: 'Ciudad', prop: 'Ciudad', tipo: 'input', fixed: false, width: '150px' },
            { id: 2, label: 'Direccion', prop: 'Direccion', tipo: 'input', fixed: false, width: '150px' },
            { id: 3, label: 'Codigo Postal', prop: 'CodigoPostal', tipo: 'input', fixed: false, width: '100px' },
            { id: 4, label: 'Selección contacto principal', prop: 'SeleccionContactoPrincipal', tipo: 'checkbox', fixed: false, width: '200px' },
            { id: 5, label: 'Telefono', prop: 'Telefono', tipo: 'input', fixed: false, width: '150px' },
            { id: 6, label: 'Extensión', prop: 'Extension', tipo: 'input', fixed: false, width: '100px' },
            { id: 7, label: 'Cargo', prop: 'Cargo', tipo: 'input', fixed: false, width: '150px' },
                { id: 8, label: 'Correo', prop: 'Correo', tipo: 'input', fixed: false, width: '150px' }],
            metodocrearproveedor:'../api/ProveedorApi/CrearProveedor'
        };
    },
    methods: {
        cargartipoproveedor(value) {
            this.ruleForm1.tipoproveedor = value;
        },
        cambiotipoproveedor(value) {
            this.ruleForm1.tipoproveedorseleccionado = value;
        },
        cargarmodotransporte(value) {
            this.ruleForm1.modotransporte = value;
        },
        cambiomodotransporte(value) {
            this.ruleForm1.modotransporteseleccionado = value;
        },
        cargartipodocumento(value) {
            this.ruleForm1.tipodocumento = value;
        },
        cambiotipodocumento(value) {
            this.ruleForm1.documentoseleccionado = value;
        },
        handleSelectPais(item) {
            this.ruleForm1.pais = item.value;
        },
        crearproveedor(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let currentObj = this;
                    this.axios.post(this.metodocrearproveedor, {
                        TipoProveedor: currentObj.ruleForm1.tipoproveedorseleccionado,
                        ModoTransporte: currentObj.ruleForm1.modotransporteseleccionado,
                        TipoDocumento: currentObj.ruleForm1.documentoseleccionado,
                        NumeroDocumento: currentObj.ruleForm1.numerodocumento,
                        RazonSocial: currentObj.ruleForm1.razonsocial,
                        Pais: currentObj.ruleForm1.pais,
                        PaginaWeb: currentObj.ruleForm1.paginaweb,
                        Caracteristica: currentObj.datotablacaracteristica,
                        Contacto: currentObj.datotablacontacto
                    }).then(function (response) {

                    }).catch(function (error) {

                    });
                } else {
                    return false;
                }
            });
        },
        cancelar() {

        }
    },
    mounted() {

    }
})