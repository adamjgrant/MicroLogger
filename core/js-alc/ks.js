(function() {
  global.k$ = new Object();

  k$.$$ = function(el) {
    return document.querySelectorAll(el);
  };

  k$.$ = function(el) {
    return k$.$$(el)[0];
  };

  k$.extend = function(destination, source) {
    var property;
    for (property in source) {
      if (source[property] && source[property].constructor && source[property].constructor === Object) {
        destination[property] = destination[property] || {};
        arguments.callee(destination[property], source[property]);
      } else {
        destination[property] = source[property];
      }
    }
    return destination;
  };

  k$.debounceQueue = new Object;

  module.exports = k$;

}).call(this);
