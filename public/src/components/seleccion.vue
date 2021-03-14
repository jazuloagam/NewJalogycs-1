<template>
    <div>
        <el-select v-on:change="cambioseleccion"
                   value-key="seleccion"
                   style="width:100%"
                   v-model="seleccion"
                   v-bind:disabled="deshabilitar"
                   filterable
                   :clearable="borrado"
                   v-on:clear="limpiar"
                   :default-first-option="true"
                   :placeholder="placeholder"
                   >
           
            <el-option v-for="opcion in lista"
                       :key="opcion.Id"
                       :label="opcion.Nombre"
                       :value="opcion.Id">
            </el-option>
        </el-select>
    </div>
</template>

<script>
    import Vue from 'vue';
    import axios from 'axios';
    import VueAxios from 'vue-axios';
    import ElementUI from 'element-ui';

    Vue.use(VueAxios, axios);
    Vue.use(ElementUI);
    Vue.config.productionTip = false;

    export default {
        name: 'seleccion',
        props: {
            tipo: {
                type: String,
                default: ''
            },
            metodocargar: {
                type: String,
                default:''
            },
            opcionseleccionada: {
                type: Number,
                default:0
            },
            placeholder: {
                type: String,
                default:''
            },
            opcionalcolumaid: {
                type: Number,
                default:0
            },
            opcionalcolumaprop: {
                type: String,
                default: ''
            },
            datoseleccion: {
                type: Array,
                default: () => []
            },
            deshabilitar: {
                type: Boolean,
                default:false
            },
            arreglotablas: {
                type: Array,
                default: () => []
            },
            borrado: {
                type: Boolean,
                default: false
            },
            infocargarvalor: {
                type: Array,
                default: () => []
            },
            tipocargardato: {
                type: Number,
                default: 1
            },

        },
        data() {
            return {
                lista: [],
                seleccion: this.opcionseleccionada,                
                opcionalidcol: this.opcionalcolumaid,
                opcionalpropcol: this.opcionalcolumaprop,
                opcionarreglotablas: this.arreglotablas,
                metodounico: '../api/Login/CrearSeleccionablePrecargado',
            }
        },
        methods: {
            cambioseleccion() {
                if (typeof this.opcionseleccionada == 'string') {
                    this.seleccion = null;                    
                    this.$emit('change', this.seleccion, this.opcionalcolumaid, this.opcionarreglotablas, this.opcionseleccionada, this.datoseleccion, this.opcionalcolumaprop, this.infocargarvalor, this.tipo);                    
                } else {                    
                    this.$emit('change', this.seleccion, this.opcionalcolumaid, this.opcionarreglotablas, this.opcionseleccionada, this.datoseleccion, this.opcionalcolumaprop, this.infocargarvalor, this.tipo);
                }                
            },
            cargardatos() {
                let currentObj = this;
                if (this.tipocargardato == 1) {
                    this.axios.post(this.metodocargar, {
                        OpcionParametro: this.tipo
                    })
                        .then(function (response) {
                            currentObj.output = JSON.parse(response.data);
                            currentObj.lista = currentObj.output["ObjetoSeleccionable"];
                            currentObj.$emit('cargarseleccion', currentObj.lista, currentObj.opcionalpropcol, currentObj.opcionalidcol);
                        })
                        .catch(function (error) {
                            currentObj.$message('No se pudo Iniciar Sesión');
                            currentObj.output = error;
                        });

                } else if (this.tipocargardato == 2) {
                    console.log("metodounico", this.infocargarvalor);
                    this.axios.post(this.metodounico, {
                        datos: this.infocargarvalor
                    })
                        .then(function (response) {
                            currentObj.output = JSON.parse(response.data);
                            currentObj.lista = currentObj.output["ObjetoSeleccionable"];
                            currentObj.$emit('cargarseleccion', currentObj.lista, currentObj.opcionalpropcol, currentObj.opcionalidcol);
                        })
                        .catch(function (error) {
                            currentObj.$message('No se pudo Iniciar Sesión');
                            currentObj.output = error;
                        });  

                }                
            },
            limpiar() {
                
                

                this.seleccion = null;
                this.$emit('changelimpiar', this.seleccion, this.opcionalcolumaid, this.opcionarreglotablas, this.opcionseleccionada, this.opcionalcolumaprop);
                

            },

        },
        watch: {
            opcionseleccionada(valor) { 
                if (typeof valor == 'string') {
                    valor = null;
                    this.seleccion = null;
                    

                } else {
                    this.seleccion = valor;   

                }
                                 
                
            },

            datoseleccion(valor) {  
                this.lista = valor;
                
            },
            infocargarvalor(valor) {
                let currentObj = this;
                this.axios.post(this.metodounico, {
                    datos: valor
                })
                    .then(function (response) {
                        currentObj.output = JSON.parse(response.data);
                        currentObj.lista = currentObj.output["ObjetoSeleccionable"];
                        currentObj.$emit('cargarseleccion', currentObj.lista, currentObj.opcionalpropcol, currentObj.opcionalidcol);
                    })
                    .catch(function (error) {
                        currentObj.$message('No se pudo Iniciar Sesión');
                        currentObj.output = error;
                    });  
            }
        },
        updated() {
    
            
            if (this.datoseleccion.length != 0) {
               
                this.lista = this.datoseleccion;
            }
            if (typeof this.opcionseleccionada == 'string') {
                typeof this.opcionseleccionada == 'number';
                
                this.seleccion = null;
            }
        },
        created() {
            this.cargardatos();
        }
    }
</script>