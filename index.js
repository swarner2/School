
var http = require('http');
var static = require( 'node-static' );
var port = process.env.PORT || 5000;

var file = new static.Server( './client', {
    cache: 3600,
    gzip: true
} );

http.createServer( function ( request, response ) {
    request.addListener( 'end', function () {
        file.serve( request, response );
    } ).resume();
} ).listen( port, function() {
  console.log('Node app is running on port', port);
});


