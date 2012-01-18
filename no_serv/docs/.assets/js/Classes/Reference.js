MODEL.Reference = Backbone.Model.extend({});

CLASS.References = Backbone.Collection.extend({
	
	name: 'references',
	url	: './IWD/iwd_technology_docs.json',

	initialize : function( ) {
		var self = this;

		this.views = {
			'list' : new VIEW.Reference.List({ collection: self }),
			"detail"	: function( item_id ) { 
				//var item = self.get( item_id );
				//return new VIEW.Reference.Item({ collection: self, model: item }); 
			}
		};

	}

});



VIEW.Reference = {};
VIEW.Reference.List = Backbone.View.extend({
	
	tagName: 'article',
	className : 'references_list',

	initialize : function() {
		_.bindAll( this, 'render' );
		//this.model.bind( 'change', this.render );

		this.template	= _.template( $('#tmpl_reference_listFull').html() );
	},
	
	render : function() {
		var self = this,
				models = this.collection.models,
				$el = $( this.el ).empty();

		_.each( models, function( m ) {
			var rendered = self.template( m.toJSON() );
			$el.append( rendered );
		});

		return this;
	}

});

/*
VIEW.Reference.ListItem = Backbone.View.extend({
	
	tagName: 'li',
	className : 'references_list',

	initialize : function() {
		_.bindAll( this, 'render' );
		//this.model.bind( 'change', this.render );

		this.template	= _.template( $('#tmpl_reference_list').html() );
	},
	
	render : function() {
		var rendered = this.template( this.model );
		$( this.el ).html( rendered );

		return this;
	}

});
*/
