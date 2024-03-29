// Use an IIFE...
// (http://benalman.com/news/2010/11/immediately-invoked-function-expression/)
// to assign your module reference to a local variable, in this case User.

(function(User) {

  //TODO: build template preloader
  //User.preloadTemplates = function(){};


  User.Model = Backbone.Model.extend({ 
    url:'/users',
    idAttribute: "_id",
    parse: function( res ) {
      //used because of couchDB
      return res.value;
    }
  });

  User.Collection = Backbone.Collection.extend({ url:'/users', model: User.Model });
  User.db = new User.Collection();
  User.db.fetch();

  User.Router = new ( Backbone.Router.extend({ 

    routes : {
      "users"           : "index",
      "users/"          : "index",
      "users/:id"       : "detail",
      "users/edit/:id"  : "edit",
      "users/create"    : "create"
    },

    initialize : function( options ){ log( 'Init User.Router' ); },

    index : function( id ) {
      var route = this,
          section = new User.Views.Section({ el: $('#content') }),
          listview;

      // Attach the user section to the DOM
      section.render( function( el ) {

        //create the user list
        listview = new User.Views.List({
          collection: User.db,
          el: $( '#user_content .list' )
        });

        // render list to page
        listview.render( function( ls ){
          //add all list-items
          listview.addAll();
        });

      });
    },

    detail : function( id ){
      var route = this,
          section = new User.Views.Section({ el: $( '#content' ) }),
          listview;

      // Attach the section to the DOM
      section.render( function( el ) {

        user = User.db.get( id );

        var article = new User.Views.Detail({
          model: user,
          el: $( '.detail', section.$el )
        });
        article.render( function( u ){ });

        log( 'User.Router.detail -> user.fetch success', { user:user, view:article })
      });
    },

    edit : function( id ){
      log( 'TODO:Edit User', { user_id:id });
      user = User.db.get( id );

      var article = new User.Views.EditItem({
        model: user,
        el: $( '#user_content > .edit' )
      });

      article.render( function( el ){
        $('#user_content').children().addClass('hidden');
        article.$el.removeClass('hidden');
      });
    }
    
  }))();

  var simple_render = function( done ) {
    var view = this;
    // Fetch the template, render it to the View element and call done.
    namespace.fetchTemplate( this.template, function( tmpl ) {
      view.el.innerHTML = tmpl();
      done(view.el);
    });
  };
  var model_render = function( done ) {
    var view = this;
    namespace.fetchTemplate( this.template, function( tmpl ) {
      view.el.innerHTML = tmpl( view.model.toJSON() );
      done(view.el);
    });
  };

  // This will fetch the tutorial template and render it.
  User.Views.Section = Backbone.View.extend({
    template: "/app/templates/users/section.html",
    render: simple_render
  });

  // This will fetch the tutorial template and render it.
  User.Views.List = Backbone.View.extend({
    template: "/app/templates/users/list.html",
    events : { "click button.create" : "createNew" },

    initialize: function( options ) { 
      _.bindAll( this, 'render', 'addAll', 'addOne' );
      this.collection.bind( 'add', this.addOne );
    },

    render: function( done ) {
      var view = this;

      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate( this.template, function( tmpl ) {
        view.el.innerHTML = tmpl();
        done( view.el );
      });
      return this;
    },

    addAll: function() { 
      this.collection.each( this.addOne ); 
    },

    addOne: function( model ) {
      var list = this;
      item = new User.Views.ListItem({ model: model });
      item.render( function( el ){
        list.$el.find( 'ul' ).append( el );
      });
      model.bind( 'destroy', item.remove );
    },

    createNew: function() {
      log( 'TODO: create action' );
      /* 
      var editView = new User.Views.EditItem({
        model: this.model,
        el: $( '#user.edit' )
      });
      */
    }

  });

  User.Views.ListItem = Backbone.View.extend({
    template: "/app/templates/users/list_item.html",
    tagName: "li",
    className: "document-row",

    events: {
      "click span"          : "open",
      "click button.edit"   : "openEditDialog",
      "click button.delete" : "handleDelete"
    },

    initialize : function( options ){
      options.model.bind( 'change', this.render, this );
      options.model.bind( 'destroy', this.remove, this );
    },

    render: model_render,

    open : function(){
      var article = new User.Views.Detail({
        model: this.model,
        el: $( '#user_content > .detail' )
      });

      article.render( function( el ){
        $('#user_content').children().addClass('hidden');
        article.$el.removeClass('hidden');
      });
      User.Router.navigate("users/"+this.model.id, {trigger: false});
    },

    openEditDialog : function(){
      var article = new User.Views.EditItem({
        model: this.model,
        el: $( '#user_content > .edit' )
      });

      article.render( function( el ){
        $('#user_content').children().addClass('hidden');
        article.$el.removeClass('hidden');
      });
      User.Router.navigate("users/"+this.model.id+"/edit", {trigger: false});
    },

    destroySuccess : function( model, response ){ alert( 'That shit is gone! '+response ); },
    destroyError : function( model, response ){ alert( 'fuck - the destroy did not work! '+response ); },
    handleDelete : function(){
      var model = this.model;
      log( "TODO:Destroy actions", { model: this.model })
      this.model.destroy();
      return false;
    }
  });


  User.Views.Detail = Backbone.View.extend({
    template: "/app/templates/users/detail.html",
    className: "detail-item",
    render: model_render
  });


  User.Views.EditItem = Backbone.View.extend({
    template: "/app/templates/users/edit.html",
    className: "edit-item",
    render: model_render
  });


})(namespace.module("user"));

