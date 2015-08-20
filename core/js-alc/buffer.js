(function() {
  var buffer;

  buffer = function(fn, delay) {
    var i;
    k$.bufferArray = k$.bufferArray || new Array();
    if (!k$.bufferArray.length) {
      k$.bufferArray = new Array();
      delay = delay || 500;
      i = 1;
      k$.bufferInterval = setInterval(function() {
        if (k$.bufferArray[i]) {
          k$.bufferArray[i]();
        }
        i++;
        if (i >= k$.bufferArray.length) {
          clearInterval(k$.bufferInterval);
          k$.bufferArray = void 0;
          return i = 1;
        }
      }, delay);
    }
    k$.bufferArray.push(fn);
    if (k$.bufferArray.length === 1) {
      k$.bufferArray[0]();
    }
    return console.info("Function queued (" + k$.bufferArray.length + " in queue)");
  };

  k$.buffer = buffer;

  module.exports = buffer;

}).call(this);
