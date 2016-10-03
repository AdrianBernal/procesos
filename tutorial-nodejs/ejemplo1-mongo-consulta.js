var mongo=require("mongodb");
var host="127.0.0.1";
var port=mongo.Connection.DEFAULT_PORT;

var db=new mongo.Db("nodejs-introduction",new mongo.Server(host,port,{}));

db.open(function(error){
	console.log("Conectado a la base de datos "+host+" "+port);

	db.collection("user",function(error,col){
		console.log("Tenemos la colección");

		col.find({"id":"1"},function(error,cursor){
			cursor.toArray(function(error,users){
				if (users.length==0){
					console.log("No se encontraron usuarios");
				}
				else{
					console.log("Encontrado un usuario: ",users[0]);
				}
			})
		})
	})
})