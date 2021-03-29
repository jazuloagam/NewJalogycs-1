<template>
    <div>
        <el-autocomplete class="col-md-12 col-xs-12"
                         :validate-event="false"
                         :highlight-first-item="true"
                         v-model="objetoautocomplete"
                         v-bind:disabled="deshabilitar"
                         :fetch-suggestions="querySearch"
                         :trigger-on-focus="false"
                         v-on:select="handleSelect"
                         v-on:input="handleChange">
        </el-autocomplete>
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
        name: 'autocomplete',
        props: {
            tipo: {
                type: String,
                default: ''
            },
            objeto: {
                type: String,
                default:''
            },
            metodocargar: {
                type: String,
                default:''
            },
            deshabilitar: {
                type: Boolean,
                default: false
            },
            opcionalcolumaid: {
                type: Number,
                default:0
            },
            opcionalcolumprop: {
                type: String,
                default: ''
            },
            
        },
        data() {
            return {
                objetos: [],
                objetoautocomplete: '',
                opcionalidcol:this.opcionalcolumaid
            }
        },
        methods: {
            querySearch(queryString, cb) {
                var objetos = this.objetos;
                var results = queryString ? objetos.filter(this.createFilter(queryString)) : objetos;
                cb(results);
            },
            createFilter(queryString) {
            return (link) => {
                return (link.value.toLowerCase().includes(queryString.toLowerCase()));
                };
            },
            cargardatos() {
                let currentObj = this;
                this.axios.post(this.metodocargar, { OpcionParametro:this.tipo
                })
                    .then(function (response) {
                        currentObj.output = JSON.parse(response.data);
                        currentObj.objetos = currentObj.output["ObjetoAutocomplete"];
                        currentObj.objetoautocomplete = currentObj.objeto;
                        currentObj.$emit('cargarlista', currentObj.objetos, currentObj.opcionalcolumprop);                        
                    })
                    .catch(function (error) {
                        currentObj.$message('No se pudo Iniciar Sesión');
                        currentObj.output = error;
                    });
            },
            handleSelect(e) {
                this.$emit('select', e, this.opcionalcolumaid, this.opcionalcolumprop);
            },
            handleChange(valor) {
                this.$emit('change', this.opcionalcolumprop);
            }
        },
        watch: {
            objeto(valor) {
                this.objetoautocomplete = valor;
            }
        },
        created() {
            this.cargardatos();
        }
    }
    
</script>