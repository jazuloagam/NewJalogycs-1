<template>
    <div>    
        <el-select v-on:change="cambioseleccionmultiple"
                   value-key="seleccionmultiple"
                   multiple
                   v-bind:collapse-tags="colageseleccion"
                   v-bind:disabled="deshabilitar"
                   style="width:100%"
                   v-model="seleccion"
                   filterable
                   :placeholder="placeholder">
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
                default: ''
            },
            opcionseleccionadamultiple: {
                type: Array,
                default: () => []
            },
            placeholder: {
                type: String,
                default: ''
            },
            opcionalcolumaid: {
                type: Number,
                default: 0
            },
            datoseleccion: {
                type: Array,
                default: () => []
            },
            deshabilitar: {
                type: Boolean,
                default: false
            },
            colageseleccion: {
                type: Boolean,
                default: true
            },
            arreglotablas: {
                type: Array,
                default: () => []
            },
            tipocargardato: {
                type: Number,
                default: 1
            },
            infocargarvalor: {
                type: Array,
                default: () => []
            },
        },
        data() {            
            return {
                lista: [],
                seleccion: this.opcionseleccionadamultiple,
                opcionalidcol: this.opcionalcolumaid,
                opcionarreglotablas: this.arreglotablas,
                metodounico: '../api/Login/CrearSeleccionablePrecargado',
            }
        },
        methods: {
            cambioseleccionmultiple() {
                this.$emit('change', this.seleccion, this.opcionalcolumaid, this.colageseleccion, this.opcionarreglotablas, this.infocargarvalor );
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
                    console.log("metodomultiple", this.infocargarvalor);
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
            //colageseleccion(bool) {
            //        this.colageseleccion = false;
            //    },
        },
        watch: {
            opcionseleccionadamultiple(valor) {
                this.seleccion = valor;
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
            //colageseleccion(bool) {
            //    this.colageseleccion = false;
            //},
        },
        created() {
            this.cargardatos();
        }
    }
</script>