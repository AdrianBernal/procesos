
//1- Conectar con el respositorio
/*
var https=require("https");

var username="jgallud";

var options={
	host:"api.github.com",
	path:"/users/"+username+"/repos",
	method:"GET",
	headers: {'user-agent': 'node.js'}
}

console.log("inicio");

var request=https.request(options,function(response){
	var body="";
	response.on("data",function(chunk){
		body+=chunk.toString("utf8");
	});
	response.on("end",function(){
		console.log("body:",body);
	})
});
request.end();
console.log("fin");
*/

//2- Filtrar el resultado para obtener solamente
//el número de repositorios
/*
var https=require("https");

var username="jgallud";

var options={
	host:"api.github.com",
	path:"/users/"+username+"/repos",
	method:"GET",
	headers: {'user-agent': 'node.js'}
}

var request=https.request(options,function(response){
	var body="";
	response.on("data",function(chunk){
		body+=chunk.toString("utf8");
	});
	response.on("end",function(){
		var json=JSON.parse(body);
		console.log("body:",json.length);
	})
});
request.end();
*/

//3-Este ejemplo crea una coleccion llamada repos donde vamos a introducir
//solamente el nombre y la descripcion de cada repositorio
/*
var https=require("https");

var username="jgallud";

var options={
	host:"api.github.com",
	path:"/users/"+username+"/repos",
	method:"GET",
	headers: {'user-agent': 'node.js'}
}

var request=https.request(options,function(response){
	var body="";
	response.on("data",function(chunk){
		body+=chunk.toString("utf8");
	});
	response.on("end",function(){
		var repos=[];
		var json=JSON.parse(body);
		json.forEach(function(repo){
			repos.push({
				name:repo.name,
				description:repo.description
			});
		});
		console.log("Repositorios:",repos);
	})
});
request.end();
*/

//4- Reutilizar el código transformándolo en una función
/*
var https=require("https");

function getRepos(username,callback){

	var options={
		host:"api.github.com",
		path:"/users/"+username+"/repos",
		method:"GET",
		headers: {'user-agent': 'node.js'}
	}

	var request=https.request(options,function(response){
		var body="";
		response.on("data",function(chunk){
			body+=chunk.toString("utf8");
		});
		response.on("end",function(){
			var repos=[];
			var json=JSON.parse(body);
			json.forEach(function(repo){
				repos.push({
					name:repo.name,
					description:repo.description
				});
			});
			console.log("Repositorios:",repos);
			callback(repos);
		});
		response.on("error",function(error){
			console.log("Error: ",error.message);
		});
	});
	request.end();
}

getRepos("jgallud",function(repos){
		console.log("jgallud tiene "+repos.length + " repositorios");
		console.log("Repos=",repos);
	});

getRepos("tesorieror",function(repos){
		console.log("tesoriero tiene "+repos.length + " repositorios");
		console.log("Repos=",repos);
	});
*/