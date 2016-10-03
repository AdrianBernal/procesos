//Conectar a Twitter con el API de Twitter
var	twitter=require("ntwitter");
var twit=new twitter({
	consumer_key:"-----",
	consumer_secret:"------",
	access_token_key:"-----",
	access_token_secret:"----"
});



twit.stream('user', {track:'bieber'}, function(stream) {
  stream.on('data', function (data) {
		console.log(data.text);
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
