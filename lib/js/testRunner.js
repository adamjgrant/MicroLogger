var testRunner = {
  specs: {},
  Assert: function(string, timeout, spec) {
    this.string = string;
    this.timeout = timeout;
    this.spec = spec;
    this.fail = window.setTimeout(function() {
      console.error("TESTRUNNER FAIL" + (this.spec || "") + ": " + this.string);
    }.bind(this), this.timeout);
  },
  Spec: function(tests) {
    this.tests = new Array();
    this.tests = this.tests.concat(tests);
  },
  Expect: function() {
    return;
  }
}

testRunner.Assert.prototype.return = function() {
  window.clearTimeout(this.fail);
  console.log("%c TESTRUNNER PASSED: " + this.string, "color: green");
}

testRunner.Spec.prototype.return = function(data) {
  thisData = new Array();
  thisData = thisData.concat(data);

  for (var _i = 0, len = thisData.length; _i < len; _i++) {
    thisDataI = new Array();
    thisDataI = thisDataI.concat(thisData[_i]);

    this.tests[_i].return.apply(this, thisDataI);
  }
}

module.exports = testRunner
