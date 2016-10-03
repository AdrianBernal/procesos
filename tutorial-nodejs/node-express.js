//1- primer ejemplo con express
/*
var fs=require("fs");
var config=JSON.parse(fs.readFileSync("config.json"));
var host=config.host;
var port=config.port;
var exp=require("express");
var app=exp(); //el tutorial indicaba exp.createServer()

//app.use(app.router);
app.use(exp.static(__dirname + "/public"));

app.get("/",function(request,response){
	response.send("hola");
});
console.log("Servidor escuchando en "+host+":"+port);
app.listen(port,host);
*/

//2- Devolver la cadena indicada en la url con
//este formato /hola/juanito
/*
var fs=require("fs");
var config=JSON.parse(fs.readFileSync("config.json"));
var host=config.host;
var port=config.port;
var exp=require("express");
var app=exp(); 

//app.use(app.router);
app.use(exp.static(__dirname + "/public"));

app.get("/",function(request,response){
	response.send("hola");
});
app.get("/hola/:text",function(request,response){
	response.send("Hola "+request.params.text);
});
console.log("Servidor escuchando en "+host+":"+port);
app.listen(port,host);
*/

//3-Devolver los valores según un parámetro indicado
//en la url
//Puedes utilizar console.log para que el servidor muestre mensajes
//Observa que el servidor acepta tres rutas / /hola/pepito y /user/numero
/*
var fs=require("fs");
var config=JSON.parse(fs.readFileSync("config.json"));
var host=config.host;
var port=config.port;
var exp=require("express");
var app=exp(); 

//app.use(app.router);
app.use(exp.static(__dirname + "/public"));

app.get("/",function(request,response){
	response.send("hola");
});
app.get("/hola/:text",function(request,response){
	response.send("Hola "+request.params.text);
});
var users ={
	"1":{
		"name":"Pepe Lopez",
		"cuenta":"@pepe"
	},
	"2":{
		"name":"Juan Perez",
		"cuenta":"@juan"
	}
}
app.get("/user/:id",function(request,response){
	var user=users[request.params.id];
	if(user){
		response.send("Usuario: "+user.name+" cuenta: "+user.cuenta);
	}
	else{
		response.send("usuario no existe");
	}
	response.send
})
app.listen(port,host);
*/