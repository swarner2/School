
var http = require('http');
var static = require( 'node-static' );
var config = require( './server/config/config' );


var file = new static.Server( './client', {
    cache: 3600,
    gzip: true
} );

http.createServer( function ( request, response ) {
    request.addListener( 'end', function () {
        file.serve( request, response );
    }).resume();
}).listen( config.port, function() {
  console.log('Node app is running on port', config.port);
});

/*
var email = require('./server/email');
email.send('Testing Subject','This is the body of the email');
*/
