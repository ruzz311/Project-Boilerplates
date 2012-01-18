var Application = {

    index : function( req, res ){
        res.render( 'index', { title: 'Route Separation Example' } );
    }

};

module.exports = function( app ){
    return this.Application;
};