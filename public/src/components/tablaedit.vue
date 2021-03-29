<template>
    <div>

        <el-table :data="datos" :size="size" max-height="450" :show-summary="summary" :summary-method="getSummaries" >
            <el-table-column v-for="(columna,index) in columnas" :key="columna.id" label-width="auto" size="mini" class="columna.prop" :width="columna.width" :fixed="columna.fixed" :prop="columna.prop" :label="columna.label" v-if="columna.filtro==true || columna.filtro==null" :type="columna.expand">
                <template slot="header" v-if="columna.tipocolumna.length != 0">
                    <label>{{columna.label}}</label>
                    <span v-for="(tipocolumna,indextipo) in columna.tipocolumna " :key="tipocolumna.id">
                        <template v-if="tipocolumna.tipoopccion=='tooltip'">
                            <el-tooltip class="item" effect="dark" :content="tipocolumna.descripcion" :placement="tipocolumna.posicion">
                                <i :class="tipocolumna.icono"></i>
                            </el-tooltip>
                        </template>
                        <template v-if="tipocolumna.tipoopccion=='boton'">
                            <button type="button" :class="tipocolumna.class" v-on:click="accionbotoncolumna(columna.prop,tipocolumna.icono,tipocolumna.id )"><i :class="tipocolumna.icono"></i></button>
                        </template>
                    </span>
                </template>
                <template slot-scope="scope">
                    <div v-if="!scope.row.editable">
                        <div v-if="columna.tipo=='input'">
                            <label>{{Object.values(scope.row)[columna.id]}}</label>
                        </div>
                        <div v-else-if="columna.tipo=='inputnumber'">
                            <label>{{imprimirnumero(Object.values(scope.row)[columna.id],columna.datotipo)}}</label>
                        </div>
                        <div v-else-if="columna.tipo=='seleccion'">
                            <label>{{imprimirseleccion(Object.values(scope.row)[columna.id],columna.id,columna.cargarlista,columna.prop)}}</label>
                        </div>
                        <div v-else-if="columna.tipo=='seleccionmultiple'">
                            <div v-if="columna.popover==false || (Object.values(scope.row)[columna.id] != null && Object.values(scope.row)[columna.id].length==1) ">
                                <label>{{imprimirseleccionmultiplenormal(Object.values(scope.row)[columna.id],columna.id,columna.cargarlista,columna.prop,columna.popover)}}</label>
                            </div>
                            <div v-else>
                                <el-popover placement="right"
                                            width="600"
                                            trigger="click"
                                            v-on:after-enter="imprimirseleccionmultiple(Object.values(scope.row)[columna.id],columna.id,columna.cargarlista,columna.prop,columna.popover)">
                                    <h1 class="section_title"><b>{{columna.unidad}}</b></h1>
                                    <el-table :data="datostablaanidada" style="width: 100%">
                                        <el-table-column prop="Nombre" label="Nombre">

                                        </el-table-column>
                                    </el-table>
                                    <el-button slot="reference" type="primary" icon="el-icon-search" size="mini" circle></el-button>
                                </el-popover>
                            </div>
                        </div>
                        <div v-else-if="columna.tipo=='autocomplete'">
                            <label>{{Object.values(scope.row)[columna.id]}}</label>
                        </div>
                        <div v-else-if="columna.tipo=='fechacalendario'">
                            <label>{{imprimirfecha(Object.values(scope.row)[columna.id])}}</label>
                        </div>
                        <div v-else-if="columna.tipo=='checkbox'">
                            <i v-bind:class="{ 'el-icon-check': Object.values(scope.row)[columna.id], 'el-icon-close':!Object.values(scope.row)[columna.id] }"></i>
                        </div>
                        <div v-else-if="columna.tipo=='adjunto'">
                            <label>{{imprimiradjunto(Object.values(scope.row)[columna.id])}}</label>
                        </div>
                        <div v-else-if="columna.tipo=='boton'">
                            <div v-if="columna.mostraren == 'index'">
                                <div v-if="validarinformacion(Object.values(scope.row)[columna.id],columna.dimenciones)">
                                    <label>{{columna.sindatos}}</label>
                                </div>
                                <div v-else>
                                    <el-button slot="reference" type="primary" icon="el-icon-search" size="mini" v-on:click="accionbotonvista(Object(scope.row)[columna.prop],columna.prop,scope)" circle></el-button>
                                </div>

                            </div>
                            <div v-else>
                                <div v-if="validarinformacion(Object.values(scope.row)[columna.id],columna.dimenciones)">
                                    <label>{{columna.sindatos}}</label>
                                </div>
                                <div v-else>
                                    <el-popover placement="right"
                                                width="600"
                                                :title="titulopopoveer(Object.values(scope.row)[columna.id],columna.unidad)"
                                                trigger="click">
                                        <el-table :data="Object.values(scope.row)[columna.id]" style="width: 100%">
                                            <el-table-column v-for="(columnaanidada,indexanidada) in columna.columnastabla" :key="columnaanidada.id" :prop="columnaanidada.prop" :label="columnaanidada.label">
                                                <template slot-scope="scopepopover">
                                                    <div v-if="columnaanidada.tipo=='seleccion'">
                                                        <label>{{imprimirseleccion(Object(scopepopover.row)[columnaanidada.prop],columnaanidada.id,columnaanidada.cargarlista,columnaanidada.prop)}}</label>
                                                    </div>
                                                    <div v-else>
                                                        <label>{{Object(scopepopover.row)[columnaanidada.prop]}}</label>
                                                    </div>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                        <el-button slot="reference" type="primary" icon="el-icon-search" size="mini" circle></el-button>
                                    </el-popover>
                                </div>
                            </div>
                        </div>
                        <div v-else-if="columna.tipo=='label'">
                            <div v-if="columna.collapse==true">
                                <el-collapse v-model="activeNames" @change="handleChange">
                                    <el-collapse-item :title="columna.label" :name="columna.name">
                                        <label>{{imprimirnormal(Object.values(scope.row)[columna.id])}}</label>
                                    </el-collapse-item>
                                </el-collapse>
                            </div>
                            <div v-else>
                                <label>{{imprimirnormal(Object.values(scope.row)[columna.id])}}</label>
                            </div>
                        </div>
                        <div v-else-if="columna.tipo=='labeltabla'">
                            <el-collapse v-model="activeNames" @change="handleChange">
                                <el-collapse-item :title="imprimirtitulo(scope.$index,columna.prop,columna.titulocollapse,columna.validartitulocollapse)" :name="columna.name">
                                    <el-table :data="Object.values(scope.row)[columna.id]" style="width: 100%">
                                        <el-table-column v-for="(columnaanidada,indexanidada) in columna.columnastabla" :key="columnaanidada.id" :prop="columnaanidada.prop" :label="columnaanidada.label">

                                        </el-table-column>
                                    </el-table>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                        <div v-else-if="columna.tipo=='labelimpresion'">
                            <div v-if="Object.values(scope.row)[columna.id].length <= 1">
                                <label>{{imprimirnormalsolotexto(Object.values(scope.row)[columna.id],columna.prop)}}</label>
                            </div>
                            <div v-else>
                                <el-popover placement="right"
                                            width="600"
                                            trigger="click"
                                            fit="true"
                                            size="small"
                                            v-on:after-enter="imprimirpopoveer(Object.values(scope.row)[columna.id])">
                                    <el-table :data="datostablaanidadapopoveer" style="width: 100%">
                                        <el-table-column prop="Nombre" label="Nombre">

                                        </el-table-column>
                                    </el-table>
                                    <el-button slot="reference" type="primary" icon="el-icon-search" size="mini" circle></el-button>
                                </el-popover>
                            </div>
                        </div>
                    </div>    
                    <div v-if="scope.row.editable">
                        <div v-if="columna.tipo=='input'">
                            <el-input v-model="datofilamodel[columna.id].dato" :type="columna.tipotex" autosize :input="afectacionenimput(datofilamodel[columna.id].dato,columna.arreglotablas,columna.id)" :disabled="columna.deshabilitar"></el-input>
                        </div>
                        <div v-else-if="columna.tipo=='inputnumber'">
                            <el-input-number v-model="datofilamodel[columna.id].dato" :change="afectacionenimput(datofilamodel[columna.id].dato,columna.arreglotablas,columna.id)" :min="columna.min" :max="columna.max" :disabled="columna.deshabilitar" :precision="columna.precision" :controls="columna.controls"></el-input-number>
                        </div>
                        <div v-else-if="columna.tipo=='checkbox'">
                            <el-checkbox v-model="datofilamodel[columna.id].dato"></el-checkbox>
                        </div>
                        <div v-else-if="columna.tipo=='seleccion'">
                            <seleccion :tipo="columna.tiposeleccion"
                                       :arreglotablas="columna.arreglotablas"
                                       :deshabilitar="columna.deshabilitar"
                                       :metodocargar="columna.metodo"
                                       :opcionseleccionada="datofilamodel[columna.id].dato"
                                       :opcionalcolumaid="columna.id"
                                       :borrado="columna.borrado"
                                       :opcionalcolumnaprop="columna.prop"
                                       :placeholder="columna.placeholder"
                                       :datoseleccion="columna.datoseleccion"
                                       :infocargarvalor="columna.infarray"
                                       :tipocargardato="columna.tipocargardato"
                                       v-on:cargarseleccion="cargarseleccion"
                                       v-on:change="cambioseleccion"                                       
                                       v-on:changelimpiar="cambioseleccionlimpiar">
                            </seleccion>
                        </div>
                        <div v-else-if="columna.tipo=='seleccionmultiple'">
                            <seleccionmultiple :tipo="columna.tiposeleccion"
                                               :metodocargar="columna.metodo"
                                               :arreglotablas="columna.arreglotablas"
                                               :opcionseleccionadamultiple="datofilamodel[columna.id].dato"
                                               :opcionalcolumaid="columna.id"
                                               colage=true
                                               multiple
                                               :placeholder="columna.placeholder"
                                               :datoseleccion="columna.datoseleccion"
                                               :infocargarvalor="columna.infarray"
                                               :tipocargardato="columna.tipocargardato"
                                               v-on:cargarseleccionmultiple="cargarseleccionmultiple(scope,columna.id)"
                                               v-on:change="cambioseleccionmultiple">
                            </seleccionmultiple>
                        </div>
                        <div v-else-if="columna.tipo=='autocomplete'">
                            <autocomplete :tipo="columna.tipoautocomplete"
                                          v-on:select="selectautocomplete"
                                          v-on:cargarlista="cargarlista"
                                          :metodocargar="columna.metodo"
                                          :objeto="datofilamodel[columna.id].dato"
                                          :opcionalcolumprop="columna.prop"
                                          :opcionalcolumaid="columna.id">
                            </autocomplete>
                        </div>
                        <div v-else-if="columna.tipo=='fechacalendario'">
                            <fechacalendario :placeholder="columna.placeholder"
                                             :tipo="datofilamodel[columna.id].dato"
                                             :columnaid="columna.id"
                                             :metodocargar="columna.metodo"
                                             v-on:change="changefechaseleccion">
                            </fechacalendario>
                        </div>
                        <div v-else-if="columna.tipo=='adjunto'">
                            <adjunto v-on:change="handleChange"
                                     v-on:changeeliminacion="eliminacionadjunto"
                                     :columnaid="columna.id"
                                     :tipo="datofilamodel[columna.id].dato"
                                     :archivoseleccionado="datofilamodel[columna.id].dato"
                                     :opcionalcolumaid="columna.id">
                            </adjunto>
                        </div>
                        <div v-else-if="columna.tipo=='boton'">
                            <button type="button" class="btn btn-info btn-xs" v-on:click="accionboton(Object(scope.row)[columna.prop],columna.prop,scope)"><i class="el-icon-plus"></i></button>                            
                        </div>
                        <div v-else-if="columna.tipo=='label'">
                         
                        </div>
                        <div v-else-if="columna.tipo=='labelimpresion'">
                            <div v-if="datofila[columna.id].dato.length <= 1">
                                <label>{{(datofila[columna.id].dato[0])}}</label>
                            </div>
                            <div v-else>
                                <el-popover placement="right"
                                            width="600"
                                            trigger="click"
                                            fit="true"
                                            size="small"
                                            v-on:after-enter="imprimirpopoveer(datofila[columna.id].dato)">
                                    <el-table :data="datostablaanidadapopoveer" style="width: 100%">
                                        <el-table-column prop="Nombre" label="Nombre">

                                        </el-table-column>
                                    </el-table>
                                    <el-button slot="reference" type="primary" icon="el-icon-search" size="mini" circle></el-button>
                                </el-popover>
                            </div>                            
                        </div>                        
                    </div>
                </template>
            </el-table-column>            
            <el-table-column width="100px" label="Operaciones" label-width="auto" size="mini" class="columna.prop">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="Adicionar" placement="top">
                        <el-button v-if="(scope.row.editable && scope.$index == 0) && editar==0" v-on:click="adicionardato(scope)" type="primary" icon="el-icon-plus" size="mini" circle></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="Editar" placement="top">
                        <el-button v-if="(!scope.row.editable && scope.$index != 0) && editar==0" v-on:click="editardato(scope)" type="success" icon="el-icon-edit" size="mini" circle></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="Eliminar" placement="top">
                        <el-button v-if="(datos.length>1 && !scope.row.editable && scope.$index != 0) && editar==0" v-on:click="eliminardato(scope.$index)" type="danger" icon="el-icon-delete" size="mini" circle></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="Editar" placement="top">
                        <el-button v-if="editar==scope.$index && scope.$index != 0" v-on:click="editaropcion(scope)" type="info" icon="el-icon-check" size="mini" circle></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="Deshacer" placement="top">
                        <el-button v-if="editar==scope.$index && scope.$index != 0" v-on:click="deshaceropcion(scope)" type="info" icon="el-icon-close" size="mini" circle></el-button>
                    </el-tooltip>
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
    import { validacion, validar } from '../validacion/validacion.js'
    import seleccion from '../components/seleccion.vue'
    import autocomplete from '../components/autocomplete.vue'
    import seleccionmultiple from '../components/seleccionmultiple.vue'
    import fechacalendario from '../components/fechacalendario.vue'
    import adjunto from '../components/adjunto.vue'

    Vue.use(VueAxios, axios);
    Vue.use(ElementUI);
    Vue.config.productionTip = false;

    export default {
        name: 'tablaedit',
        components: { autocomplete, seleccion, seleccionmultiple, fechacalendario, adjunto },
        props: {
            columnas: {
                type: Array,
                default:()=>[]
            },
            datos: {
                type: Array,
                default:()=>[]
            },
            datofila: {
                type: Array,
                default:()=>[]
            },
            size: {
                type: String,
                default:'mini'
            },
            idarraycoldatoseleccion: {
                type: Array,
                default: () => []
            },
            cancelaropcion: {
                type: Number,
                default: 0
            },
            adicionaropcion: {
                type: Number,
                default: 0
            },
            summary: {
                type: Boolean,
                default: false
            },
            columnasuma: {
                type: Array,
                default: () => []
            },

        },
        data() {
            return {
                editar: 0,
                datofilamodel: this.datofila,
                cambiodatoseleccion: 0,
                datostablaanidada: [],
                datostablaanidadapopoveer:[],
                propiedades: [],
                reglas:[],
                rules: [],
                search: '',
                scopeindex: [],
                valido: 'valido',
                titulo: [],
                activeNames: ['1'],
                prueba: [],
                datosboton: [],
                listacompleta: [],
                listacambioseleun: [],
                validacionmetodoadicionaropcion: false
            }
        },
        methods: {
            tipotext(text) {
                console.log("tipo text", text);
                //if (valid == true) {
                //    console.log("true");
                //    return true;
                //} else {
                //    console.log("false");
                //    return false;
                //}

            },
            validarinformaciondelindex(valor, prop) {
                console.log("validar informacion de dos arreglos",valor[0]);
            },
            validarinformacion(valor, prop) {
                console.log("validarinformacion", valor, prop);
                if (prop === true) {
                    console.log("si ingresa a verdadero");;
                    return !prop;
                } else if (valor[0] != undefined) {
                    var arreglo = valor[0];

                    if (arreglo != undefined) {

                        return !arreglo[prop];

                    }
                } else if (valor.length == 0) {
                    console.log("sin datos");
                    var variable = true;
                    return variable;
                } 
            },
            titulopopoveer(valor, prop) {
                var arreglo = valor[0];
                if (arreglo != undefined) {
                    
                    return arreglo[prop];

                }
            },
            getSummaries(param, prop) {
                
                const { columns, data } = param;
                const sums = [];
                const mayor = [];
                const conversion = [];
                let currentObj = this;
                var arreglodata = [];
                var ejemplocolumnas = JSON.parse(JSON.stringify(this.columnasuma));
                
                //var ejemplocolumnas = [{ columna: 'PesoBruto', UnidadMedida: 'kg', TocaValidarUnidadMedida: true, values:[], total:0 },
                //    { columna: 'PesoBruto', UnidadMedida: 'tn', TocaValidarUnidadMedida: true, values: [], total: 0 },
                //    { columna: 'PesoBruto', UnidadMedida: 'lbs', TocaValidarUnidadMedida: true, values: [], total: 0 },
                //    { columna: 'Volumen', UnidadMedida: 'cbm', TocaValidarUnidadMedida: true },
                //    { columna: 'numeropiezas', UnidadMedida: '', TocaValidarUnidadMedida: false }];
                
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = 'suma';
                        return;
                    }
                    //const indexejemplocolumnas = ejemplocolumnas.findIndex(ejemplo => ejemplo.columna === column.property);
                    
                    //if (indexejemplocolumnas != -1) {
                    //    sums[index] = '2121';
                    //    data.forEach(function callback(element, index, array) {
                    
                    //        let objeto = Object.assign({}, { valor: 0 });
                            
                    //        if (ejemplocolumnas[indexejemplocolumnas].TocaValidarUnidadMedida) {
                    //            if (element[ejemplocolumnas[indexejemplocolumnas].columna][0] != undefined) {
                    //                Reflect.set(objeto, 'valor', element[ejemplocolumnas[indexejemplocolumnas].columna][0][ejemplocolumnas[indexejemplocolumnas].UnidadMedida]);
                                    
                    //               
                    //            }
                    //        } else {
                    //                
                    //        }
                            
                    //        //Object.values(element).forEach(function callback(elemento, index, array) {
                    //        //   

                    //        //    if (elemento instanceof Array) {

                    //        //        Object.values(elemento).forEach(function callback(elemen, index, array) {
                    //        //          
                    //        //            Object.values(elemen).forEach(function callback(eleme, index, array) {

                    //        //               
                    //        //            });

                    //        //        });
                    //        //    }
                    //        //});
                    //    });
                    //} else {
                    //    sums[index] = '';
                    //}
                    sums[index] = '';
                    var arreglorestante = ejemplocolumnas.filter(ejemplo => ejemplo.columna === column.property);
                    
                  
                    if (arreglorestante.length > 0) {
                        for (let arreglo of arreglorestante) {
                            if (arreglo.suma) {
                                Reflect.set(arreglo, 'values', data.map(function (x) {
                                    if (arreglo.TocaValidarUnidadMedida) {
                                        if (x[arreglo.columna][0] != undefined) {
                                            return parseFloat(x[arreglo.columna][0][arreglo.UnidadMedida]);
                                        } else {
                                            return 0;
                                        }
                                    } else {
                                        return x[arreglo.columna];
                                    }
                                }));

                                if (!arreglo.values.every(value => isNaN(value))) {

                                    Reflect.set(arreglo, 'total', arreglo.values.reduce((prev, curr) => {
                                        const value = Number(curr);
                                        if (!isNaN(value)) {
                                            return prev + curr;
                                        } else {
                                            return prev;
                                        }
                                    }, 0));
                                    
                                    if (arreglo.mayor==true) {
                                       
                                        mayor.push(arreglo.total);
                                        
                                    }
                                    if (arreglo.conversion == true) {
                                        conversion.push(arreglo.total);
                                    }
                                } else {
                                    sums[index] = 'N/A';
                                }

                                sums[index] = sums[index] + (arreglo.total.toFixed(2) + ' ' + arreglo.UnidadMedida + ' ');
                               
                            } else {
                               
                               
                                sums[index] = Math.max(...mayor) + ' ' + arreglo.UnidadMedidamayor + ' - ' + Math.max(...conversion) + ' ' + arreglo.UnidadMedidaconversion;

                            }
                          
                        }

                        //var indexejemplocolumnas = ejemplocolumnas.findIndex(ejemplo => ejemplo.columna === column.property);

                        //const values = data.map(function (x) {
                        //    if (indexejemplocolumnas != -1) {
                        //        if (ejemplocolumnas[indexejemplocolumnas].TocaValidarUnidadMedida) {
                        //            if (x[ejemplocolumnas[indexejemplocolumnas].columna][0] != undefined) {
                        //                return parseFloat(x[ejemplocolumnas[indexejemplocolumnas].columna][0][ejemplocolumnas[indexejemplocolumnas].UnidadMedida]);
                        //            } else {
                        //                return 0;
                        //            }
                        //        } else {
                        //            return x[ejemplocolumnas[indexejemplocolumnas].columna];
                        //        }
                        //    }
                        //    return 0;
                        //});

                        ////const values = data.map(item => Number(item[column.property]));
                        

                        //if (!values.every(value => isNaN(value))) {
                        //    sums[index] = values.reduce((prev, curr) => {
                        //        const value = Number(curr);
                        //        if (!isNaN(value)) {
                        //            return prev + curr;
                        //        } else {
                        //            return prev;
                        //        }
                        //    }, 0).toFixed(2);
                        //} else {
                        //    sums[index] = 'N/A';
                        //}





                    } else {
                        sums[index] = '';
                    }                    
                });

                return sums;
            },
            adicionardato(scope) {
                if (this.validardatosedicion()) {
                    let datorepetido = JSON.parse(JSON.stringify(this.datos[0]));
                    //let datorepetido = Object.assign({}, this.datos[0]);
                    this.datos.push(datorepetido);
                    for (let value of this.columnas) {
                        for (let dato of this.datofilamodel) {
                            if (dato.prop == value.prop) {
                                Reflect.set(this.datos[this.datos.length - 1], value.prop, dato.dato);
                                if (typeof dato.dato == 'string') {
                                    dato.dato = '';
                                } else if (typeof dato.dato == 'boolean') {
                                    dato.dato = false;
                                } else if (typeof dato.dato == 'number') {
                                    dato.dato = null;
                                } else if (typeof dato.dato == 'object') {
                                    if (dato.dato instanceof Array) {
                                        dato.dato = [];
                                        
                                    }
                                }
                            }
                        }
                    }
                    Reflect.set(this.datos[this.datos.length - 1], 'editable', false);
                    this.validacionmetodoadicionaropcion = true;
                    this.$emit('change', this.datos, this.datofila, scope);
                } else {
                    this.validacionmetodoadicionaropcion = false;
                } 
            },
            editardato(scope) {
                this.$emit('editardato', this.datos, scope.$index);
                this.scopeindex = scope;
                
                this.editar = scope.$index;    
                
                this.datos[0].editable = false;
                
                scope.row.editable = true; 
                
                for (let value of this.columnas) {   
                    
                    for (let dato of this.datofilamodel) {
                        
                        if (typeof dato.dato == 'number' || 'string') {
                            
                            if (value.arreglotablas != undefined) {
                                
                                this.cambioseleccion(Reflect.get(scope.row, value.prop), value.id, value.arreglotablas);
                                
                            }                           
                        }
                        
                        if (dato.prop == value.prop) {
                            
                            //value.datoseleccion = dato.datoseleccion;
                            
                            if (dato.dato instanceof Date) {
                                
                                Reflect.set(dato, 'dato', new Date(Reflect.get(scope.row, value.prop)));
                                
                            } else {
                                Reflect.set(dato, 'dato', Reflect.get(scope.row, value.prop));
                                
                                
                            }
                        }
                    }
                }
            },
            eliminardato(index) {
                this.datos.splice(index, 1);
                this.$emit('changeeliminacion', this.datos);
            },
            imprimirseleccion(valor, id, lista, propiedad) {
                console.log("imprimir seleccion", valor, lista);
                if (lista == undefined) {
                    console.log("imprimirseleccion listacambioseleun", this.listacambioseleun, "valor",valor);
                    return this.listacambioseleun[valor-1]
                } else if (valor != null || valor != undefined) {
                    const found = lista.find(element => element.Id == valor);
                    
                    return found.Nombre;                   
                    

                } else {
                    return "";
                }
                
            },
            editaropcion(scope) {
                let indice = scope.$index;

                if (this.validardatosedicion()) {
                    this.editar = 0;
                    this.datos[0].editable = true;
                    scope.row.editable = false;
                    for (let value of this.columnas) {
                        for (let dato of this.datofilamodel) {
                            if (dato.prop == value.prop) {
                                Reflect.set(this.datos[indice], value.prop, dato.dato);
                                if (dato.dato instanceof Date) {
                                  
                                }
                            }
                        }
                    }
                    for (let value of this.columnas) {
                        for (let dato of this.datofilamodel) {
                            if (typeof value.dato == 'boolean') {
                                Reflect.set(dato, 'dato', false);
                            } else if (dato.prop == value.prop) {
                                if (typeof dato.dato == 'string') {
                                    Reflect.set(dato, 'dato', '');
                                } else if (typeof dato.dato == 'boolean') {
                                    Reflect.set(dato, 'dato', false);
                                } else if (typeof dato.dato == 'number') {                                           
                                    Reflect.set(dato, 'dato', null);
                                    if (value.arreglotablas != undefined) {
                                        this.cambioseleccion(null, value.id, value.arreglotablas);
                                    }     
                                } else if (typeof dato.dato == 'object') {
                                    if (dato.dato instanceof Date) {
                                        Reflect.set(dato, 'dato', new Date());
                                        
                                    } else if (dato.dato instanceof Array) {
                                        Reflect.set(dato, 'dato', []);
                                        
                                    }
                                    
                                }
                            }
                            
                        }
                        
                    }
                    this.$emit('editaropcion', this.datos);
                    
                }

            },
            deshaceropcion(scope) {
                this.editar = 0;
                this.datos[0].editable = true;
                scope.row.editable = false;
                for (let value of this.columnas) {
                    for (let dato of this.datofilamodel) {
                        if (typeof value.dato == 'boolean') {
                            Reflect.set(dato, 'dato', false);
                        } else if (dato.prop == value.prop) {
                            if (typeof dato.dato == 'string') {
                                Reflect.set(dato, 'dato', '');
                            } else if (typeof dato.dato == 'boolean') {
                                Reflect.set(dato, 'dato', false);
                            } else if (typeof dato.dato == 'number') {
                                Reflect.set(dato, 'dato', null);
                            } else if (typeof dato.dato == 'object') {
                                if (dato.dato instanceof Date) {
                                    Reflect.set(dato, 'dato', new Date());

                                } else if (dato.dato instanceof Array) {
                                    Reflect.set(dato, 'dato', []);
                                }
                            }
                        }
                    }
                }
                this.$emit('deshaceropcion', this.datos);
            },
            validardatosedicion() {
                this.mensajesvalidacion = [];
                let currentObj = this;
                for (let value of this.datofilamodel) {
                    if (value.validardato== true) {
                        if (value.valdidaregex  == true) {
                            if (validar(value.regex, value.dato)) {

                            } else {
                                currentObj.mensajesvalidacion.push(value.mensaje);

                            }
                        } else {
                            if (value.dato == null) {
                                currentObj.mensajesvalidacion.push(value.mensaje);
                            } else if (value.dato.length == 0) {
                                currentObj.mensajesvalidacion.push(value.mensaje);
                            } 
                        }
                    } 

                }
                if (currentObj.mensajesvalidacion.length == 0) {
                    return true;
                } else {
                    this.mensajefaltandatos(this.mensajesvalidacion.join('<br>'));

                    return false;
                }
            },
            mensajefaltandatos(element) {
                this.$message.error({
                    title: 'Datos Obligatorios',
                    dangerouslyUseHTMLString: true,
                    message: '<strong>' + element + '</strong>'
                    
                });
            },
            cargarseleccion(lista, idprop, idcol) {
                Reflect.set(this.columnas, 'cargarlista', lista); 
                this.$emit('cargarseleccion', lista,idprop);
            }, cambioseleccionlimpiar(valor, idcolumna, opcionarreglotablas) {
                this.datofilamodel[idcolumna].dato = valor;
                this.cambioseleccion(valor, idcolumna, opcionarreglotablas);
            },
            cambioseleccion(valor, idcolumna, opcionarreglotablas, opcionseleccionada, datoseleccion, prop, infocargarvalor, tipo) {
                console.log("valor cambio seleccion", valor, opcionseleccionada, datoseleccion, prop, "infocargarvalor", infocargarvalor, tipo);
                this.$emit('cambioselecctablaedit', infocargarvalor[valor - 1]);
                this.datofilamodel[idcolumna].dato = valor;
                console.log("cambio seleccion no cambia", valor, this.datofilamodel[idcolumna].dato);

                var lista = [];
                let currentObj = this;
                opcionarreglotablas.forEach(function callback(element, index, array) {
                    // tu iterador
                    if (element.tipoopcion == 'deshabilitar') {
                        console.log("ingresa a el metodfo bien ")
                        currentObj.axios.post(element.nombremetodoconsulta, {
                            IdCaracteristicasmercancia: valor,
                            IdItem: valor,
                            IdItemMensajeria: valor,
                            IdTipoMatriz: element.tipomatriz
                        })
                            .then(function (response) {
                                currentObj.output = JSON.parse(response.data);
                                var posicionencolumna = currentObj.column + as.findIndex(elemento => elemento.prop == element.queafecta);
                                Reflect.set(currentObj.columnas[posicionencolumna], element.propiedadafectar, currentObj.output.Visibilidad);
                                console.log("visibilidad", currentObj.output.Visibilidad);

                                if (currentObj.output.Visibilidad == true) {
                                    var columnaafectar = currentObj.datofilamodel.findIndex(elemento => elemento.prop == element.queafecta);

                                    var dato = currentObj.datofilamodel[columnaafectar];
                                    if (typeof dato.dato == 'string') {
                                        Reflect.set(dato, 'dato', '');
                                    } else if (typeof dato.dato == 'number') {
                                        Reflect.set(dato, 'dato', null);
                                    }

                                    currentObj.datofilamodel[columnaafectar].validardato = !currentObj.output.Visibilidad;

                                } else if (currentObj.output.Visibilidad == false) {
                                    var columnaafectar = currentObj.datofilamodel.findIndex(elemento => elemento.prop == element.queafecta);

                                    currentObj.datofilamodel[columnaafectar].validardato = true;

                                }
                            })
                            .catch(function (error) {
                            });
                    } else if (element.tipoopcion == 'validacion') {
                        if (valor != null) {
                            var columnaafectar = currentObj.datofilamodel.findIndex(elemento => elemento.prop == element.queafecta);
                            currentObj.datofilamodel[columnaafectar].validardato = false;

                        } else {
                            var columnaafectar = currentObj.datofilamodel.findIndex(elemento => elemento.prop == element.queafecta);
                            currentObj.datofilamodel[columnaafectar].validardato = true;
                        }

                    } else if (element.tipoopcion == 'cambio') {
                        console.log("buscnaod columnas", currentObj.columnas);
                        currentObj.listacambioseleun = infocargarvalor;
                        console.log("lista cambioseleccion", currentObj.listacambioseleun);
                        element.informacioncompleta.forEach(function callback(elem) {
                            console.log("elem: ", elem.razonsocial, infocargarvalor[valor - 1]);
                            if (infocargarvalor[valor - 1] === elem.razonsocial) {
                                elem.contactos.forEach(function callback(elemen) {
                                    console.log("contactos tabla edit", elemen.contacto.nombre);
                                    lista.push(elemen.contacto.nombre);
                                    currentObj.listacompleta = lista;
                                    console.log("lista tabla edit", lista);
                                    var posicionencolumna = currentObj.columnas.findIndex(elemento => elemento.prop == element.queafecta);
                                    Reflect.set(currentObj.columnas[posicionencolumna], element.propafectar, lista);
                                    console.log("columnas", currentObj.columnas[posicionencolumna]);
                                    //const found2 = currentObj.columnatablacorreo.findIndex(element => element.prop == 'Contactos');
                                    //console.log("contactos", currentObj.listaclientes);
                                    //Reflect.set(currentObj.columnatablacorreo[found2], 'infarray', currentObj.listaclientes);
                                });
                            }

                        });

                    }

                });


            },                
            selectautocomplete(valor, idcolumna) {
                this.datofilamodel[idcolumna].dato = valor.value;
            },
            cargarlista(valor, prop) {
                this.$emit('cargarlistaautocomplete', valor, prop);
                console.log("cargar autocomplete", valor,"prop", prop);
            },
            cargarseleccionmultiple(valor, idcolumna, seleccion) {
                this.$emit('cargarseleccionmultiple', valor, idcolumna, seleccion);

            },
            afectacionenimput(valor, arreglotablas, idcolumna) {
                let currentObj = this;
                if (arreglotablas != undefined) {
                    arreglotablas.forEach(function callback(element, index, array) {
                        if (element.tipoopcion == 'validacion') {
                            if (valor != "") {
                                var columnaafectar = currentObj.datofilamodel.findIndex(elemento => elemento.prop == element.queafecta);
                                currentObj.datofilamodel[columnaafectar].validardato = false;


                            } else {
                                var columnaafectar = currentObj.datofilamodel.findIndex(elemento => elemento.prop == element.queafecta);
                                currentObj.datofilamodel[columnaafectar].validardato = true;

                            }
                        }
                    });


                }
                //this.datofilamodel[idcolumna].dato = valor;
                
                
            },
            cambioseleccionmultiple(valor, idcolumna, seleccion, opcionarreglotablas, infocargarvalor) {
                console.log("cambioseleccionmultiple", valor, idcolumna, seleccion, opcionarreglotablas, infocargarvalor);
                this.datofilamodel[idcolumna].dato = valor;
                var nombres = [];
                var lista = [];
                this.$emit('cambioseleccionmultiple', valor, idcolumna, seleccion);
                let currentObj = this;
                opcionarreglotablas.forEach(function callback(element, index, array) {
                    if (element.tipoopcion == 'validacion') {
                        if (valor.length == 0) {
                            var columnaafectar = currentObj.datofilamodel.findIndex(elemento => elemento.prop == element.queafecta);
                            currentObj.datofilamodel[columnaafectar].validardato = true;


                        } else {
                            var columnaafectar = currentObj.datofilamodel.findIndex(elemento => elemento.prop == element.queafecta);
                            currentObj.datofilamodel[columnaafectar].validardato = false;
                        }
                    } else if (element.tipoopcion == 'deshabilitar') {
                        currentObj.axios.post(element.nombremetodoconsulta, {
                            IdCaracteristicasmercancia: valor,
                            
                            IdTipoMatriz: element.tipomatriz
                        })
                            .then(function (response) {
                                currentObj.output = JSON.parse(response.data);
                                var posicionencolumna = currentObj.columnas.findIndex(elemento => elemento.prop == element.queafecta);
                                Reflect.set(currentObj.columnas[posicionencolumna], element.propiedadafectar, currentObj.output.Visibilidad);


                                if (currentObj.output.Visibilidad == true) {
                                    var columnaafectar = currentObj.datofilamodel.findIndex(elemento => elemento.prop == element.queafecta);

                                    var dato = currentObj.datofilamodel[columnaafectar];
                                    if (typeof dato.dato == 'string') {
                                        Reflect.set(dato, 'dato', '');
                                    } else if (typeof dato.dato == 'number') {
                                        Reflect.set(dato, 'dato', null);
                                    }
                                    currentObj.datofilamodel[columnaafectar].validardato = !currentObj.output.Visibilidad;
                                } else if (currentObj.output.Visibilidad == false) {
                                    var columnaafectar = currentObj.datofilamodel.findIndex(elemento => elemento.prop == element.queafecta);
                                    currentObj.datofilamodel[columnaafectar].validardato = true;
                                }
                            })
                            .catch(function (error) {
                            });
                    } else if (element.tipoopcion == 'cambio') {
                        console.log("buscnaod columnas", currentObj.columnas);
                        element.informacioncompleta.forEach(function callback(elem) {
                            console.log("elem: ", elem.razonsocial, infocargarvalor[valor - 1]);
                            if (infocargarvalor[valor - 1] == undefined && valor.length==0) {
                                var posicionencolumnaeliminada = currentObj.datofila.findIndex(elemento => elemento.prop == element.queafecta);
                                Reflect.set(currentObj.datofila[posicionencolumnaeliminada], 'dato', []);
                            }
                            valor.forEach(function callback(ele) {
                                console.log("valores", ele, infocargarvalor[ele - 1]);
                                if (!nombres.includes(infocargarvalor[ele - 1])) {
                                    
                                    nombres.push(infocargarvalor[ele - 1]);
                                }
                                nombres.forEach(function callback(e) {
                                    elem.contactos.forEach(function callback(elemen) {
                                        if (e === elemen.contacto.nombre) {
                                            console.log("contactos tabla edit", elemen.contacto.correo);
                                            if (!lista.includes(elemen.contacto.correo)) {

                                                lista.push(elemen.contacto.correo);
                                            }
                                            console.log("lista tabla edit multiple:", lista);
                                            var posicionencolumna = currentObj.datofila.findIndex(elemento => elemento.prop == element.queafecta);
                                            Reflect.set(currentObj.datofila[posicionencolumna], 'dato', lista);
                                            console.log("columnas", currentObj.datofila[posicionencolumna]);
                                            //const found2 = currentObj.columnatablacorreo.findIndex(element => element.prop == 'Contactos');
                                            //console.log("contactos", currentObj.listaclientes);
                                            //Reflect.set(currentObj.columnatablacorreo[found2], 'infarray', currentObj.listaclientes);
                                        }
                                    });

                                });

                            });
                           

                        });

                    }
                });
            },
            changefechaseleccion(valor, idcolumna) {
                this.datofilamodel[idcolumna].dato = valor;
                
            }, handleChange(fileList, idcolumna) {
                this.datofilamodel[idcolumna].dato = fileList;

            }, eliminacionadjunto(fileList, idcolumna) {
                this.datofilamodel[idcolumna].dato = [];
            },
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
            imprimirfecha(valor) {
                var fecha = new Date(valor);               
                return fecha.toLocaleDateString();

            },
            cargarreglas(propi) {
                this.rules = [];
                this.propiedades = [];
                //this.rules.reglas=
                //const found = this.columnas.find(element => element.reglas = elemento);
                let currentObj = this;
                this.columnas.forEach(function callback(elemento, index, array) {
                    currentObj.propiedades.push(elemento.prop)
                    currentObj.rules.push(elemento.reglas);
                });
            },
            imprimirseleccionmultiple(valor, id, lista, propiedad, impresion) {
                console.log("imprimirseleccionmultiple", valor, propiedad);
                this.datostablaanidada = [];
                let currentObj = this;
                if (lista == undefined) {
                    valor.forEach(function callback(element, index, array) {
                        currentObj.datostablaanidada.push({ Nombre: currentObj.listacompleta[element-1]});
                    });
                    return this.datostablaanidada;
                }
                if (valor != null) {

                    valor.forEach(function callback(elemento, index, array) {
                        const found = lista.find(element => element.Id == elemento);
                        currentObj.datostablaanidada.push({ Nombre: found.Nombre, Id: found.Id });
                    });
                    return this.datostablaanidada;                 
               
                    
                } else {
                   
                    return [];
                }
                
            },
            imprimirseleccionmultiplenormal(valor, id, lista, propiedad) {
                console.log("imprimirseleccionmultiplenormal", valor, lista);
                this.datostablaanidadanormal = [];
                let currentObj = this;
                if (lista == undefined) {
                    valor.forEach(function callback(element, index, array) {
                        currentObj.datostablaanidadanormal.push(currentObj.listacompleta[element-1]);
                    });
                    return this.datostablaanidadanormal.join('; ');
                }
                else if (valor != null) {
                   


                    valor.forEach(function callback(elemento, index, array) {
                        const found2 = lista.find(element => element.Id == elemento);
                        currentObj.datostablaanidadanormal.push(found2.Nombre);
                    });
                    return this.datostablaanidadanormal.join('; ');
              
                } else {
                    return "";
                }
                
            },
            imprimirtitulo(valor, columna, proptitulocollapse, validartitulocollapse) {

                
                //this.titulo = [];
                //let currentObj = this;
                //Object.values(this.datos[valor][columna]).forEach(function callback(elemento, index, array) {
                //    currentObj.titulo.push(Object.values(elemento));
                   
                //});
                if (this.datos[valor][columna][0] != undefined) {
                    if (validartitulocollapse == true) {
                        return this.datos[valor][columna][0][proptitulocollapse] + ' ' + proptitulocollapse;
                    } else if (validartitulocollapse == false) {
                        return this.datos[valor][columna][0][proptitulocollapse];
                    }
                } else {
                    return "";
                }
                
               
                //
               
            },
            datosformulario(datos, unidad) {
                this.datosboton = [];
                
                this.datosboton = datos;
                return this.datosboton + unidad;
            },
            imprimirnormal(valor) {
                
                if (valor != null) {
                    if (typeof valor != 'number') {
                        //if (valor != null) {
                        
                        this.datostablaanidadanormal = [];
                        let currentObj = this;
                        Object.values(valor).forEach(function callback(elemento, index, array) {

                            currentObj.datostablaanidadanormal.push(Object.values(elemento));
                        });
                        return this.datostablaanidadanormal.join('; ');
                    } else {
                        return valor;
                    }
                } else
                    return '';            
            },
            imprimirnormalsolotexto(valor, prop) {
                this.datostablaanidadapopoveer = [];
                let currentObj = this;
                valor.forEach(function callback(element, index, array) {
                    currentObj.datostablaanidadanormal.push(currentObj.listacompleta[element - 1]);
                });
                return this.datostablaanidadanormal.join(' ');
            },
            imprimirpopoveer(valor) {
                this.datostablaanidadapopoveer = [];
                let currentObj = this;
                valor.forEach(function callback(elemento, index, array) {

                    currentObj.datostablaanidadapopoveer.push({ Nombre: elemento });
                });

            },
            accionboton(valor,prop,scope) {
                console.log("accion boton",valor,prop);
                this.$emit('accionclick', valor, prop, scope);
            },
            accionbotoncolumna(prop,icono,id) {
                this.$emit('clickcolumn', prop, icono, id);
            },
            accionbotonvista(valor, prop, scope) {

                this.$emit('accionclickvista', this.datos, prop, scope);
            },
            imprimirnumero(valor, tipo) {
                if (valor != null) {   
                    if (tipo == 'moneda') {
                        var moneda = '' + valor;
                        var amount_parts = moneda.split('.'),
                            regexp = /(\d+)(\d{3})/;

                        while (regexp.test(amount_parts[0]))
                            amount_parts[0] = amount_parts[0].replace(regexp, '$1' + ',' + '$2');
                        if (amount_parts == 0) {
                            return '';
                        } else {
                            return amount_parts.join('.');
                        }

                    } else if (tipo == 'porcentaje') {
                        if (valor == 0) {
                            return '';
                        } else {
                            return valor + '%';
                        }

                    } else if (tipo == 'pesokgs') {
                        if (valor == 0) {
                            return '';
                        } else {
                            return valor + ' ' + 'Kgs';
                        }
                    }
                
                } else {
                    return "";
                }
            },

        },

        watch: {
            idarraycoldatoseleccion(valor) {
                var idarreglocolumna = valor[0].IdColumna;
                var idarreglodatocolumna = valor[0].IdDatoColumna;
                this.columnas[idarreglocolumna].datoseleccion = this.datofila[idarreglodatocolumna].datoseleccion;
                //this.cambiodatoseleccion = this.columnas[idarreglo].datoseleccion           
            },
            reglas() {
                this.rules;
            },
            datos(valor) {


            },
            adicionaropcion(saa) {
                console.log("adicionar opcion", this.mensajefaltandatos, this.mensajesvalidacion);
                console.log("fila model", this.datofilamodel);
                var isVacio = true;
                for (let value of this.datofilamodel) {
                    if (value.dato == '' || value.dato == 0 || value.dato == null || value.dato == []) {
                        isVacio = true;
                    } else {
                        isVacio = false;
                        break;
                    }
                    //if (value.dato != '') {
                    //    if (value.dato != 0) {
                    //        if (value.dato != null) {
                    //            if (value.dato != []) {
                    //                this.validardatosedicion();
                    //                break;
                    //            } 
                    //        }
                    //    }
                    //} else {
                    //    console.log("adicionar opvion en else");
                    //    this.$emit('validacionespaso', this.valido, this.datofilamodel);
                    //    break;
                    //}
                }
                if (isVacio == true) {
                    this.$emit('validacionespaso', this.valido, this.datofilamodel);
                } else {
                    this.adicionardato(null);
                    if (this.validacionmetodoadicionaropcion) {
                        this.$emit('validacionespaso', this.valido, this.datofilamodel);
                    }

                }
            },
            cancelaropcion() {
                
                this.editar = 0;
                for (let value of this.columnas) {
                    for (let dato of this.datofilamodel) {
                        if (typeof value.dato == 'boolean') {
                            Reflect.set(dato, 'dato', false);

                        } else if (dato.prop == value.prop) {
                            if (typeof dato.dato == 'string') {
                                Reflect.set(dato, 'dato', '');

                            } else if (typeof dato.dato == 'boolean') {
                                Reflect.set(dato, 'dato', false);

                            } else if (typeof dato.dato == 'number') {

                                Reflect.set(dato, 'dato', null);
                            } else if (typeof dato.dato == 'object') {

                                if (dato.dato instanceof Date) {
                                    Reflect.set(dato, 'dato', new Date());


                                } else if (dato.dato instanceof Array) {
                                    Reflect.set(dato, 'dato', []);

                                }
                            }
                        }
                    }
                }

            }
        },
        computed: {

        },
        created() {
        }
    }
</script>