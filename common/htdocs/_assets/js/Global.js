MODEL.Site = Backbone.Model.extend({});




VIEW.Site = {};
VIEW.Site.Header = Backbone.View.extend({
	
	tagName: 'header',
	className : 'app_header',

	initialize : function() {
		_.bindAll( this, 'render' );
		//this.model.bind( 'change', this.render );
		this.template	= _.template( $('#tmpl_app_header').html() );
	},
	
	render : function() {
		var self = this,
				$el = $( this.el ).empty();

		var rendered = self.template( new MODEL.Site( app.config ) );
		$el.append( rendered );

		return this;
	}

});

$( function() {
	var x = new VIEW.Site.Header();
	$('body').append( x );
});