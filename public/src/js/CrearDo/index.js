import Vue from "vue";
import axios from 'axios';
import VueAxios from 'vue-axios';
import ElementUI from 'element-ui';
import autocomplete from '../../components/autocomplete.vue'
import seleccion from '../../components/seleccion.vue'
import tablainfo from '../../components/tablainfo.vue'
import tablaedit from '../../components/tablaedit.vue'
import tablaseleccion from '../../components/tablaseleccion.vue'

Vue.use(VueAxios, axios);
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
    el: '#app-creardo',
    components: { autocomplete, seleccion, tablainfo, tablaedit, tablaseleccion },
    data() {
        return {
            ruleForm: {
                tipooperacion: [],
                tipooperacionseleccionado: '',
                modotransporte: [],
                modotransporteseleccionado: '',
                factorestiba: [],
                factorestibaseleccionado: '',
                tipocarga: [],
                tipocargaseleccionado: '',
                incoterm: [],
                incotermseleccionado: '',
                cliente: '',
                origen: '',
                destino: '',
                numero: '',
                lugarentregaincoterm:''
            },
            rules: {
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
                numero: [{ required: true, message: 'Por favor selecciona un numero de documento', trigger: ['blur', 'change'] },
                    { pattern: '^[0-9]{3,20}$', message: 'El numero documento debe ser entre 3 a 20 digitos', trigger: ['blur', 'change'] }],
                lugarentregaincoterm: [{ required: true, message: 'Por favor selecciona un numero de documento', trigger: ['blur', 'change'] },
                { pattern: '^[0-9]{3,20}$', message: 'El numero documento debe ser entre 3 a 20 digitos', trigger: ['blur', 'change'] }]
            },
            visibilidadfactorestiba: false,
            metodocreardo: '../api/LogisticaApi/CrearDo',
            columnatablacliente: [{ id: 0, label: 'Numero de Identificación', prop: 'numerodocumento' },
            { id: 1, label: 'Razón Social', prop: 'razonsocial' }],
            datostablacliente: [],
            dialogFormClienteVisible: false,
            metodoobtenerincotermportransporte: '../api/LogisticaApi/ObtenerIncotermPorTransporte',
            clienteseleccionado: '',
            dialogFormOrigenVisible: false,
            columnatablapuerto: [{ id: 0, label: 'Nombre', prop: 'nombre' },
            { id: 1, label: 'Codigo', prop: 'codigo' }],
            datostablaorigen: [],
            origenseleccionado: '',

            dialogFormDestinoVisible: false,
            datostabladestino: [],
            destinoseleccionado: '',
            modotransportecombinado: 26,
            modotransportemultimodal: 27,
            modotransportemaritimo: 18,
            datoautocompletecliente: [],
            datoautocompletepuerto: []


        };
    },
    methods: {
        handleSelectCliente(item) {
            this.ruleForm.cliente = item.value;
        },
        cargarClientes(valor) {
            this.datoautocompletecliente = Array.from(valor, x => x.objeto);
        },
        cargarPuertos(valor) {
            this.datoautocompletepuerto = Array.from(valor, x => x.objeto);
        },
        cargartipooperacion(value) {
            this.ruleForm.tipooperacion = value;
        },
        cambiotipooperacion(value) {
            this.ruleForm.tipooperacionseleccionado = value;
        },
        cargarmodotransporte(value) {
            this.ruleForm.modotransporte = value;
        },
        cambiomodotransporte(value) {
            this.ruleForm.modotransporteseleccionado = value;
            if (value == this.modotransportecombinado || value == this.modotransportemultimodal) {
                this.visibilidadfactorestiba = true;
            } else {
                this.visibilidadfactorestiba = false;
            }
            let currentObj = this;
            this.axios.post(this.metodoobtenerincotermportransporte, {
                IdModoTransporte: value
            })
                .then(function (response) {
                    currentObj.output = JSON.parse(response.data);
                    currentObj.ruleForm.incoterm = currentObj.output["ObjetoSeleccionable"];
                })
                .catch(function (error) {
                    currentObj.output = error;
                });
        },
        cargarfactorestiba(value) {
            this.ruleForm.factorestiba = value;
        },
        cambiofactorestiba(value) {
            this.ruleForm.factorestibaseleccionado = value;
        },
        cargartipocarga(value) {
            this.ruleForm.tipocarga = value;
        },
        cambiotipocarga(value) {
            this.ruleForm.tipocargaseleccionado = value;
        },
        cargarincoterm(value) {
            this.ruleForm.incoterm = value;
        },
        cambioincoterm(value) {
            this.ruleForm.incotermseleccionado = value;
        },
        handleSelectOrigen(item) {
            this.ruleForm.origen = item.value;
        },
        handleSelectDestino(item) {
            this.ruleForm.destino = item.value;
        },
        changecurrentcliente(value) {
            this.clienteseleccionado = value;
        },
        abrirseleccioncliente() {
            this.datostablacliente = this.datoautocompletecliente;
            this.ruleForm.cliente = '';
            this.clienteseleccionado = '';
            this.dialogFormClienteVisible = true;
        },
        confirmarseleccioncliente() {
            this.ruleForm.cliente = this.clienteseleccionado.razonsocial;
            this.dialogFormClienteVisible = false;
        },
        cancelarseleccioncliente() {
            this.ruleForm.cliente = '';
            this.clienteseleccionado = '';
            this.dialogFormClienteVisible = false;
        },
        abrirseleccionpuerto(valor) {
            this.datostablaorigen = this.datoautocompletepuerto;
            this.datostabladestino = this.datoautocompletepuerto;
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
        changecurrentorigen(value) {
            this.origenseleccionado = value;
        },
        cancelarseleccionorigen() {
            this.ruleForm.origen = '';
            this.origenseleccionado = '';
            this.dialogFormOrigenVisible = false;
        },
        confirmarseleccionorigen() {
            this.ruleForm.origen = this.origenseleccionado.nombre;
            this.dialogFormOrigenVisible = false;
        },
        changecurrentdestino(value) {
            this.destinoseleccionado = value;
        },
        confirmarselecciondestino() {
            this.ruleForm.destino = this.destinoseleccionado.nombre;
            this.dialogFormDestinoVisible = false;
        },
        cancelarselecciondestino() {
            this.ruleForm.destino = '';
            this.destinoseleccionado = '';
            this.dialogFormDestinoVisible = false;
        },
        creardo(formName) {
            let currentObj = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {  
                    let Cliente = currentObj.datoautocompletecliente.find(x => x.razonsocial == currentObj.ruleForm.cliente);
                    let Origen = currentObj.datoautocompletepuerto.find(x => x.nombre == currentObj.ruleForm.origen);
                    let Destino = currentObj.datoautocompletepuerto.find(x => x.nombre == currentObj.ruleForm.destino); //idpuerto
                    this.axios.post(this.metodocreardo, {
                        IdCliente: Cliente.idcliente,
                        IdTipoOperacion: currentObj.ruleForm.tipooperacionseleccionado,
                        IdModoTransporte: currentObj.ruleForm.modotransporteseleccionado,
                        IdFactorEstiba: currentObj.ruleForm.factorestibaseleccionado,
                        IdTipoCarga: currentObj.ruleForm.tipocargaseleccionado,
                        IdPuertoOrigen: Origen.idpuerto,
                        IdPuertoDestino: Destino.idpuerto,
                        IdIncoterm: currentObj.ruleForm.incotermseleccionado,
                        Numero: currentObj.ruleForm.numero,
                        EntregaIncoterm: currentObj.ruleForm.lugarentregaincoterm
                    }).then(function (response) {
                        currentObj.output = JSON.parse(response.data);
                        var opcionregistro = currentObj.output["OpcionRegistro"];
                        if (opcionregistro) {
                            currentObj.$message('Activar usuario realizado satisfactoriamente');
                            location.href = '/Home/index';
                        } else {
                            currentObj.$message('Error al realizar activar usuario');
                        }
                    }).catch(function (error) {
                        currentObj.$message('Error al realizar activar usuario');
                        currentObj.output = error;
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