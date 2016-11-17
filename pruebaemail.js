var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

var options = {
  auth: {
    api_user: 'a2b1987',
    api_key: '100_Procesos'
  }
}

var client = nodemailer.createTransport(sgTransport(options));

var email = {
  from: 'adrian.bernal@alu.uclm.es',
  to: 'a2b1987@gmail.com',
  subject: 'Hello',
  text: 'Hello world',
  html: '<b>Hello world</b>'
};

client.sendMail(email, function(err, info){
    if (err ){
      console.log(err);
    }
    else {
      console.log('Message sent: ' + info.response);
    }
});