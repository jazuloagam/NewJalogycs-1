export function validar(regex, valor) {
    var reg = new RegExp(regex, 'i');
    console.log(regex);
    console.log(valor);
    console.log(reg.test, "validacionjs");
    return reg.test(valor);
    
}