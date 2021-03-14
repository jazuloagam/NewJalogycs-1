import Vue from "vue";
import axios from 'axios';
import VueAxios from 'vue-axios';
import ElementUI from 'element-ui';

Vue.use(VueAxios, axios);
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
    el: "#app-recuperar",
    data() {
        return {
            usuarios: [],
            metodoobtenerusuarios: '../api/Login/ObtenerOlvideUsuario',
            metodocambiarpassword: '../api/Login/CambiarPassword',
            activo: 'activo',
            username: '',
            password: '',
            passwordconfirm: '',
            id: '',
            mostrartabla: true,
            subtitleinicial: 'Seleccione el usuario para generar la contraseña',
            subtitulo: '',
            IdNotificacion: ''
        };
    },
    methods: {
        usuario(opcion, indice) {
            this.mostrartabla = false;
            this.activo = indice;
            this.username = opcion.NombreUsuario;
            this.id = opcion.IdUsuario;
            this.subtitulo = 'Por favor ingrese su nueva contraseña';
        },
        generarcontrasenia(event) {
            event.preventDefault();
            var Url = event.path[18].location.href;
            this.IdNotificacion = Url.substring(Url.indexOf("Id=")+3);
            let currentObj = this;
            if (this.password != '' && this.passwordconfirm != '') {
                if (this.password == this.passwordconfirm) {
                    this.axios.post(this.metodocambiarpassword, {
                        Id: currentObj.id,
                        Password: currentObj.password,
                        IdNotificacion: currentObj.IdNotificacion
                    })
                        .then(function (response) {
                            currentObj.output = JSON.parse(response.data);
                            currentObj.respuesta = currentObj.output["Respuesta"];
                            if (currentObj.respuesta) {
                                currentObj.$message('Se genera la contraseña');
                                location.href = '/Home/Index';
                            }
                            else {
                                location.href = '/Home/Index';
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                            currentObj.output = error;
                        });
                } else {
                    currentObj.$message('La contraseña no es la misma');
                }
            } else {
                currentObj.$message('Ingrese la contraseña');
            }
        },
        atras(event) {
            event.preventDefault();
            this.mostrartabla = true;
            this.subtitulo = this.subtitleinicial;
        }

    },
    created() {
        let currentObj = this;
        this.axios.post(this.metodoobtenerusuarios)
            .then(function (response) {
                currentObj.output = JSON.parse(response.data);
                currentObj.usuarios = currentObj.output["Usuario"];
            })
            .catch(function (error) {
                console.log(error);
                currentObj.output = error;
            });
    },
    mounted() {
        this.subtitulo = this.subtitleinicial;
    }
});