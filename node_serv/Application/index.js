// Import objects
var User = require( './User' );
var Repo = require( './Repo' );

// Application object
var Application = {

		index : function( req, res ){
			res.render( 'index', { title: 'Route Separation Example' } );
		},

		authenticated_view : function( req, res ){
			res.render( 'index', { title: 'Resource Example' } );
		},

		login_view : function( req, res ){
			res.render( 'login', { title: 'Login' } );
		},

		singlePageApp : function( req, res, next ){ 
			//if client request is http, only send them to one page
			if( req.headers['x-requested-with'] === undefined )
				Application.authenticated_view( req, res );
			else
				next();
		}
};

// init app and routes
module.exports = function( server ){

	/**************
	**  APP HOME
	***************/

		server.get( '/', Application.authenticated_view );
		server.get( '/login', Application.login_view );

	
	/**************
	**  RESOURCES
	***************/

		//***** User *****//
		server.resource( '/users', User, [ Application.singlePageApp ] );
		//***** Repo *****//
		server.resource( '/repo', Repo, [ Application.singlePageApp ] );

	return this.Application;
};
