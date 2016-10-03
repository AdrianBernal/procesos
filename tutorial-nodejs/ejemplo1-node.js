
//1-Usar métodos síncronos y asíncronos para 
//leer archivos
/*
var fs=require("fs");
console.log("Comienza la ejecución");

//método asíncrono readFile
fs.readFile("sample.txt",function(error,data){
	console.log("lectura asíncrona-contenidos del archivo: "+data);
});
console.log("estamos en ello");

//fs.readFileSync
console.log("lectura síncrona");
var contenido=fs.readFileSync("sample.txt");//,function(error,data){
console.log("contenidos del archivo: "+contenido);
console.log("archivo leído");
*/

//leer fichero de configuracion
/*
var fs=require("fs");
console.log("Inicio");
var contenido=fs.readFileSync("config2.json");
console.log("Contenidos "+contenido);

var config=JSON.parse(contenido);
console.log("config",config);
console.log("username=",config.username);
*/

//2-escribir archivos
//hay dos métodos, síncrono y asíncrono
/*
var fs=require("fs");
console.log("Inicio");

//escritura síncrona
fs.writeFileSync("nuevo.txt","Hola mundo sinc");
console.log("fin");
*/

//el método asíncrono se suele usar para escribir logs
/*
fs.writeFile("nuevoAsinc.txt","Hola mundo asinc",function(error){
	console.log("terminé de escribir el archivo asinc");
});
console.log("escribiendo el archivo");
*/

//watch archivos
/*
var fs=require("fs");
console.log("inicio");
var config=JSON.parse(fs.readFileSync("config.json"));
console.log("Configuración inicial: ",config);
fs.watchFile("config.json",function(current,previous){
	console.log("Configuracion modificada");
	config=JSON.parse(fs.readFileSync("config.json"));
	console.log("nuevo archivo",config);
})*/
