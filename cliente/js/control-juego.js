//Funciones que modifican el index
var url="http://127.0.0.1:1338/";

function inicio(){
	mostrarCabezera();
}

function borrarControl(){
	$('#control').remove();
}

function mostrarCabezera(){
	$('#cabecera').remove();
	$('#control').append('<div id="cabecera"><h2>Nombre jugador</h2><p><input type="text" id="nombreInput" placeholder="introduce tu nombre"></p>');
	botonNombre();
}

function botonNombre(){
	$('#cabecera').append('<p><button type="button" id="nombreBtn" class="btn btn-primary btn-lg"><b>Crear nueva partida</b></button></p>');
	$('#nombreBtn').on('click',function(){
		$('#nombreBtn').remove();
		//To-Do: Controlar si ha metido el nombre
		crearUsuario($('#nombreInput').val());
		$('#nombreInput').remove();
	})
}

function mostrarInfoJugador(jugador){
	$('#nombreText').remove();
	$('#cabecera').append('<p id="nombreText">'+jugador.nombre+'</p>');
	$('#nivelText').remove();
	$('#cabecera').append('<h4 id="nivelText">Nivel: '+jugador.nivel+'</h4>');
	$('#help').remove();
	$('#cabecera').append('<p id="help">Utiliza las flechas para moverte. Debes alcanzar el cielo en el menor tiempo posible</p>');
}

function reset(){
	$('#cabecera').remove();
	$('#juegoId').empty();
	game.destroy();
	inicio();
};


//Funciones de comunicación con el servidor

function crearUsuario(nombre){
	if (nombre==""){
		nombre="jugador";
	}
	$.getJSON(url+"crearUsuario/"+nombre,function(datos){
		//To-Do: datos tiene la respuesta del servidor
		//mostrar los datos del usuario
		mostrarInfoJugador(datos);
		crearNivel("1");
	});
}