
var config = require( './config/config' );
var nodemailer = require("nodemailer");

var fromAddress = 'Latin-School-Heroku-Server';

var auth = function(){
	return nodemailer.createTransport("SMTP",{
	   service: "gmail",
	   auth: {
	       user: config.email.auth.user,
	       pass: config.email.auth.password
	   }
	});
}
console.log('config.email.mike=',config.email.mike);
module.exports.send = function(subject, body){
	auth().sendMail({
		from: fromAddress,
		to: config.email.mike,
		subject: subject,
		text: body
	}, function(error, response){
		if(error){
			console.log("ERROR Email FAILED : " + error);
		}else{
			console.log("Email sent: " + response.message);
		}
	});
}

