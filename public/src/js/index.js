import Vue from "vue";
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;


const vm = new Vue({
    el: "#app-layout",
    data() {
        return {
            razonsocial: '',
            metodocargaropciones: '../api/Login/CargarOpciones',
            menuizquierdo: [],
            menuprincipal: [],
            active: undefined,
            classactive: 'active',
            fotourl: '',
            nombreusuario: ''
        };
    },
    created() {
        let currentObj = this;
        this.axios.post(this.metodocargaropciones)
            .then(function (response) {
                currentObj.output = JSON.parse(response.data);
                currentObj.menuizquierdo = currentObj.output["PaginasMenu"];
                currentObj.menuprincipal = currentObj.output["PaginasPrincipal"];
                currentObj.razonsocial = currentObj.output["RazonSocial"];
                currentObj.fotourl = currentObj.output["FotoPersona"];
                currentObj.nombreusuario = currentObj.output["PersonaUsuario"];
            })
            .catch(function (error) {
                console.log(error);
                currentObj.output = error;
            });
    },
    mounted() {
    },
    methods: {
        menu(opcion) {
            if (this.active == opcion.Pagina) {
                this.active = '';
            } else {
                this.active = opcion.Pagina;
                this.redireccionar(opcion);
            }
        },
        redireccionar(opcion) {
            if (opcion.Hijos.length == 0) {
                window.location.href = opcion.Ruta;
            }
        }
    }
});