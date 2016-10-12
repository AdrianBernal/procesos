
var fs=require("fs");
var config=JSON.parse(fs.readFileSync("config.json"));
var host=config.host;
var port=config.port;
var exp=require("express");
var app=exp(); 
var modelo=require("./servidor/modelo.js");

var juego= new modelo.Juego();

//app.use(app.router);
app.use(exp.static(__dirname +"/cliente"));

app.get("/",function(request,response){
	var contenido=fs.readFileSync("./index.html");
	response.setHeader("Content-type","text/html");
	response.send(contenido);
});

app.get("/crearUsuario/:nombre",function(request,response){
	//To-Do: crear el usuario con el nombre
	var usuario = new modelo.Usuario(request.params.nombre);
	juego.agregarUsuario(usuario);
	console.log("Nombre: "+usuario.nombre);
	response.json(usuario);
});

console.log("Servidor escuchando en el puerto "+port);
//app.listen(port,host);
app.listen(process.env.PORT || port);
