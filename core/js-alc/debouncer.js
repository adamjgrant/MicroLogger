(function() {
  var debounce;

  debounce = function(fn, id, delay, args, that) {
    delay = delay || 1000;
    that = that || this;
    args = args || new Array;
    if (typeof k$.debounceQueue[id] !== "object") {
      k$.debounceQueue[id] = new Object();
    }
    if (typeof k$.debounceQueue[id].debounceTimer !== "undefined") {
      clearTimeout(k$.debounceQueue[id].debounceTimer);
    }
    return k$.debounceQueue[id] = {
      fn: fn,
      id: id,
      delay: delay,
      args: args,
      debounceTimer: setTimeout(function() {
        k$.debounceQueue[id].fn.apply(that, k$.debounceQueue[id].args);
        return k$.debounceQueue[id] = void 0;
      }, delay)
    };
  };

  k$.debounce = debounce;

  module.exports = debounce;

}).call(this);
