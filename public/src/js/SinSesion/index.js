import Vue from "vue";
import ElementUI from 'element-ui';
import VueToast from 'vue-toast-notification';
import axios from 'axios';
import VueAxios from 'vue-axios';


Vue.use(ElementUI);
Vue.use(VueToast);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;


var appsinsesion=new Vue({
    el: "#app",
    data: {
        razonsocial: '',
        username: '',
        password: '',
        metodoiniciarsesion: '../api/Login/IniciarSesion',
        metodoenviarcorreoolvideusuario: '../api/Login/EnviarCorreoOlvideUsuario',
        correo: '',
        loading: false,
        habilitarboton: false
    },
    methods: {
        iniciarsesion(event) {
            //this.$notify({
            //    title: 'Success',
            //    message: 'This is a success message',
            //    type: 'success'
            //});
            //this.$message('This is a message.');
            if (this.username != '' && this.password != '') {
                event.preventDefault();
                let currentObj = this;
                this.axios.post(this.metodoiniciarsesion, {
                    username: currentObj.username,
                    password: currentObj.password
                })
                    .then(function (response) {
                        currentObj.output = response.data;
                        console.log(response);
                        location.href = '/Home/Inicio';
                    })
                    .catch(function (error) {
                        console.log(error);
                        currentObj.$message('No se pudo Iniciar Sesión');
                        currentObj.output = error;
                    });
            }
        },
        enviarcorreo(event) {
            if (this.correo != '') {
                event.preventDefault();
                let currentObj = this;
                this.loading = true;
                this.habilitarboton = true;
                this.axios.post(this.metodoenviarcorreoolvideusuario, {
                    correo: currentObj.correo
                })
                    .then(function (response) {
                        currentObj.loading = false;
                        currentObj.habilitarboton = false;
                        console.log(response);
                        currentObj.output = JSON.parse(response.data);
                        console.log(currentObj.output);
                        if (currentObj.output == null || currentObj.output == undefined) {
                            currentObj.$message('Se tuvieron problemas al enviar el correo, por favor vuelva a intentar.');
                        } else {
                            var mail = currentObj.output["Notificacion"].Correo;
                            if (mail != currentObj.correo) {
                                currentObj.$message('No se pudo enviar el correo, por favor intente nuevamente.');
                            }
                            else {
                                currentObj.$message('Correo enviado');
                            }
                        }
                    })
                    .catch(function (error) {
                        currentObj.loading = false;
                        currentObj.habilitarboton = false;
                        console.log(error);
                        currentObj.$message('Se tuvieron problemas al enviar el correo, por favor vuelva a intentar.');
                        currentObj.output = error;
                    });
            }
        }
    },
    mounted: function () {

    }
    
});