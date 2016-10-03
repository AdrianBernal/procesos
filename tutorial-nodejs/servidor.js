//visitar la documentacion nodejs.org

// Ejemplo 1
/*
var http=require("http");
console.log("Inicio");
var host="127.0.0.1";
var port=1337;
var server=http.createServer(function(request,response){
	console.log("Petición recibida: "+request.url);
	response.writeHead(200,{"Content-type":"text/plain"});
	response.end("Hola mundo");
});
server.listen(port,host,function(){
	console.log("Escuchando "+host+":"+port)
});
*/

// Ejemplo 2
//Para este ejemplo hay que crear un directorio public (/node/public)
//e introducir en ese directorio un archivo html
/*
var http=require("http");
var fs=require("fs");
console.log("Inicio");
var host="127.0.0.1";
var port=1337;
var server=http.createServer(function(request,response){
	console.log("Petición recibida:"+request.url);
	fs.readFile("./public"+request.url,function(error,data){
		if(error){
			response.writeHead(404,{"Content-type":"text/plain"});
			response.end("Lo siento, página no encontrada");
		}
		else{
			response.writeHead(200,{"Content-type":"text/html"});
			response.end(data);
		}
	})
	//response.writeHead(200,{"Content-type":"text/plain"});
	//response.end("Hola mundo");
});
server.listen(port,host,function(){
	console.log("Escuchando "+host+":"+port)
});
*/

//Ejemplo 3
//Leemos la configuración (host y puerto) desde el archivo json (config.json)
//prueba modificar la configuracion
/*
var http=require("http");
var fs=require("fs");
console.log("Inicio");
var config=JSON.parse(fs.readFileSync("config.json"));
var host=config.host;//"127.0.0.1";
var port=config.port;//1337;
var server=http.createServer(function(request,response){
	console.log("Petición recibida:"+request.url);
	fs.readFile("./public"+request.url,function(error,data){
		if(error){
			response.writeHead(404,{"Content-type":"text/plain"});
			response.end("Lo siento, página no encontrada");
		}
		else{
			response.writeHead(200,{"Content-type":"text/html"});
			response.end(data);
		}
	})
	//response.writeHead(200,{"Content-type":"text/plain"});
	//response.end("Hola mundo");
});
server.listen(port,host,function(){
	console.log("Escuchando "+host+":"+port)
});
fs.watchFile("config.json",function(){
	config=JSON.parse(fs.readFileSync("config.json"));
	server.close();
	server.listen(config.port,config.host,function(){
		console.log("Escuchando "+config.host+":"+config.port)
	});
})
*/