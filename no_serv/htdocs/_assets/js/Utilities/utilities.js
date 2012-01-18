
//Loads items in "app.loader.queue" until all items in "this.queue" have been reported loaded
util.loader = {
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
		var loader = util.loader;
		var num_items = _.keys( loader.queue ).length;
		loader.completed++;
		
		if( this.logging ) 
			dbug.log( 'loaded '+loader.completed+' of '+num_items );

		if( num_items == loader.completed )
			loader.run_app();

	},

	run_app : function() {

		app.router = new CLASS.Router();
		Backbone.history.start();

	}

};

// Enter items to be loaded before render here
util.loader.queue = {

	Reference : function() {
		var error_action = function( d ){ 
			log( 'loader::queue::Reference error', this, { d:d } );
		};
		app.references			= new CLASS.References();
		app.references.url	= './IWD/iwd_technology_docs.json';
		app.references.fetch({ 
			success : app.loader.add_item, 
			error		: error_action 
		});
	}

};
