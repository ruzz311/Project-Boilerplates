MODEL.Obj = Backbone.Model.extend({});

CLASS.Objs = Backbone.Collection.extend({
	
	name: 'references',
	url	: '_assets/data/obj1.json',

	initialize : function( ) {
		var self = this;

		this.views = {
			"list" : new VIEW.Obj.List({ collection: self }),
			"detail"	: function( item_id ) { 
				//var item = self.get( item_id );
				//return new VIEW.Obj.Item({ collection: self, model: item }); 
			}
		};

	}

});



VIEW.Obj = {};
VIEW.Obj.List = Backbone.View.extend({
	
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
VIEW.Obj.ListItem = Backbone.View.extend({
	
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
