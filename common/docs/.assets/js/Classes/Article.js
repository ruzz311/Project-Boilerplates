

/***** COLLECTION *****/

COLLECTION.Articles = Backbone.Collection.extend({

	name: 'articles',
	url	: './IWD/iwd_technology_docs.json',

	initialize : function( ) {
		var self = this;
	},

	get_first : function( n ) {
		return _.first( this, 5 );
	}

});


/***** VIEW *****/

VIEW.Articles = Backbone.Collection.extend({
	initialize : function(){},
	render : function(){}
});

VIEW.Article = Backbone.Collection.extend({
	initialize : function(){},
	render : function(){}
});


TEMPLATE.Article.list_item = _.template('<a href="{{ name }}></a>');
TEMPLATE.Article.detail_item = _.template("hello: {{ name }}");

