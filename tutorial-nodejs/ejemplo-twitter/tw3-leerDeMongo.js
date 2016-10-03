//Conectar a Twitter con el API de Twitter
var	twitter=require("ntwitter");
var twit=new twitter({
	consumer_key:"----",
	consumer_secret:"----",
	access_token_key:"---",
	access_token_secret:"-----"
});

var fs=require("fs");
var config=JSON.parse(fs.readFileSync("config.json"));
var host=config.host;
var port=config.port;
var exp=require("express");
var app=exp(); //el tutorial indicaba exp.createServer()

app.get("/",function(request,response){
  var contenido=fs.readFileSync("./template.html");
  getTweets(function(tweets){
    var ul="";
    console.log("Obtener tweets");
    tweets.forEach(function(tweet){
      if(typeof(tweet.user)=="undefined")
        ul+="<li><strong>No user</strong>"+tweet.text +"</li>";
      else  
        ul+="<li><strong>"+tweet.user.screen_name+": </strong>"+tweet.text +"</li>";
    });
    contenido=contenido.toString("utf8").replace("{{INITIAL_TWEETS}}",ul);
    response.setHeader("Content-type","text/html");
    response.send(contenido);
  })
});
app.listen(port,host);

var mongo=require("mongodb");
var host="127.0.0.1";
var port=mongo.Connection.DEFAULT_PORT;
var db=new mongo.Db("ntui1",new mongo.Server(host,port,{}));

var tweetCol;

db.open(function(error){
  console.log("Conectado a la base de datos "+host+" "+port);

  db.collection("tweet",function(error,col){
    console.log("Tenemos la colección");
    tweetCol=col;
  });
});

/*
twit.stream('user', {track:'bieber'}, function(stream) {
  stream.on('data', function (data) {
		//console.log(data.text);
    var tweet=data;    
    tweetCol.insert(tweet,function(error){
            if(error){
              console.log("Hubo un error");
            }
            else{
              console.log("Elemento insertado");
            }
          });

  });
  stream.on('end', function (response) {
    // Handle a disconnection
  });
  stream.on('destroy', function (response) {
    // Handle a 'silent' disconnection from Twitter, no end/error event fired
  });
  // Disconnect stream after five seconds
  setTimeout(stream.destroy, 5000);
});
*/

function getTweets(callback)
{
  tweetCol.find({},{"limit":10,"sort":{"_id":-1}},function(error,cursor){
    cursor.toArray(function(error,tweets){
      callback(tweets);
    })
  });
}
