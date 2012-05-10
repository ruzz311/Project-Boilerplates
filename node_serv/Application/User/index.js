/**
 * Module dependencies.
 */

var request = require( 'request' ),
    nano    = require( 'nano' )( 'http://127.0.0.1:5984' ),
    db_name = "users",
    db      = nano.use( db_name );


// Fake records

var users = [
    { name: 'tj' },
    { name: 'ciaran' }, 
    { name: 'aaron' }, 
    { name: 'guillermo' },
    { name: 'simon' },
    { name: 'tobi' }
];

// Controller.

var User = {
  find_by : function( type, query, cb ){
    var result = null;
    switch( type ){
      case 'name':
        break;
      case 'email':
        break; 
      case 'id':
        db.get( query, cb );
        //result = users[ query ] || { error: 'Cannot find user' };
        break;
      default:
        db.view( 'users', 'all', cb );
        break;
    }
    //return result;
  },

  loadUser : function(req, res, next) {
    // You would fetch your user from the db
    var user = users[req.params.id];
    if (user) {
      req.user = user;
      next();
    } else {
      next(new Error('Failed to load user ' + req.params.id));
    }
  },

  andRestrictToSelf : function(req, res, next) {
    // If our authenticated user is the user we are viewing then everything is fine :)
    if (req.authenticatedUser.id == req.user.id) {
      next();
    } else {
      // You may want to implement specific exceptions
      // such as UnauthorizedError or similar so that you
      // can handle these can be special-cased in an error handler
      // (view ./examples/pages for this)
      next(new Error('Unauthorized'));
    }
  },

  andRestrictTo : function(role) {
    return function(req, res, next) {
      if (req.authenticatedUser.role == role) {
        next();
      } else {
        next(new Error('Unauthorized'));
      }
    };
  },

  route : {

    index: function( req, res ){
      
      db.view( 'users', 'all', function ( error, data, headers ) {
        if(error) { return res.send( error.message, error['status-code']); }
        res.send( data.rows, 200 );
      });

    },

    show: function( req, res ) {
      
      User.find_by( 'id', req.params.id, function( error, data, headers ){
        if(error) { 
          console.log( error, error['status-code'] );
          return res.send( error.message, error['status-code']); 
        }
        res.send( data.rows, 200 );
        console.log( 'User::show', req.params.id );
      });

    },

    destroy: function( req, res ){
      var id = req.params.id;
      var destroyed = id in users;
      delete users[id];
      res.send(destroyed ? 'destroyed' : 'Cannot find user');
    },

    range: function(req, res, a, b, format){
      var range = users.slice(a, b + 1);
      switch (format) {
        case 'json':
          res.send(range);
          break;
        default:
          var html = '<ul>' + range.map(function(user){
            return '<li>' + user.name + '</li>';
          }).join('\n') + '</ul>';
          res.send(html);
          break;
      }
    }
  }
};

module.exports = User;


// EXAMPLE:
//  app.resource( '/users', require( './Application/User' ) );
// RESULT:
//  curl http://localhost:3000/users     -- responds with all users
//  curl http://localhost:3000/users/1   -- responds with user 1
//  curl http://localhost:3000/users/4   -- responds with error
//  curl http://localhost:3000/users/1..3 -- responds with several users
//  curl -X DELETE http://localhost:3000/users/1  -- deletes the user