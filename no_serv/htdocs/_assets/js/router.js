CLASS.Router = Backbone.Router.extend({

	routes	: {
		""			: "home",
		"tech"	: "tech"
	},

	
	initialize : function( options ) {
		this.bind( 'all', this.after );
		app.references = new CLASS.References();
	},


	after : function( route ) {
		log( ':After ('+ route + ')' );
	},


	home : function() {
		log( 'home' );
		//app.references = new CLASS.References({ url: '' });
	},


	tech : function() {
		log( 'tech' );

		/*
		var ref_fetch_success = function( x ) {
			var view = app.references.views.list;
			$( '#content' ).append( view.render().el );
		};
		app.references.fetch({ success : ref_fetch_success });
		*/
	}

});