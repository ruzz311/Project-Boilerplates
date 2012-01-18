( function( $ ) {

	$( function() {
		app.loader.init();
	});

})( jQuery );


log = function( ) {
	log.history = log.history || [];
	log.history.push( arguments );
	if( window.console )
		console.log( Array.prototype.slice.call( arguments ) );
};

app.loader = {
	queue					: {},
	completed			: 0,
	logging				: false,

	init : function() {

		_.each( app.loader.queue, function( value, key ){
			if( this.logging ) console.log( 'Started Load of '+key );
			value.call( );
		});

	},

	add_item : function( data ) {
		
		var num_items = _.keys( app.loader.queue ).length;
		app.loader.completed++;
		
		if( this.logging ) dbug.log( 'loaded '+app.loader.completed+' of '+num_items );
		if( num_items == app.loader.completed ) {
			app.loader.run_app();
		}

	},

	run_app : function() {

		app.router = new CLASS.Router();
		Backbone.history.start();

	}

};

// Enter items to be loaded before render here
app.loader.queue = {

	Reference : function(){
		app.references			= new CLASS.References();
		app.references.url	= './IWD/iwd_technology_docs.json';
		app.references.fetch({ success : app.loader.add_item, error:function(d){ alert('oh shit'); } });
	}

};
