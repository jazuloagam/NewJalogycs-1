import Vue from "vue";
import axios from 'axios';
import VueAxios from 'vue-axios';
import ElementUI from 'element-ui';
import autocomplete from '../../components/autocomplete.vue'
import seleccion from '../../components/seleccion.vue'

Vue.use(VueAxios, axios);
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
    el: "#app-generarusuario",
    components: { autocomplete, seleccion },
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
                tipousuario: [],
                usuarioseleccionado: '',
                cargo: '',
                nombres: '',
                apellidos: '',
                pais: '',
                correo: '',
                usuario:''
            },
            rules: {
                usuarioseleccionado: [{ required: true, message: 'Por Favor seleccione un tipo de documento', trigger: ['blur', 'change'] }],
                cargo: [{ required: true, message: 'Por favor seleccione un cargo', trigger: ['blur', 'change'] },
                { min: 0, max: 400, message: 'El cargo debe ser menor a 400 caracteres', trigger: ['blur', 'change'] }],
                nombres: [{ required: true, message: 'Por favor seleccione un nombre', trigger: ['blur', 'change'] },
                { min: 0, max: 200, message: 'El nombre debe ser menor a 200 caracteres', trigger: ['blur', 'change'] }],
                usuario: [{ required: true, message: 'Por favor seleccione un usuario', trigger: ['blur', 'change'] },
                { min: 0, max: 200, message: 'El usuario debe ser menor a 200 caracteres', trigger: ['blur', 'change'] }],
                apellidos: [{ required: true, message: 'Por favor seleccione un apellido', trigger: ['blur', 'change'] },
                { min: 0, max: 200, message: 'El apellido debe ser menor a 200 caracteres', trigger: ['blur', 'change'] }],
                pais: [{ required: true, message: 'Por favor seleccione un país', trigger: ['blur', 'change', 'select'] }],
                correo: [{ required: true, message: 'Por favor seleccione un correo electronico', trigger: ['blur', 'change'] },
                { type: 'email', message: 'El correo electronico no es valido', trigger: ['blur', 'change'] }]
            },
            arbolcompleto: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            metodoseleccionaropciones: '../api/Login/SeleccionarModuloPorTipoUsuario',
            metodoobteneropciones: '../api/Login/ObtenerOpcionesTipoUsuario',
            metodocrearusuario: '../api/Login/CrearUsuario',
            IdLicencia: '',
            opcionesseleccionadas: [],
            paises: [],
            loading:false
        };
    },
    methods: {
        obteneropcionestipousuario() {
            let currentObj = this;
            this.axios.post(this.metodoobteneropciones, {}).then(function (response) {
                currentObj.output = JSON.parse(response.data);
                currentObj.arbolcompleto = currentObj.output["Arbol"];
                currentObj.opcionesseleccionadas = currentObj.output["Seleccion"];
                var TipoUsuario = currentObj.ruleForm.tipousuario.find(tipo => tipo.Id == currentObj.output["IdAdmin"]);
                currentObj.ruleForm.usuarioseleccionado = TipoUsuario.Id;
            }).catch(function (error) {
                currentObj.$message('Error obtener opciones tipo de usuario');
                currentObj.output = error;
            });
        },
        cambiotipousuario(e) {
            console.log(e);
            var TipoUsuario = this.ruleForm.tipousuario.find(tipo => tipo.Id == e);
            let currentObj = this;
            currentObj.ruleForm.usuarioseleccionado = e;
            this.axios.post(this.metodoseleccionaropciones, { IdTipoUsuario:TipoUsuario.Id}).then(function (response) {
                currentObj.output = JSON.parse(response.data);
                currentObj.opcionesseleccionadas = currentObj.output["Seleccion"];
                currentObj.$refs.tree.setCheckedKeys(currentObj.opcionesseleccionadas);
            }).catch(function (error) {
                currentObj.$message('Error cambio tipo usuario');
                currentObj.output = error;
            });            
        },
        obtenerarbol() {
            return this.arbolcompleto;
        },
        handleSelect(item) {
            this.ruleForm.pais = item.value;
        },
        crearusuario(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading = true;
                    var encontrar = this.paises.find(pais => pais.value == this.ruleForm.pais);
                    console.log(encontrar);
                    if (encontrar == undefined) {
                        this.$message('Ingrese un país correcto');
                    } else {
                        let currentObj = this;
                        this.axios.post(this.metodocrearusuario,
                            {
                                TipoUsuario: currentObj.ruleForm.usuarioseleccionado,
                                Cargo: currentObj.ruleForm.cargo,
                                Nombres: currentObj.ruleForm.nombres,
                                Apellidos: currentObj.ruleForm.apellidos,
                                NombreUsuario: currentObj.ruleForm.usuario,
                                Pais: encontrar.IdPais,
                                Correo: currentObj.ruleForm.correo,
                                Opciones: currentObj.$refs.tree.getCheckedKeys()
                            }
                        ).then(function (response) {
                            currentObj.loading = false;
                            currentObj.output = JSON.parse(response.data);
                            currentObj.$message(currentObj.output["Mensaje"]);                            
                            })
                            .catch(function (error) {
                                currentObj.$message('Error crear usuario');
                                currentObj.output = error;
                            }
                            );
                    }
                } else {
                    return false;
                }
            });
        },
        cargarpaises(lista) {
            this.paises = lista;
        },
        cargartipousuario(lista) {
            this.ruleForm.tipousuario = lista;
        }
    },
    mounted() {
        this.obteneropcionestipousuario();
    }
})