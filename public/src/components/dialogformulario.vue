<template>
    <div>
        <el-button :type="tipoboton" :size="sizeboton" v-on:click="clickbutton"></el-button>
        <el-dialog :title="titulodialog" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item v-for="(dato,index) in datoformulario" :key="dato.id" :label="dato.label">
                    <template v-if="dato.tipo=='input'">
                        <el-input v-model="dato.dato"></el-input>
                    </template>
                    <template>

                    </template>
                </el-form-item>
            </el-form>
        </el-dialog>
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
        name: 'dialogformulario',
        props: {
            tipoboton: {
                type: String,
                default:'success'
            },
            sizeboton: {
                type: String,
                default:'mini'
            },
            titulodialog: {
                type: String,
                default:'Crear Item'
            },
            modelform: {
                type: Array,
                default:()=>[]
            }

        },
        data() {
            return {
                dialogFormVisible: false,
                form: this.modelform
            }            
        },
        methods: {
            clickbutton() {
                this.dialogFormVisible= false
            }
        },
        watch: {

        },
        computed: {

        },
        created() {

        }
    }
</script>