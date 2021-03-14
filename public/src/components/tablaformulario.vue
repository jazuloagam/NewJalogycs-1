<template>
    <div>
        <label>{{datostabla}}</label>
        <el-table :data="datostabla" :size="size" max-height="450">

            <el-table-column v-for="(columna,index) in columnas" :key="columna.id" label-width="auto" size="mini" class="columna.prop" :width="columna.width" :fixed="columna.fixed" :prop="columna.prop" :label="columna.label" v-if="columna.filtro==true || columna.filtro==null" :type="columna.expand">
                <template slot="header" v-if="columna.tipocolumna.length != 0">
                    <label>{{columna.label}}</label>
                    <span v-for="(tipocolumna,indextipo) in columna.tipocolumna " :key="tipocolumna.id">
                        <el-tooltip class="item" effect="dark" :content="tipocolumna.descripcion" :placement="tipocolumna.posicion">
                            <i :class="tipocolumna.icono"></i>
                        </el-tooltip>
                    </span>
                </template>
                <template>
                    <div>
                        <div v-if="columna.tipo=='input'">
                            <el-input v-model="datos[columna.prop]" type="textarea"  autosize   :disabled="columna.deshabilitar"></el-input>
                        </div>
                        <div v-else-if="columna.tipo=='inputnumber'">
                            <el-input-number v-model="datos[columna.prop]"  :min="columna.min" :max="columna.max" :disabled="columna.deshabilitar" :precision="columna.precision" :controls="columna.controls"></el-input-number>
                        </div>
                        <div v-else-if="columna.tipo=='checkbox'">
                            <el-checkbox v-model="datos[columna.prop]"></el-checkbox>
                        </div>
                        <div v-else-if="columna.tipo=='seleccion'">
                            <seleccion :tipo="columna.tiposeleccion"
                                   :metodocargar="columna.metodo"
                                   :datoseleccion="columna.datoseleccion"
                                   :placeholder="columna.placeholder"
                                   :arreglotablas="columna.arreglotablas"
                                   :opcionalcolumaid="columna.id"
                                   :opcionseleccionada="datos[columna.prop]"
                                   :infocargarvalor="columna.informacionlista"
                                   :borrado="columna.borrado"
                                   :opcionalcolumaprop="columna.prop"
                                   v-on:cargarseleccion="cargarseleccion"
                                   v-on:changelimpiar="cambioseleccionlimpiar"
                                   v-on:change="cambioseleccion">
                            </seleccion>
                        </div>
                        <div v-else-if="columna.tipo=='seleccionmultiple'">
                            <seleccionmultiple :tipo="columna.tiposeleccion"
                                               :metodocargar="columna.metodo"
                                               :arreglotablas="columna.arreglotablas"
                                               :opcionseleccionadamultiple="datos[columna.prop]"
                                               :opcionalcolumaid="columna.id"
                                               colage=true
                                               multiple
                                               :placeholder="columna.placeholder"
                                               :datoseleccion="columna.datoseleccion"
                                               v-on:cargarseleccionmultiple="cargarseleccionmultiple(columna.id)"
                                               v-on:change="cambioseleccionmultiple">
                            </seleccionmultiple>
                        </div>
                        <div v-else-if="columna.tipo=='autocomplete'">
                            <autocomplete :tipo="columna.tipoautocomplete"
                                          v-on:select="selectautocomplete"
                                          :metodocargar="columna.metodo"
                                          :objeto="datos[columna.prop]"
                                          :opcionalcolumaid="columna.id">
                            </autocomplete>
                        </div>
                        <div v-else-if="columna.tipo=='fechacalendario'">
                            <fechacalendario :placeholder="columna.placeholder"
                                             :tipo="datos[columna.prop]"
                                             :columnaid="columna.id"
                                             :metodocargar="columna.metodo"
                                             v-on:change="changefechaseleccion">
                            </fechacalendario>
                        </div>
                        <div v-else-if="columna.tipo=='adjunto'">
                            <adjunto v-on:change="handleChange"
                                     v-on:changeeliminacion="eliminacionadjunto"
                                     :columnaid="columna.id"
                                     :opcionalcolumprop="columna.prop"
                                     :tipo="datos[columna.prop]"
                                     :archivoseleccionado="datos[columna.prop]"
                                     :opcionalcolumaid="columna.id">
                            </adjunto>
                        </div>
                        <div v-else-if="columna.tipo=='boton'">
                            <button type="button" class="btn btn-success btn-xs" v-on:click="accionboton()"><i class="ace-icon fa fa-search align-top bigger-125"></i></button>
                        </div>
                        <div v-else-if="columna.tipo=='label'">

                        </div>
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
        name: 'tablaformulario',
        components: { autocomplete, seleccion, seleccionmultiple, fechacalendario, adjunto },
        props: {
            columnas: {
                type: Array,
                default:()=>[]
            },
            datoscolumna: {
                type: Array,
                default: () => []
            },
            datofila: {
                type: Array,
                default: () => []
            },
            datostabla: {
                type: Array,
                default: () => []
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
                datos: this.datostabla[0],
                editar: 0,
                datofilamodel: this.datofila,
                cambiodatoseleccion: 0,
                datostablaanidada: [],
                propiedades: [],
                reglas: [],
                rules: [],
                search: '',
                scopeindex: [],
                valido: 'valido',
                titulo: [],
                activeNames: ['1'],
                prueba: [],
                datosboton: [],
            }
        },
        methods: {
            afectacionenimput(datos,prop) {
                console.log("tablaformulario afectaciones en imput ", datos, prop, Object.values(datos[0]),datos[0][prop]);

            },
            cargarseleccion() {

            },
            cambioseleccion(valor, idcolumna, opcionarreglotablas, opcionseleccionada, datoseleccion, prop, informacioncarga) {
                console.log("valor cambio seleccion", valor, prop, idcolumna);
                this.datos[prop] = valor;
                console.log("datos cambio seleccion", this.datos);
                
            },
            cambioseleccionlimpiar() {


            },
            cargarseleccionmultiple( id) {



            },
            cambioseleccionmultiple() {

            },
            changefechaseleccion() {

            },
            handleChange(fileList, idcolumna, prop) {
                console.log("adjuntar handle change", fileList, idcolumna, prop)
                this.datos[prop] = fileList;

            },
            eliminacionadjunto(fileList, idcolumna, prop) {
                this.datos[prop] = [];
            },
            accionboton() {

            },
        },

        watch: {


        },
        computed: {

        },
        created() {

        }
    }
</script>