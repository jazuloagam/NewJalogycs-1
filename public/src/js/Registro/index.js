import Vue from "vue";
import axios from 'axios';
import VueAxios from 'vue-axios';
import ElementUI from 'element-ui';
import autocomplete from '../../components/autocomplete.vue'
import seleccion from '../../components/seleccion.vue'

Vue.use(VueAxios, axios);
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
    el: "#app-registro",
    components: { autocomplete, seleccion },
    data() {
        return {
            ruleForm: {
                tipodocumento: [],
                documentoseleccionado: 1,
                numerodocumento: '',
                razonsocial: '',
                nombres: '',
                apellidos: '',
                mail: '',
                telefono: '',
                direccion: '',
            },
            rules: {
                documentoseleccionado: [{ required: true, message: 'Por Favor seleccione un tipo de documento', trigger: ['blur','change'] }],
                numerodocumento: [{ required: true, message: 'Por favor selecciona un numero de documento', trigger: ['blur', 'change'] },
                    { pattern: '^[0-9]{3,20}$', message: 'El numero documento debe ser entre 3 a 20 digitos', trigger: ['blur','change'] }],
                razonsocial: [{ required: true, message: 'Por favor seleccione una razon social', trigger: ['blur', 'change'] },
                    { min: 0, max: 400, message: 'La razon social debe ser menor a 400 caracteres', trigger: ['blur', 'change'] }],
                nombres: [{ required: true, message: 'Por favor seleccione un nombre', trigger: ['blur', 'change'] },
                    { min: 0, max: 200, message: 'El nombre debe ser menor a 200 caracteres', trigger: ['blur', 'change'] }],
                apellidos: [{ required: true, message: 'Por favor seleccione un apellido', trigger: ['blur', 'change'] },
                    { min: 0, max: 200, message: 'El apellido debe ser menor a 200 caracteres', trigger: ['blur', 'change'] }],
                mail: [{ required: true, message: 'Por favor seleccione un correo electronico', trigger: ['blur', 'change'] },
                    { type: 'email', message: 'El correo electronico no es valido', trigger: ['blur', 'change'] }],
                telefono: [{ required: true, message: 'Por favor seleccione un telefono', trigger: ['blur', 'change'] },
                    { pattern: '^[0-9]{3,20}$', message: 'El telefono debe ser entre 3 a 20 digitos', trigger: ['blur','change'] }],
                direccion: [{ required: true, message: 'Por favor seleccione una direccion', trigger: ['blur', 'change'] },
                    { min: 0, max: 400, message: 'La direccion debe ser menor a 400 caracteres', trigger: ['blur', 'change'] }]
                
            },
            opcionpaises: [{Pais:'',usuarios:'',editable:true}],
            numpaises: 1,
            metodoregistro : '../api/Login/Preregistrar',
            numusuarios: 0,
            pais: '',
            paises: [],
            total: 0,
            archivoseleccionado: [],
            fileList: [],
            archivo: '',
            editar:0
        };
    },
    methods: {
        deleteRow(index, tableData) {
        },
        cambiotipodocumento(e) {
            var TipoDocumento = this.ruleForm.tipodocumento.find(tipo => tipo.Id == e);
            this.rules.numerodocumento[1].pattern = TipoDocumento.ExpresionRegular;
            this.rules.numerodocumento[1].message = TipoDocumento.MensajeValidacion;
            this.ruleForm.documentoseleccionado = e;
        },
        handleFiles(obj) {
            var elm = document.getElementById('image'),
                img = elm.files[0],
                fileName = img.name,
                fileSize = img.size;

            var reader = new FileReader(),
                binary, base64;
            reader.addEventListener('loadend', function () {
                binary = reader.result;
                base64 = btoa(binary);
            }, false);
            var p=reader.readAsBinaryString(img);
            this.archivo = img;
        },
        getBase64() {
            var file2=document.querySelector('input[type=file]').files[0];
            var reader = new FileReader();
            reader.readAsDataURL(file2);
            let self = this;
            reader.onload = function () {
                if (self.archivoseleccionado.length > 0) {
                    self.archivoseleccionado[0] = reader.result;
                } else {
                    self.archivoseleccionado.push(reader.result);
                }
            };
            reader.onerror = function (error) {
                if (self.archivoseleccionado.length > 0) {
                    self.archivoseleccionado[0] = error;
                } else {
                    self.archivoseleccionado.push(error);
                }
            };
        },
        editarpais(scope) {
            this.editar = scope.$index;
            this.opcionpaises[0].editable = false;
            scope.row.editable = true;
            this.pais = scope.row.Pais;
            this.numusuarios = scope.row.usuarios;
        },
        editaropcion(scope) {
            this.editar = 0;
            this.opcionpaises[0].editable = true;
            scope.row.editable = false;
            var isEditable = false;
            var encontrar = this.paises.find(pais => pais.value == this.pais);
            if ((scope.row.Pais != '' && encontrar != undefined) && scope.row.usuarios != 0) {
                var fueadicionado = this.opcionpaises.find(pais => pais.Pais == this.pais);
                if (fueadicionado == undefined) {
                    this.opcionpaises[scope.$index].Pais = this.pais;
                    this.opcionpaises[scope.$index].usuarios = this.numusuarios;
                } else {
                    if (fueadicionado.Pais == scope.row.Pais) {
                        this.opcionpaises[scope.$index].Pais = this.pais;
                        this.opcionpaises[scope.$index].usuarios = this.numusuarios;
                    } else {
                        this.$message('El pais ya fue adicionado');
                    }
                }               
            } else {
                this.$message('Ingrese un pais y numero de usuarios correcto');
            }
            this.pais = '';
            this.numusuarios = 0;
        },
        deshaceropcion(scope) {
            this.editar = 0;
            this.opcionpaises[0].editable = true;
            scope.row.editable = false;
            this.pais = '';
            this.numusuarios = 0;
        },
        adicionarpais() {
            var encontrar = this.paises.find(pais => pais.value == this.pais);
            if ((this.pais != '' && encontrar != undefined) && this.numusuarios != 0) {
                var fueadicionado = this.opcionpaises.find(pais => pais.Pais == this.pais);
                if (fueadicionado == undefined) {
                    this.numpaises = this.numpaises + 1;
                    this.opcionpaises.push({ Pais: this.pais, usuarios: this.numusuarios, editable: false });
                    this.pais = '';
                    this.numusuarios = '0';
                } else {
                    this.$message('El pais ya fue adicionado');
                }                
            } else {
                this.$message('Ingrese un pais y numero de usuarios correcto');
            }
        },
        eliminarpais(indice) {
            this.numpaises = this.numpaises - 1;
            this.opcionpaises.splice(indice, 1);
        },
        selecciondocumento(opcion) {
            
        },
        querySearch(queryString, cb) {
            var paises = this.paises;
            var results = queryString ? paises.filter(this.createFilter(queryString)) : paises;
            cb(results);
        },
        createFilter(queryString) {
            return (link) => {
                return (link.value.toLowerCase().includes(queryString.toLowerCase()));
            };
        },
        addAttachment(file, filelist) {
            console.log('entro attach');
            getBase64(file);
            console.log('salio attach');
            this.fileList.push(file);
        },
        registrarpago(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.opcionpaises.length <= 1) {
                        this.$message('Ingrese los paises y usuarios comprados');
                    } else if (this.fileList.length<=0) {
                        this.$message('Ingrese el archivo de comprobante de pago');
                    }else
                    {
                        this.opcionpaises.shift();
                        let currentObj = this;
                        this.axios.post(this.metodoregistro
                            ,
                            {
                                Archivo: currentObj.archivoseleccionado,
                                Nombres: currentObj.ruleForm.nombres,
                                Apellidos: currentObj.ruleForm.apellidos,
                                Pais: currentObj.opcionpaises,
                                RazonSocial: currentObj.ruleForm.razonsocial,
                                TipoDocumento: currentObj.ruleForm.documentoseleccionado,
                                NumeroDocumento: currentObj.ruleForm.numerodocumento,
                                CorreoElectronico: currentObj.ruleForm.mail,
                                Telefono: currentObj.ruleForm.telefono,
                                Direccion: currentObj.ruleForm.direccion,
                                NombreArchivo: currentObj.fileList[0].name
                            })
                            .then(function (response) {
                                currentObj.output = JSON.parse(response.data);
                                var opcionregistro = currentObj.output["OpcionRegistro"]; 
                                if (opcionregistro) {
                                    currentObj.$message('Preregistro realizado satisfactoriamente');
                                    location.href = '/Home/index';
                                } else {
                                    currentObj.$message('Error al realizar preregistro');
                                }
                            })
                            .catch(function (error) {
                                currentObj.$message('Error al realizar preregistro');
                                currentObj.output = error;
                            });
                    }                    
                } else {
                    return false;
                }
            });            
        },
        cargardatos(valor) {
            this.ruleForm.tipodocumento = valor;
        },
        handleRemove(file, fileList) {
            this.fileList.splice(0);
        },
        handlePreview(file) {
        },
        handleExceed(files, fileList) {
            this.$message.warning(`El límite es 3, haz seleccionado ${files.length} archivos esta vez, añade hasta ${files.length + fileList.length}`);
        },
        handleChange(file, fileList) {
            if (file != undefined) {
                this.getBase64();
            }            
            this.fileList[0] = file;
        },
        handleSelect(item) {
            this.pais = item.value;
        },
        cargarpaises(lista) {
            this.paises = lista;
        }
    },
    mounted() {
        this.numusuarios = 0;
        this.total = 0;
    }
})