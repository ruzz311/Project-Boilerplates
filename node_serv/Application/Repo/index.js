/**
 * Module dependencies.
 */

var request = require( 'request' ),
    nano    = require( 'nano' )( 'http://127.0.0.1:5984' ),
    db_name = "repo",
    db      = nano.use( db_name );


// Fake records

var repo = [
    { name: 'tj' },
    { name: 'ciaran' }, 
    { name: 'aaron' }, 
    { name: 'guillermo' },
    { name: 'simon' },
    { name: 'tobi' }
];

// Controller.

var Repo = {
  find_by : function( type, query, cb ){
    var result = null;
    switch( type ){
      case 'name':
        break;
      case 'email':
        break; 
      case 'id':
        db.get( query, cb );
        break;
      default:
        db.view( 'repo', 'all', cb );
        break;
    }
    //return result;
  },

  route : {

    index: function( req, res ){
      
      db.view( 'repo', 'all', function ( error, data, headers ) {
        if(error) { return res.send( error.message, error['status-code']); }
        res.send( data.rows, 200 );
      });

    },

    show: function( req, res ) {
      
      Repo.find_by( 'id', req.params.id, function( error, data, headers ){
        if(error) { 
          console.log( error, error['status-code'] );
          return res.send( error.message, error['status-code']); 
        }
        res.send( data.rows, 200 );
        console.log( 'Repo::show', req.params.id );
      });

    },

    destroy: function( req, res ){
      var id = req.params.id;
      var destroyed = id in repo;
      delete repo[id];
      res.send(destroyed ? 'destroyed' : 'Cannot find user');
    },

    range: function(req, res, a, b, format){
      var range = repo.slice(a, b + 1);
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

module.exports = Repo;

