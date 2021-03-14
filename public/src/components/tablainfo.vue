<template>
    <div>
        <el-table :data="datos">
            <el-table-column v-for="(columna,index) in columnas" :key="columna.id" :prop="columna.prop" :label="columna.label">
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
        name: 'tablainfo',
        props: {
            columnas: {
                type: Array,
                default:()=>[]
            },
            datos: {
                type: Array,
                default:()=>[]
            }
        },
        data() {
            return {

            }
        },
        methods: {

        },
        watch: {

        },
        created() {

        }
    }
</script>