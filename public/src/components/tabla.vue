<template>
    <div>        
        <el-table :data="datos" >
            <el-table-column v-for="(columna,index) in columnas" :key="columna.id" :prop="columna.prop" :label="columna.label" :width="columna.width">
                <template slot-scope="scope">
                    <div v-if="columna.tipo=='popover'">
                        <div v-if="validarinformacion(Object.values(scope.row)[columna.id])">
                            <label>{{columna.sindatos}}</label>
                        </div>
                        <div v-else>
                            <el-popover placement="right"
                                        width="600"
                                        trigger="click">
                                <el-table :data="datospopoveer(Object.values(scope.row)[columna.id])" style="width: 100%">
                                    <el-table-column v-for="(columnaanidada,indexanidada) in columna.columnastabla" :key="columnaanidada.id" :prop="columnaanidada.prop" :label="columnaanidada.label">

                                    </el-table-column>
                                </el-table>
                                <el-button slot="reference" type="primary" icon="el-icon-search" size="mini" circle></el-button>
                            </el-popover>
                        </div>
                    </div>
                    <div v-else-if="columna.tipo=='tooltip'">
                        <label>{{imprimirtitulo(scope.$index,columna.prop,columna.columnatitulo)}}</label>
                        <el-tooltip class="item" effect="dark">
                            <div slot="content">{{imprimirdatos(Object(scope.row)[columna.prop],columna.columnatitulo)}}</div>
                            <i class="el-icon-info"></i>
                        </el-tooltip>
                    </div>
                    <div v-else-if="columna.tipo=='adjunto'">
                        <label>{{imprimiradjunto(Object.values(scope.row)[columna.id])}}</label>
                    </div>
                    <div v-else-if="columna.tipo=='seleccion'">
                        <label>{{imprimirseleccion(Object.values(scope.row)[columna.id],columna.id,columna.cargarlista,columna.prop)}}</label>
                    </div>
                    <div v-else-if=columna.cargardato>
                        <label>{{imprimirnormal(Object(scope.row)[columna.prop],columna.cargardato,columna.cargarlista, columna.vacio)}}</label>
                    </div>
                    <div v-else>
                        <label>{{Object(scope.row)[columna.prop]}}</label>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>






<script>
    import Vue from 'vue';
    import axios from 'axios';
    import VueAxios from 'vue-axios';
    import ElementUI from 'element-ui';
    import locale from 'element-ui/lib/locale';
    import lang from 'element-ui/lib/locale/lang/es';



    Vue.use(VueAxios, axios);
    locale.use(lang)
    Vue.use(ElementUI);
    Vue.config.productionTip = false;




    export default {

        name: 'tabla',
        props: {
            columnas: {
                type: Array,
                default: () => []
            },
            datos: {
                type: Array,
                default: () => []
            },
            valorautocomplete: {
                type: String,
                default: ''
            },
            busqueda: {
                type: Boolean,
                default: false
            },
            search: {
                type: String,
                default: () => ''
            },
        },
        
        data() {
            return {
                datostablaanidada: [],
                activeNames: ['1'],
            }
        }, 
        methods: {
            imprimiradjunto(valor) {
                this.found = "";
                let currentObj = this;
                Object.values(valor).forEach(function (element) {
                    Object.values(element).forEach(function (elemento) {
                        if (elemento.name != undefined) {
                            currentObj.found = elemento.name;
                        }
                    });
                });
                return this.found
            },
            imprimirseleccion(valor, id, lista, propiedad) {
                if (valor != null || valor != undefined) {
                    const found = lista.find(element => element.Id == valor);
                    return found.Nombre;
                } else {
                    return "";
                }
            },
            validarinformacion(valor, prop) {
                
                if (valor[0] != undefined) {
                    return false
                } else {

                    return true
                }
                
            },
            datospopoveer(valor) {
                
                return valor;

            },
           
            emitsearch() {


            },
            imprimirnormal(valor, cargardato, lista, vacio) {

                console.log("imprimirnormal tabla:", valor, cargardato, lista )
                //if (cargardato == true) {
                //    this.datostablaanidada = [];
                //    let currentObj = this;

                //    Object.values(valor).forEach(function callback(elemento, index, array) {
                //        const found = lista.find(element => element.Id == elemento);
                //        currentObj.datostablaanidada.push({ Nombre: found.Nombre, Id: found.Id });

                //    });
                //    return this.datostablaanidada;

                //} else {
                //    return valor;


                //}
                //return "";
                if (cargardato == true) {

                    const found = lista.find(element => element.Id == valor);
                    if (found == undefined) {
                        if (vacio == true) {
                            return "";
                        } else {
                            return "Sin Seleccion";
                        }                        
                    } else {
                        return found.Nombre;
                    }

                } else {
                    return valor;
                }
                return "";
            },

            handleChange(fileList, idcolumna) {
                

            },
            imprimirdatos(arreglo,prop) {
                var textoaretornar = "";
                const elementos = JSON.parse(JSON.stringify(arreglo[0]));
                
                
                delete elementos[prop];
                
                Object.values(elementos).forEach(function callback(elemento) {
                    textoaretornar = textoaretornar + elemento + '\n';
                });                 
                     
                    
                       
                 
                if (textoaretornar.length != 0) {
                    return textoaretornar;
                } else {
                    return "Sin Datos";
                }

            },
            imprimirtitulo(valor, columna, proptitulocollapse) {
                if (this.datos[valor][columna][0] != undefined) {                   
                    return this.datos[valor][columna][0][proptitulocollapse];                    
                } else {
                    return "";
                }
            },
        },
        watch: {


        },
        created() {




        }
     }
</script>