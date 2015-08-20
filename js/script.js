(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./lib/coffee/app.coffee":[function(require,module,exports){
var KS, vendor;

KS = require('../../lib-core/coffee/app');

window['testRunner'] = require('../js/testRunner');

vendor = require('./vendor/index');

document.addEventListener('DOMContentLoaded', function() {
  var someVar, someVar2;
  someVar = 0;
  someVar2 = void 0;
  k$.$('button#first').addEventListener('click', function() {
    return testRunner.waitForButton = new testRunner.Assert("button was pressed in less than 3 seconds", 3000);
  });
  k$.$('button#second').addEventListener('click', function() {
    return testRunner.waitForButton["return"]();
  });
  k$.$('button#third').addEventListener('click', function() {
    return testRunner.specs.waitTwiceForButton = new testRunner.Spec([testRunner.waitForButton = new testRunner.Assert("button was pressed in less than 3 seconds", 3000), testRunner.waitForButton = new testRunner.Assert("button was pressed in less than 5 seconds", 5000)]);
  });
  k$.$('button#fourth').addEventListener('click', function() {
    return testRunner.specs.waitTwiceForButton["return"]();
  });
  k$.$('button#setone').addEventListener('click', function() {
    someVar = 1;
    return testRunner.getOne["return"](someVar);
  });
  k$.$('button#settwo').addEventListener('click', function() {
    someVar = 2;
    return testRunner.getOne["return"](someVar);
  });
  k$.$('button#getone').addEventListener('click', function() {
    return testRunner.getOne = new testRunner.Expect("variable is set to 1", function(variable) {
      return variable === 1;
    });
  });
  k$.$('button#final').addEventListener('click', function() {
    return testRunner.specs.getOneQuickly = new testRunner.Spec([
      new testRunner.Expect("variable is set to 1", function(variable) {
        return variable === 1;
      }), new testRunner.Assert("variable is set in less than 3 seconds", 3000)
    ]);
  });
  k$.$('button#setonetwo').addEventListener('click', function() {
    someVar2 = 1;
    return testRunner.specs.getOneQuickly["return"](someVar2, null);
  });
  return k$.$('button#settwotwo').addEventListener('click', function() {
    someVar2 = 2;
    return testRunner.specs.getOneQuickly["return"](someVar2, null);
  });
});



},{"../../lib-core/coffee/app":"/Users/adamgrant/sites/testrunner/lib-core/coffee/app.coffee","../js/testRunner":"/Users/adamgrant/sites/testrunner/lib/js/testRunner.js","./vendor/index":"/Users/adamgrant/sites/testrunner/lib/coffee/vendor/index.coffee"}],"/Users/adamgrant/sites/testrunner/lib-core/coffee/app.coffee":[function(require,module,exports){
var Buffer, Buttons, Debounce, Dropdown, Growl, Icons, KS, Modal, Navbar, Status, Tabs, Throttler;

KS = require('./ks');

Modal = require('./modal');

Navbar = require('./navbar');

Debounce = require('./debouncer');

Icons = require('./icons');

Status = require('./status');

Tabs = require('./tabs');

Throttler = require('./throttler');

Buttons = require('./buttons');

Buffer = require('./buffer');

Growl = require('./growl');

Dropdown = require('./dropdown');

k$.ready = function() {
  var $navbar, $tabSet, i, j, len, len1, ref, ref1, results;
  k$.icons();
  k$.button();
  k$.dropdown();
  ref = k$.$$('[data-ks-navbar]');
  for (i = 0, len = ref.length; i < len; i++) {
    $navbar = ref[i];
    k$.nav($navbar);
  }
  ref1 = k$.$$('[data-ks-tabs]');
  results = [];
  for (j = 0, len1 = ref1.length; j < len1; j++) {
    $tabSet = ref1[j];
    results.push(k$.tabs($tabSet));
  }
  return results;
};

document.addEventListener('DOMContentLoaded', function() {
  return k$.ready();
});



},{"./buffer":"/Users/adamgrant/sites/testrunner/lib-core/coffee/buffer.coffee","./buttons":"/Users/adamgrant/sites/testrunner/lib-core/coffee/buttons.coffee","./debouncer":"/Users/adamgrant/sites/testrunner/lib-core/coffee/debouncer.coffee","./dropdown":"/Users/adamgrant/sites/testrunner/lib-core/coffee/dropdown.coffee","./growl":"/Users/adamgrant/sites/testrunner/lib-core/coffee/growl.coffee","./icons":"/Users/adamgrant/sites/testrunner/lib-core/coffee/icons.coffee","./ks":"/Users/adamgrant/sites/testrunner/lib-core/coffee/ks.coffee","./modal":"/Users/adamgrant/sites/testrunner/lib-core/coffee/modal.coffee","./navbar":"/Users/adamgrant/sites/testrunner/lib-core/coffee/navbar.coffee","./status":"/Users/adamgrant/sites/testrunner/lib-core/coffee/status.coffee","./tabs":"/Users/adamgrant/sites/testrunner/lib-core/coffee/tabs.coffee","./throttler":"/Users/adamgrant/sites/testrunner/lib-core/coffee/throttler.coffee"}],"/Users/adamgrant/sites/testrunner/lib-core/coffee/buffer.coffee":[function(require,module,exports){
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



},{}],"/Users/adamgrant/sites/testrunner/lib-core/coffee/buttons.coffee":[function(require,module,exports){
var button;

button = function() {
  var $button, $buttonDropdown, i, j, len, len1, ref, ref1, results;
  ref = k$.$$("button");
  for (i = 0, len = ref.length; i < len; i++) {
    $button = ref[i];
    if ($button.querySelectorAll('ul').length) {
      $button.classList.add('menu-item');
    }
  }
  ref1 = k$.$$('.button-dropdown');
  results = [];
  for (j = 0, len1 = ref1.length; j < len1; j++) {
    $buttonDropdown = ref1[j];
    results.push($buttonDropdown.parentNode.classList.add('menu-item'));
  }
  return results;
};

k$.button = button;

module.exports = button;



},{}],"/Users/adamgrant/sites/testrunner/lib-core/coffee/debouncer.coffee":[function(require,module,exports){
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



},{}],"/Users/adamgrant/sites/testrunner/lib-core/coffee/dropdown.coffee":[function(require,module,exports){
var dropdown;

dropdown = function() {
  return document.body.addEventListener('click', function(e) {
    var $menuItem, closeAllMenus, openMenu;
    $menuItem = null;
    closeAllMenus = function() {
      var _$menuItem, i, len, ref, results;
      ref = k$.$$('.menu-item');
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        _$menuItem = ref[i];
        results.push(_$menuItem.classList.remove('open'));
      }
      return results;
    };
    openMenu = function() {
      if ($menuItem.classList.contains('open')) {
        $menuItem.classList.remove('open');
      } else {
        closeAllMenus();
        $menuItem.classList.add('open');
      }
      return e.stopPropagation();
    };
    if (e.target.classList.contains('menu-item')) {
      $menuItem = e.target;
      return openMenu();
    } else if (e.target.parentNode.classList.contains('menu-item')) {
      $menuItem = e.target.parentNode;
      return openMenu();
    } else {
      closeAllMenus();
    }
  });
};

k$.dropdown = dropdown;

module.exports = dropdown;



},{}],"/Users/adamgrant/sites/testrunner/lib-core/coffee/growl.coffee":[function(require,module,exports){
var growl;

growl = function(params) {
  return k$.buffer(function() {
    var className, content, defaults, delay, growlContainer, id;
    defaults = {
      title: void 0,
      text: void 0,
      delay: 2000,
      type: 'growl-warn',
      id: Date.now()
    };
    params = k$.extend(defaults, params);
    if (!k$.$$('.growl_container').length) {
      growlContainer = document.createElement('div');
      growlContainer.className = 'growl_container';
      document.body.appendChild(growlContainer);
    }
    growl = document.createElement('div');
    className = "alert growl show " + params.type + " growl-" + params.id;
    growl.className = className;
    content = "";
    if (params.title) {
      content += "<h1>" + params.title + "</h1>";
    }
    if (params.text) {
      content += "<p>" + params.text + "</p>";
    }
    growl.innerHTML = content;
    k$.$('.growl_container').appendChild(growl);
    delay = params.delay;
    id = params.id;
    if (delay > 0) {
      return (function(delay, id) {
        return setTimeout(function() {
          var $growl, $newGrowl;
          $growl = k$.$(".growl-" + id);
          $growl.classList.remove('show');
          $newGrowl = $growl.cloneNode(true);
          $growl.parentNode.replaceChild($newGrowl, $growl);
          $newGrowl.classList.add('hide');
          return (function(delay, id) {
            return setTimeout(function() {
              if (!k$.$$('.growl.show').length) {
                return k$.$('.growl_container').parentNode.removeChild(k$.$('.growl_container'));
              }
            }, 500);
          })(delay, id);
        }, delay);
      })(delay, id);
    }
  });
};

k$.growl = growl;

module.exports = growl;



},{}],"/Users/adamgrant/sites/testrunner/lib-core/coffee/icons.coffee":[function(require,module,exports){
var icons;

icons = function() {
  var CACHE, IE9TO11, embed, onframe, onload, requestAnimationFrame, uses;
  uses = document.getElementsByTagName("use");
  requestAnimationFrame = window.requestAnimationFrame || window.setTimeout;
  CACHE = {};
  IE9TO11 = true;
  embed = function(svg, g) {
    var clone, fragment, viewBox;
    if (g) {
      viewBox = g.getAttribute("viewBox");
      fragment = document.createDocumentFragment();
      clone = g.cloneNode(true);
      if (viewBox) {
        svg.setAttribute("viewBox", viewBox);
      }
      while (clone.childNodes.length) {
        fragment.appendChild(clone.childNodes[0]);
      }
      svg.appendChild(fragment);
    }
  };
  onload = function() {
    var s, x, xhr;
    xhr = this;
    x = document.createElement("x");
    s = xhr.s;
    x.innerHTML = xhr.responseText;
    xhr.onload = function() {
      s.splice(0).map(function(array) {
        embed(array[0], x.querySelector("#" + array[1].replace(/(\W)/g, "\\$1")));
      });
    };
    xhr.onload();
  };
  onframe = function() {
    var svg, url, url_hash, url_root, use, xhr;
    use = void 0;
    while ((use = uses[0])) {
      svg = use.parentNode;
      url = use.getAttribute("xlink:href").split("#");
      url_root = url[0];
      url_hash = url[1];
      svg.removeChild(use);
      if (url_root.length) {
        xhr = CACHE[url_root] = CACHE[url_root] || new XMLHttpRequest();
        if (!xhr.s) {
          xhr.s = [];
          xhr.open("GET", url_root);
          xhr.onload = onload;
          xhr.send();
        }
        xhr.s.push([svg, url_hash]);
        if (xhr.readyState === 4) {
          xhr.onload();
        }
      } else {
        embed(svg, document.getElementById(url_hash));
      }
    }
    requestAnimationFrame(onframe);
  };
  if (IE9TO11) {
    onframe();
  }
};

k$.icons = icons;

module.exports = icons;



},{}],"/Users/adamgrant/sites/testrunner/lib-core/coffee/ks.coffee":[function(require,module,exports){
(function (global){
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


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hZGFtZ3JhbnQvc2l0ZXMvdGVzdHJ1bm5lci9saWItY29yZS9jb2ZmZWUva3MuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsRUFBUCxHQUFnQixJQUFBLE1BQUEsQ0FBQTs7QUFFaEIsRUFBRSxDQUFDLEVBQUgsR0FBUSxTQUFDLEVBQUQ7U0FBUSxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsRUFBMUI7QUFBUjs7QUFDUixFQUFFLENBQUMsQ0FBSCxHQUFPLFNBQUMsRUFBRDtTQUFRLEVBQUUsQ0FBQyxFQUFILENBQU0sRUFBTixDQUFVLENBQUEsQ0FBQTtBQUFsQjs7QUFDUCxFQUFFLENBQUMsTUFBSCxHQUFZLFNBQUMsV0FBRCxFQUFjLE1BQWQ7QUFDVixNQUFBO0FBQUEsT0FBQSxrQkFBQTtJQUNFLElBQUcsTUFBTyxDQUFBLFFBQUEsQ0FBUCxJQUFxQixNQUFPLENBQUEsUUFBQSxDQUFTLENBQUMsV0FBdEMsSUFBc0QsTUFBTyxDQUFBLFFBQUEsQ0FBUyxDQUFDLFdBQWpCLEtBQWdDLE1BQXpGO01BQ0UsV0FBWSxDQUFBLFFBQUEsQ0FBWixHQUF3QixXQUFZLENBQUEsUUFBQSxDQUFaLElBQXlCO01BQ2pELFNBQVMsQ0FBQyxNQUFWLENBQWlCLFdBQVksQ0FBQSxRQUFBLENBQTdCLEVBQXdDLE1BQU8sQ0FBQSxRQUFBLENBQS9DLEVBRkY7S0FBQSxNQUFBO01BSUUsV0FBWSxDQUFBLFFBQUEsQ0FBWixHQUF3QixNQUFPLENBQUEsUUFBQSxFQUpqQzs7QUFERjtTQU1BO0FBUFU7O0FBU1osRUFBRSxDQUFDLGFBQUgsR0FBbUIsSUFBSTs7QUFFdkIsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbImdsb2JhbC5rJCA9IG5ldyBPYmplY3QoKVxuXG5rJC4kJCA9IChlbCkgLT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCBlbFxuayQuJCA9IChlbCkgLT4gayQuJCQoZWwpWzBdXG5rJC5leHRlbmQgPSAoZGVzdGluYXRpb24sIHNvdXJjZSkgLT5cbiAgZm9yIHByb3BlcnR5IG9mIHNvdXJjZVxuICAgIGlmIHNvdXJjZVtwcm9wZXJ0eV0gYW5kIHNvdXJjZVtwcm9wZXJ0eV0uY29uc3RydWN0b3IgYW5kIHNvdXJjZVtwcm9wZXJ0eV0uY29uc3RydWN0b3IgaXMgT2JqZWN0XG4gICAgICBkZXN0aW5hdGlvbltwcm9wZXJ0eV0gPSBkZXN0aW5hdGlvbltwcm9wZXJ0eV0gb3Ige31cbiAgICAgIGFyZ3VtZW50cy5jYWxsZWUgZGVzdGluYXRpb25bcHJvcGVydHldLCBzb3VyY2VbcHJvcGVydHldXG4gICAgZWxzZVxuICAgICAgZGVzdGluYXRpb25bcHJvcGVydHldID0gc291cmNlW3Byb3BlcnR5XVxuICBkZXN0aW5hdGlvblxuXG5rJC5kZWJvdW5jZVF1ZXVlID0gbmV3IE9iamVjdFxuXG5tb2R1bGUuZXhwb3J0cyA9IGskXG4iXX0=
},{}],"/Users/adamgrant/sites/testrunner/lib-core/coffee/modal.coffee":[function(require,module,exports){
var modal;

modal = function(el) {
  var iOS = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );
  if (iOS) {
    document.body.classList.add('dismiss-modal');
  }
  (function(el) {
    var $closer, $hideModal;
    $hideModal = function() {
      return k$.$(el).style.display = 'none';
    };
    document.body.addEventListener('click', function() {
      return $hideModal();
    });
    k$.$(el).addEventListener('click', function(e) {
      return e.stopPropagation();
    });
    $closer = k$.$(el).querySelector('a[data-modal-close]');
    if ($closer) {
      return $closer.addEventListener('click', function() {
        return $hideModal();
      });
    }
  })(el);
  return k$.$(el);
};

k$.modal = modal;

module.exports = modal;



},{}],"/Users/adamgrant/sites/testrunner/lib-core/coffee/navbar.coffee":[function(require,module,exports){
var nav;

nav = function(el) {
  var $button, $menuItem, $menuItems, $navbar, _$menuItems, e, i, j, len, len1;
  $navbar = typeof el === 'string' ? k$.$(el) : el;
  try {
    $menuItems = $navbar.querySelectorAll('ul > li');
    _$menuItems = new Array();
    for (i = 0, len = $menuItems.length; i < len; i++) {
      $menuItem = $menuItems[i];
      if ($menuItem.querySelectorAll('ul').length && !$menuItem.querySelectorAll('[role="button"]').length) {
        _$menuItems.push($menuItem);
      }
    }
    $menuItems = _$menuItems;
    for (j = 0, len1 = $menuItems.length; j < len1; j++) {
      $menuItem = $menuItems[j];
      $menuItem.classList.add('menu-item');
    }
  } catch (_error) {
    e = _error;
    console.error("Could not instantiate as a nav.", e.message);
  }
  $button = $navbar.querySelector('.navbar-title button');
  if ($button) {
    return $button.addEventListener('click', function() {
      var $nav;
      $nav = $navbar.querySelector('nav');
      if ($nav.classList.contains('expand')) {
        return $nav.classList.remove('expand');
      } else {
        return $nav.classList.add('expand');
      }
    });
  }
};

k$.nav = nav;

module.exports = nav;



},{}],"/Users/adamgrant/sites/testrunner/lib-core/coffee/status.coffee":[function(require,module,exports){
var status;

status = function(opts) {
  var $status, $statusBar, defaults, hideStatusBar;
  defaults = {
    type: 'status-yellow',
    delay: 2000
  };
  status = k$.extend(defaults, opts);
  if (!k$.$$('#status_bar').length) {
    $statusBar = document.createElement('div');
    $statusBar.id = 'status_bar';
    $statusBar.className = 'status_bar';
    $statusBar.innerHTML = "<div class='status_bar-status' id='status_bar-status'></div>";
    document.body.appendChild($statusBar);
  }
  $statusBar = k$.$('#status_bar');
  hideStatusBar = function() {
    $statusBar.classList.add('hide');
    return setTimeout(function() {
      $statusBar.classList.remove('hide');
      return $statusBar.parentNode.removeChild($statusBar);
    }, 250);
  };
  if (status.delay > 0) {
    k$.debounce(hideStatusBar, 'hideStatusBar', status.delay);
  }
  $status = k$.$("#status_bar-status");
  $status.innerHTML = status.text;
  return $status.dataset.type = status.type;
};

k$.status = status;

module.exports = status;



},{}],"/Users/adamgrant/sites/testrunner/lib-core/coffee/tabs.coffee":[function(require,module,exports){
var tabs;

tabs = function(el) {
  var $_tab, $id, $pane, $paneSet, $tab, $tabContainer, $tabLink, $tabSet, i, j, k, len, len1, len2, results;
  $tabContainer = typeof el === 'string' ? k$.$(el) : el;
  $tabSet = $tabContainer.querySelectorAll('li');
  for (i = 0, len = $tabSet.length; i < len; i++) {
    $tab = $tabSet[i];
    $tab.classList.add('tab-item');
  }
  $paneSet = new Array();
  for (j = 0, len1 = $tabSet.length; j < len1; j++) {
    $_tab = $tabSet[j];
    $id = $_tab.querySelector('a').getAttribute('href');
    $pane = k$.$("article" + $id);
    if ($_tab.classList.contains('open')) {
      $pane.classList.add('open');
    }
    $paneSet.push($pane);
    $pane.setAttribute('data-panel', true);
  }
  results = [];
  for (k = 0, len2 = $tabSet.length; k < len2; k++) {
    $tab = $tabSet[k];
    $tabLink = $tab.querySelector('a');
    $tabLink.setAttribute('data-link', $tabLink.getAttribute('href'));
    $tabLink.href = 'javascript:void(0);';
    results.push((function($tab, $tabLink, $paneSet) {
      return $tab.addEventListener('click', function() {
        var _$tab, l, len3, len4, m;
        for (l = 0, len3 = $paneSet.length; l < len3; l++) {
          $pane = $paneSet[l];
          $pane.classList.remove('open');
        }
        for (m = 0, len4 = $tabSet.length; m < len4; m++) {
          _$tab = $tabSet[m];
          _$tab.classList.remove('open');
        }
        k$.$("article" + ($tabLink.getAttribute('data-link'))).classList.add('open');
        return $tab.classList.add('open');
      });
    })($tab, $tabLink, $paneSet));
  }
  return results;
};

k$.tabs = tabs;

module.exports = tabs;



},{}],"/Users/adamgrant/sites/testrunner/lib-core/coffee/throttler.coffee":[function(require,module,exports){
var throttle;

throttle = function(fn, id, delay) {};

k$.throttle = throttle;

module.exports = throttle;



},{}],"/Users/adamgrant/sites/testrunner/lib/coffee/vendor/index.coffee":[function(require,module,exports){




},{}],"/Users/adamgrant/sites/testrunner/lib/js/testRunner.js":[function(require,module,exports){
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
  Expect: function(string, condition) {
    this.string = string;
    this.condition = condition;
  },
  Spec: function(tests) {
    this.tests = new Array();
    this.tests = this.tests.concat(tests);
  }
}

testRunner.Assert.prototype.return = function() {
  window.clearTimeout(this.fail);
  console.log("%c TESTRUNNER PASSED: " + this.string, "color: green");
}

testRunner.Expect.prototype.return = function() {
  var args = Array.prototype.slice.call(arguments);
  if (this.condition.apply(null, args)) {
    console.log("%c TESTRUNNER PASSED: " + this.string, "color: green");
  }
  else {
    console.error("TESTRUNNER FAILED: " + this.string);
    console.error(args);
  }
}

testRunner.Spec.prototype.return = function() {
  thisData = Array.prototype.slice.call(arguments)

  for (var _i = 0, len = this.tests.length; _i < len; _i++) {
    this.tests[_i].return(thisData[_i]);
  }
}

module.exports = testRunner

},{}]},{},["./lib/coffee/app.coffee"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYWRhbWdyYW50L3NpdGVzL3Rlc3RydW5uZXIvbGliL2NvZmZlZS9hcHAuY29mZmVlIiwiL1VzZXJzL2FkYW1ncmFudC9zaXRlcy90ZXN0cnVubmVyL2xpYi1jb3JlL2NvZmZlZS9hcHAuY29mZmVlIiwiL1VzZXJzL2FkYW1ncmFudC9zaXRlcy90ZXN0cnVubmVyL2xpYi1jb3JlL2NvZmZlZS9idWZmZXIuY29mZmVlIiwiL1VzZXJzL2FkYW1ncmFudC9zaXRlcy90ZXN0cnVubmVyL2xpYi1jb3JlL2NvZmZlZS9idXR0b25zLmNvZmZlZSIsIi9Vc2Vycy9hZGFtZ3JhbnQvc2l0ZXMvdGVzdHJ1bm5lci9saWItY29yZS9jb2ZmZWUvZGVib3VuY2VyLmNvZmZlZSIsIi9Vc2Vycy9hZGFtZ3JhbnQvc2l0ZXMvdGVzdHJ1bm5lci9saWItY29yZS9jb2ZmZWUvZHJvcGRvd24uY29mZmVlIiwiL1VzZXJzL2FkYW1ncmFudC9zaXRlcy90ZXN0cnVubmVyL2xpYi1jb3JlL2NvZmZlZS9ncm93bC5jb2ZmZWUiLCIvVXNlcnMvYWRhbWdyYW50L3NpdGVzL3Rlc3RydW5uZXIvbGliLWNvcmUvY29mZmVlL2ljb25zLmNvZmZlZSIsImxpYi1jb3JlL2NvZmZlZS9rcy5jb2ZmZWUiLCIvVXNlcnMvYWRhbWdyYW50L3NpdGVzL3Rlc3RydW5uZXIvbGliLWNvcmUvY29mZmVlL21vZGFsLmNvZmZlZSIsIi9Vc2Vycy9hZGFtZ3JhbnQvc2l0ZXMvdGVzdHJ1bm5lci9saWItY29yZS9jb2ZmZWUvbmF2YmFyLmNvZmZlZSIsIi9Vc2Vycy9hZGFtZ3JhbnQvc2l0ZXMvdGVzdHJ1bm5lci9saWItY29yZS9jb2ZmZWUvc3RhdHVzLmNvZmZlZSIsIi9Vc2Vycy9hZGFtZ3JhbnQvc2l0ZXMvdGVzdHJ1bm5lci9saWItY29yZS9jb2ZmZWUvdGFicy5jb2ZmZWUiLCIvVXNlcnMvYWRhbWdyYW50L3NpdGVzL3Rlc3RydW5uZXIvbGliLWNvcmUvY29mZmVlL3Rocm90dGxlci5jb2ZmZWUiLCJsaWIvanMvdGVzdFJ1bm5lci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUE7O0FBQUEsRUFBQSxHQUFZLE9BQUEsQ0FBUSwyQkFBUjs7QUFDWixNQUFPLENBQUEsWUFBQSxDQUFQLEdBQXVCLE9BQUEsQ0FBUSxrQkFBUjs7QUFDdkIsTUFBQSxHQUFZLE9BQUEsQ0FBUSxnQkFBUjs7QUFFWixRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFNBQUE7QUFDNUMsTUFBQTtFQUFBLE9BQUEsR0FBVTtFQUNWLFFBQUEsR0FBVztFQUVYLEVBQUUsQ0FBQyxDQUFILENBQUssY0FBTCxDQUFvQixDQUFDLGdCQUFyQixDQUFzQyxPQUF0QyxFQUErQyxTQUFBO1dBQzdDLFVBQVUsQ0FBQyxhQUFYLEdBQStCLElBQUEsVUFBVSxDQUFDLE1BQVgsQ0FBa0IsMkNBQWxCLEVBQStELElBQS9EO0VBRGMsQ0FBL0M7RUFJQSxFQUFFLENBQUMsQ0FBSCxDQUFLLGVBQUwsQ0FBcUIsQ0FBQyxnQkFBdEIsQ0FBdUMsT0FBdkMsRUFBZ0QsU0FBQTtXQUM5QyxVQUFVLENBQUMsYUFBYSxDQUFDLFFBQUQsQ0FBeEIsQ0FBQTtFQUQ4QyxDQUFoRDtFQUlBLEVBQUUsQ0FBQyxDQUFILENBQUssY0FBTCxDQUFvQixDQUFDLGdCQUFyQixDQUFzQyxPQUF0QyxFQUErQyxTQUFBO1dBQzdDLFVBQVUsQ0FBQyxLQUFLLENBQUMsa0JBQWpCLEdBQTBDLElBQUEsVUFBVSxDQUFDLElBQVgsQ0FBZ0IsQ0FDeEQsVUFBVSxDQUFDLGFBQVgsR0FBK0IsSUFBQSxVQUFVLENBQUMsTUFBWCxDQUFrQiwyQ0FBbEIsRUFBK0QsSUFBL0QsQ0FEeUIsRUFFeEQsVUFBVSxDQUFDLGFBQVgsR0FBK0IsSUFBQSxVQUFVLENBQUMsTUFBWCxDQUFrQiwyQ0FBbEIsRUFBK0QsSUFBL0QsQ0FGeUIs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cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiS1MgICAgICAgID0gcmVxdWlyZSAnLi4vLi4vbGliLWNvcmUvY29mZmVlL2FwcCdcbndpbmRvd1sndGVzdFJ1bm5lciddID0gcmVxdWlyZSAnLi4vanMvdGVzdFJ1bm5lcidcbnZlbmRvciAgICA9IHJlcXVpcmUgJy4vdmVuZG9yL2luZGV4J1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyICdET01Db250ZW50TG9hZGVkJywgLT5cbiAgc29tZVZhciA9IDBcbiAgc29tZVZhcjIgPSB1bmRlZmluZWRcblxuICBrJC4kKCdidXR0b24jZmlyc3QnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIC0+XG4gICAgdGVzdFJ1bm5lci53YWl0Rm9yQnV0dG9uID0gbmV3IHRlc3RSdW5uZXIuQXNzZXJ0KFwiYnV0dG9uIHdhcyBwcmVzc2VkIGluIGxlc3MgdGhhbiAzIHNlY29uZHNcIiwgMzAwMClcbiAgKVxuXG4gIGskLiQoJ2J1dHRvbiNzZWNvbmQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIC0+XG4gICAgdGVzdFJ1bm5lci53YWl0Rm9yQnV0dG9uLnJldHVybigpXG4gIClcblxuICBrJC4kKCdidXR0b24jdGhpcmQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIC0+XG4gICAgdGVzdFJ1bm5lci5zcGVjcy53YWl0VHdpY2VGb3JCdXR0b24gPSBuZXcgdGVzdFJ1bm5lci5TcGVjKFtcbiAgICAgIHRlc3RSdW5uZXIud2FpdEZvckJ1dHRvbiA9IG5ldyB0ZXN0UnVubmVyLkFzc2VydChcImJ1dHRvbiB3YXMgcHJlc3NlZCBpbiBsZXNzIHRoYW4gMyBzZWNvbmRzXCIsIDMwMDApLFxuICAgICAgdGVzdFJ1bm5lci53YWl0Rm9yQnV0dG9uID0gbmV3IHRlc3RSdW5uZXIuQXNzZXJ0KFwiYnV0dG9uIHdhcyBwcmVzc2VkIGluIGxlc3MgdGhhbiA1IHNlY29uZHNcIiwgNTAwMClcbiAgICBdKVxuICApXG5cbiAgayQuJCgnYnV0dG9uI2ZvdXJ0aCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgLT5cbiAgICB0ZXN0UnVubmVyLnNwZWNzLndhaXRUd2ljZUZvckJ1dHRvbi5yZXR1cm4oKVxuICApXG5cbiAgayQuJCgnYnV0dG9uI3NldG9uZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgLT4gXG4gICAgc29tZVZhciA9IDFcbiAgICB0ZXN0UnVubmVyLmdldE9uZS5yZXR1cm4oc29tZVZhcilcbiAgKVxuXG4gIGskLiQoJ2J1dHRvbiNzZXR0d28nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIC0+IFxuICAgIHNvbWVWYXIgPSAyXG4gICAgdGVzdFJ1bm5lci5nZXRPbmUucmV0dXJuKHNvbWVWYXIpXG4gIClcblxuICBrJC4kKCdidXR0b24jZ2V0b25lJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAtPiBcbiAgICB0ZXN0UnVubmVyLmdldE9uZSA9IG5ldyB0ZXN0UnVubmVyLkV4cGVjdChcInZhcmlhYmxlIGlzIHNldCB0byAxXCIsICh2YXJpYWJsZSkgLT5cbiAgICAgIHJldHVybiB2YXJpYWJsZSA9PSAxXG4gICAgKVxuICApXG5cbiAgayQuJCgnYnV0dG9uI2ZpbmFsJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAtPlxuICAgIHRlc3RSdW5uZXIuc3BlY3MuZ2V0T25lUXVpY2tseSA9IG5ldyB0ZXN0UnVubmVyLlNwZWMoW1xuICAgICAgbmV3IHRlc3RSdW5uZXIuRXhwZWN0KFwidmFyaWFibGUgaXMgc2V0IHRvIDFcIiwgKHZhcmlhYmxlKSAtPlxuICAgICAgICByZXR1cm4gdmFyaWFibGUgPT0gMVxuICAgICAgKSxcbiAgICAgIG5ldyB0ZXN0UnVubmVyLkFzc2VydChcInZhcmlhYmxlIGlzIHNldCBpbiBsZXNzIHRoYW4gMyBzZWNvbmRzXCIsIDMwMDApXG4gICAgXSlcbiAgKVxuXG4gIGskLiQoJ2J1dHRvbiNzZXRvbmV0d28nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIC0+XG4gICAgc29tZVZhcjIgPSAxXG4gICAgdGVzdFJ1bm5lci5zcGVjcy5nZXRPbmVRdWlja2x5LnJldHVybihzb21lVmFyMiwgbnVsbClcbiAgKVxuXG4gIGskLiQoJ2J1dHRvbiNzZXR0d290d28nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIC0+XG4gICAgc29tZVZhcjIgPSAyXG4gICAgdGVzdFJ1bm5lci5zcGVjcy5nZXRPbmVRdWlja2x5LnJldHVybihzb21lVmFyMiwgbnVsbClcbiAgKVxuIiwiS1MgICAgICAgID0gcmVxdWlyZSAnLi9rcydcbk1vZGFsICAgICA9IHJlcXVpcmUgJy4vbW9kYWwnXG5OYXZiYXIgICAgPSByZXF1aXJlICcuL25hdmJhcidcbkRlYm91bmNlICA9IHJlcXVpcmUgJy4vZGVib3VuY2VyJ1xuSWNvbnMgICAgID0gcmVxdWlyZSAnLi9pY29ucydcblN0YXR1cyAgICA9IHJlcXVpcmUgJy4vc3RhdHVzJ1xuVGFicyAgICAgID0gcmVxdWlyZSAnLi90YWJzJ1xuVGhyb3R0bGVyID0gcmVxdWlyZSAnLi90aHJvdHRsZXInXG5CdXR0b25zICAgPSByZXF1aXJlICcuL2J1dHRvbnMnXG5CdWZmZXIgICAgPSByZXF1aXJlICcuL2J1ZmZlcidcbkdyb3dsICAgICA9IHJlcXVpcmUgJy4vZ3Jvd2wnXG5Ecm9wZG93biAgPSByZXF1aXJlICcuL2Ryb3Bkb3duJ1xuXG5rJC5yZWFkeSA9IC0+XG4gIGskLmljb25zKClcbiAgayQuYnV0dG9uKClcbiAgayQuZHJvcGRvd24oKVxuICBrJC5uYXYoJG5hdmJhcikgZm9yICRuYXZiYXIgaW4gayQuJCQoJ1tkYXRhLWtzLW5hdmJhcl0nKVxuICBrJC50YWJzKCR0YWJTZXQpIGZvciAkdGFiU2V0IGluIGskLiQkKCdbZGF0YS1rcy10YWJzXScpXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIgJ0RPTUNvbnRlbnRMb2FkZWQnLCAtPiBrJC5yZWFkeSgpXG4iLCJidWZmZXIgPSAoZm4sIGRlbGF5KSAtPlxuXG4gICMgQ3JlYXRlIGEgbmV3IGJ1ZmZlckFycmF5IGlmIG9uZSBkb2VzIG5vdCBleGlzdCBhbHJlYWR5LlxuICBrJC5idWZmZXJBcnJheSA9IGskLmJ1ZmZlckFycmF5IHx8IG5ldyBBcnJheSgpXG4gIGlmIG5vdCBrJC5idWZmZXJBcnJheS5sZW5ndGhcbiAgICBrJC5idWZmZXJBcnJheSA9IG5ldyBBcnJheSgpXG5cbiAgICBkZWxheSA9IGRlbGF5IHx8IDUwMFxuXG4gICAgIyBDcmVhdGUgYW4gaW50ZXJ2YWwgdG8gZmlyZSB0aGUgZm5zIGluIGJ1ZmZlckFycmF5XG4gICAgaSA9IDFcblxuICAgIGskLmJ1ZmZlckludGVydmFsID0gc2V0SW50ZXJ2YWwgLT5cbiAgICAgIGskLmJ1ZmZlckFycmF5W2ldKCkgaWYgayQuYnVmZmVyQXJyYXlbaV1cbiAgICAgIGkrK1xuICAgICAgaWYgaSA+PSBrJC5idWZmZXJBcnJheS5sZW5ndGhcbiAgICAgICAgY2xlYXJJbnRlcnZhbCBrJC5idWZmZXJJbnRlcnZhbFxuICAgICAgICBrJC5idWZmZXJBcnJheSA9IHVuZGVmaW5lZFxuICAgICAgICBpID0gMVxuICAgICwgZGVsYXlcblxuICAjIEFkZCB0aGlzIGZ1bmN0aW9uIHRvIHRoZSBhcnJheS5cbiAgayQuYnVmZmVyQXJyYXkucHVzaCBmblxuXG4gICMgRmlyZSByaWdodCBhd2F5IGlmIGl0J3MgdGhlIGZpcnN0IGluIGxpbmUuXG4gIGskLmJ1ZmZlckFycmF5WzBdKCkgaWYgayQuYnVmZmVyQXJyYXkubGVuZ3RoID09IDFcblxuICBjb25zb2xlLmluZm8gXCJGdW5jdGlvbiBxdWV1ZWQgKCN7ayQuYnVmZmVyQXJyYXkubGVuZ3RofSBpbiBxdWV1ZSlcIlxuXG5rJC5idWZmZXIgPSBidWZmZXJcblxubW9kdWxlLmV4cG9ydHMgPSBidWZmZXJcbiIsImJ1dHRvbiA9IC0+XG5cbiAgKCRidXR0b24uY2xhc3NMaXN0LmFkZCAnbWVudS1pdGVtJyBpZiAkYnV0dG9uLnF1ZXJ5U2VsZWN0b3JBbGwoJ3VsJykubGVuZ3RoKSBmb3IgJGJ1dHRvbiBpbiBrJC4kJChcImJ1dHRvblwiKVxuICAkYnV0dG9uRHJvcGRvd24ucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkICdtZW51LWl0ZW0nIGZvciAkYnV0dG9uRHJvcGRvd24gaW4gayQuJCQgJy5idXR0b24tZHJvcGRvd24nXG5cbmskLmJ1dHRvbiA9IGJ1dHRvblxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ1dHRvblxuIiwiZGVib3VuY2UgPSAoZm4sIGlkLCBkZWxheSwgYXJncywgdGhhdCkgLT5cblxuICBkZWxheSA9IGRlbGF5IHx8IDEwMDBcbiAgdGhhdCA9IHRoYXQgfHwgdGhpc1xuICBhcmdzID0gYXJncyB8fCBuZXcgQXJyYXlcblxuICBrJC5kZWJvdW5jZVF1ZXVlW2lkXSA9IG5ldyBPYmplY3QoKSBpZiB0eXBlb2YgayQuZGVib3VuY2VRdWV1ZVtpZF0gIT0gXCJvYmplY3RcIlxuXG4gIGNsZWFyVGltZW91dCBrJC5kZWJvdW5jZVF1ZXVlW2lkXS5kZWJvdW5jZVRpbWVyIGlmIHR5cGVvZiBrJC5kZWJvdW5jZVF1ZXVlW2lkXS5kZWJvdW5jZVRpbWVyICE9IFwidW5kZWZpbmVkXCJcblxuICBrJC5kZWJvdW5jZVF1ZXVlW2lkXSA9XG4gICAgZm46IGZuXG4gICAgaWQ6IGlkXG4gICAgZGVsYXk6IGRlbGF5XG4gICAgYXJnczogYXJnc1xuICAgIGRlYm91bmNlVGltZXI6IHNldFRpbWVvdXQgLT5cbiAgICAgIGskLmRlYm91bmNlUXVldWVbaWRdLmZuLmFwcGx5KHRoYXQsIGskLmRlYm91bmNlUXVldWVbaWRdLmFyZ3MpXG4gICAgICBrJC5kZWJvdW5jZVF1ZXVlW2lkXSA9IHVuZGVmaW5lZFxuICAgICwgZGVsYXlcblxuayQuZGVib3VuY2UgPSBkZWJvdW5jZVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlYm91bmNlXG4iLCJkcm9wZG93biA9ICgpIC0+XG5cbiAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyICdjbGljaycsIChlKSAtPlxuICAgICRtZW51SXRlbSA9IG51bGxcblxuICAgIGNsb3NlQWxsTWVudXMgPSAtPlxuICAgICAgXyRtZW51SXRlbS5jbGFzc0xpc3QucmVtb3ZlICdvcGVuJyBmb3IgXyRtZW51SXRlbSBpbiBrJC4kJCgnLm1lbnUtaXRlbScpXG5cbiAgICAjIFdlJ2xsIG5lZWQgdGhpcyBsYXRlci5cbiAgICBvcGVuTWVudSA9IC0+XG4gICAgICAjIFVzZXIgaGFzIGNsaWNrZWQgb24gYSBtZW51IHRyaWdnZXIuXG4gICAgICBpZiAkbWVudUl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zICdvcGVuJyBcbiAgICAgICAgJG1lbnVJdGVtLmNsYXNzTGlzdC5yZW1vdmUgJ29wZW4nIFxuICAgICAgZWxzZSBcbiAgICAgICAgY2xvc2VBbGxNZW51cygpIFxuICAgICAgICAkbWVudUl0ZW0uY2xhc3NMaXN0LmFkZCAnb3BlbidcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcblxuICAgICMgTGV0J3MgY2hlY2sgaWYgYSB1c2VyIGhhcyBjbGlja2VkIG9uIGEgbWVudSB0cmlnZ2VyOlxuICAgIGlmIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyAnbWVudS1pdGVtJ1xuICAgICAgJG1lbnVJdGVtID0gZS50YXJnZXQgXG4gICAgICBvcGVuTWVudSgpXG4gICAgZWxzZSBpZiBlLnRhcmdldC5wYXJlbnROb2RlLmNsYXNzTGlzdC5jb250YWlucyAnbWVudS1pdGVtJ1xuICAgICAgJG1lbnVJdGVtID0gZS50YXJnZXQucGFyZW50Tm9kZVxuICAgICAgb3Blbk1lbnUoKVxuICAgIGVsc2VcbiAgICAgIGNsb3NlQWxsTWVudXMoKVxuICAgICAgcmV0dXJuXG5cblxuXG4gICMgIyBUaGUgZm9sbG93aW5nIHNob3VsZCBhcHBseSB0byBzZXZlcmFsIGVsZW1lbnRzLlxuICAjXG4gICMgJG1lbnVJdGVtcyA9IGskLiQkICcubWVudS1pdGVtJ1xuICAjXG4gICMgZm9yICRfbWVudUl0ZW0gaW4gJG1lbnVJdGVtc1xuICAjXG4gICMgICAkbWVudUl0ZW0gPSAkX21lbnVJdGVtLmNsb25lTm9kZSB0cnVlXG4gICMgICAkX21lbnVJdGVtLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkICRtZW51SXRlbSwgJF9tZW51SXRlbVxuICAjXG4gICMgICBkbyAoJG1lbnVJdGVtKSAtPlxuXG4gICAgICAjIFRPRE8gbWFrZSBvbmx5IG9uZSBldmVudCBsaXN0ZW5lciBmb3IgdGhlIHBhcmVudC5cbiAgICAgICMgJG1lbnVJdGVtLmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgKGUpIC0+XG5cbiAgICAgICAgIyAjIEp1c3QgY2xvc2UgaXQgaWYgaXQncyBhbHJlYWR5IG9wZW5cbiAgICAgICAgIyBpZiAkbWVudUl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zICdvcGVuJ1xuICAgICAgICAjICAgJG1lbnVJdGVtLmNsYXNzTGlzdC5yZW1vdmUgJ29wZW4nXG4gICAgICAgICMgICByZXR1cm5cbiAgICAgICAgI1xuICAgICAgICAjICMgUmVzZXQgYWxsXG4gICAgICAgICMgXyRtZW51SXRlbS5jbGFzc0xpc3QucmVtb3ZlICdvcGVuJyBmb3IgXyRtZW51SXRlbSBpbiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWVudS1pdGVtJylcbiAgICAgICAgIyAkb3BlbmFibGUgPSAkbWVudUl0ZW0ucXVlcnlTZWxlY3RvciAndWwnXG4gICAgICAgICNcbiAgICAgICAgIyAjIE9wZW4gdGhpcyBvbmVcbiAgICAgICAgIyBpZiAkb3BlbmFibGVcbiAgICAgICAgIyAgICRtZW51SXRlbS5jbGFzc0xpc3QuYWRkICdvcGVuJ1xuICAgICAgICAjXG4gICAgICAgICMgIyBQcmV2ZW50IGJ1YmJsaW5nXG4gICAgICAgICMgZS5zdG9wUHJvcGFnYXRpb24oKVxuXG4gICMgIyBEaXNtaXNzIGFsbFxuICAjIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCAtPlxuICAjICAgJHVsLnBhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZSAnb3BlbicgZm9yICR1bCBpbiBrJC4kJCgnLm1lbnUtaXRlbSA+IHVsJylcbiAgIyAgICRsaS5jbGFzc0xpc3QucmVtb3ZlICdvcGVuJyBmb3IgJGxpIGluIGskLiQkKCcubWVudS1pdGVtLm9wZW4nKVxuXG5rJC5kcm9wZG93biA9IGRyb3Bkb3duXG5cbm1vZHVsZS5leHBvcnRzID0gZHJvcGRvd25cbiIsImdyb3dsID0gKHBhcmFtcykgLT5cblxuICBrJC5idWZmZXIgLT5cbiAgICBkZWZhdWx0cyA9XG4gICAgICB0aXRsZTogdW5kZWZpbmVkXG4gICAgICB0ZXh0OiB1bmRlZmluZWRcbiAgICAgIGRlbGF5OiAyMDAwXG4gICAgICB0eXBlOiAnZ3Jvd2wtd2FybidcbiAgICAgIGlkOiBEYXRlLm5vdygpXG5cbiAgICBwYXJhbXMgPSBrJC5leHRlbmQgZGVmYXVsdHMsIHBhcmFtc1xuXG4gICAgIyBDcmVhdGUgZ3Jvd2wgY29udGFpbmVyXG4gICAgaWYgbm90IGskLiQkKCcuZ3Jvd2xfY29udGFpbmVyJykubGVuZ3RoXG4gICAgICBncm93bENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ2RpdidcbiAgICAgIGdyb3dsQ29udGFpbmVyLmNsYXNzTmFtZSA9ICdncm93bF9jb250YWluZXInXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkIGdyb3dsQ29udGFpbmVyXG5cbiAgICAjIENyZWF0ZSBncm93bFxuICAgIGdyb3dsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnZGl2J1xuXG4gICAgIyBBZGQgYXBwcm9wcmlhdGUgY2xhc3Nlc1xuICAgIGNsYXNzTmFtZSA9IFwiYWxlcnQgZ3Jvd2wgc2hvdyAje3BhcmFtcy50eXBlfSBncm93bC0je3BhcmFtcy5pZH1cIlxuICAgIGdyb3dsLmNsYXNzTmFtZSA9IGNsYXNzTmFtZVxuXG4gICAgIyBBZGQgY29udGVudFxuICAgIGNvbnRlbnQgPSBcIlwiXG4gICAgY29udGVudCArPSBcIjxoMT4je3BhcmFtcy50aXRsZX08L2gxPlwiIGlmIHBhcmFtcy50aXRsZVxuICAgIGNvbnRlbnQgKz0gXCI8cD4je3BhcmFtcy50ZXh0fTwvcD5cIiBpZiBwYXJhbXMudGV4dFxuICAgIGdyb3dsLmlubmVySFRNTCA9IGNvbnRlbnRcblxuICAgICMgQXBwZW5kIGNoaWxkIHRvIGNvbnRhaW5lclxuICAgIGskLiQoJy5ncm93bF9jb250YWluZXInKS5hcHBlbmRDaGlsZCBncm93bFxuXG4gICAgZGVsYXkgPSBwYXJhbXMuZGVsYXlcbiAgICBpZCA9IHBhcmFtcy5pZFxuXG4gICAgaWYgZGVsYXkgPiAwXG4gICAgICBkbyAoZGVsYXksIGlkKSAtPlxuICAgICAgICBzZXRUaW1lb3V0IC0+XG4gICAgICAgICAgJGdyb3dsID0gayQuJChcIi5ncm93bC0je2lkfVwiKVxuICAgICAgICAgICRncm93bC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93JylcbiAgICAgICAgICAkbmV3R3Jvd2wgPSAkZ3Jvd2wuY2xvbmVOb2RlIHRydWVcbiAgICAgICAgICAkZ3Jvd2wucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQgJG5ld0dyb3dsLCAkZ3Jvd2xcbiAgICAgICAgICAkbmV3R3Jvd2wuY2xhc3NMaXN0LmFkZCgnaGlkZScpXG5cbiAgICAgICAgICBkbyAoZGVsYXksIGlkKSAtPlxuICAgICAgICAgICAgc2V0VGltZW91dCAtPlxuICAgICAgICAgICAgICAjIFJlbW92ZSBnaG9zdCBncm93bHNcbiAgICAgICAgICAgICAgayQuJCgnLmdyb3dsX2NvbnRhaW5lcicpLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQgayQuJCgnLmdyb3dsX2NvbnRhaW5lcicpIGlmIG5vdCBrJC4kJCgnLmdyb3dsLnNob3cnKS5sZW5ndGhcbiAgICAgICAgICAgICwgNTAwXG4gICAgICAgICwgZGVsYXlcblxuayQuZ3Jvd2wgPSBncm93bFxuXG5tb2R1bGUuZXhwb3J0cyA9IGdyb3dsXG4iLCJpY29ucyA9ICgpIC0+XG5cbiAgIyEgc3ZnNGV2ZXJ5Ym9keSB2MS4wLjAgfCBnaXRodWIuY29tL2pvbmF0aGFudG5lYWwvc3ZnNGV2ZXJ5Ym9keSBcbiAgdXNlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidXNlXCIpXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgb3Igd2luZG93LnNldFRpbWVvdXRcbiAgQ0FDSEUgPSB7fVxuICAjIElFOVRPMTEgPSAvVHJpZGVudFxcL1s1NjddXFxiLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpIG9yIChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9BcHBsZVdlYktpdFxcLyhcXGQrKS8pIG9yIFtdKVsxXSA8IDUzN1xuICBJRTlUTzExID0gdHJ1ZVxuICAjIEZvcmNpbmcgdGhpcyB0byBzaGltIHJlZ2FyZGxlc3MuXG4gIGVtYmVkID0gKHN2ZywgZykgLT5cbiAgICBpZiBnXG4gICAgICB2aWV3Qm94ID0gZy5nZXRBdHRyaWJ1dGUoXCJ2aWV3Qm94XCIpXG4gICAgICBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuICAgICAgY2xvbmUgPSBnLmNsb25lTm9kZSh0cnVlKVxuICAgICAgc3ZnLnNldEF0dHJpYnV0ZSBcInZpZXdCb3hcIiwgdmlld0JveCAgaWYgdmlld0JveFxuICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQgY2xvbmUuY2hpbGROb2Rlc1swXSAgd2hpbGUgY2xvbmUuY2hpbGROb2Rlcy5sZW5ndGhcbiAgICAgIHN2Zy5hcHBlbmRDaGlsZCBmcmFnbWVudFxuICAgIHJldHVyblxuICBvbmxvYWQgPSAtPlxuICAgIHhociA9IHRoaXNcbiAgICB4ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInhcIilcbiAgICBzID0geGhyLnNcbiAgICB4LmlubmVySFRNTCA9IHhoci5yZXNwb25zZVRleHRcbiAgICB4aHIub25sb2FkID0gLT5cbiAgICAgIHMuc3BsaWNlKDApLm1hcCAoYXJyYXkpIC0+XG4gICAgICAgIGVtYmVkIGFycmF5WzBdLCB4LnF1ZXJ5U2VsZWN0b3IoXCIjXCIgKyBhcnJheVsxXS5yZXBsYWNlKC8oXFxXKS9nLCBcIlxcXFwkMVwiKSlcbiAgICAgICAgcmV0dXJuXG5cbiAgICAgIHJldHVyblxuXG4gICAgeGhyLm9ubG9hZCgpXG4gICAgcmV0dXJuXG4gIG9uZnJhbWUgPSAtPlxuICAgIHVzZSA9IHVuZGVmaW5lZFxuICAgIHdoaWxlICh1c2UgPSB1c2VzWzBdKVxuICAgICAgc3ZnID0gdXNlLnBhcmVudE5vZGVcbiAgICAgIHVybCA9IHVzZS5nZXRBdHRyaWJ1dGUoXCJ4bGluazpocmVmXCIpLnNwbGl0KFwiI1wiKVxuICAgICAgdXJsX3Jvb3QgPSB1cmxbMF1cbiAgICAgIHVybF9oYXNoID0gdXJsWzFdXG4gICAgICBzdmcucmVtb3ZlQ2hpbGQgdXNlXG4gICAgICBpZiB1cmxfcm9vdC5sZW5ndGhcbiAgICAgICAgeGhyID0gQ0FDSEVbdXJsX3Jvb3RdID0gQ0FDSEVbdXJsX3Jvb3RdIG9yIG5ldyBYTUxIdHRwUmVxdWVzdCgpXG4gICAgICAgIHVubGVzcyB4aHIuc1xuICAgICAgICAgIHhoci5zID0gW11cbiAgICAgICAgICB4aHIub3BlbiBcIkdFVFwiLCB1cmxfcm9vdFxuICAgICAgICAgIHhoci5vbmxvYWQgPSBvbmxvYWRcbiAgICAgICAgICB4aHIuc2VuZCgpXG4gICAgICAgIHhoci5zLnB1c2ggW1xuICAgICAgICAgIHN2Z1xuICAgICAgICAgIHVybF9oYXNoXG4gICAgICAgIF1cbiAgICAgICAgeGhyLm9ubG9hZCgpICBpZiB4aHIucmVhZHlTdGF0ZSBpcyA0XG4gICAgICBlbHNlXG4gICAgICAgIGVtYmVkIHN2ZywgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodXJsX2hhc2gpXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIG9uZnJhbWVcbiAgICByZXR1cm5cbiAgb25mcmFtZSgpICBpZiBJRTlUTzExXG4gIHJldHVyblxuXG5rJC5pY29ucyA9IGljb25zXG5cbm1vZHVsZS5leHBvcnRzID0gaWNvbnNcbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbmdsb2JhbC5rJCA9IG5ldyBPYmplY3QoKTtcblxuayQuJCQgPSBmdW5jdGlvbihlbCkge1xuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbCk7XG59O1xuXG5rJC4kID0gZnVuY3Rpb24oZWwpIHtcbiAgcmV0dXJuIGskLiQkKGVsKVswXTtcbn07XG5cbmskLmV4dGVuZCA9IGZ1bmN0aW9uKGRlc3RpbmF0aW9uLCBzb3VyY2UpIHtcbiAgdmFyIHByb3BlcnR5O1xuICBmb3IgKHByb3BlcnR5IGluIHNvdXJjZSkge1xuICAgIGlmIChzb3VyY2VbcHJvcGVydHldICYmIHNvdXJjZVtwcm9wZXJ0eV0uY29uc3RydWN0b3IgJiYgc291cmNlW3Byb3BlcnR5XS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSB7XG4gICAgICBkZXN0aW5hdGlvbltwcm9wZXJ0eV0gPSBkZXN0aW5hdGlvbltwcm9wZXJ0eV0gfHwge307XG4gICAgICBhcmd1bWVudHMuY2FsbGVlKGRlc3RpbmF0aW9uW3Byb3BlcnR5XSwgc291cmNlW3Byb3BlcnR5XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlc3RpbmF0aW9uW3Byb3BlcnR5XSA9IHNvdXJjZVtwcm9wZXJ0eV07XG4gICAgfVxuICB9XG4gIHJldHVybiBkZXN0aW5hdGlvbjtcbn07XG5cbmskLmRlYm91bmNlUXVldWUgPSBuZXcgT2JqZWN0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGskO1xuXG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWk5VmMyVnljeTloWkdGdFozSmhiblF2YzJsMFpYTXZkR1Z6ZEhKMWJtNWxjaTlzYVdJdFkyOXlaUzlqYjJabVpXVXZhM011WTI5bVptVmxJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdRVUZCUVN4TlFVRk5MRU5CUVVNc1JVRkJVQ3hIUVVGblFpeEpRVUZCTEUxQlFVRXNRMEZCUVRzN1FVRkZhRUlzUlVGQlJTeERRVUZETEVWQlFVZ3NSMEZCVVN4VFFVRkRMRVZCUVVRN1UwRkJVU3hSUVVGUkxFTkJRVU1zWjBKQlFWUXNRMEZCTUVJc1JVRkJNVUk3UVVGQlVqczdRVUZEVWl4RlFVRkZMRU5CUVVNc1EwRkJTQ3hIUVVGUExGTkJRVU1zUlVGQlJEdFRRVUZSTEVWQlFVVXNRMEZCUXl4RlFVRklMRU5CUVUwc1JVRkJUaXhEUVVGVkxFTkJRVUVzUTBGQlFUdEJRVUZzUWpzN1FVRkRVQ3hGUVVGRkxFTkJRVU1zVFVGQlNDeEhRVUZaTEZOQlFVTXNWMEZCUkN4RlFVRmpMRTFCUVdRN1FVRkRWaXhOUVVGQk8wRkJRVUVzVDBGQlFTeHJRa0ZCUVR0SlFVTkZMRWxCUVVjc1RVRkJUeXhEUVVGQkxGRkJRVUVzUTBGQlVDeEpRVUZ4UWl4TlFVRlBMRU5CUVVFc1VVRkJRU3hEUVVGVExFTkJRVU1zVjBGQmRFTXNTVUZCYzBRc1RVRkJUeXhEUVVGQkxGRkJRVUVzUTBGQlV5eERRVUZETEZkQlFXcENMRXRCUVdkRExFMUJRWHBHTzAxQlEwVXNWMEZCV1N4RFFVRkJMRkZCUVVFc1EwRkJXaXhIUVVGM1FpeFhRVUZaTEVOQlFVRXNVVUZCUVN4RFFVRmFMRWxCUVhsQ08wMUJRMnBFTEZOQlFWTXNRMEZCUXl4TlFVRldMRU5CUVdsQ0xGZEJRVmtzUTBGQlFTeFJRVUZCTEVOQlFUZENMRVZCUVhkRExFMUJRVThzUTBGQlFTeFJRVUZCTEVOQlFTOURMRVZCUmtZN1MwRkJRU3hOUVVGQk8wMUJTVVVzVjBGQldTeERRVUZCTEZGQlFVRXNRMEZCV2l4SFFVRjNRaXhOUVVGUExFTkJRVUVzVVVGQlFTeEZRVXBxUXpzN1FVRkVSanRUUVUxQk8wRkJVRlU3TzBGQlUxb3NSVUZCUlN4RFFVRkRMR0ZCUVVnc1IwRkJiVUlzU1VGQlNUczdRVUZGZGtJc1RVRkJUU3hEUVVGRExFOUJRVkFzUjBGQmFVSWlMQ0ptYVd4bElqb2laMlZ1WlhKaGRHVmtMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSW1kc2IySmhiQzVySkNBOUlHNWxkeUJQWW1wbFkzUW9LVnh1WEc1ckpDNGtKQ0E5SUNobGJDa2dMVDRnWkc5amRXMWxiblF1Y1hWbGNubFRaV3hsWTNSdmNrRnNiQ0JsYkZ4dWF5UXVKQ0E5SUNobGJDa2dMVDRnYXlRdUpDUW9aV3dwV3pCZFhHNXJKQzVsZUhSbGJtUWdQU0FvWkdWemRHbHVZWFJwYjI0c0lITnZkWEpqWlNrZ0xUNWNiaUFnWm05eUlIQnliM0JsY25SNUlHOW1JSE52ZFhKalpWeHVJQ0FnSUdsbUlITnZkWEpqWlZ0d2NtOXdaWEowZVYwZ1lXNWtJSE52ZFhKalpWdHdjbTl3WlhKMGVWMHVZMjl1YzNSeWRXTjBiM0lnWVc1a0lITnZkWEpqWlZ0d2NtOXdaWEowZVYwdVkyOXVjM1J5ZFdOMGIzSWdhWE1nVDJKcVpXTjBYRzRnSUNBZ0lDQmtaWE4wYVc1aGRHbHZibHR3Y205d1pYSjBlVjBnUFNCa1pYTjBhVzVoZEdsdmJsdHdjbTl3WlhKMGVWMGdiM0lnZTMxY2JpQWdJQ0FnSUdGeVozVnRaVzUwY3k1allXeHNaV1VnWkdWemRHbHVZWFJwYjI1YmNISnZjR1Z5ZEhsZExDQnpiM1Z5WTJWYmNISnZjR1Z5ZEhsZFhHNGdJQ0FnWld4elpWeHVJQ0FnSUNBZ1pHVnpkR2x1WVhScGIyNWJjSEp2Y0dWeWRIbGRJRDBnYzI5MWNtTmxXM0J5YjNCbGNuUjVYVnh1SUNCa1pYTjBhVzVoZEdsdmJseHVYRzVySkM1a1pXSnZkVzVqWlZGMVpYVmxJRDBnYm1WM0lFOWlhbVZqZEZ4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlHc2tYRzRpWFgwPSIsIm1vZGFsID0gKGVsKSAtPlxuXG4gIGB2YXIgaU9TID0gLyhpUGFkfGlQaG9uZXxpUG9kKS9nLnRlc3QoIG5hdmlnYXRvci51c2VyQWdlbnQgKWBcbiAgXG4gICMgQ3Vyc29yIHBvaW50ZXIgaGFjayBpZiBpT1NcbiAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkICdkaXNtaXNzLW1vZGFsJyBpZiBpT1NcblxuICBkbyAoZWwpIC0+XG5cbiAgICAkaGlkZU1vZGFsID0gLT5cbiAgICAgIGskLiQoZWwpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcblxuICAgICMgQWxsb3cgbW9kYWwgdG8gZGlzbWlzcyB3aGVuIGNsaWNrZWQgb3V0c2lkZVxuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCAtPlxuICAgICAgJGhpZGVNb2RhbCgpXG5cbiAgICBrJC4kKGVsKS5hZGRFdmVudExpc3RlbmVyICdjbGljaycsIChlKSAtPlxuICAgICAgcmV0dXJuIGUuc3RvcFByb3BhZ2F0aW9uKClcblxuICAgICRjbG9zZXIgPSBrJC4kKGVsKS5xdWVyeVNlbGVjdG9yKCdhW2RhdGEtbW9kYWwtY2xvc2VdJylcbiAgICBpZiAkY2xvc2VyXG4gICAgICAkY2xvc2VyLmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgLT5cbiAgICAgICAgJGhpZGVNb2RhbCgpXG5cbiAgayQuJCBlbFxuXG5rJC5tb2RhbCA9IG1vZGFsXG5cbm1vZHVsZS5leHBvcnRzID0gbW9kYWxcbiIsIm5hdiA9IChlbCkgLT5cblxuICAjIEFjY2VwdCBib3RoIHN0cmluZ3MgYW5kIGVsZW1lbnRzLlxuICAkbmF2YmFyID0gaWYgdHlwZW9mIGVsID09ICdzdHJpbmcnIHRoZW4gayQuJChlbCkgZWxzZSBlbFxuXG4gIHRyeVxuICAgICMgV2lyZSB1cCBtZW51IGl0ZW1zXG4gICAgJG1lbnVJdGVtcyA9ICRuYXZiYXIucXVlcnlTZWxlY3RvckFsbCgndWwgPiBsaScpXG5cbiAgICAjIFBydW5lIGl0ZW1zIHRoYXQgZG9uJ3QgY29udGFpbiB1bHNcbiAgICBfJG1lbnVJdGVtcyA9IG5ldyBBcnJheSgpXG4gICAgZm9yICRtZW51SXRlbSBpbiAkbWVudUl0ZW1zXG4gICAgICBpZiAkbWVudUl0ZW0ucXVlcnlTZWxlY3RvckFsbCgndWwnKS5sZW5ndGggYW5kICEkbWVudUl0ZW0ucXVlcnlTZWxlY3RvckFsbCgnW3JvbGU9XCJidXR0b25cIl0nKS5sZW5ndGhcbiAgICAgICAgXyRtZW51SXRlbXMucHVzaCAkbWVudUl0ZW1cblxuICAgICRtZW51SXRlbXMgPSBfJG1lbnVJdGVtc1xuICAgIGZvciAkbWVudUl0ZW0gaW4gJG1lbnVJdGVtc1xuXG4gICAgICAjIE1hcmsgYXMgYSBtZW51IGl0ZW1cbiAgICAgICRtZW51SXRlbS5jbGFzc0xpc3QuYWRkICdtZW51LWl0ZW0nXG5cbiAgY2F0Y2ggZVxuICAgIGNvbnNvbGUuZXJyb3IgXCJDb3VsZCBub3QgaW5zdGFudGlhdGUgYXMgYSBuYXYuXCIsIGUubWVzc2FnZVxuXG4gICRidXR0b24gPSAkbmF2YmFyLnF1ZXJ5U2VsZWN0b3IoJy5uYXZiYXItdGl0bGUgYnV0dG9uJylcbiAgaWYgJGJ1dHRvbiBcbiAgICAkYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgLT5cbiAgICAgICRuYXYgPSAkbmF2YmFyLnF1ZXJ5U2VsZWN0b3IoJ25hdicpXG4gICAgICBpZiAkbmF2LmNsYXNzTGlzdC5jb250YWlucyAnZXhwYW5kJ1xuICAgICAgICAkbmF2LmNsYXNzTGlzdC5yZW1vdmUgJ2V4cGFuZCdcbiAgICAgIGVsc2VcbiAgICAgICAgJG5hdi5jbGFzc0xpc3QuYWRkICdleHBhbmQnXG5cbmskLm5hdiA9IG5hdlxuXG5tb2R1bGUuZXhwb3J0cyA9IG5hdlxuIiwic3RhdHVzID0gKG9wdHMpIC0+XG5cbiAgZGVmYXVsdHMgPVxuICAgIHR5cGU6ICdzdGF0dXMteWVsbG93J1xuICAgIGRlbGF5OiAyMDAwXG5cbiAgc3RhdHVzID0gayQuZXh0ZW5kIGRlZmF1bHRzLCBvcHRzXG5cbiAgaWYgbm90IGskLiQkKCcjc3RhdHVzX2JhcicpLmxlbmd0aFxuICAgICRzdGF0dXNCYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICRzdGF0dXNCYXIuaWQgPSAnc3RhdHVzX2JhcidcbiAgICAkc3RhdHVzQmFyLmNsYXNzTmFtZSA9ICdzdGF0dXNfYmFyJ1xuICAgICRzdGF0dXNCYXIuaW5uZXJIVE1MID0gXCI8ZGl2IGNsYXNzPSdzdGF0dXNfYmFyLXN0YXR1cycgaWQ9J3N0YXR1c19iYXItc3RhdHVzJz48L2Rpdj5cIlxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoJHN0YXR1c0JhcilcblxuICAkc3RhdHVzQmFyID0gayQuJCgnI3N0YXR1c19iYXInKVxuXG4gIGhpZGVTdGF0dXNCYXIgPSAtPlxuICAgICRzdGF0dXNCYXIuY2xhc3NMaXN0LmFkZCAnaGlkZSdcbiAgICBzZXRUaW1lb3V0IC0+XG4gICAgICAkc3RhdHVzQmFyLmNsYXNzTGlzdC5yZW1vdmUgJ2hpZGUnXG4gICAgICAkc3RhdHVzQmFyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQgJHN0YXR1c0JhclxuICAgICwgMjUwXG5cbiAgaWYgc3RhdHVzLmRlbGF5ID4gMFxuICAgIGskLmRlYm91bmNlIGhpZGVTdGF0dXNCYXIsICdoaWRlU3RhdHVzQmFyJywgc3RhdHVzLmRlbGF5XG5cbiAgJHN0YXR1cyA9IGskLiQoXCIjc3RhdHVzX2Jhci1zdGF0dXNcIilcbiAgJHN0YXR1cy5pbm5lckhUTUwgPSBzdGF0dXMudGV4dFxuICAkc3RhdHVzLmRhdGFzZXQudHlwZSA9IHN0YXR1cy50eXBlXG5cbmskLnN0YXR1cyA9IHN0YXR1c1xuXG5tb2R1bGUuZXhwb3J0cyA9IHN0YXR1c1xuIiwidGFicyA9IChlbCkgLT5cblxuICAjIEFjY2VwdCBib3RoIHN0cmluZ3MgYW5kIGVsZW1lbnRzLlxuICAkdGFiQ29udGFpbmVyID0gaWYgdHlwZW9mIGVsID09ICdzdHJpbmcnIHRoZW4gayQuJChlbCkgZWxzZSBlbFxuXG4gICR0YWJTZXQgPSAkdGFiQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJylcbiAgJHRhYi5jbGFzc0xpc3QuYWRkKCd0YWItaXRlbScpIGZvciAkdGFiIGluICR0YWJTZXRcblxuICAkcGFuZVNldCA9IG5ldyBBcnJheSgpXG4gIGZvciAkX3RhYiBpbiAkdGFiU2V0XG4gICAgJGlkID0gJF90YWIucXVlcnlTZWxlY3RvcignYScpLmdldEF0dHJpYnV0ZSgnaHJlZicpXG4gICAgJHBhbmUgPSBrJC4kKFwiYXJ0aWNsZSN7JGlkfVwiKVxuICAgICRwYW5lLmNsYXNzTGlzdC5hZGQgJ29wZW4nIGlmICRfdGFiLmNsYXNzTGlzdC5jb250YWlucyAnb3BlbidcbiAgICAkcGFuZVNldC5wdXNoKCRwYW5lKVxuICAgICMgJHBhbmUuZGF0YXNldC5wYW5lbCA9ICd0cnVlJyAjIFJlcGxhY2Ugd2l0aCB0aGlzIHdoZW4gSUUxMCBzdXBwb3J0IGRyb3BzXG4gICAgJHBhbmUuc2V0QXR0cmlidXRlKCdkYXRhLXBhbmVsJywgdHJ1ZSlcblxuICBmb3IgJHRhYiBpbiAkdGFiU2V0XG4gICAgIyBDcmVhdGUgYW4gYXJyYXkgb2YgcGFuZWxzIGJ5IHJlYWRpbmcgdGhlIGxpbmtzIGZyb20gZWFjaCB0YWIuXG4gICAgJHRhYkxpbmsgPSAkdGFiLnF1ZXJ5U2VsZWN0b3IoJ2EnKVxuICAgICMgJHRhYkxpbmsuZGF0YXNldC5saW5rID0gJHRhYkxpbmsuZ2V0QXR0cmlidXRlICdocmVmJyAjIEliaWRcbiAgICAkdGFiTGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtbGluaycsICR0YWJMaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpKVxuICAgICR0YWJMaW5rLmhyZWYgPSAnamF2YXNjcmlwdDp2b2lkKDApOydcblxuICAgIGRvICgkdGFiLCAkdGFiTGluaywgJHBhbmVTZXQpIC0+XG4gICAgICAkdGFiLmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgLT5cblxuICAgICAgICAjIFJlc2V0IHRhYnMgYW5kIHBhbmVzIG9ubHkgaW4gdGhpcyB0YWJzZXRcbiAgICAgICAgJHBhbmUuY2xhc3NMaXN0LnJlbW92ZSAnb3BlbicgZm9yICRwYW5lIGluICRwYW5lU2V0XG4gICAgICAgIF8kdGFiLmNsYXNzTGlzdC5yZW1vdmUgJ29wZW4nIGZvciBfJHRhYiBpbiAkdGFiU2V0XG5cbiAgICAgICAgIyBBZGQgYW4gb3BlbiBjbGFzcyB1bmlxdWVseSB0byB0aGlzIHRhYiBhbmQgcGFuZS5cbiAgICAgICAgIyBrJC4kKFwiYXJ0aWNsZSN7JHRhYkxpbmsuZGF0YXNldC5saW5rfVwiKS5jbGFzc0xpc3QuYWRkICdvcGVuJyAjIEliaWRcbiAgICAgICAgayQuJChcImFydGljbGUjeyR0YWJMaW5rLmdldEF0dHJpYnV0ZSgnZGF0YS1saW5rJyl9XCIpLmNsYXNzTGlzdC5hZGQgJ29wZW4nXG4gICAgICAgICR0YWIuY2xhc3NMaXN0LmFkZCAnb3BlbidcblxuayQudGFicyA9IHRhYnNcblxubW9kdWxlLmV4cG9ydHMgPSB0YWJzXG4iLCJ0aHJvdHRsZSA9IChmbiwgaWQsIGRlbGF5KSAtPlxuXG4gIFxuXG5rJC50aHJvdHRsZSA9IHRocm90dGxlXG5cbm1vZHVsZS5leHBvcnRzID0gdGhyb3R0bGVcbiIsInZhciB0ZXN0UnVubmVyID0ge1xuICBzcGVjczoge30sXG4gIEFzc2VydDogZnVuY3Rpb24oc3RyaW5nLCB0aW1lb3V0LCBzcGVjKSB7XG4gICAgdGhpcy5zdHJpbmcgPSBzdHJpbmc7XG4gICAgdGhpcy50aW1lb3V0ID0gdGltZW91dDtcbiAgICB0aGlzLnNwZWMgPSBzcGVjO1xuICAgIHRoaXMuZmFpbCA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgY29uc29sZS5lcnJvcihcIlRFU1RSVU5ORVIgRkFJTFwiICsgKHRoaXMuc3BlYyB8fCBcIlwiKSArIFwiOiBcIiArIHRoaXMuc3RyaW5nKTtcbiAgICB9LmJpbmQodGhpcyksIHRoaXMudGltZW91dCk7XG4gIH0sXG4gIEV4cGVjdDogZnVuY3Rpb24oc3RyaW5nLCBjb25kaXRpb24pIHtcbiAgICB0aGlzLnN0cmluZyA9IHN0cmluZztcbiAgICB0aGlzLmNvbmRpdGlvbiA9IGNvbmRpdGlvbjtcbiAgfSxcbiAgU3BlYzogZnVuY3Rpb24odGVzdHMpIHtcbiAgICB0aGlzLnRlc3RzID0gbmV3IEFycmF5KCk7XG4gICAgdGhpcy50ZXN0cyA9IHRoaXMudGVzdHMuY29uY2F0KHRlc3RzKTtcbiAgfVxufVxuXG50ZXN0UnVubmVyLkFzc2VydC5wcm90b3R5cGUucmV0dXJuID0gZnVuY3Rpb24oKSB7XG4gIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5mYWlsKTtcbiAgY29uc29sZS5sb2coXCIlYyBURVNUUlVOTkVSIFBBU1NFRDogXCIgKyB0aGlzLnN0cmluZywgXCJjb2xvcjogZ3JlZW5cIik7XG59XG5cbnRlc3RSdW5uZXIuRXhwZWN0LnByb3RvdHlwZS5yZXR1cm4gPSBmdW5jdGlvbigpIHtcbiAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICBpZiAodGhpcy5jb25kaXRpb24uYXBwbHkobnVsbCwgYXJncykpIHtcbiAgICBjb25zb2xlLmxvZyhcIiVjIFRFU1RSVU5ORVIgUEFTU0VEOiBcIiArIHRoaXMuc3RyaW5nLCBcImNvbG9yOiBncmVlblwiKTtcbiAgfVxuICBlbHNlIHtcbiAgICBjb25zb2xlLmVycm9yKFwiVEVTVFJVTk5FUiBGQUlMRUQ6IFwiICsgdGhpcy5zdHJpbmcpO1xuICAgIGNvbnNvbGUuZXJyb3IoYXJncyk7XG4gIH1cbn1cblxudGVzdFJ1bm5lci5TcGVjLnByb3RvdHlwZS5yZXR1cm4gPSBmdW5jdGlvbigpIHtcbiAgdGhpc0RhdGEgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpXG5cbiAgZm9yICh2YXIgX2kgPSAwLCBsZW4gPSB0aGlzLnRlc3RzLmxlbmd0aDsgX2kgPCBsZW47IF9pKyspIHtcbiAgICB0aGlzLnRlc3RzW19pXS5yZXR1cm4odGhpc0RhdGFbX2ldKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRlc3RSdW5uZXJcbiJdfQ==
