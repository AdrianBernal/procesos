//Crear un módulo y utilizarlo
function hola(){
	return "mundo";
}

module.exports.hola=hola;

//puedo cmabiar el método que se exporta
//aunque localmente se siga llamando hola()
//module.exports.holamundo=hola
//en este caso cuando lo invoque debería utilizar
//miModulo.holamundo()

//2-
//agrego funcionalidad
function holaMundo(){
	return hola() + " de nuevo";
};

module.exports.holaMundo=holaMundo;

//3- 
//puedo tener funciones privadas
function funcionPrivada(num){
	return num+1;
}

function incremento(num){
	return funcionPrivada(num);
}
module.exports.incremento=incremento;