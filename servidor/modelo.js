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
	this.eliminarUsuario=function(id){
		this.usuarios=_.without(this.usuarios, _.findWhere(this.usuarios,{_id:id}));
	}
	this.agregarResultado=function(resultado){
		this.resultados.push(resultado);
	}
	this.eliminarResultado=function(nombre){
		this.resultados=_.without(this.resultados, _.findWhere(this.usuarios,{nombre:nombre}));
	}
}

function Nivel(num,coordenadas,coordenadasGris,gravedad){
	this.nivel=num;
	this.coordenadas=coordenadas;
	this.coordenadasGris=coordenadasGris;
	this.gravedad=gravedad;
}

function Usuario(nombre, email, password){
	this.key=(new Date().valueOf()).toString();
	this.nombre=nombre;
	this.nivel=0;
	this.intentos=0;
	this.email=email;
	this.password=password;
}

function Resultado(nombre,nivel,tiempo,vidas,intentos){
	this.nombre=nombre;
	this.nivel=nivel;
	this.tiempo=tiempo;
	this.vidas=vidas;
	this.intentos=intentos;
}

function JuegoFM(archivo){
	this.juego=new Juego();
	this.array=leerCoordenadas(archivo);

	this.makeJuego=function(){
		this.array.forEach(function(nivel,i){
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