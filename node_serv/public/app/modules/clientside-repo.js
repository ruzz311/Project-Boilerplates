// Use an IIFE...
// (http://benalman.com/news/2010/11/immediately-invoked-function-expression/)
// to assign your module reference to a local variable, in this case Repo.

(function(Repo) {

  Repo.Model = Backbone.Model.extend({ 
    url:'/repo',
    idAttribute: "_id",
    parse: function( res ) {
      //used because of couchDB
      return res.value;
    }
  });

  Repo.Collection = Backbone.Collection.extend({ 
    url:'/repo', 
    model: Repo.Model 
  });
  
  Repo.db = new Repo.Collection();
  Repo.db.fetch({ 
    success:function(){ log('repo loaded');} 
  });

  Repo.Router = new ( Backbone.Router.extend({ 

    routes : {
      "repo"           : "index",
      "repo/"          : "index",
      "repo/:id"       : "detail",
      "repo/edit/:id"  : "edit",
      "repo/create"    : "create"
    },

    initialize : function( options ){ log( 'Init Repo.Router' ); },

    index : function( id ) {
      var route = this,
          section = new Repo.Views.Section({ el: $('#content') }),
          listview;

      // Attach the user section to the DOM
      section.render( function( el ) {

        //create the user list
        listview = new Repo.Views.List({
          collection: Repo.db,
          el: $( '#repo_content .list' )
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
          section = new Repo.Views.Section({ el: $( '#content' ) }),
          listview;

      // Attach the section to the DOM
      section.render( function( el ) {

        repo = Repo.db.get( id );

        var article = new Repo.Views.Detail({
          model: repo,
          el: $( '.detail', section.$el )
        });
        article.render( function( u ){ });

        log( 'Repo.Router.detail -> fetch success', { repo:repo, view:article })
      });
    },

    edit : function( id ){
      log( 'TODO:Edit Repo', { user_id:id });
      user = Repo.db.get( id );

      var article = new Repo.Views.EditItem({
        model: repo,
        el: $( '#repo_content > .edit' )
      });

      article.render( function( el ){
        article.$el
          .removeClass('hidden')
          .siblings().addClass('hidden');
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
  Repo.Views.Section = Backbone.View.extend({
    template: "/app/templates/repo/section.html",
    render: simple_render
  });

  // This will fetch the tutorial template and render it.
  Repo.Views.List = Backbone.View.extend({
    template: "/app/templates/repo/list.html",
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
      item = new Repo.Views.ListItem({ model: model });
      item.render( function( el ){
        list.$el.find( 'ul' ).append( el );
      });
      model.bind( 'destroy', item.remove );
    },

    createNew: function() {
      log( 'TODO: create action' );
      /* 
      var editView = new Repo.Views.EditItem({
        model: this.model,
        el: $( '#user.edit' )
      });
      */
    }

  });

  Repo.Views.ListItem = Backbone.View.extend({
    template: "/app/templates/repo/list_item.html",
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
      var article = new Repo.Views.Detail({
        model: this.model,
        el: $( '#user_content > .detail' )
      });

      article.render( function( el ){
        $('#user_content').children().addClass('hidden');
        article.$el.removeClass('hidden');
      });
      Repo.Router.navigate("repo/"+this.model.id, {trigger: false});
    },

    openEditDialog : function(){
      var article = new Repo.Views.EditItem({
        model: this.model,
        el: $( '#user_content > .edit' )
      });

      article.render( function( el ){
        $('#user_content').children().addClass('hidden');
        article.$el.removeClass('hidden');
      });
      Repo.Router.navigate("repo/"+this.model.id+"/edit", {trigger: false});
    },

    handleDelete : function(){
      var model = this.model;
      log( "TODO:Destroy actions", { model: this.model })
      this.model.destroy();
      return false;
    }
  });


  Repo.Views.Detail = Backbone.View.extend({
    template: "/app/templates/repo/detail.html",
    className: "detail-item",
    render: model_render
  });


  Repo.Views.EditItem = Backbone.View.extend({
    template: "/app/templates/repo/edit.html",
    className: "edit-item",
    render: model_render
  });


})(namespace.module("repo"));

