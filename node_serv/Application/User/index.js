/**
 * Module dependencies.
 */

var nano    = require( 'nano' )( 'http://127.0.0.1:5984' ),
    request = require( 'request' ),
    db_name = "my_couch",
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

// Fake controller.

var User = {

  find_by : function( type, query ){
    var result = null;

    switch( type ){
      case 'name':
        break;
      case 'email':
        break; 
      case 'id':
        result = users[ query ] || { error: 'Cannot find user' };
        break;
      default:
        result = users || { error: 'No Users!' };
        break;
    }
    return result;
  },

  route : {
    before: function(){
      next();
    },
    after: function(){
      next();
    },

    index: function( req, res ){
      console.log( 'USER::INDEX');
      data = db.view( "hello", "world", {"include_docs":"true"}, function ( _, data ) {
        console.log( 'USER::INDEX::DB.View complete', { self:this, _:_, data:data });
        res.render( 'users', { title: "Title", data: data.rows });
      });
      res.send( users );
    },

    show: function( req, res ){
      var result = User.find_by( 'id', req.params.id );
      res.send( result || { error: 'Cannot find user' } );
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