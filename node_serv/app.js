
/**
 * Module dependencies.
 */

var express = require( 'express' ),
    crypto  = require( 'crypto' ),
    stylus  = require( 'stylus' ),
    nib     = require( 'nib' )(),    
    server  = express.createServer();


/**************
**  CONFIG
***************/

  server.configure(function(){

    server.styl_compile = function( str, path ) {
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
    
    server.set( 'views', __dirname + '/views' ); 
    server.set( 'view engine', 'jade' );
    server.use( express.logger({ format: ':date :url :method' }) );
    server.use( express.bodyParser() );
    server.use( express.methodOverride() );
    server.use( express.cookieParser() );
    server.use( express.session({ secret: 'your secret here' }) );
    server.use( stylus.middleware({ 
      src: __dirname + '/public/assets/', 
      compile: server.styl_compile 
      }) 
    );
    server.use( server.router );
    server.use( express.static(__dirname + '/public') );
  });

  server.configure('development', function(){
    server.set('view options', { pretty: true });
    server.use( express.errorHandler({ dumpExceptions: true, showStack: true }) ); 
  });

  server.configure('production', function(){
    server.set('view options', { pretty: false });
    server.use( express.errorHandler() );
  });


  server.resource = function( path, obj, mw ) {
    
    //if no middleware has been declaired, create empty middleware stack
    if( mw === undefined || mw.length < 1) mw = [];

    //list all objects
    this.get( path, mw, obj.route.index );

    //list range of objects
    this.get( path + '/:a..:b.:format?', mw, function(req, res){
      var a = parseInt( req.params.a, 10 ), 
          b = parseInt( req.params.b, 10 ), 
          format = req.params.format;
      obj.route.range( req, res, a, b, format );
    });

    //show object
    this.get( path + '/:id', mw, obj.route.show );

    //destroy object
    this.del( path + '/:id', mw, obj.route.destroy );
  };

/**************
**  APPLICATION
***************/
  Application = require( './Application' )( server );


/**************
**  SERVER START
***************/
  server.listen( 3111 );
  console.log("Express server listening on port %d in %s mode", server.address().port, server.settings.env);
