// Use an IIFE...
// (http://benalman.com/news/2010/11/immediately-invoked-function-expression/)
// to assign your module reference to a local variable, in this case User.

(function(User) {

  User.Model = Backbone.Model.extend({ 
    
    url:'/users',

    parse: function( res ) {
      //used because of the return from couchDB
      return res.value;
    }

  });


  User.Collection = Backbone.Collection.extend({ 
    
    url:'/users',
    model: User.Model

  });
  User.db = new User.Collection();
  User.db.fetch();


  User.Router = Backbone.Router.extend({ 

    routes : {
      "users" : "index"
    },

    initialize : function( options ){
      console.log( 'Init User.Router' );
    },

    index : function(){
      var route = this;
      var section = new User.Views.Section();

      // Attach the section to the DOM
      section.render(function(el) {
        
        $( '#content' ).html(el);
        var listview = new User.Views.List({
          collection: User.db,
          el: $( '#users .list' )
        });

        listview.render();
      });
    }
  });

  User.Templates = {
    listContainer : _.template( '<h2><span>User List</span><button class="create">+</button></h2> <ul></ul>' ),
    listItem : _.template( '<span>{{name}}</span><button class="edit">edit</button><button class="delete">delete</button>' ),
    editItem : _.template( '<input type="text" value="{{name}}"/> <button class="save">save</button><button class="cancel">Cancel</button>' )
  };


  // This will fetch the tutorial template and render it.
  User.Views.Section = Backbone.View.extend({
    template: "app/templates/users.html",

    render: function(done) {
      var view = this;

      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {

        view.el.innerHTML = tmpl();
        done(view.el);

      });
    }
  });

  // This will fetch the tutorial template and render it.
  User.Views.List = Backbone.View.extend({

    events : {
      "click button.create" : "createNew"
    },

    initialize: function( options ) { 
      this.template = User.Templates.listContainer;
      _.bindAll( this, 'render', 'addAll', 'addOne' );
      this.collection.bind( 'add', this.addOne );
    },

    render: function() { 
      this.$el.html( this.template() );
      this.addAll(); 
      return this;
    },

    addAll: function() { 
      this.collection.each( this.addOne ); 
    },

    addOne: function( model ) { 
      view = new User.Views.ListItem({ model: model  });
      view.render();
      this.$el.find( 'ul' ).append( view.el ); 
      model.bind( 'remove', view.remove );
    },

    createNew: function(){
      console.log( 'TODO: create action' );
      /*
      var editView = new User.Views.EditItem({
        model: this.model,
        el: $( '#user.edit' )
      });
      */
    }

  });

  User.Views.ListItem = Backbone.View.extend({
    tagName: "li",
    className: "document-row",

    events: {
      "click .icon"         : "open",
      "click button.edit"   : "openEditDialog",
      "click button.delete" : "destroy"
    },

    initialize : function( options ){ this.template = User.Templates.listItem; },

    render: function(){
      $( this.$el ).html( this.template( this.model.toJSON() ) );
      return this;
    },

    open : function(){
      console.log( "TODO:open dialog" );
      /*
      var editView = new User.Views.EditItem({
        model: this.model,
        el: $( '#user.edit' )
      });
      */
    },

    openEditDialog : function(){
      console.log( "TODO:edit dialog" );
      /*
      var editView = new User.Views.EditItem({
        model: this.model,
        el: $( '#user.edit' )
      });
      */
    },

    destroySuccess : function( model, response ){ alert( 'That shit is gone! '+response ); },
    destroyError : function( model, response ){ alert( 'fuck - the destroy did not work! '+response ); },

    destroy : function(){
      console.log( "TODO:Destroy actions" );

      this.model.destroy();
    }

  });

  User.Views.EditItem = Backbone.View.extend({

    className: "edit-item",

    initialize : function( options ){
      this.template = User.Templates.editItem;
    },

    render: function(){
      $( this.$el ).html( this.template( this.model.toJSON() ) );
      return this;
    }
  });


})(namespace.module("user"));
