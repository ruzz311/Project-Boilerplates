

/**
 * Module dependencies.
 */

var express = require( 'express' ),
    crypto  = require( 'crypto' ),
    stylus  = require( 'stylus' ),
    nib     = require( 'nib' )();
    
//var request = require('request');
var server  = express.createServer();

var compile = function( str, path ) {
  return stylus( str )
    .set( 'filename', path )
    .set( 'warn', false )
    .set( 'compress', false )
    .set( 'firebug', false )
    .set( 'lineos', true )
    .use( nib )
    .import( 'nib' );
    //.import( appdir['public']+'/stylesheets/src/common.styl' );
};


/**************
**  CONFIG
***************/

  server.configure(function(){
    server.set( 'views', __dirname + '/views' ); 
    server.set( 'view engine', 'jade' );
    server.use( express.logger({ format: ':date :url :method' }) );
    server.use( express.bodyParser() );
    server.use( express.methodOverride() );
    server.use( express.cookieParser() );
    server.use( express.session({ secret: 'your secret here' }) );
    server.use( stylus.middleware({ 
      src: __dirname + '/public/assets/', 
      compile: compile 
      }) 
    );
    server.use( server.router );
    server.use( express.static(__dirname + '/public') );
  });

  server.configure('development', function(){
    server.use( express.errorHandler({ dumpExceptions: true, showStack: true }) ); 
  });

  server.configure('production', function(){
    server.use( express.errorHandler() );
  });


/**************
**  RESOURCES
***************/

  // Ad-hoc resource method example
  server.resource = function( path, obj ) {
    this.get( path, obj.route.index );
    this.get( path + '/:a..:b.:format?', function(req, res){
      var a = parseInt( req.params.a, 10 ), 
          b = parseInt( req.params.b, 10 ), 
          format = req.params.format;
      obj.route.range( req, res, a, b, format );
    });
    this.get( path + '/:id', obj.route.show );
    this.del( path + '/:id', obj.route.destroy );
  };

  //User
  var User = require( './Application/User' );
  server.resource( '/users', User );



/**************
**  APP HOME
***************/
  //var Dash = require('./Application');

  server.get( '/', function( req, res ){
    res.render( 'index', { title: 'Resource Example' } );
  });

  //server.get( '/settings', Dash.index );


server.listen( 3111 );
console.log( 'Express server started on port 3111' );















/**
 * Module dependencies.
 */


/*

  var express = require('express')
    , routes = require('./routes')

  var server = module.exports = express.createServer();

  // Configuration

  server.configure(function(){
    server.set('views', __dirname + '/views');
    server.set('view engine', 'jade');
    server.use(express.bodyParser());
    server.use(express.methodOverride());
    server.use(express.cookieParser());
    server.use(express.session({ secret: 'your secret here' }));
    server.use(require('stylus').middleware({ src: __dirname + '/public' }));
    server.use(server.router);
    server.use(express.static(__dirname + '/public'));
  });

  server.configure('development', function(){
    server.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
  });

  server.configure('production', function(){
    server.use(express.errorHandler()); 
  });

  // Routes

  server.get('/', routes.index);

  server.listen(3000);
  console.log("Express server listening on port %d in %s mode", server.address().port, server.settings.env);

*/

