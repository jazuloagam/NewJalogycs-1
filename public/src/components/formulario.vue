<template>
    
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="auto" size="mini" class="ruleForm">
    
        <el-row v-for="(form,index) in forms" :key="form.id">
            <el-col :span="15" :offset="4">
                <el-form-item :label="form.label" :prop="form.prop" v-if="form.visualizar">
                    <div v-if="form.tipo=='seleccion'">
                        <seleccion :tipo="form.tiposeleccion"
                                   :metodocargar="form.metodo"
                                   :datoseleccion="form.datoseleccion"
                                   :placeholder="form.placeholder"
                                   :arreglotablas="form.arreglotablas"
                                   :opcionalcolumaid="form.id"
                                   :opcionseleccionada="ruleForm[form.prop]"
                                   :infocargarvalor="form.informacionlista"
                                   :borrado="form.borrado"
                                   :opcionalcolumaprop="form.prop"
                                   v-on:cargarseleccion="cargarseleccion"
                                   v-on:changelimpiar="cambioseleccionlimpiar"
                                   v-on:change="cambioseleccion">
                        </seleccion>
                    </div>
                    <div v-else-if="form.tipo=='number'">
                        <el-input-number v-model="ruleForm[form.prop]"                                         
                                         :disabled="form.deshabilitar"
                                         :change="seleccionnumber"
                                         :controls="false">
                        </el-input-number>
                    </div>
                    <div v-else-if="form.tipo=='input'">
                        <el-input :disabled="form.deshabilitar" v-model="ruleForm[form.prop]" ></el-input>
                    </div>
                    <div v-else-if="form.tipo=='autocomplete'">
                        <autocomplete :tipo="form.tipoautocomplete"
                                      v-on:select="selectautocomplete"
                                      :metodocargar="form.metodo"
                                      :opcionalcolumprop="form.prop"
                                      :objeto="ruleForm[form.prop]"
                                      v-on:change="cambioautocomplete"
                                      :opcionalcolumaid="form.id">
                        </autocomplete>
                    </div>
                </el-form-item>
            </el-col>
        </el-row>
        <label>{{ruleForm}}</label>
    </el-form>
</template>






<script>
    import Vue from 'vue';
    import axios from 'axios';
    import VueAxios from 'vue-axios';
    import ElementUI from 'element-ui';
    import locale from 'element-ui/lib/locale';
    import lang from 'element-ui/lib/locale/lang/es';
    import seleccion from '../components/seleccion.vue'
    import autocomplete from '../components/autocomplete.vue'



    Vue.use(VueAxios, axios);
    locale.use(lang)
    Vue.use(ElementUI);
    Vue.config.productionTip = false;




    export default {

        name: 'formulario',
        components: { seleccion, autocomplete },
        props: {
            forms: {
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
            reglas: {
                type: Object ,
                default: new Object()
            },
            datosruleform: {
                type: Object ,
                default: new Object()
            },
            botonvalidar: {
                type: Boolean,
                default: true
            },
            validardatos: {
                type: Number,
                default: 0
            },
        },
        
        data() {
            return {
                ruleForm: this.datosruleform,
                rules: this.reglas,
            }
        }, 
        methods: {
            seleccionnumber(valor) {
                console.log("funciona", valor);

            },
            cargarseleccion() {


            },
            cambioseleccionlimpiar(valor, formid, opcionarreglotablas, prop) {
                this.ruleForm[prop] = valor;
                this.cambioseleccion(valor, formid, opcionarreglotablas);
            },
            cambioseleccion(valor, formid, opcionarreglotablas, opcionseleccionada, datoseleccion, prop, informacioncarga) {
                this.ruleForm[prop] = valor;
                //this.datos[formid].dato = valor;
                let currentObj = this;
                opcionarreglotablas.forEach(function callback(element, index, array) {
                    
                   
                    if (element.tipoopcion == 'visualizar') {
                        currentObj.ruleForm[element.queafecta] = null;
                        //currentObj.datos.forEach(function callback(elemen) {
                        //    if (elemen.prop == element.queafecta) {
                        //        elemen.dato = null;
                        //    }
                        //})
                        currentObj.axios.post(element.nombremetodoconsulta, {
                            IdTipoOperacion: valor,
                            IdModoTransporte: valor,
                            IdTipoMatriz: element.tipomatriz
                        })
                            .then(function (response) {

                                currentObj.output = JSON.parse(response.data);
                                
                                var posicionencolumna = currentObj.forms.findIndex(elemento => elemento.prop == element.queafecta);
                                Reflect.set(currentObj.forms[posicionencolumna], element.propiedadafectar, currentObj.output.ObjetoSeleccionable);
                                if (currentObj.output.ObjetoSeleccionable.length == 0) {
                                    Reflect.set(currentObj.forms[posicionencolumna], element.propiedadvisualizar, false);
                                } else {
                                    Reflect.set(currentObj.forms[posicionencolumna], element.propiedadvisualizar, true);
                                }



                            })
                            .catch(function (error) {

                            });
                    } else if (element.tipoopcion == 'bloqueo') {

                        if (datoseleccion != null) {
                            var posicionenform = currentObj.forms.findIndex(elemento => elemento.prop == element.queafecta);
                            Reflect.set(currentObj.forms[posicionenform], element.propiedadafectar, false);
                        } else {
                            var posicionenform = currentObj.forms.findIndex(elemento => elemento.prop == element.queafecta);
                            Reflect.set(currentObj.forms[posicionenform], element.propiedadafectar, true);
                        }
                    } else if (element.tipoopcion == 'visualizarsinlista') {
                        currentObj.ruleForm[element.queafecta] = null;
                        //currentObj.datos.forEach(function callback(elemen) {
                        //    if (elemen.prop == element.queafecta) {
                        //        elemen.dato = null;
                        //    }
                        //})
                        currentObj.axios.post(element.nombremetodoconsulta, {
                            IdTipoOperacion: valor,
                            IdModoTransporte: valor,
                            IdTipoMatriz: element.tipomatriz
                        })
                            .then(function (response) {

                                currentObj.output = JSON.parse(response.data);
                                var posicionencolumna = currentObj.forms.findIndex(elemento => elemento.prop == element.queafecta);
                                Reflect.set(currentObj.forms[posicionencolumna], element.propiedadvisualizar, currentObj.output["Visibilidad"]);
                                console.log("visualizarsinlista", currentObj.output);

                            })
                            .catch(function (error) {

                            });

                    } else if (element.tipoopcion == 'cargarvalor') {
                        //currentObj.datos.forEach(function callback(elemen) {
                        //    if (elemen.prop == element.queafecta) {
                        //        elemen.dato = undefined;
                        //    }
                        //})
                        informacioncarga.forEach(function callback(eleme) {
                            if (eleme.caracteristicas[0].nombrecaracteristica == element.queafecta) {
                                if (valor == eleme.idprograma) {
                                    //currentObj.datos.forEach(function callback(elemen) {                                       
                                        //if (elemen.prop == element.queafecta) {
                                            //elemen.dato = eleme.caracteristicas[0].valorcaracteristica;
                                            currentObj.ruleForm[element.queafecta] = eleme.caracteristicas[0].valorcaracteristica;
                                        //}
                                    //})
                                }
                            }        
                            
                        })
                    }
                });

            },
            selectautocomplete(valor, formid,prop) {
                //valor.value = this.valorautocomplete;
                //this.valorautocomplete = valor.value;
                console.log("select autocomplete", valor);
                //this.datos[formid].dato = valor.value;
                this.ruleForm[prop] = valor.value;
            },
            cambioautocomplete(prop) {
                this.ruleForm[prop] = '';
                

            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$emit('validaciontrue', this.botonvalidar);
                    } else {
                        return false;
                    }
                });
            },
        },
        watch: {
            validardatos() {
                console.log("validardatos llego a formulario ");
                this.submitForm('ruleForm');
                
            }               
        },
        created() {




        }
     }
</script>