import Vue from "vue";
import axios from 'axios';
import VueAxios from 'vue-axios';
import ElementUI from 'element-ui';
import seleccion from '../../components/seleccion.vue'

Vue.use(VueAxios, axios);
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
    el: "#app-crearusuario",
    components: { seleccion },
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
            ruleForm: {
                tipodocumento: [],
                documentoseleccionado: 1,
                numerodocumento: '',
                razonsocial: '',
                nombres: '',
                apellidos: '',
                usuario: '',
                password: '',
                confirmpassword: '',
            },
            rules: {
                documentoseleccionado: [{ required: true, message: 'Por Favor seleccione un tipo de documento', trigger: ['blur', 'change'] }],
                numerodocumento: [{ required: true, message: 'Por favor selecciona un numero de documento', trigger: ['blur', 'change'] },
                { pattern: '^[0-9]{3,20}$', message: 'El numero documento debe ser entre 3 a 20 digitos', trigger: ['blur', 'change'] }],
                razonsocial: [{ required: true, message: 'Por favor seleccione una razon social', trigger: ['blur', 'change'] },
                { min: 0, max: 400, message: 'La razon social debe ser menor a 400 caracteres', trigger: ['blur', 'change'] }],
                nombres: [{ required: true, message: 'Por favor seleccione un nombre', trigger: ['blur', 'change'] },
                { min: 0, max: 200, message: 'El nombre debe ser menor a 200 caracteres', trigger: ['blur', 'change'] }],
                apellidos: [{ required: true, message: 'Por favor seleccione un apellido', trigger: ['blur', 'change'] },
                { min: 0, max: 200, message: 'El apellido debe ser menor a 200 caracteres', trigger: ['blur', 'change'] }],
                usuario: [{ required: true, message: 'Por favor seleccione un usuario', trigger: ['blur', 'change'] },
                { pattern:'^[a-zA-Z0-9@.]{6,200}$', message: 'El usuario debe contener 6 a 200 caracteres', trigger: ['blur', 'change'] }],
                password: [{ required: true, message: 'Por favor seleccione una contraseña', trigger: ['blur', 'change'] },
                    { pattern: '(?=^.{8,}$)((?=.*[1-9])|(?=.*[A-Za-z]+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$', message: 'La contraseña debe tener minimo 8 caracteres, al menos 1 minuscula, 1 mayuscula y 1 digito', trigger: ['blur', 'change'] }],
                confirmpassword: [{ required: true, message: 'Por favor seleccione una contraseña', trigger: ['blur', 'change'] },
                { validator: validarPass, trigger: ['blur', 'change'] }]

            },
            metodoobtenerlicencia:'../api/Login/ObtenerLicencia',
            metodoactivarusuario: '../api/Login/ActivarUsuario',
            IdLicencia:''
        };
    },
    methods: {
        cambiotipodocumento(e) {
            var TipoDocumento = this.ruleForm.tipodocumento.find(tipo => tipo.Id == e);
            this.rules.numerodocumento[1].pattern = TipoDocumento.ExpresionRegular;
            this.rules.numerodocumento[1].message = TipoDocumento.MensajeValidacion;
            this.ruleForm.documentoseleccionado = e;
        },
        cargardatos(valor) {
            this.ruleForm.tipodocumento = valor;
        },
        obtenerlicencia() {
            let currentObj = this;
            this.axios.post(this.metodoobtenerlicencia, {
            })
                .then(function (response) {
                    currentObj.output = JSON.parse(response.data);
                    var Licencia = currentObj.output["Licencia"];                    
                    currentObj.ruleForm.documentoseleccionado = Licencia.usuario.Persona.IdTipoDocumento;
                    currentObj.ruleForm.numerodocumento = Licencia.usuario.Persona.NumeroDocumento;
                    currentObj.ruleForm.razonsocial = Licencia.pago.CuentaCliente.RazonSocial;
                    currentObj.ruleForm.nombres = Licencia.usuario.Persona.Nombre;
                    currentObj.ruleForm.apellidos = Licencia.usuario.Persona.Apellido;
                    currentObj.ruleForm.usuario = Licencia.usuario.NombreUsuario;
                })
                .catch(function (error) {
                    currentObj.$message('Error al realizar obtener licencia');
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
                        TipoDocumento: currentObj.ruleForm.documentoseleccionado,
                        NumeroDocumento: currentObj.ruleForm.numerodocumento,
                        RazonSocialCliente: currentObj.ruleForm.razonsocial,
                        Nombres: currentObj.ruleForm.nombres,
                        Apellidos: currentObj.ruleForm.apellidos,
                        NombreUsuario: currentObj.ruleForm.usuario,
                        Password: currentObj.ruleForm.password,
                        LicenciaUsuario: currentObj.IdLicencia
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
        this.ruleForm.documentoseleccionado = 1;
        this.obtenerlicencia();
    }
})