//===== Safe console.log (via Paul Irish)  [ example: log('message', this, {param:val}) ]
  window.log = function(){
    log.history = log.history || [];
    log.history.push(arguments);
    if( this.console && (window.location.hostname == 'localhost' || window.location.hostname == '127.0.0.1') ){
      console.log( Array.prototype.slice.call(arguments) );
    }
  };

//===== interpolate like moustache
_.templateSettings = { interpolate : /\{\{(.+?)\}\}/g};


// Change *namespace* to your namespace!
// This contains the module definition factory function, application state,
// events, and the router.
this.namespace = {
  // Assist with code organization, by breaking up logical components of code
  // into modules.
  module: function() {
    // Internal module cache.
    var modules = {};

    // Create a new module reference scaffold or load an existing module.
    return function(name) {
      // If this module has already been created, return it.
      if (modules[name]) {
        return modules[name];
      }

      // Create a module and save it under this name
      return modules[name] = { Views: {} };
    };
  }(),

  // This is useful when developing if you don't want to use a
  // build process every time you change a template.
  //
  // Delete if you are using a different template loading method.
  fetchTemplate: function(path, done) {
    window.JST = window.JST || {};

    // Should be an instant synchronous way of getting the template, if it
    // exists in the JST object.
    if (JST[path]) {
      return done(JST[path]);
    }

    // Fetch it asynchronously if not available from JST
    return $.get(path, function(contents) {
      var tmpl = _.template(contents);
      JST[path] = tmpl;

      done(tmpl);
    });
  },

  // Keep active application instances namespaced under an app object.
  app: _.extend({}, Backbone.Events)
};
