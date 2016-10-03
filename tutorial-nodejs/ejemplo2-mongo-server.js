//instalar express en este ejemplo si no lo teníamos

var fs=require("fs");
var config=JSON.parse(fs.readFileSync("config.json"));
var host=config.host;
var port=config.port;
var exp=require("express");

//incluimos la parte de MongoDB
var mongo=require("mongodb");
var dbHost="127.0.0.1";
var dbPort=mongo.Connection.DEFAULT_PORT;

var app=exp(); //el tutorial indicaba exp.createServer()

app.use(app.router);
app.use(exp.static(__dirname + "/public"));

app.get("/",function(request,response){
	response.send("hola");
});
app.get("/hola/:text",function(request,response){
	response.send("Hola "+request.params.text);
});

app.get("/user/:id",function(request,response){
	getUser(request.params.id,function(user){
		if(!user){
			response.send("usuario no existe",404);
		}
		else{
			response.send("Usuario: "+user.name+" cuenta: "+user.cuenta);
		}
	})	
})

app.get("*",function(request,response){
		response.send("Oh, no ",404);
})

app.listen(port,host);


function getUser(id,callback){
	var db=new mongo.Db("nodejs-introduction",new mongo.Server(dbHost,dbPort,{}));

	db.open(function(error){
		console.log("Conectado a la base de datos "+dbHost+" "+dbPort);

		db.collection("user",function(error,col){
			console.log("Tenemos la colección");

			col.find({"id":id.toString()},function(error,cursor){
				cursor.toArray(function(error,users){
					if (users.length==0){
						callback(false);
					}
					else{
						callback(users[0]);
					}
				})
			})
		})
	})

}