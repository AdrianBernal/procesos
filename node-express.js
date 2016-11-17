
var fs=require("fs");
//var config=JSON.parse(fs.readFileSync("config.json"));
//var host=config.host;
//var port=config.port;
var url="http://procesos.herokuapp.com/";
//var url="http://127.0.0.1:5000/";

var exp=require("express");
var app=exp();
var bodyParser=require("body-parser");
var mongo=require("mongodb").MongoClient;
var ObjectId=require("mongodb").ObjectId;
var modelo=require("./servidor/modelo.js");
var cifrado = require("./servidor/cifrado.js");


var fm=new modelo.JuegoFM("./servidor/coordenadas.json");
var juego=fm.makeJuego(fm.juego,fm.array);
//var juego= new modelo.Juego();
var usuariosCol;
var resultadosCol;
var limboCol;

/***************** EMAIL *********************/
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

var options = {
  auth: {
    api_user: 'a2b1987',
    api_key: '100_Procesos'
  }
}

var client = nodemailer.createTransport(sgTransport(options));

/***************** EMAIL EMAIL *********************/

app.set('port', (process.env.PORT || 5000));

//app.use(app.router);
app.use(exp.static(__dirname +"/cliente"));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get("/",function(request,response){
	var contenido=fs.readFileSync("./cliente/index.html");
	response.setHeader("Content-type","text/html");
	response.locals.name='Nombre de prueba';
	response.send(contenido);
});

app.post("/signup",function(request,response){
	var email = request.body.email;
	var password = request.body.password;
	var passwordCifrada = cifrado.encrypt(password);
	//usuariosCol.find({email:email}).toArray(function(error,usr){
	limboCol.find({email:email}).toArray(function(error,usr){	
		if (usr.length>0){
			response.send({email:undefined});
		} else {
			usuariosCol.find({email:email}).toArray(function(error,usr){	
				if (usr.length>0){
					response.send({email:undefined});
				} else {
					var usuario=new modelo.Usuario(email,passwordCifrada);
					insertarUsuarioLimbo(usuario,response);		
				}
			});
		}
	});
});

app.get("/comprobarUsuario/:id",function(request,response){
	//var id = request.params.id;
	var usuario = juego.obtenerUsuario(request.params.id);
	var json={nivel:-1};
	if (usuario!=undefined) {
		json=usuario;
	}
	response.send(json);
	/*var usuario = juego.obtenerUsuario(id);
	var json={'nivel':-1};
	if (usuario!=undefined){
		json=usuario;
		response.send(json);
	} else {
		usuariosCol.find({_id:ObjectId(id)}).toArray(function(error,usr){
			console.log('usr.length'+usr.length);
			if (usr.length>0){
				juego.agregarUsuario(usr[0]);
				json=usr[0];
			}
			response.send(json);
		});	
	}*/
	
})

app.get('/nivelCompletado/:id/:tiempo',function(request,response){
	console.log('nivelCompletado');
	var id=request.params.id;
	var tiempo=request.params.tiempo;
	var usuario=juego.obtenerUsuario(id);
	var json={'nivel':-1}
	if (usuario!=undefined){
		insertarResultado(new modelo.Resultado(usuario.email,usuario.nivel,tiempo),response);
		usuario.nivel+=1;
		usuariosCol.update({_id:ObjectId(id)}, {$set: {nivel:usuario.nivel}});		
		json={'nivel':usuario.nivel};
	}
	response.send(json);
});

app.get('/resetNiveles/:id',function(request,response){
	var id=request.params.id;
	var usuario=juego.obtenerUsuario(id);
	var json={'nivel':-1}
	if (usuario!=undefined){
		usuario.nivel=0;
		usuariosCol.update({_id:ObjectId(id)}, {$set: {nivel:usuario.nivel}}
		/*,function (error, result) {
			if (error) {
				console.log("no se pudo actualizar");
			} else {
				console.log("user actualizado");
			}
		}	
		*/
		);		
		json={'nivel':usuario.nivel};
	}
	response.send(json);
});


//app.get('/obtenerResultados/:id',function(request,response){
app.get('/obtenerResultados/',function(request,response){
	//var id=request.params.id;
	//var usuario=juego.obtenerUsuario(id);
	var json={'resultados':[]};
	/*if (usuario){
		json=juego.resultados;
	}*/
	if (juego!=undefined){
		json=juego.resultados;
	}
	response.send(json);
});

app.post('/login',function(request,response){
	var email=request.body.email;
	var password=request.body.password;
	var passwordCifrada = cifrado.encrypt(password);
	var usuario=juego.obtenerUsuarioLogin(email,passwordCifrada);
	if  (usuario==undefined) {
		/*console.log('preguntar db no tiene que hacerlo');
		usuariosCol.find({email:email,password:password}).toArray(function(error,usr){
			if (usr.length==0){
				response.send({'email':undefined});
			} else {
				juego.agregarUsuario(usr[0]);
				response.send(usr[0]);
			}
		});*/
		response.send({'email':''});
	} else {
		response.send(usuario);
	}
});

app.delete("/eliminarUsuario/:id",function(request,response){
	var id=request.params.id;
	var json={'resultados':-1};
	usuariosCol.remove({_id:ObjectId(id)},function(err,result){
  //console.log(result);
  		if (result.result.n==0){
    		console.log("No se pudo eliminar el usuario");
  		} else {
   			json={"resultados":1};
   			console.log("Usuario eliminado");
   			resultadosCol.remove({_id:ObjectId(id)},function(err,result){
			 //console.log(result);
				if (result.result.n==0){
			    	console.log("No se pudo eliminar los resultados");
			  	} else {
			   		//json={"resultados":1};
			   		console.log("Resultados eliminados");
			  	}
			});
  		}
  		cargarUsuarios();
  		response.send(json);
 	});
});

app.post('/actualizarUsuario',function(request,response){
	var id=request.body.id;
	var email=request.body.email;
	var passwordOld=request.body.passwordOld;
	var passwordOldCifrada=cifrado.encrypt(passwordOld);
	var passwordNew=request.body.passwordNew;
	var passwordNewCifrada=cifrado.encrypt(passwordNew);
	//var json={'resultados':-1};
	console.log('email: '+email);
	console.log('password old :'+passwordOldCifrada);
	console.log('password new :'+passwordNewCifrada);
	var json={'email':''};
	usuariosCol.update({_id:ObjectId(id),password:passwordOldCifrada}, {$set: {nombre:email,email:email,password:passwordNewCifrada}},function(err,result){
		if (result.result.n==0){
    	console.log("No se pudo actualizar");
  		} else {
	   		//json={"resultados":1};
	   		json=juego.obtenerUsuario(id);
	   		console.log("Usuario actualizado");
 		}
	  	cargarUsuarios();
	  	response.send(json);
	});
});

app.get('/pedirNivel/:uid',function(request,response){
	var uid=request.params.uid;
	var usuario=juego.obtenerUsuario(uid);
	var json={'nivel':-1};
	if (usuario && usuario.nivel<juego.niveles.length){
		response.send(juego.niveles[usuario.nivel]);
	} else {
		response.send(json);
	}
});

app.get("/confirmarUsuario/:email/:key",function(request,response){
	var email = request.params.email;
	var key = request.params.key;
	console.log(email);
	console.log(key);

	//usuariosCol.find({email:email}).toArray(function(error,usr){
	limboCol.find({email:email,key:key}).toArray(function(error,usr){	
		if (usr.length==0){
			console.log("El usuario no exisste");
			response.send('<h1>La cuenta ya esta activada');
		} else {
			insertarUsuario(usr[0],response);
		}
	});
});


//console.log("Servidor escuchando en el puerto "+port);
//app.listen(port,host);
//app.listen(process.env.PORT || port);

function insertarUsuario(usu,response){
	usuariosCol.insert(usu,function(err){
		if(err){
			console.log("error");
		} else {
			console.log("Nuevo usuario creado");
			limboCol.remove({key:usu.key},function(error,result){
				if(!error){
					console.log('Usuario eliminado del limbo');
				}
			});
			juego.agregarUsuario(usu);
			//response.send(usu);
			response.redirect(url);
			//reenviar
		}
	});
}

function insertarUsuarioLimbo(usu,response){
	limboCol.insert(usu,function(err){
		if(err){
			console.log("error");
		} else {
			console.log("Nuevo usuario creado");
			response.send({email:'ok'});
			enviarEmail(usu.email,usu.key);
		}
	});
}

function insertarResultado(resultado,response){
	console.log(resultado);
	resultadosCol.insert(resultado,function(err){
		if(err){
			console.log("error");
		} else {
			console.log("Nuevo usuario creado");
			juego.agregarResultado(resultado);
		}
	});
}

function enviarEmail(direccion, key){
	var email = {
	  from: 'procesos@gmail.com',
	  to: direccion,
	  subject: 'Confirmar cuenta',
	  text: 'Confirmar cuenta',
	  html: '<a href="'+url+'confirmarUsuario/'+direccion+'/'+key+'">Juego Procesos confirmación</a>'
	};

	client.sendMail(email, function(err, info){
	    if (err ){
	      console.log(err);
	    }
	    else {
	      console.log('Message sent: ' + info.response);
	    }
	});
}

function cargarUsuarios(){
	juego.usuarios=[];
	usuariosCol.find().forEach(function (usr){juego.agregarUsuario(usr);});
}

//console.log(app);
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


mongo.connect("mongodb://pepe:pepe@ds048719.mlab.com:48719/usuarioscn", function(err, db) {
//mongo.connect("mongodb://127.0.0.1:27017/usuarioscn", function(err, db) {
	if (err){
 		console.log("No pudo conectar a la base de datos");
 	} else {
		console.log("Conectado a Mongo: usuarioscn");
		db.collection("usuarios",function(error,col){
			if (error){
				console.log("No pudo obtener la colección usuarios");
			} else {
				console.log("tenemos la colección usuario");
				usuariosCol=col;
				cargarUsuarios();
			}
		});
		db.collection("resultados",function(error,col){
			if (error){
				console.log("No pudo obtener la colección resultados");
			} else {
				console.log("tenemos la colección resultados");
				resultadosCol=col;
			}
		});
		db.collection("limbo",function(error,col){
			if (error){
				console.log("No pudo obtener la colección resultados");
			} else {
				console.log("tenemos la colección limbo");
				limboCol=col;
			}
		});
	}
});


/*var db = new mongo.Db("usuarioscn",new mongo.Server("127.0.0.1",27017,{}));

db.open(function(error){
	console.log("contectado a Mongo: usuarioscn");
	db.collection("usuario",function(error,col){
		console.log("tenemos la colección");
		usuariosCol=col;
		col.insert({
			id:"1",
			name:"Pepe Lopez",
			twitter:"@pepe",
			email:"pepe@lopez.es"
		},function(err){
		if(err){
			console.log("error");
		} else {
			console.log("Nuevo usuario creado");
		}
	});
		//console.log(usuariosCol);
	});	
});*/

