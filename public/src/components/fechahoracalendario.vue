<template>    
        <div class="block">            
            <el-date-picker v-model="fecha"
                            type="datetime"
                            :placeholder="placeholder"
                            v-bind:disabled="deshabilitar"
                            v-on:change="guardarfecha"
                            :picker-options="pickerOptions">
            </el-date-picker>
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

        name: 'fecha',
        props: {
            tipo: {
                type: Date,
                default: new Date()
            },
            placeholder: {
                type: String,
                default: ''
            },
            columnaid: {
                type: Number,
                default: 0
            },
            deshabilitar: {
                type: Boolean,
                default: false
            },
            bloqueo: {
                type: Boolean,
                default: true
            },

 

        },
        data() {            
            return {
                fecha: this.tipo,
                pickerOptions: {     
                    disabledDate: this.bloqueodefechas,
                    shortcuts: [{
                        text: 'Today',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: 'Yesterday',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: 'A week ago',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                                     
                },
            }        
        },
        methods: {
            bloqueodefechas(time) {
                if (this.bloqueo == true) {
                    var hoy = new Date();
                    var mañana = hoy.getTime() - (1 * 24 * 60 * 60 * 1000);
                    return time.getTime() < mañana;

                }
            },

            guardarfecha(valor) {
                this.$emit('change', valor, this.columnaid);
            }
        },
        watch: {

            tipo(valor) {
            }

        },
        created() {




        }
    }
</script>