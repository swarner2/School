
var config = {};

if(process.env.dev === 'true'){
	console.log('Running Dev Server');
	config = require('./local_env');
}else{
	console.log('Running Production Server');
	config = {
		port : process.env.PORT,
		email : {
			auth : {
				user : process.env.emailAuthUser,
				password : process.env.emailAuthPassword
			},
			mike : process.env.emailMike,
			sam : process.env.emailSam
		}
	}
}

module.exports = config;