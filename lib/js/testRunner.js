var $tr = {
  specs: {},
  Assert: function(string, timeout, spec) {
    this.string = string;
    this.timeout = timeout;
    this.spec = spec;
    this.fail = window.setTimeout(function() {
      testRunner.fail(this.string);
    }.bind(this), this.timeout);
  },
  Expect: function(string, condition) {
    this.string = string;
    this.condition = condition;
  },
  Spec: function(tests) {
    this.tests = new Array();
    this.tests = this.tests.concat(tests);
  },
  pass: function(message) {
    console.log("%cTESTRUNNER PASSED: " + message, "color: green");
  },
  fail: function(message, args) {
    console.error("TESTRUNNER FAILED: " + message);
    console.error(args);
  }
}

$tr.Assert.prototype.return = function() {
  window.clearTimeout(this.fail);
  $tr.pass(this.string);
}

$tr.Expect.prototype.return = function() {
  var args = Array.prototype.slice.call(arguments);
  if (this.condition.apply(null, args)) {
    $tr.pass(this.string);
  }
  else {
    $tr.fail(this.string, args);
  }
}

$tr.Spec.prototype.return = function() {
  thisData = Array.prototype.slice.call(arguments)

  for (var _i = 0, len = this.tests.length; _i < len; _i++) {
    this.tests[_i].return(thisData[_i]);
  }
}

module.exports = $tr
