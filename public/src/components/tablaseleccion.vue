<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="12" :offset="12">
                <el-input v-if="busqueda==true"
                          v-model="search"
                          :change="emitsearch(search)"
                          size="mini"
                          placeholder="Type to search">
                </el-input>
            </el-col>
        </el-row>
        <br>
        <el-table :data="datos" :ref="referencia" highlight-current-row v-on:current-change="handleCurrentChange" v-on:selection-change="handleSelectionChange">


            <el-table-column type="selection"
                             width="55"
                             v-if="referencia=='multipleTable'">
            </el-table-column>
            <el-table-column v-for="(columna,index) in columnas" :key="columna.id" :prop="columna.prop" :label="columna.label" :boton="columna.boton" :width="columna.width">
                <template slot-scope="scope">
                    <div v-if="columna.boton==true">
                        <div v-if="columna.popover=='basic'">
                            <div v-if="Object(scope.row)[columna.prop].length==0">
                                <label>{{pintarpopoverbasico(Object(scope.row)[columna.prop],columna.lista)}}</label>
                            </div>
                            <div v-else-if="Object(scope.row)[columna.prop].length==1">
                                <label>{{imprimirunicoobjeto(Object(scope.row)[columna.prop])}}</label>

                            </div>
                            <div v-else>
                                <el-popover placement="bottom"
                                            width="200"
                                            trigger="click"
                                            :content="pintarpopoverbasico(Object(scope.row)[columna.prop],columna.lista)">
                                    <el-button slot="reference" type="primary" icon="el-icon-search" size="mini" circle></el-button>
                                </el-popover>
                            </div>

                        </div>
                        <div v-else-if="columna.popover=='anidada'">

                            <el-popover placement="right"
                                        width="900"
                                        trigger="click"
                                        fit="true"
                                        size="small"
                                        v-on:after-enter="eventoprueba(scope.$index,columna.propiedaddatospopover)">
                                <el-table :data="datostablaanidada" style="width: 100%">
                                    <el-table-column v-for="(columnaanidada,indexanidada) in Object(scope.row)[columna.prop]" :key="columnaanidada.id" :prop="columnaanidada.prop" :label="columnaanidada.label">
                                        <template slot-scope="scopepopover">
                                            <label>{{imprimirdatostablapopover(Object(scopepopover.row)[columnaanidada.prop],columnaanidada.cargardato,columnaanidada.cargarlista,columnaanidada.prop)}}</label>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <el-button slot="reference" type="primary" icon="el-icon-search" size="mini" circle></el-button>
                            </el-popover>
                        </div>
                        <div v-else-if="columna.popover=='normal'">

                            <div v-if="columna.popover==false || Object(scope.row)[columna.prop].length==1">
                                <label>{{imprimirdatostabla(Object(scope.row)[columna.prop],columna.cargardato,columna.cargarlista,columna.normal)}}</label>
                            </div>
                            <div v-else>
                                <el-popover placement="right"
                                            width="600"
                                            trigger="click"
                                            fit="true"
                                            size="small"
                                            v-on:after-enter="imprimirnormal(Object(scope.row)[columna.prop],columna.cargardato,columna.cargarlista,Object(scope.row))">
                                    <el-table :data="datostablaanidada" style="width: 100%">
                                        <el-table-column prop="Nombre" label="Nombre">

                                        </el-table-column>
                                    </el-table>
                                    <el-button slot="reference" type="primary" icon="el-icon-search" size="mini" circle></el-button>
                                </el-popover>

                            </div>
                        </div>
                        <div v-else-if="columna.popover=='columnas'">
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
                        <div v-else-if="columna.popover=='boton'">
                            <div v-if="validarinformacion(Object.values(scope.row)[columna.id])">
                                <label>Sin WareHouse</label>
                            </div>
                            <div v-else>
                                <button type="button" class="btn btn-success btn-xs" v-on:click="accionboton(Object(scope.row)[columna.prop],columna.prop)"><i class="ace-icon fa fa-search align-top bigger-125"></i></button>
                            </div>

                        </div>
                    </div>
                    <div v-else>
                        <label>{{imprimirdatostabla(Object(scope.row)[columna.prop],columna.cargardato,columna.cargarlista,columna.popover, columna.normal)}}</label>
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

    Vue.use(VueAxios, axios);
    Vue.use(ElementUI);
    Vue.config.productionTip = false;

    export default {
        name: 'tablaseleccion',
        props: {
            columnas: {
                type: Array,
                default:()=>[]
            },
            datos: {
                type: Array,
                default:()=>[]
            },
               
            referencia: {
                 //multipleTable y singleTable
                type: String,
                default:()=>''
            },
            datofila: {
                type: Array,
                default: () => []
            },
            busqueda: {
                type: Boolean,
                default: false
            },
            search: {
                type: String,
                default:()=>''
            },
        },
        data() {
            return {
                currentRow: null,
                multipleSelection: [],
                datostablaanidada: [],
                singleTable: "",
                datosimpresion: [],

                

            }
        },
        methods: {
            datospopoveer(valor) {

                return valor;

            },
            emitsearch(val) {
                this.$emit('changesearch', val);
            },
            handleCurrentChange(val) {
                this.currentRow = val;
                this.$emit('changecurrent', val);

            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                this.$emit('changeselection', val);          

            },
            imprimirunicoobjeto(val) {
                var texto = "";
                val.forEach(function callback(element) {
                    Object.values(element).forEach(function callback(elemento) {
                        texto = elemento;
                    });                    
                });
                return texto;

            },            
            pintarpopoverbasico(arreglo, lista) {
                console.log("arreglo",arreglo);
                var textoaretornar = "";
                if (lista) {                    
                    arreglo.forEach(function callback(element) {
                        // tu iterador
                        textoaretornar = textoaretornar + element.Nombre + '\n';
                    });
                    if (textoaretornar.length != 0) {
                        return textoaretornar;
                    } else {
                        return "Sin Datos";
                    }
                } else {
                    arreglo.forEach(function callback(element) {
                        Object.values(element).forEach(function callback(elemento) {
                            textoaretornar = textoaretornar + elemento + '\n';
                        });                
                        
                    });
                    if (textoaretornar.length != 0) {
                        return textoaretornar;
                    } else {
                        return "Sin Datos";
                    }
                }
                
                
            },
            //tablaanidada(arreglo) {
                
                
            //    this.datostablaanidada = [];

            //    this.datostablaanidada.push(this.datos[arreglo]);
            
            //},
            eventoprueba(indice,propiedadpopover) {
                this.datostablaanidada = [];

                
               
                this.datostablaanidada = this.datos[indice][propiedadpopover];
                
                
            },
            imprimirdatostabla(valor, cargardato, lista, popover, normal) {
                

                if (cargardato == true) {
                    if (popover == 'normal') {
                        this.datostablaanidadanormal = [];
                        let currentObj = this;

                        valor.forEach(function callback(elemento, index, array) {
                            const found2 = lista.find(element => element.Id == elemento);
                            currentObj.datostablaanidadanormal.push(found2.Nombre);
                        });
                        return this.datostablaanidadanormal.join('; ');
                    } else {
                       

                            const found = lista.find(element => element.Id == valor);

                            if (found == undefined) {
                                return "Sin Dato";
                            } else {

                                return found.Nombre;

                            }

                        


                    }




                } else {


                        var fecha = new Date(valor);
                        if (fecha == 'Invalid Date') {
                            return valor;
                        } else if (normal == true) {

                            return valor;
                        } else {
                            return fecha.toLocaleDateString();
                        }
                    

                }

                
                
            },
            imprimirnormal(valor, cargardato, lista,informacion) {
                if (cargardato == true) {
                    this.datostablaanidada = [];
                    let currentObj = this;

                    valor.forEach(function callback(elemento, index, array) {
                        const found = lista.find(element => element.Id == elemento);
                        currentObj.datostablaanidada.push({ Nombre: found.Nombre, Id: found.Id });
                        
                    });
                    return this.datostablaanidada;

                } else {
                    return valor;


                }
                return "";
            },
            imprimirdatostablapopover(valor, cargardato, lista, columnaanidada) {
                if (cargardato == true) {

                    const found = lista.find(element => element.Id == valor);
                    if (found == undefined) {
                        return "Sin Seleccion";
                    } else {

                        return found.Nombre;

                    }

                } else {
                    return valor;


                }
                return "";
            },
            accionboton(valor, prop) {
               
               
                this.$emit('accionclick', valor, prop);
            },
            validarinformacion(valor) {
                console.log("tabla seleccion validar informacion", valor);
                
                var arreglo = valor[0];
                if (arreglo != undefined ) {
                    
                    return false;
                } else {
                    
                    return true;
                }
            },
            
        },
        watch: {

        },
        created() {

        }
    }
</script>