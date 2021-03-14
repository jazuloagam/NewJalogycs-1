import Vue from "vue";
import axios from 'axios';
import VueAxios from 'vue-axios';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/es';

Vue.use(VueAxios, axios);
Vue.use(ElementUI, {locale});
Vue.config.productionTip = false;

new Vue({
    el: "#app-perfilusuario",
    data() {
        return {
            ruleForm: {
                cargo: '',
                telefono: '',
                fechaingreso: '',
                fechanacimiento: ''
            },
            rules: {
                cargo: [{ required: true, message: 'Por favor seleccione un nombre', trigger: ['blur', 'change'] },
                { min: 0, max: 200, message: 'El nombre debe ser menor a 200 caracteres', trigger: ['blur', 'change'] }],
                telefono: [{ required: true, message: 'Por favor seleccione un apellido', trigger: ['blur', 'change'] },
                { min: 0, max: 200, message: 'El apellido debe ser menor a 200 caracteres', trigger: ['blur', 'change'] }],
                fechaingreso: [{ required: true, message: 'Por favor seleccione un usuario', trigger: ['blur', 'change'] },
                /*{ pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$', message: 'Fecha de ingreso incorrecta', trigger: ['blur', 'change'] }*/],
                fechanacimiento: [{ required: true, message: 'Por favor seleccione una contraseña', trigger: ['blur', 'change'] },
                /*{ pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$', message: 'Fecha de nacimiento incorrecta', trigger: ['blur', 'change'] }*/]

            },
            metodoobtenerperfil: '../api/UsuarioApi/ObtenerPerfilUsuario',
            metodoeditarperfil: '../api/UsuarioApi/EditarPerfil',
            Persona: '',
            Usuario: '',
            Contrato: ''
        };
    },
    methods: {
        ObtenerPerfil() {
            let currentObj = this;
            this.axios.post(this.metodoobtenerperfil, {
            })
                .then(function (response) {
                    currentObj.output = JSON.parse(response.data);
                    currentObj.Persona = currentObj.output["Persona"];
                    currentObj.Usuario = currentObj.output["Usuario"];
                    currentObj.Contrato = currentObj.output["Contrato"];
                    currentObj.ruleForm.nombres = currentObj.Persona.Nombre;
                    currentObj.ruleForm.apellidos = currentObj.Persona.Apellido;
                    currentObj.ruleForm.cargo = currentObj.Contrato.Cargo;
                    currentObj.ruleForm.telefono = currentObj.Persona.Telefono;
                    currentObj.ruleForm.fechanacimiento = currentObj.Persona.FechaNacimiento;
                    currentObj.ruleForm.fechaingreso = currentObj.Contrato.FechaIngreso;
                })
                .catch(function (error) {
                    currentObj.output = error;
                });
        },
        editarperfil(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let currentObj = this;
                    this.axios.post(this.metodoeditarperfil, {
                        Cargo: currentObj.ruleForm.cargo,
                        Telefono: currentObj.ruleForm.telefono,
                        FechaIngreso: currentObj.ruleForm.fechaingreso,
                        FechaNacimiento: currentObj.ruleForm.fechanacimiento,
                        IdUsuario: currentObj.Usuario.IdUsuario,
                        IdPersona: currentObj.Persona.IdPersona,
                        IdContrato: currentObj.Contrato.IdContrato
                    }).then(function (response) {
                        currentObj.output = JSON.parse(response.data);
                        var opcionregistro = currentObj.output["Respuesta"];
                        console.log(opcionregistro);
                        if (opcionregistro) {
                            currentObj.$notify({
                                title: 'Editar Perfil',
                                message: 'Perfil editado',
                                type: 'success'
                            });
                        } else {
                            currentObj.$notify({
                                title: 'Editar Perfil',
                                message: 'El perfil no pudo ser editado',
                                type: 'error'
                            });
                        }
                    }).catch(function (error) {
                        currentObj.$notify({
                            title: 'Editar Perfil',
                            message: 'El perfil no pudo ser editado',
                            type: 'error'
                        });
                        currentObj.output = error;
                    });
                } else {
                    return false;
                }
            });
        }
    },
    mounted() {
        this.ObtenerPerfil();
    }
})