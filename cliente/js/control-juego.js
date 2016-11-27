//Funciones que modifican el index
//var url="http://127.0.0.1:1338/";
var url=window.location.href.split('#')[0];
var game;

$('.toggle-sidebar').click(function(){
 $('body').toggleClass('sidebar-open');
 return false;
});

function inicio(){
	if (borrarJuego(true)){
		comprobarUsuario();
	}
}

function mostrarInfoJugador(){
	var nombre=$.cookie('nombre');
	var id=$.cookie('id');
	var nivel=$.cookie('nivel');
	var intentos=$.cookie('intentos');
	var percen=Math.floor((nivel/maxNiveles)*100);
	$('#control').load('../html/infoJugador.html', function(){
		$('#nombreText').text('Nombre: '+nombre);
		$('#nivelText').text('Nivel: '+nivel);
		$('#intentosText').text('Intentos: '+intentos);
		$('#percenText').text(percen+'%');
		$('#percenText').width(percen+'%');

		$('#siguienteBtn').on('click',function(){
			pedirNivel();
		});

		$('#volverEmpezarBtn').on('click',function(){
			resetNiveles();
		});

		$('#reiniciarBtn').on('click',function(){
			if (borrarJuego(false)){
				pedirNivel();
			}
		});
		comprobarNivel();
	});
	
}

function comprobarNivel(){
		var nivel=$.cookie('nivel');
		if (nivel<0 || nivel>=maxNiveles) {
			$('#mensajes').append("<h2 id='enh'>Lo siento, no tenemos más niveles</h2>");
			$('#volverEmpezarBtn').removeClass('hidden');
		} else if (game==undefined){
			console.log('siguiente boton unhidden');
			$('#siguienteBtn').removeClass('hidden');
		}
}

function reiniciarNivel(){
	$('#reiniciarBtn').removeClass('hidden');
};

function nivelCompletado(tiempo, vidas){
	$('#mensajes').append("<h2 id='enh'>¡Enhorabuena!</h2>");
	$('#siguienteBtn').removeClass('hidden');
	comunicarNivelCompletado(tiempo, vidas);
}

function mostrarResultados(datos,confirmar){
  	if (borrarJuego(confirmar)) {
	  	$('#juegoId').append('<h3 id="res">Resultados</h3>');
	  	$('#juegoId').append('<table id="resultados" class="display" width="100%"></table>');
	   	$('#resultados').DataTable({
	        data: datos,
	        columns: [
	            { data: "nombre", title: "Nombre" },
	            { data: "nivel", title: "Nivel" },
	            { data: "tiempo", title: "Tiempo" },
	            { data: "intentos", title: "Intentos" },
	            { data: "vidas", title: "Vidas" }
	        ],
	        order: [[1,'desc'],[2,'asc'],[3,'asc'],[4,'desc'],[0,'asc']]
	    });
   	}
}

function reset(){
	if (borrarJuego(true)){
		borrarCookies();
		mostrarLogin();
	}
}

function borrarCookies(){
	$.removeCookie("nombre");
	$.removeCookie("id");
	$.removeCookie("nivel");
	$.removeCookie("intentos");
}

function borrarJuego(confirmar){
	if (game!=undefined){
		if (confirmar){
			if (!confirm("¿Está seguro que desea terminar el intento?")){
				return false;
			}
		}
		game.destroy();
		game=undefined;
		$('#juegoId').empty();
	} else {
		$('#juegoId').empty();
	}
	return true;
}

function validarEmail( email ) {
    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (expr.test(email)){
        return true;
    } else {
    	return false;
    }
}

function mostrarEmailEnviado(){
	if (borrarJuego(true)){
		$('#juegoId').append('<div id="cabecera"><h3>Se le ha enviado un email de confirmación</h3></div>');
	}
}

function mostrarLogin(){
	$('#control').load('../html/login.html',function(){
		$('#loginBtn').on('click',function(){
			var nombre=$('#nombreInput').val();
			var password=$('#passwordInput').val();
			if (comprobarInput()) {
				loginUsuario(nombre,password);
			}
		});
		$('#refRegistrar').on('click',function(){
			mostrarRegistro();
		});
	});
}


function mostrarRegistro(){
	$('#control').load('../html/registro.html', function(){
		$('#registroBtn').on('click',function(){
			if (comprobarInput()) {
				var nombre=$('#nombreInput').val();
				var email=$('#emailInput').val();
				var password=$('#passwordInput').val();
				registroUsuario(nombre,email,password);
			}
		});
	});
}

function comprobarInput(){
	var nombre=$('#nombreInput').val();
	var email=$('#emailInput').val();
	var password=$('#passwordInput').val();
	var passwordRepetido=$('#passwordRepetidoInput').val();
	var passwordNew=$('#passwordNewInput').val();
	var passwordNewRepetido=$('#passwordNewRepetidoInput').val();
	var ok=true;
	if (nombre==='') {
		$('#errorNombreVacioText').removeClass('hidden');
		ok=false;
	} else {
		$('#errorNombreVacioText').addClass('hidden');
	}
	if (email==='') {
		$('#errorEmailVacioText').removeClass('hidden');
		ok=false;
	} else {
		$('#errorEmailVacioText').addClass('hidden');
		if (email!=undefined && !validarEmail(email)) {
			$('#errorEmailNoValidoText').removeClass('hidden');
			ok=false;
		} else {
			$('#errorEmailNoValidoText').addClass('hidden');
		}
	}
	if (password===''){
		$('#errorPasswordVacioText').removeClass('hidden');
		$('#errorPasswordRepetidoText').addClass('hidden');
		ok=false;
	} else {
		$('#errorPasswordVacioText').addClass('hidden');
		if (passwordRepetido!=undefined && password!=passwordRepetido){
			$('#errorPasswordRepetidoText').removeClass('hidden');
			ok=false;
		} else {
			$('#errorPasswordRepetidoText').addClass('hidden');
		}
	}

	$('#errorPasswordOldIncorrectaText').addClass('hidden');
	if (passwordNew!='' && passwordNew!=passwordNewRepetido) {
		$('#errorPasswordNewRepetidoText').removeClass('hidden');
		ok=false;
	} else {
		$('#errorPasswordNewRepetidoText').addClass('hidden');
	}
	return ok;
}

function modificarPerfil(){
	if ($.cookie('id')!=undefined) {
		$('#control').load('../html/actualizarUsuario.html',function(){
			$('#nombreInput').val($.cookie('nombre'));
			$('#actualizarBtn').on('click',function(){
				if (comprobarInput()) {
					var nombre=$('#nombreInput').val();
					var passwordOld=$('#passwordInput').val();
					var passwordNew=$('#passwordNewInput').val();
					if (passwordNew==''){passwordNew=passwordOld}
					actualizarUsuario(nombre,passwordOld,passwordNew);
				}
			});
			$('#eliminarBtn').on('click',function(){
				if (comprobarInput()) {
					if (confirm("¿Está seguro que desea eliminar el usuario?")){
						eliminarUsuario($.cookie('id'),$('#passwordInput').val());
					}
				}
			});
		});
	} else {
		mostrarLogin();
	}
}




//Funciones de comunicación con el servidor

function comprobarUsuario(){
	var id=$.cookie('id');
	if (id!=undefined){
		//Comprobar id
		$.getJSON(url+'comprobarUsuario/'+id,function(datos){
			//if(datos.nivel<0){
			if(datos.nivel<0){
				//borrar Cookies
				borrarCookies();
				mostrarLogin();
			} else {
				$.cookie('nivel',datos.nivel);
				$.cookie('intentos',datos.intentos);
				mostrarInfoJugador();
			}
		});
	} else {
		mostrarLogin();
	}
}

function comunicarNivelCompletado(tiempo, vidas){
	var id=$.cookie("id");
	$.getJSON(url+'nivelCompletado/'+id+"/"+tiempo+"/"+vidas,function(datos){
			$.cookie("nivel",datos.nivel);
			$.cookie("intentos",datos.intentos);
			obtenerResultados(false);
			//mostrarInfoJugador();
	});	
}

function sumarIntento(){
	var id=$.cookie("id");
	$.getJSON(url+'sumarIntento/'+id,function(datos){
			$.cookie("intentos",datos.intentos);
			mostrarInfoJugador();
	});	
}


function resetNiveles(){
	var id=$.cookie("id");
	$.getJSON(url+'resetNiveles/'+id,function(datos){
			$.cookie("nivel",datos.nivel);
			mostrarInfoJugador();
	});	
}

function obtenerResultados(confirmar){
	//var id=$.cookie("id");
	//$.getJSON(url+'obtenerResultados/'+id,function(datos){
	$.getJSON(url+'obtenerResultados/',function(datos){
		mostrarResultados(datos,confirmar);
		mostrarInfoJugador();
	});
}

function loginUsuario(nombre, password){
	$.ajax({
		type:'POST',
		url:'/login',
		contentType:'application/json',
		dataType:'json',
		data:JSON.stringify({nombre:nombre, password:password}),
		success:function(data){
			if(data.nombre==undefined){
				$('#errorLoginText').removeClass('hidden');
			} else {
				$.cookie('nombre',data.nombre);
				$.cookie('id',data._id);
				$.cookie('nivel',data.nivel);
				$.cookie('intentos',data.intentos);
				mostrarInfoJugador();
			}
		}
	});
}

function registroUsuario(nombre, email, password){
	$.ajax({
		type:'POST',
		url:'/signup',
		data:JSON.stringify({nombre:nombre, email:email, password:password}),
		success:function(data){
			if (data.nombre==undefined){
				$('#errorNombreEnUsoText').removeClass('hidden');
			} else {
				mostrarLogin();
				mostrarEmailEnviado();
			}
		},
		contentType:'application/json',
		dataType:'json'
	});
}

function eliminarUsuario(id,password){
	$.ajax({
		type:'DELETE',
		url:'/eliminarUsuario/'+id,
		data:JSON.stringify({password:password}),
		success:function(data){
			if (data.resultados<1){
				$('#errorPasswordOldIncorrectaText').removeClass('hidden');
			} else {
				reset();
			}
		},
		contentType:'application/json',
		dataType:'json'
	});
}

function actualizarUsuario(nombreText, passwordOldText, passwordNewText){
	$.ajax({
		type:'POST',
		url:'/actualizarUsuario',
		data:JSON.stringify({id:$.cookie('id'),nombre:nombreText, passwordOld:passwordOldText, passwordNew:passwordNewText}),
		success:function(data){
			console.log(data);
			if (data.nombre==undefined){
				$('#errorPasswordOldIncorrectaText').removeClass('hidden');
			} else {
				$.cookie('nombre',nombreText);
				mostrarInfoJugador();
			}
		},
		contentType:'application/json',
		dataType:'json'
	});
}

function pedirNivel(){
	var uid=$.cookie("id");
	if (uid!=undefined){
		$.getJSON(url+"pedirNivel/"+uid,function(data){
			$('#siguienteBtn').addClass('hidden');
			$('#mensajes').empty();
			$('#juegoId').empty();
			sumarIntento();
			crearNivel(data);
		});
	}
}