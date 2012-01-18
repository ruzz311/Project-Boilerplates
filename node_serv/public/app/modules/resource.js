// Use an IIFE...
// (http://benalman.com/news/2010/11/immediately-invoked-function-expression/)
// to assign your module reference to a local variable, in this case Resource.
//
// Change line 16 'Resource' to the name of your module, and change line 38 to
// the lowercase version of your module name.  Then change the namespace
// for all the Models/Collections/Views/Routers to use your module name.
//
// For example: Renaming this to use the module name: Project
//
// Line 16: (function(Project) {
// Line 46: })(namespace.module("project"));
//
// Line 18: Project.Model = Backbone.Model.extend({
//
(function(Resource) {

  Resource.Model = Backbone.Model.extend({ /* ... */ });
  Resource.Collection = Backbone.Collection.extend({ 
    model: Resource.Model,
    url: '/users'
  });
  
  /*
  Resource.Router = Backbone.Router.extend({
    routes : {
      'resource' : 'list'
    }
  });
  */
  

  // This will fetch the tutorial template and render it.
  Resource.Views.Index = Backbone.View.extend({
    template: "app/templates/resource.html",

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
  Resource.Views.Item = Backbone.View.extend({
    template: "app/templates/resource.html",

    render: function(done) {
      var view = this;

      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        view.el.innerHTML = tmpl();
        done(view.el);
      });
    }
  });


})(namespace.module("resource"));
