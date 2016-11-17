var _ = require("underscore");
var fs=require("fs");

function Juego(){
	this.nombre="Niveles";
	this.niveles=[];
	this.usuarios=[];
	this.resultados=[];
	this.agregarNivel=function(nivel){
		this.niveles.push(nivel);
	}
	this.agregarUsuario=function(usuario){
		this.usuarios.push(usuario);
	}
	this.obtenerUsuario=function(id){
		return _.find(this.usuarios,function(usu){
			return usu._id==id;
		});
	}
	this.obtenerUsuarioLogin=function(email,password){
		return _.find(this.usuarios,function(usu){
			return (usu.email==email && usu.password==password);
		});
	}
	this.agregarResultado=function(resultado){
		this.resultados.push(resultado);
	}
}

function Nivel(num,coordenadas,coordenadasGris,gravedad){
	this.nivel=num;
	this.coordenadas=coordenadas;
	this.coordenadasGris=coordenadasGris;
	this.gravedad=gravedad;
}

function Usuario(nombre){
	this.key=(new Date().valueOf()).toString();
	this.nombre=nombre;
	this.nivel=0;
	this.email=nombre;
	this.password=undefined;
}

function Usuario(nombre,password){
	this.key=(new Date().valueOf()).toString();
	this.nombre=nombre;
	this.nivel=0;
	this.email=nombre;
	this.password=password;
}

function Resultado(nombre,nivel,tiempo){
	this.nombre=nombre;
	this.email=nombre;
	this.nivel=nivel;
	this.tiempo=tiempo;
}

function JuegoFM(archivo){
	this.juego=new Juego();
	this.array=leerCoordenadas(archivo);

	this.makeJuego=function(){
		this.array.forEach(function(nivel,i){
			console.log(nivel.gravedad);
			console.log(nivel.coordenadas);
			var nivel=new Nivel(i,nivel.coordenadas,nivel.coordenadasGris,nivel.gravedad);
			this.juego.agregarNivel(nivel);
		},this);
		return this.juego;
	}
}

function leerCoordenadas(archivo){
	var array=JSON.parse(fs.readFileSync(archivo));
	return array;
}

module.exports.Juego=Juego;
module.exports.Usuario=Usuario;
module.exports.Resultado=Resultado;
module.exports.JuegoFM=JuegoFM;