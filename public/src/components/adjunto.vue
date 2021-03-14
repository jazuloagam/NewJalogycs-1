<template>    
    <el-upload class="displaynone"
               action="../api/LogisticaApi/cargaarchivo"
               :on-change="handleChange"
               :file-list="fileList"
               :limit="1"
               :on-exceed="handleExceed"
               :auto-upload="false"
               :on-remove="handleRemove">
        <el-button type="primary" icon="el-icon-paperclip" circle></el-button>
        
    </el-upload>
    
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

        name: 'adjunto',
        props: {
            listaadjunta: {
                type: Boolean,
                default: false
            },
            
            name: {
                type: String,
                default: ''
            }, url: {
                type: String,
                default: ''
            }, archivoseleccionado: {
                type: Array,
                default: () => []
            }, columnaid: {
                type: Number,
                default: 0
            }, tipo: {
                type: Array,
                default: () => []
            }, 
            opcionalcolumprop: {
                type: String,
                default: ''
            }, 
        },
        data() {
            return {
                file:[],
                fileList: this.archivoseleccionado,
                remover:0,
            }
        },
        methods: {
            handleRemove() {
                this.remover =1;
                this.fileList = [];
                this.$emit('changeeliminacion', this.fileList, this.columnaid, this.opcionalcolumprop);
            },
            handleChange(file, fileList) {     
                this.$emit('change', fileList, this.columnaid, this.opcionalcolumprop);
                this.fileList = fileList.slice(-3);
            },
            handleExceed() {

                this.$message.warning(`El límite es 1, haz seleccionado ${files.length} archivos esta vez, añade hasta `);
            },
            logisticaapicontroller(object) {
                
            },


        },
        watch: {
            archivoseleccionado(valor) {
                if (this.remover == 1) {
                    this.fileList = [];
                } else {
                    this.fileList = valor;
                }
                

            },

        },
        created() {




        }
     }
</script>