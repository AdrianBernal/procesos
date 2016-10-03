//Para poder hacer este ejemplo hay que obtener 4 claves en dev.twitter.com
// 1- consumer key
// 2- secret key
// 3- token access
// 4- secret access token

var OAuth = require('OAuth');
var oauth = new OAuth.OAuth(
      'https://api.twitter.com/oauth/request_token',
      'https://api.twitter.com/oauth/access_token',
      'consumer key',
      'consumer secret key',
      '1.0A',
      null,
      'HMAC-SHA1'
    );
    oauth.get(
      //ejemplo1: trends
      //'https://api.twitter.com/1.1/trends/place.json?id=23424977',
      //ejemplo2: mentions:timeline
      //'https://api.twitter.com/1.1/statuses/mentions_timeline.json?count=2&since_id=14927799',
      //ejemplo 3: obtener los últimos 4 twits por screen_name
      'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=nodejs&count=4',
      'access token key', 
      //you can get it at dev.twitter.com for your own apps
      'access token secret', 
      //you can get it at dev.twitter.com for your own apps
      function (e, data, res){
        var twit;
        if (e) console.error(e);  
        twit=JSON.parse(data);
        twit.forEach(function(el){
          console.log(el.text);      
        });
        //console.log(require('util').inspect(data));
        //done();      
      });    
