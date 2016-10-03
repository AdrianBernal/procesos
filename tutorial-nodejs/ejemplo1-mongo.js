var mongo=require("mongodb");
var host="127.0.0.1";
var port=mongo.Connection.DEFAULT_PORT;

var db=new mongo.Db("nodejs-introduction",new mongo.Server(host,port,{}));

db.open(function(error){
	console.log("Conectado a la base de datos "+host+" "+port);

	db.collection("user",function(error,col){
		console.log("Tenemos la colección");

		col.insert({
			id:"1",
			name:"Pepe Lopez",
			twitter:"@pepe",
			email:"pepe@lopez.es"
		}, function(){
			console.log("Pepe insertado");
		});
		col.insert({
			id:"2",
			name:"Luis Pereez",
			twitter:"@pluis",
			email:"luis@perez.es"
		}, function(){
			console.log("Luis insertado");
		})
	})
})