import Vue from "vue";
import axios from 'axios';
import VueAxios from 'vue-axios';
import ElementUI from 'element-ui';

Vue.use(VueAxios, axios);
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
    el: "#app-crearitem",
    data() {
        var validarPass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Por favor seleccione una contraseña'));
            } else if (value !== this.ruleForm.password) {
                callback(new Error('Las contraseñas no son iguales'));
            } else {
                callback();
            }
        };
        return {
            ruleFormMercancia: {
                tramite: [],
                tramiteseleccionado: '',
                otro: '',
                nombre: '',
                codigo: ''
            },
            ruleFormDisposicionCarga: {
                nombre: '',
                codigo:''
            },
            ruleFormTipoOperacion: {
                clasetipooperacion: [],
                clasetipooperacionseleccionado: '',
                nombre: '',
                codigo: ''
            },
            ruleFormTipoEmbalaje: {
                nombre: '',
                codigo: ''
            },
            ruleFormTipoContenedor: {
                tipoequipo: '',
                codigotipoequipo: '',
                tamanioequipo: '',
                codigotamanioequipo:''
            },
            ruleFormTipoVehiculo: {
                nombre: '',
                codigo:''
            },
            ruleFormTipoDocumento: {
                tipopermiso: '',
                codigotipopermiso: '',
                entidadpermiso: '',
                codigoentidadpermiso: '',
                checked: false,
                comentario: '',
                comentariovisible:false
            },
            rulesMercancia: {
                tramiteseleccionado: [{ required: true, message: 'Por Favor seleccione un tramite', trigger: ['blur', 'change'] }],
                otro: [{ required: true, message: 'Por favor seleccione un tramite', trigger: ['blur', 'change'] },
                { min: 0, max: 200, message: 'El tramite debe ser menor a 200 caracteres', trigger: ['blur', 'change'] }],
                nombre: [{ required: true, message: 'Por favor seleccione un nombre', trigger: ['blur', 'change'] },
                { min: 0, max: 200, message: 'El nombre debe ser menor a 200 caracteres', trigger: ['blur', 'change'] }],
                codigo: [{ required: true, message: 'Por favor seleccione un código', trigger: ['blur', 'change'] },
                { pattern: '^[a-zA-Z0-9@.]{6,200}$', message: 'El código debe contener 6 a 200 caracteres', trigger: ['blur', 'change'] }]
            },
            rulesDisposicionCarga: {
                nombre: [{ required: true, message: 'Por favor seleccione un nombre', trigger: ['blur', 'change'] },
                { min: 0, max: 200, message: 'El nombre debe ser menor a 200 caracteres', trigger: ['blur', 'change'] }],
                codigo: [{ required: true, message: 'Por favor seleccione un código', trigger: ['blur', 'change'] },
                { pattern: '^[a-zA-Z0-9@.]{6,200}$', message: 'El código debe contener 6 a 200 caracteres', trigger: ['blur', 'change'] }]
            },
            rulesTipoOperacion: {
                clasetipooperacionseleccionado: [{ required: true, message: 'Por Favor seleccione una clase', trigger: ['blur', 'change'] }],
                nombre: [{ required: true, message: 'Por favor seleccione un nombre', trigger: ['blur', 'change'] },
                { min: 0, max: 200, message: 'El nombre debe ser menor a 200 caracteres', trigger: ['blur', 'change'] }],
                codigo: [{ required: true, message: 'Por favor seleccione un código', trigger: ['blur', 'change'] },
                { pattern: '^[a-zA-Z0-9@.]{6,200}$', message: 'El código debe contener 6 a 200 caracteres', trigger: ['blur', 'change'] }]
            },
            rulesTipoEmbalaje: {
                nombre: [{ required: true, message: 'Por favor seleccione un nombre', trigger: ['blur', 'change'] },
                { min: 0, max: 200, message: 'El nombre debe ser menor a 200 caracteres', trigger: ['blur', 'change'] }],
                codigo: [{ required: true, message: 'Por favor seleccione un código', trigger: ['blur', 'change'] },
                { pattern: '^[a-zA-Z0-9@.]{6,200}$', message: 'El código debe contener 6 a 200 caracteres', trigger: ['blur', 'change'] }]
            },
            rulesTipoContenedor: {
                tipoequipo: [{ required: true, message: 'Por favor seleccione un tipo de equipo', trigger: ['blur', 'change'] },
                { min: 0, max: 200, message: 'El valor de tipo de equipo debe ser menor a 200 caracteres', trigger: ['blur', 'change'] }],
                codigotipoequipo: [{ required: true, message: 'Por favor seleccione un código', trigger: ['blur', 'change'] },
                    { pattern: '^[a-zA-Z0-9@.]{6,200}$', message: 'El código debe contener 6 a 200 caracteres', trigger: ['blur', 'change'] }],
                tamanioequipo: [{ required: true, message: 'Por favor seleccione un tamaño', trigger: ['blur', 'change'] },
                { min: 0, max: 200, message: 'El tamaño debe ser menor a 200 caracteres', trigger: ['blur', 'change'] }],
                codigotamanioequipo: [{ required: true, message: 'Por favor seleccione un código', trigger: ['blur', 'change'] },
                { pattern: '^[a-zA-Z0-9@.]{6,200}$', message: 'El código debe contener 6 a 200 caracteres', trigger: ['blur', 'change'] }]
            },
            rulesTipoVehiculo: {
                nombre: [{ required: true, message: 'Por favor seleccione un nombre', trigger: ['blur', 'change'] },
                { min: 0, max: 200, message: 'El nombre debe ser menor a 200 caracteres', trigger: ['blur', 'change'] }],
                codigo: [{ required: true, message: 'Por favor seleccione un código', trigger: ['blur', 'change'] },
                { pattern: '^[a-zA-Z0-9@.]{6,200}$', message: 'El código debe contener 6 a 200 caracteres', trigger: ['blur', 'change'] }]
            },
            rulesTipoDocumento: {
                tipopermiso: [{ required: true, message: 'Por favor seleccione un tipo de permiso', trigger: ['blur', 'change'] },
                { min: 0, max: 200, message: 'El valor de tipo de permiso debe ser menor a 200 caracteres', trigger: ['blur', 'change'] }],
                codigotipopermiso: [{ required: true, message: 'Por favor seleccione un código', trigger: ['blur', 'change'] },
                { pattern: '^[a-zA-Z0-9@.]{6,200}$', message: 'El código debe contener 6 a 200 caracteres', trigger: ['blur', 'change'] }],
                entidadpermiso: [{ required: true, message: 'Por favor seleccione una entidad', trigger: ['blur', 'change'] },
                { min: 0, max: 200, message: 'La entidad debe ser menor a 200 caracteres', trigger: ['blur', 'change'] }],
                codigoentidadpermiso: [{ required: true, message: 'Por favor seleccione un código', trigger: ['blur', 'change'] },
                { pattern: '^[a-zA-Z0-9@.]{6,200}$', message: 'El código debe contener 6 a 200 caracteres', trigger: ['blur', 'change'] }],
                comentario: [{ required: true, message: 'Por favor seleccione un comentario', trigger: ['blur', 'change'] },
                { pattern: '^[a-zA-Z0-9@.]{6,200}$', message: 'El comentario debe contener 6 a 200 caracteres', trigger: ['blur', 'change'] }]
            },
            metodocargardatos: '../api/UsuarioApi/CargarDatosItems',
            metodocreartipomercancia: 'api/UtilidadesApi/CrearTipoMercancia',
            metodocreardisposicioncarga: 'api/UtilidadesApi/CrearDisposicionCarga',
            metodocreartipooperacion: 'api/UtilidadesApi/CrearTipoOperacion',
            metodocreartipoembalaje: 'api/UtilidadesApi/CrearTipoEmbalaje',
            metodocreartipocontenedor: 'api/UtilidadesApi/CrearTipoContenedor',
            metodocreartipovehiculo: 'api/UtilidadesApi/CrearTipoVehiculo',
            metodocreartipodocumento: 'api/UtilidadesApi/CrearTipoDocumento',
            OpcionOtro: { id_dominio: 0, nombre: 'Otro' },
            isotro: false,
            dialogFormVisible:false
        };
    },
    methods: {
        cambiotramite(e) {
            if (e == this.OpcionOtro.id_dominio) {
                this.isotro = true;
            } else {
                this.isotro = false;
            }
        },
        cambioclasetipooperacion(e) {

        },
        creartipomercancia(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.crearItem(this.metodocreartipomercancia,'tipomercancia');
                } else {
                    return false;
                }
            });
        },
        creardisposicioncarga(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.crearItem(this.metodocreardisposicioncarga,'disposicioncarga');
                } else {
                    return false;
                }
            });
        },
        creartipooperacion(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.crearItem(this.metodocreartipooperacion,'tipooperacion');
                } else {
                    return false;
                }
            });
        },
        creartipoembalaje(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.crearItem(this.metodocreartipoembalaje,'tipoembalaje');
                } else {
                    return false;
                }
            });
        },
        creartipocontenedor(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.crearItem(this.metodocreartipocontenedor,'tipocontenedor');
                } else {
                    return false;
                }
            });
        },
        creartipovehiculo(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.crearItem(this.metodocreartipovehiculo,'tipovehiculo');
                } else {
                    return false;
                }
            });
        },
        creartipodocumento(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.crearItem(this.metodocreartipodocumento,'tipodocumento');
                } else {
                    return false;
                }
            });
        },
        checktipodocumento() {
            this.ruleFormTipoDocumento.comentariovisible = !this.ruleFormTipoDocumento.comentariovisible;
        },
        cargardatos() {
            let currentObj = this;
            this.axios.post(this.metodocargardatos, {
            })
                .then(function (response) {
                    currentObj.output = JSON.parse(response.data);
                    currentObj.ruleFormMercancia.tramite = currentObj.output["TramiteTipoMercancia"];
                    currentObj.ruleFormTipoOperacion.clasetipooperacion = currentObj.output["ClaseTipoOperacion"];
                    currentObj.ruleFormMercancia.tramite.push(currentObj.OpcionOtro);
                })
                .catch(function (error) {
                    currentObj.$message('Error cargar datos crear item');
                    currentObj.output = error;
                });
        },
        crearItem(metodo,nombremetodo) {
            let currentObj = this;
            var nombre = '';
            var codigo = '';
            if (nombremetodo == 'tipomercancia') {
                nombre = this.ruleFormMercancia.nombre;
                codigo = this.ruleFormMercancia.codigo;
            } else if (nombremetodo == 'disposicioncarga') {
                nombre = this.ruleFormDisposicionCarga.nombre;
                codigo = this.ruleFormDisposicionCarga.codigo;
            } else if (nombremetodo == 'tipooperacion') {
                nombre = this.ruleFormTipoOperacion.nombre;
                codigo = this.ruleFormTipoOperacion.codigo;
            } else if (nombremetodo == 'tipoembalaje') {
                nombre = this.ruleFormTipoEmbalaje.nombre;
                codigo = this.ruleFormTipoEmbalaje.codigo;
            } else if (nombremetodo == 'tipovehiculo') {
                nombre = this.ruleFormTipoVehiculo.nombre;
                codigo = this.ruleFormTipoVehiculo.codigo;
            }
            this.axios.post(metodo, {
                codigo:codigo,
                nombre:nombre,
                tramite:currentObj.ruleFormMercancia.tramiteseleccionado,
                otroTramite:currentObj.ruleFormMercancia.otro,
                claseTipoOperacion:currentObj.ruleFormTipoOperacion.clasetipooperacionseleccionado,
                tipoEquipo: currentObj.ruleFormTipoContenedor.tipoequipo,
                codigoTipoEquipo: currentObj.ruleFormTipoContenedor.codigotipoequipo,
                tamanioEquipo: currentObj.ruleFormTipoContenedor.tamanioequipo,
                codigoTamanioEquipo: currentObj.ruleFormTipoContenedor.codigotamanioequipo,
                tipoPermiso: currentObj.ruleFormTipoDocumento.tipopermiso,
                codigoTipoPermiso: currentObj.ruleFormTipoDocumento.codigotipopermiso,
                entidadPermiso: currentObj.ruleFormTipoDocumento.entidadpermiso,
                codigoEntidadPermiso: currentObj.ruleFormTipoDocumento.codigoentidadpermiso,
                comentario: currentObj.ruleFormTipoDocumento.comentario
            })
                .then(function (response) {
                    
                })
                .catch(function (error) {
                    currentObj.output = error;
                });
        },
        activarusuario(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var Url = window.document.location.href;
                    this.IdLicencia = Url.substring(Url.indexOf("Id=") + 3);
                    let currentObj = this;
                    this.axios.post(this.metodoactivarusuario, {
                        
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
        }
    },
    mounted() {
        this.cargardatos();
    }
})