import Vue from "vue";
import ElementUI from 'element-ui';
import VueToast from 'vue-toast-notification';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(ElementUI);
Vue.use(VueToast);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

var appactivarusuario = new Vue({
    el: '#app-activarusuario',
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
                nombres: '',
                apellidos: '',
                usuario: '',
                password: '',
                confirmpassword: '',
            },
            rules: {
                nombres: [{ required: true, message: 'Por favor seleccione un nombre', trigger: ['blur', 'change'] },
                { min: 0, max: 200, message: 'El nombre debe ser menor a 200 caracteres', trigger: ['blur', 'change'] }],
                apellidos: [{ required: true, message: 'Por favor seleccione un apellido', trigger: ['blur', 'change'] },
                { min: 0, max: 200, message: 'El apellido debe ser menor a 200 caracteres', trigger: ['blur', 'change'] }],
                usuario: [{ required: true, message: 'Por favor seleccione un usuario', trigger: ['blur', 'change'] },
                { pattern: '^[a-zA-Z0-9@.]{6,200}$', message: 'El usuario debe contener 6 a 200 caracteres', trigger: ['blur', 'change'] }],
                password: [{ required: true, message: 'Por favor seleccione una contraseña', trigger: ['blur', 'change'] },
                { pattern: '(?=^.{8,}$)((?=.*[1-9])|(?=.*[A-Za-z]+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$', message: 'La contraseña debe tener minimo 8 caracteres, al menos 1 minuscula, 1 mayuscula y 1 digito', trigger: ['blur', 'change'] }],
                confirmpassword: [{ required: true, message: 'Por favor seleccione una contraseña', trigger: ['blur', 'change'] },
                { validator: validarPass, trigger: ['blur', 'change'] }]
            },
            metodoobtenerlicencia: '../api/Login/ObtenerLicencia',
            metodoactivarusuario: '../api/Login/ActivarUsuario',
            IdLicencia: '',
        };
    },
    methods: {
        activarusuario(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let currentObj = this;
                    this.axios.post(this.metodoactivarusuario, {
                        Nombres: currentObj.ruleForm.nombres,
                        Apellidos: currentObj.ruleForm.apellidos,
                        NombreUsuario: currentObj.ruleForm.usuario,
                        Password: currentObj.ruleForm.password,
                        LicenciaUsuario: currentObj.IdLicencia,
                        Tipo:1
                    }).then(function (response) {
                        currentObj.output = JSON.parse(response.data);
                    }).catch(function (error) {
                        currentObj.$message('Error activar usuario activar usuario');
                    });
                } else {
                    return false;
                }
            });
        },
        ObtenerLicencia() {
            let currentObj = this;
            this.axios.post(this.metodoobtenerlicencia, {}
            ).then(function (response) {
                currentObj.output = JSON.parse(response.data);
                var Licencia = currentObj.output["Licencia"];
                currentObj.ruleForm.nombres = Licencia.usuario.Persona.Nombre;
                currentObj.ruleForm.apellidos = Licencia.usuario.Persona.Apellido;
                currentObj.ruleForm.usuario = Licencia.usuario.NombreUsuario;
                currentObj.IdLicencia = Licencia.idlicencia;
            }).catch(function (error) {
                currentObj.$message('Error obtener licencia activar usuario');
            })
        }
    },
    mounted() {
        this.ObtenerLicencia();
    }
});