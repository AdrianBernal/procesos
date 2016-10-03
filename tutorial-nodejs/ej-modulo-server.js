var miModulo=require("./ejemplo-module.js");

console.log("Hola "+miModulo.hola());

//ejemplo 2
console.log("Hola "+miModulo.holaMundo());

//ejemplo 3: funciones privadas
console.log("Número: "+miModulo.incremento(10));