'use strict';

var $ml = {
  specs: {},
  Assert: function(string, timeout, spec) {
    this.string = string;
    this.timeout = timeout;
    this.spec = spec;
    this.fail = window.setTimeout(function() {
      $ml.fail(this.string);
    }.bind(this), this.timeout);
  },
  Expect: function(string, condition) {
    this.string = string;
    this.condition = condition;
  },
  Spec: function(tests) {
    this.tests = [];
    this.tests = this.tests.concat(tests);
  },
  pass: function(message) {
    console.log('%c[PASS]: ' + message, 'color: green');
  },
  fail: function(message, args) {
    console.error('[FAIL]: ' + message);
    console.error(args);
  }
};

$ml.Assert.prototype.respond = function() {
  window.clearTimeout(this.fail);
  $ml.pass(this.string);
};

$ml.Expect.prototype.respond = function() {
  var args = Array.prototype.slice.call(arguments);
  if (this.condition.apply(null, args)) {
    $ml.pass(this.string);
  }
  else {
    $ml.fail(this.string, args);
  }
};

$ml.Spec.prototype.respond = function() {
  var thisData = Array.prototype.slice.call(arguments);

  for (var _i = 0, len = this.tests.length; _i < len; _i++) {
    this.tests[_i].respond(thisData[_i]);
  }
};

module.exports = $ml
