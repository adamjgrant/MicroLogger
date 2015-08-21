(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./lib/coffee/app.coffee":[function(require,module,exports){
var KS, vendor;

KS = require('../../lib-core/coffee/app');

window['$tr'] = require('../js/testRunner');

vendor = require('./vendor/index');

document.addEventListener('DOMContentLoaded', function() {
  var someVar, someVar2;
  someVar = 0;
  someVar2 = void 0;
  k$.$('button#first').addEventListener('click', function() {
    return $tr.waitForButton = new $tr.Assert("button was pressed in less than 3 seconds", 3000);
  });
  k$.$('button#second').addEventListener('click', function() {
    return $tr.waitForButton["return"]();
  });
  k$.$('button#third').addEventListener('click', function() {
    return $tr.specs.waitTwiceForButton = new $tr.Spec([$tr.waitForButton = new $tr.Assert("button was pressed in less than 3 seconds", 3000), $tr.waitForButton = new $tr.Assert("button was pressed in less than 5 seconds", 5000)]);
  });
  k$.$('button#fourth').addEventListener('click', function() {
    return $tr.specs.waitTwiceForButton["return"]();
  });
  k$.$('button#setone').addEventListener('click', function() {
    someVar = 1;
    return $tr.getOne["return"](someVar);
  });
  k$.$('button#settwo').addEventListener('click', function() {
    someVar = 2;
    return $tr.getOne["return"](someVar);
  });
  k$.$('button#getone').addEventListener('click', function() {
    return $tr.getOne = new $tr.Expect("variable is set to 1", function(variable) {
      return variable === 1;
    });
  });
  k$.$('button#final').addEventListener('click', function() {
    return $tr.specs.getOneQuickly = new $tr.Spec([
      new $tr.Expect("variable is set to 1", function(variable) {
        return variable === 1;
      }), new $tr.Assert("variable is set in less than 3 seconds", 3000)
    ]);
  });
  k$.$('button#setonetwo').addEventListener('click', function() {
    someVar2 = 1;
    return $tr.specs.getOneQuickly["return"](someVar2, null);
  });
  return k$.$('button#settwotwo').addEventListener('click', function() {
    someVar2 = 2;
    return $tr.specs.getOneQuickly["return"](someVar2, null);
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

},{}]},{},["./lib/coffee/app.coffee"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYWRhbWdyYW50L3NpdGVzL3Rlc3RydW5uZXIvbGliL2NvZmZlZS9hcHAuY29mZmVlIiwiL1VzZXJzL2FkYW1ncmFudC9zaXRlcy90ZXN0cnVubmVyL2xpYi1jb3JlL2NvZmZlZS9hcHAuY29mZmVlIiwiL1VzZXJzL2FkYW1ncmFudC9zaXRlcy90ZXN0cnVubmVyL2xpYi1jb3JlL2NvZmZlZS9idWZmZXIuY29mZmVlIiwiL1VzZXJzL2FkYW1ncmFudC9zaXRlcy90ZXN0cnVubmVyL2xpYi1jb3JlL2NvZmZlZS9idXR0b25zLmNvZmZlZSIsIi9Vc2Vycy9hZGFtZ3JhbnQvc2l0ZXMvdGVzdHJ1bm5lci9saWItY29yZS9jb2ZmZWUvZGVib3VuY2VyLmNvZmZlZSIsIi9Vc2Vycy9hZGFtZ3JhbnQvc2l0ZXMvdGVzdHJ1bm5lci9saWItY29yZS9jb2ZmZWUvZHJvcGRvd24uY29mZmVlIiwiL1VzZXJzL2FkYW1ncmFudC9zaXRlcy90ZXN0cnVubmVyL2xpYi1jb3JlL2NvZmZlZS9ncm93bC5jb2ZmZWUiLCIvVXNlcnMvYWRhbWdyYW50L3NpdGVzL3Rlc3RydW5uZXIvbGliLWNvcmUvY29mZmVlL2ljb25zLmNvZmZlZSIsImxpYi1jb3JlL2NvZmZlZS9rcy5jb2ZmZWUiLCIvVXNlcnMvYWRhbWdyYW50L3NpdGVzL3Rlc3RydW5uZXIvbGliLWNvcmUvY29mZmVlL21vZGFsLmNvZmZlZSIsIi9Vc2Vycy9hZGFtZ3JhbnQvc2l0ZXMvdGVzdHJ1bm5lci9saWItY29yZS9jb2ZmZWUvbmF2YmFyLmNvZmZlZSIsIi9Vc2Vycy9hZGFtZ3JhbnQvc2l0ZXMvdGVzdHJ1bm5lci9saWItY29yZS9jb2ZmZWUvc3RhdHVzLmNvZmZlZSIsIi9Vc2Vycy9hZGFtZ3JhbnQvc2l0ZXMvdGVzdHJ1bm5lci9saWItY29yZS9jb2ZmZWUvdGFicy5jb2ZmZWUiLCIvVXNlcnMvYWRhbWdyYW50L3NpdGVzL3Rlc3RydW5uZXIvbGliLWNvcmUvY29mZmVlL3Rocm90dGxlci5jb2ZmZWUiLCJsaWIvanMvdGVzdFJ1bm5lci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUE7O0FBQUEsRUFBQSxHQUFZLE9BQUEsQ0FBUSwyQkFBUjs7QUFDWixNQUFPLENBQUEsS0FBQSxDQUFQLEdBQWdCLE9BQUEsQ0FBUSxrQkFBUjs7QUFDaEIsTUFBQSxHQUFZLE9BQUEsQ0FBUSxnQkFBUjs7QUFFWixRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFNBQUE7QUFDNUMsTUFBQTtFQUFBLE9BQUEsR0FBVTtFQUNWLFFBQUEsR0FBVztFQUVYLEVBQUUsQ0FBQyxDQUFILENBQUssY0FBTCxDQUFvQixDQUFDLGdCQUFyQixDQUFzQyxPQUF0QyxFQUErQyxTQUFBO1dBQzdDLEdBQUcsQ0FBQyxhQUFKLEdBQXdCLElBQUEsR0FBRyxDQUFDLE1BQUosQ0FBVywyQ0FBWCxFQUF3RCxJQUF4RDtFQURxQixDQUEvQztFQUlBLEVBQUUsQ0FBQyxDQUFILENBQUssZUFBTCxDQUFxQixDQUFDLGdCQUF0QixDQUF1QyxPQUF2QyxFQUFnRCxTQUFBO1dBQzlDLEdBQUcsQ0FBQyxhQUFhLENBQUMsUUFBRCxDQUFqQixDQUFBO0VBRDhDLENBQWhEO0VBSUEsRUFBRSxDQUFDLENBQUgsQ0FBSyxjQUFMLENBQW9CLENBQUMsZ0JBQXJCLENBQXNDLE9BQXRDLEVBQStDLFNBQUE7V0FDN0MsR0FBRyxDQUFDLEtBQUssQ0FBQyxrQkFBVixHQUFtQyxJQUFBLEdBQUcsQ0FBQyxJQUFKLENBQVMsQ0FDMUMsR0FBRyxDQUFDLGFBQUosR0FBd0IsSUFBQSxHQUFHLENBQUMsTUFBSixDQUFXLDJDQUFYLEVBQXdELElBQXhELENBRGtCLEVBRTFDLEdBQUcsQ0FBQyxhQUFKLEdBQXdCLElBQUEsR0FBRyxDQUFDLE1BQUosQ0FBVywyQ0FBWCxFQUF3RCxJQUF4RCxDQUZrQixDQUFUO0VB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ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJLUyAgICAgICAgPSByZXF1aXJlICcuLi8uLi9saWItY29yZS9jb2ZmZWUvYXBwJ1xud2luZG93WyckdHInXSA9IHJlcXVpcmUgJy4uL2pzL3Rlc3RSdW5uZXInXG52ZW5kb3IgICAgPSByZXF1aXJlICcuL3ZlbmRvci9pbmRleCdcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciAnRE9NQ29udGVudExvYWRlZCcsIC0+XG4gIHNvbWVWYXIgPSAwXG4gIHNvbWVWYXIyID0gdW5kZWZpbmVkXG5cbiAgayQuJCgnYnV0dG9uI2ZpcnN0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAtPlxuICAgICR0ci53YWl0Rm9yQnV0dG9uID0gbmV3ICR0ci5Bc3NlcnQoXCJidXR0b24gd2FzIHByZXNzZWQgaW4gbGVzcyB0aGFuIDMgc2Vjb25kc1wiLCAzMDAwKVxuICApXG5cbiAgayQuJCgnYnV0dG9uI3NlY29uZCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgLT5cbiAgICAkdHIud2FpdEZvckJ1dHRvbi5yZXR1cm4oKVxuICApXG5cbiAgayQuJCgnYnV0dG9uI3RoaXJkJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAtPlxuICAgICR0ci5zcGVjcy53YWl0VHdpY2VGb3JCdXR0b24gPSBuZXcgJHRyLlNwZWMoW1xuICAgICAgJHRyLndhaXRGb3JCdXR0b24gPSBuZXcgJHRyLkFzc2VydChcImJ1dHRvbiB3YXMgcHJlc3NlZCBpbiBsZXNzIHRoYW4gMyBzZWNvbmRzXCIsIDMwMDApLFxuICAgICAgJHRyLndhaXRGb3JCdXR0b24gPSBuZXcgJHRyLkFzc2VydChcImJ1dHRvbiB3YXMgcHJlc3NlZCBpbiBsZXNzIHRoYW4gNSBzZWNvbmRzXCIsIDUwMDApXG4gICAgXSlcbiAgKVxuXG4gIGskLiQoJ2J1dHRvbiNmb3VydGgnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIC0+XG4gICAgJHRyLnNwZWNzLndhaXRUd2ljZUZvckJ1dHRvbi5yZXR1cm4oKVxuICApXG5cbiAgayQuJCgnYnV0dG9uI3NldG9uZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgLT4gXG4gICAgc29tZVZhciA9IDFcbiAgICAkdHIuZ2V0T25lLnJldHVybihzb21lVmFyKVxuICApXG5cbiAgayQuJCgnYnV0dG9uI3NldHR3bycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgLT4gXG4gICAgc29tZVZhciA9IDJcbiAgICAkdHIuZ2V0T25lLnJldHVybihzb21lVmFyKVxuICApXG5cbiAgayQuJCgnYnV0dG9uI2dldG9uZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgLT4gXG4gICAgJHRyLmdldE9uZSA9IG5ldyAkdHIuRXhwZWN0KFwidmFyaWFibGUgaXMgc2V0IHRvIDFcIiwgKHZhcmlhYmxlKSAtPlxuICAgICAgcmV0dXJuIHZhcmlhYmxlID09IDFcbiAgICApXG4gIClcblxuICBrJC4kKCdidXR0b24jZmluYWwnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIC0+XG4gICAgJHRyLnNwZWNzLmdldE9uZVF1aWNrbHkgPSBuZXcgJHRyLlNwZWMoW1xuICAgICAgbmV3ICR0ci5FeHBlY3QoXCJ2YXJpYWJsZSBpcyBzZXQgdG8gMVwiLCAodmFyaWFibGUpIC0+XG4gICAgICAgIHJldHVybiB2YXJpYWJsZSA9PSAxXG4gICAgICApLFxuICAgICAgbmV3ICR0ci5Bc3NlcnQoXCJ2YXJpYWJsZSBpcyBzZXQgaW4gbGVzcyB0aGFuIDMgc2Vjb25kc1wiLCAzMDAwKVxuICAgIF0pXG4gIClcblxuICBrJC4kKCdidXR0b24jc2V0b25ldHdvJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAtPlxuICAgIHNvbWVWYXIyID0gMVxuICAgICR0ci5zcGVjcy5nZXRPbmVRdWlja2x5LnJldHVybihzb21lVmFyMiwgbnVsbClcbiAgKVxuXG4gIGskLiQoJ2J1dHRvbiNzZXR0d290d28nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIC0+XG4gICAgc29tZVZhcjIgPSAyXG4gICAgJHRyLnNwZWNzLmdldE9uZVF1aWNrbHkucmV0dXJuKHNvbWVWYXIyLCBudWxsKVxuICApXG4iLCJLUyAgICAgICAgPSByZXF1aXJlICcuL2tzJ1xuTW9kYWwgICAgID0gcmVxdWlyZSAnLi9tb2RhbCdcbk5hdmJhciAgICA9IHJlcXVpcmUgJy4vbmF2YmFyJ1xuRGVib3VuY2UgID0gcmVxdWlyZSAnLi9kZWJvdW5jZXInXG5JY29ucyAgICAgPSByZXF1aXJlICcuL2ljb25zJ1xuU3RhdHVzICAgID0gcmVxdWlyZSAnLi9zdGF0dXMnXG5UYWJzICAgICAgPSByZXF1aXJlICcuL3RhYnMnXG5UaHJvdHRsZXIgPSByZXF1aXJlICcuL3Rocm90dGxlcidcbkJ1dHRvbnMgICA9IHJlcXVpcmUgJy4vYnV0dG9ucydcbkJ1ZmZlciAgICA9IHJlcXVpcmUgJy4vYnVmZmVyJ1xuR3Jvd2wgICAgID0gcmVxdWlyZSAnLi9ncm93bCdcbkRyb3Bkb3duICA9IHJlcXVpcmUgJy4vZHJvcGRvd24nXG5cbmskLnJlYWR5ID0gLT5cbiAgayQuaWNvbnMoKVxuICBrJC5idXR0b24oKVxuICBrJC5kcm9wZG93bigpXG4gIGskLm5hdigkbmF2YmFyKSBmb3IgJG5hdmJhciBpbiBrJC4kJCgnW2RhdGEta3MtbmF2YmFyXScpXG4gIGskLnRhYnMoJHRhYlNldCkgZm9yICR0YWJTZXQgaW4gayQuJCQoJ1tkYXRhLWtzLXRhYnNdJylcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciAnRE9NQ29udGVudExvYWRlZCcsIC0+IGskLnJlYWR5KClcbiIsImJ1ZmZlciA9IChmbiwgZGVsYXkpIC0+XG5cbiAgIyBDcmVhdGUgYSBuZXcgYnVmZmVyQXJyYXkgaWYgb25lIGRvZXMgbm90IGV4aXN0IGFscmVhZHkuXG4gIGskLmJ1ZmZlckFycmF5ID0gayQuYnVmZmVyQXJyYXkgfHwgbmV3IEFycmF5KClcbiAgaWYgbm90IGskLmJ1ZmZlckFycmF5Lmxlbmd0aFxuICAgIGskLmJ1ZmZlckFycmF5ID0gbmV3IEFycmF5KClcblxuICAgIGRlbGF5ID0gZGVsYXkgfHwgNTAwXG5cbiAgICAjIENyZWF0ZSBhbiBpbnRlcnZhbCB0byBmaXJlIHRoZSBmbnMgaW4gYnVmZmVyQXJyYXlcbiAgICBpID0gMVxuXG4gICAgayQuYnVmZmVySW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCAtPlxuICAgICAgayQuYnVmZmVyQXJyYXlbaV0oKSBpZiBrJC5idWZmZXJBcnJheVtpXVxuICAgICAgaSsrXG4gICAgICBpZiBpID49IGskLmJ1ZmZlckFycmF5Lmxlbmd0aFxuICAgICAgICBjbGVhckludGVydmFsIGskLmJ1ZmZlckludGVydmFsXG4gICAgICAgIGskLmJ1ZmZlckFycmF5ID0gdW5kZWZpbmVkXG4gICAgICAgIGkgPSAxXG4gICAgLCBkZWxheVxuXG4gICMgQWRkIHRoaXMgZnVuY3Rpb24gdG8gdGhlIGFycmF5LlxuICBrJC5idWZmZXJBcnJheS5wdXNoIGZuXG5cbiAgIyBGaXJlIHJpZ2h0IGF3YXkgaWYgaXQncyB0aGUgZmlyc3QgaW4gbGluZS5cbiAgayQuYnVmZmVyQXJyYXlbMF0oKSBpZiBrJC5idWZmZXJBcnJheS5sZW5ndGggPT0gMVxuXG4gIGNvbnNvbGUuaW5mbyBcIkZ1bmN0aW9uIHF1ZXVlZCAoI3trJC5idWZmZXJBcnJheS5sZW5ndGh9IGluIHF1ZXVlKVwiXG5cbmskLmJ1ZmZlciA9IGJ1ZmZlclxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ1ZmZlclxuIiwiYnV0dG9uID0gLT5cblxuICAoJGJ1dHRvbi5jbGFzc0xpc3QuYWRkICdtZW51LWl0ZW0nIGlmICRidXR0b24ucXVlcnlTZWxlY3RvckFsbCgndWwnKS5sZW5ndGgpIGZvciAkYnV0dG9uIGluIGskLiQkKFwiYnV0dG9uXCIpXG4gICRidXR0b25Ecm9wZG93bi5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQgJ21lbnUtaXRlbScgZm9yICRidXR0b25Ecm9wZG93biBpbiBrJC4kJCAnLmJ1dHRvbi1kcm9wZG93bidcblxuayQuYnV0dG9uID0gYnV0dG9uXG5cbm1vZHVsZS5leHBvcnRzID0gYnV0dG9uXG4iLCJkZWJvdW5jZSA9IChmbiwgaWQsIGRlbGF5LCBhcmdzLCB0aGF0KSAtPlxuXG4gIGRlbGF5ID0gZGVsYXkgfHwgMTAwMFxuICB0aGF0ID0gdGhhdCB8fCB0aGlzXG4gIGFyZ3MgPSBhcmdzIHx8IG5ldyBBcnJheVxuXG4gIGskLmRlYm91bmNlUXVldWVbaWRdID0gbmV3IE9iamVjdCgpIGlmIHR5cGVvZiBrJC5kZWJvdW5jZVF1ZXVlW2lkXSAhPSBcIm9iamVjdFwiXG5cbiAgY2xlYXJUaW1lb3V0IGskLmRlYm91bmNlUXVldWVbaWRdLmRlYm91bmNlVGltZXIgaWYgdHlwZW9mIGskLmRlYm91bmNlUXVldWVbaWRdLmRlYm91bmNlVGltZXIgIT0gXCJ1bmRlZmluZWRcIlxuXG4gIGskLmRlYm91bmNlUXVldWVbaWRdID1cbiAgICBmbjogZm5cbiAgICBpZDogaWRcbiAgICBkZWxheTogZGVsYXlcbiAgICBhcmdzOiBhcmdzXG4gICAgZGVib3VuY2VUaW1lcjogc2V0VGltZW91dCAtPlxuICAgICAgayQuZGVib3VuY2VRdWV1ZVtpZF0uZm4uYXBwbHkodGhhdCwgayQuZGVib3VuY2VRdWV1ZVtpZF0uYXJncylcbiAgICAgIGskLmRlYm91bmNlUXVldWVbaWRdID0gdW5kZWZpbmVkXG4gICAgLCBkZWxheVxuXG5rJC5kZWJvdW5jZSA9IGRlYm91bmNlXG5cbm1vZHVsZS5leHBvcnRzID0gZGVib3VuY2VcbiIsImRyb3Bkb3duID0gKCkgLT5cblxuICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgKGUpIC0+XG4gICAgJG1lbnVJdGVtID0gbnVsbFxuXG4gICAgY2xvc2VBbGxNZW51cyA9IC0+XG4gICAgICBfJG1lbnVJdGVtLmNsYXNzTGlzdC5yZW1vdmUgJ29wZW4nIGZvciBfJG1lbnVJdGVtIGluIGskLiQkKCcubWVudS1pdGVtJylcblxuICAgICMgV2UnbGwgbmVlZCB0aGlzIGxhdGVyLlxuICAgIG9wZW5NZW51ID0gLT5cbiAgICAgICMgVXNlciBoYXMgY2xpY2tlZCBvbiBhIG1lbnUgdHJpZ2dlci5cbiAgICAgIGlmICRtZW51SXRlbS5jbGFzc0xpc3QuY29udGFpbnMgJ29wZW4nIFxuICAgICAgICAkbWVudUl0ZW0uY2xhc3NMaXN0LnJlbW92ZSAnb3BlbicgXG4gICAgICBlbHNlIFxuICAgICAgICBjbG9zZUFsbE1lbnVzKCkgXG4gICAgICAgICRtZW51SXRlbS5jbGFzc0xpc3QuYWRkICdvcGVuJ1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuXG4gICAgIyBMZXQncyBjaGVjayBpZiBhIHVzZXIgaGFzIGNsaWNrZWQgb24gYSBtZW51IHRyaWdnZXI6XG4gICAgaWYgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zICdtZW51LWl0ZW0nXG4gICAgICAkbWVudUl0ZW0gPSBlLnRhcmdldCBcbiAgICAgIG9wZW5NZW51KClcbiAgICBlbHNlIGlmIGUudGFyZ2V0LnBhcmVudE5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zICdtZW51LWl0ZW0nXG4gICAgICAkbWVudUl0ZW0gPSBlLnRhcmdldC5wYXJlbnROb2RlXG4gICAgICBvcGVuTWVudSgpXG4gICAgZWxzZVxuICAgICAgY2xvc2VBbGxNZW51cygpXG4gICAgICByZXR1cm5cblxuXG5cbiAgIyAjIFRoZSBmb2xsb3dpbmcgc2hvdWxkIGFwcGx5IHRvIHNldmVyYWwgZWxlbWVudHMuXG4gICNcbiAgIyAkbWVudUl0ZW1zID0gayQuJCQgJy5tZW51LWl0ZW0nXG4gICNcbiAgIyBmb3IgJF9tZW51SXRlbSBpbiAkbWVudUl0ZW1zXG4gICNcbiAgIyAgICRtZW51SXRlbSA9ICRfbWVudUl0ZW0uY2xvbmVOb2RlIHRydWVcbiAgIyAgICRfbWVudUl0ZW0ucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQgJG1lbnVJdGVtLCAkX21lbnVJdGVtXG4gICNcbiAgIyAgIGRvICgkbWVudUl0ZW0pIC0+XG5cbiAgICAgICMgVE9ETyBtYWtlIG9ubHkgb25lIGV2ZW50IGxpc3RlbmVyIGZvciB0aGUgcGFyZW50LlxuICAgICAgIyAkbWVudUl0ZW0uYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCAoZSkgLT5cblxuICAgICAgICAjICMgSnVzdCBjbG9zZSBpdCBpZiBpdCdzIGFscmVhZHkgb3BlblxuICAgICAgICAjIGlmICRtZW51SXRlbS5jbGFzc0xpc3QuY29udGFpbnMgJ29wZW4nXG4gICAgICAgICMgICAkbWVudUl0ZW0uY2xhc3NMaXN0LnJlbW92ZSAnb3BlbidcbiAgICAgICAgIyAgIHJldHVyblxuICAgICAgICAjXG4gICAgICAgICMgIyBSZXNldCBhbGxcbiAgICAgICAgIyBfJG1lbnVJdGVtLmNsYXNzTGlzdC5yZW1vdmUgJ29wZW4nIGZvciBfJG1lbnVJdGVtIGluIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZW51LWl0ZW0nKVxuICAgICAgICAjICRvcGVuYWJsZSA9ICRtZW51SXRlbS5xdWVyeVNlbGVjdG9yICd1bCdcbiAgICAgICAgI1xuICAgICAgICAjICMgT3BlbiB0aGlzIG9uZVxuICAgICAgICAjIGlmICRvcGVuYWJsZVxuICAgICAgICAjICAgJG1lbnVJdGVtLmNsYXNzTGlzdC5hZGQgJ29wZW4nXG4gICAgICAgICNcbiAgICAgICAgIyAjIFByZXZlbnQgYnViYmxpbmdcbiAgICAgICAgIyBlLnN0b3BQcm9wYWdhdGlvbigpXG5cbiAgIyAjIERpc21pc3MgYWxsXG4gICMgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyICdjbGljaycsIC0+XG4gICMgICAkdWwucGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlICdvcGVuJyBmb3IgJHVsIGluIGskLiQkKCcubWVudS1pdGVtID4gdWwnKVxuICAjICAgJGxpLmNsYXNzTGlzdC5yZW1vdmUgJ29wZW4nIGZvciAkbGkgaW4gayQuJCQoJy5tZW51LWl0ZW0ub3BlbicpXG5cbmskLmRyb3Bkb3duID0gZHJvcGRvd25cblxubW9kdWxlLmV4cG9ydHMgPSBkcm9wZG93blxuIiwiZ3Jvd2wgPSAocGFyYW1zKSAtPlxuXG4gIGskLmJ1ZmZlciAtPlxuICAgIGRlZmF1bHRzID1cbiAgICAgIHRpdGxlOiB1bmRlZmluZWRcbiAgICAgIHRleHQ6IHVuZGVmaW5lZFxuICAgICAgZGVsYXk6IDIwMDBcbiAgICAgIHR5cGU6ICdncm93bC13YXJuJ1xuICAgICAgaWQ6IERhdGUubm93KClcblxuICAgIHBhcmFtcyA9IGskLmV4dGVuZCBkZWZhdWx0cywgcGFyYW1zXG5cbiAgICAjIENyZWF0ZSBncm93bCBjb250YWluZXJcbiAgICBpZiBub3QgayQuJCQoJy5ncm93bF9jb250YWluZXInKS5sZW5ndGhcbiAgICAgIGdyb3dsQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnZGl2J1xuICAgICAgZ3Jvd2xDb250YWluZXIuY2xhc3NOYW1lID0gJ2dyb3dsX2NvbnRhaW5lcidcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQgZ3Jvd2xDb250YWluZXJcblxuICAgICMgQ3JlYXRlIGdyb3dsXG4gICAgZ3Jvd2wgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdkaXYnXG5cbiAgICAjIEFkZCBhcHByb3ByaWF0ZSBjbGFzc2VzXG4gICAgY2xhc3NOYW1lID0gXCJhbGVydCBncm93bCBzaG93ICN7cGFyYW1zLnR5cGV9IGdyb3dsLSN7cGFyYW1zLmlkfVwiXG4gICAgZ3Jvd2wuY2xhc3NOYW1lID0gY2xhc3NOYW1lXG5cbiAgICAjIEFkZCBjb250ZW50XG4gICAgY29udGVudCA9IFwiXCJcbiAgICBjb250ZW50ICs9IFwiPGgxPiN7cGFyYW1zLnRpdGxlfTwvaDE+XCIgaWYgcGFyYW1zLnRpdGxlXG4gICAgY29udGVudCArPSBcIjxwPiN7cGFyYW1zLnRleHR9PC9wPlwiIGlmIHBhcmFtcy50ZXh0XG4gICAgZ3Jvd2wuaW5uZXJIVE1MID0gY29udGVudFxuXG4gICAgIyBBcHBlbmQgY2hpbGQgdG8gY29udGFpbmVyXG4gICAgayQuJCgnLmdyb3dsX2NvbnRhaW5lcicpLmFwcGVuZENoaWxkIGdyb3dsXG5cbiAgICBkZWxheSA9IHBhcmFtcy5kZWxheVxuICAgIGlkID0gcGFyYW1zLmlkXG5cbiAgICBpZiBkZWxheSA+IDBcbiAgICAgIGRvIChkZWxheSwgaWQpIC0+XG4gICAgICAgIHNldFRpbWVvdXQgLT5cbiAgICAgICAgICAkZ3Jvd2wgPSBrJC4kKFwiLmdyb3dsLSN7aWR9XCIpXG4gICAgICAgICAgJGdyb3dsLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKVxuICAgICAgICAgICRuZXdHcm93bCA9ICRncm93bC5jbG9uZU5vZGUgdHJ1ZVxuICAgICAgICAgICRncm93bC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZCAkbmV3R3Jvd2wsICRncm93bFxuICAgICAgICAgICRuZXdHcm93bC5jbGFzc0xpc3QuYWRkKCdoaWRlJylcblxuICAgICAgICAgIGRvIChkZWxheSwgaWQpIC0+XG4gICAgICAgICAgICBzZXRUaW1lb3V0IC0+XG4gICAgICAgICAgICAgICMgUmVtb3ZlIGdob3N0IGdyb3dsc1xuICAgICAgICAgICAgICBrJC4kKCcuZ3Jvd2xfY29udGFpbmVyJykucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCBrJC4kKCcuZ3Jvd2xfY29udGFpbmVyJykgaWYgbm90IGskLiQkKCcuZ3Jvd2wuc2hvdycpLmxlbmd0aFxuICAgICAgICAgICAgLCA1MDBcbiAgICAgICAgLCBkZWxheVxuXG5rJC5ncm93bCA9IGdyb3dsXG5cbm1vZHVsZS5leHBvcnRzID0gZ3Jvd2xcbiIsImljb25zID0gKCkgLT5cblxuICAjISBzdmc0ZXZlcnlib2R5IHYxLjAuMCB8IGdpdGh1Yi5jb20vam9uYXRoYW50bmVhbC9zdmc0ZXZlcnlib2R5IFxuICB1c2VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJ1c2VcIilcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSBvciB3aW5kb3cuc2V0VGltZW91dFxuICBDQUNIRSA9IHt9XG4gICMgSUU5VE8xMSA9IC9UcmlkZW50XFwvWzU2N11cXGIvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgb3IgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0FwcGxlV2ViS2l0XFwvKFxcZCspLykgb3IgW10pWzFdIDwgNTM3XG4gIElFOVRPMTEgPSB0cnVlXG4gICMgRm9yY2luZyB0aGlzIHRvIHNoaW0gcmVnYXJkbGVzcy5cbiAgZW1iZWQgPSAoc3ZnLCBnKSAtPlxuICAgIGlmIGdcbiAgICAgIHZpZXdCb3ggPSBnLmdldEF0dHJpYnV0ZShcInZpZXdCb3hcIilcbiAgICAgIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXG4gICAgICBjbG9uZSA9IGcuY2xvbmVOb2RlKHRydWUpXG4gICAgICBzdmcuc2V0QXR0cmlidXRlIFwidmlld0JveFwiLCB2aWV3Qm94ICBpZiB2aWV3Qm94XG4gICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZCBjbG9uZS5jaGlsZE5vZGVzWzBdICB3aGlsZSBjbG9uZS5jaGlsZE5vZGVzLmxlbmd0aFxuICAgICAgc3ZnLmFwcGVuZENoaWxkIGZyYWdtZW50XG4gICAgcmV0dXJuXG4gIG9ubG9hZCA9IC0+XG4gICAgeGhyID0gdGhpc1xuICAgIHggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwieFwiKVxuICAgIHMgPSB4aHIuc1xuICAgIHguaW5uZXJIVE1MID0geGhyLnJlc3BvbnNlVGV4dFxuICAgIHhoci5vbmxvYWQgPSAtPlxuICAgICAgcy5zcGxpY2UoMCkubWFwIChhcnJheSkgLT5cbiAgICAgICAgZW1iZWQgYXJyYXlbMF0sIHgucXVlcnlTZWxlY3RvcihcIiNcIiArIGFycmF5WzFdLnJlcGxhY2UoLyhcXFcpL2csIFwiXFxcXCQxXCIpKVxuICAgICAgICByZXR1cm5cblxuICAgICAgcmV0dXJuXG5cbiAgICB4aHIub25sb2FkKClcbiAgICByZXR1cm5cbiAgb25mcmFtZSA9IC0+XG4gICAgdXNlID0gdW5kZWZpbmVkXG4gICAgd2hpbGUgKHVzZSA9IHVzZXNbMF0pXG4gICAgICBzdmcgPSB1c2UucGFyZW50Tm9kZVxuICAgICAgdXJsID0gdXNlLmdldEF0dHJpYnV0ZShcInhsaW5rOmhyZWZcIikuc3BsaXQoXCIjXCIpXG4gICAgICB1cmxfcm9vdCA9IHVybFswXVxuICAgICAgdXJsX2hhc2ggPSB1cmxbMV1cbiAgICAgIHN2Zy5yZW1vdmVDaGlsZCB1c2VcbiAgICAgIGlmIHVybF9yb290Lmxlbmd0aFxuICAgICAgICB4aHIgPSBDQUNIRVt1cmxfcm9vdF0gPSBDQUNIRVt1cmxfcm9vdF0gb3IgbmV3IFhNTEh0dHBSZXF1ZXN0KClcbiAgICAgICAgdW5sZXNzIHhoci5zXG4gICAgICAgICAgeGhyLnMgPSBbXVxuICAgICAgICAgIHhoci5vcGVuIFwiR0VUXCIsIHVybF9yb290XG4gICAgICAgICAgeGhyLm9ubG9hZCA9IG9ubG9hZFxuICAgICAgICAgIHhoci5zZW5kKClcbiAgICAgICAgeGhyLnMucHVzaCBbXG4gICAgICAgICAgc3ZnXG4gICAgICAgICAgdXJsX2hhc2hcbiAgICAgICAgXVxuICAgICAgICB4aHIub25sb2FkKCkgIGlmIHhoci5yZWFkeVN0YXRlIGlzIDRcbiAgICAgIGVsc2VcbiAgICAgICAgZW1iZWQgc3ZnLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh1cmxfaGFzaClcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgb25mcmFtZVxuICAgIHJldHVyblxuICBvbmZyYW1lKCkgIGlmIElFOVRPMTFcbiAgcmV0dXJuXG5cbmskLmljb25zID0gaWNvbnNcblxubW9kdWxlLmV4cG9ydHMgPSBpY29uc1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuZ2xvYmFsLmskID0gbmV3IE9iamVjdCgpO1xuXG5rJC4kJCA9IGZ1bmN0aW9uKGVsKSB7XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGVsKTtcbn07XG5cbmskLiQgPSBmdW5jdGlvbihlbCkge1xuICByZXR1cm4gayQuJCQoZWwpWzBdO1xufTtcblxuayQuZXh0ZW5kID0gZnVuY3Rpb24oZGVzdGluYXRpb24sIHNvdXJjZSkge1xuICB2YXIgcHJvcGVydHk7XG4gIGZvciAocHJvcGVydHkgaW4gc291cmNlKSB7XG4gICAgaWYgKHNvdXJjZVtwcm9wZXJ0eV0gJiYgc291cmNlW3Byb3BlcnR5XS5jb25zdHJ1Y3RvciAmJiBzb3VyY2VbcHJvcGVydHldLmNvbnN0cnVjdG9yID09PSBPYmplY3QpIHtcbiAgICAgIGRlc3RpbmF0aW9uW3Byb3BlcnR5XSA9IGRlc3RpbmF0aW9uW3Byb3BlcnR5XSB8fCB7fTtcbiAgICAgIGFyZ3VtZW50cy5jYWxsZWUoZGVzdGluYXRpb25bcHJvcGVydHldLCBzb3VyY2VbcHJvcGVydHldKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVzdGluYXRpb25bcHJvcGVydHldID0gc291cmNlW3Byb3BlcnR5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRlc3RpbmF0aW9uO1xufTtcblxuayQuZGVib3VuY2VRdWV1ZSA9IG5ldyBPYmplY3Q7XG5cbm1vZHVsZS5leHBvcnRzID0gayQ7XG5cblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJaTlWYzJWeWN5OWhaR0Z0WjNKaGJuUXZjMmwwWlhNdmRHVnpkSEoxYm01bGNpOXNhV0l0WTI5eVpTOWpiMlptWldVdmEzTXVZMjltWm1WbElsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN1FVRkJRU3hOUVVGTkxFTkJRVU1zUlVGQlVDeEhRVUZuUWl4SlFVRkJMRTFCUVVFc1EwRkJRVHM3UVVGRmFFSXNSVUZCUlN4RFFVRkRMRVZCUVVnc1IwRkJVU3hUUVVGRExFVkJRVVE3VTBGQlVTeFJRVUZSTEVOQlFVTXNaMEpCUVZRc1EwRkJNRUlzUlVGQk1VSTdRVUZCVWpzN1FVRkRVaXhGUVVGRkxFTkJRVU1zUTBGQlNDeEhRVUZQTEZOQlFVTXNSVUZCUkR0VFFVRlJMRVZCUVVVc1EwRkJReXhGUVVGSUxFTkJRVTBzUlVGQlRpeERRVUZWTEVOQlFVRXNRMEZCUVR0QlFVRnNRanM3UVVGRFVDeEZRVUZGTEVOQlFVTXNUVUZCU0N4SFFVRlpMRk5CUVVNc1YwRkJSQ3hGUVVGakxFMUJRV1E3UVVGRFZpeE5RVUZCTzBGQlFVRXNUMEZCUVN4clFrRkJRVHRKUVVORkxFbEJRVWNzVFVGQlR5eERRVUZCTEZGQlFVRXNRMEZCVUN4SlFVRnhRaXhOUVVGUExFTkJRVUVzVVVGQlFTeERRVUZUTEVOQlFVTXNWMEZCZEVNc1NVRkJjMFFzVFVGQlR5eERRVUZCTEZGQlFVRXNRMEZCVXl4RFFVRkRMRmRCUVdwQ0xFdEJRV2RETEUxQlFYcEdPMDFCUTBVc1YwRkJXU3hEUVVGQkxGRkJRVUVzUTBGQldpeEhRVUYzUWl4WFFVRlpMRU5CUVVFc1VVRkJRU3hEUVVGYUxFbEJRWGxDTzAxQlEycEVMRk5CUVZNc1EwRkJReXhOUVVGV0xFTkJRV2xDTEZkQlFWa3NRMEZCUVN4UlFVRkJMRU5CUVRkQ0xFVkJRWGRETEUxQlFVOHNRMEZCUVN4UlFVRkJMRU5CUVM5RExFVkJSa1k3UzBGQlFTeE5RVUZCTzAxQlNVVXNWMEZCV1N4RFFVRkJMRkZCUVVFc1EwRkJXaXhIUVVGM1FpeE5RVUZQTEVOQlFVRXNVVUZCUVN4RlFVcHFRenM3UVVGRVJqdFRRVTFCTzBGQlVGVTdPMEZCVTFvc1JVRkJSU3hEUVVGRExHRkJRVWdzUjBGQmJVSXNTVUZCU1RzN1FVRkZka0lzVFVGQlRTeERRVUZETEU5QlFWQXNSMEZCYVVJaUxDSm1hV3hsSWpvaVoyVnVaWEpoZEdWa0xtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJbWRzYjJKaGJDNXJKQ0E5SUc1bGR5QlBZbXBsWTNRb0tWeHVYRzVySkM0a0pDQTlJQ2hsYkNrZ0xUNGdaRzlqZFcxbGJuUXVjWFZsY25sVFpXeGxZM1J2Y2tGc2JDQmxiRnh1YXlRdUpDQTlJQ2hsYkNrZ0xUNGdheVF1SkNRb1pXd3BXekJkWEc1ckpDNWxlSFJsYm1RZ1BTQW9aR1Z6ZEdsdVlYUnBiMjRzSUhOdmRYSmpaU2tnTFQ1Y2JpQWdabTl5SUhCeWIzQmxjblI1SUc5bUlITnZkWEpqWlZ4dUlDQWdJR2xtSUhOdmRYSmpaVnR3Y205d1pYSjBlVjBnWVc1a0lITnZkWEpqWlZ0d2NtOXdaWEowZVYwdVkyOXVjM1J5ZFdOMGIzSWdZVzVrSUhOdmRYSmpaVnR3Y205d1pYSjBlVjB1WTI5dWMzUnlkV04wYjNJZ2FYTWdUMkpxWldOMFhHNGdJQ0FnSUNCa1pYTjBhVzVoZEdsdmJsdHdjbTl3WlhKMGVWMGdQU0JrWlhOMGFXNWhkR2x2Ymx0d2NtOXdaWEowZVYwZ2IzSWdlMzFjYmlBZ0lDQWdJR0Z5WjNWdFpXNTBjeTVqWVd4c1pXVWdaR1Z6ZEdsdVlYUnBiMjViY0hKdmNHVnlkSGxkTENCemIzVnlZMlZiY0hKdmNHVnlkSGxkWEc0Z0lDQWdaV3h6WlZ4dUlDQWdJQ0FnWkdWemRHbHVZWFJwYjI1YmNISnZjR1Z5ZEhsZElEMGdjMjkxY21ObFczQnliM0JsY25SNVhWeHVJQ0JrWlhOMGFXNWhkR2x2Ymx4dVhHNXJKQzVrWldKdmRXNWpaVkYxWlhWbElEMGdibVYzSUU5aWFtVmpkRnh1WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdza1hHNGlYWDA9IiwibW9kYWwgPSAoZWwpIC0+XG5cbiAgYHZhciBpT1MgPSAvKGlQYWR8aVBob25lfGlQb2QpL2cudGVzdCggbmF2aWdhdG9yLnVzZXJBZ2VudCApYFxuICBcbiAgIyBDdXJzb3IgcG9pbnRlciBoYWNrIGlmIGlPU1xuICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQgJ2Rpc21pc3MtbW9kYWwnIGlmIGlPU1xuXG4gIGRvIChlbCkgLT5cblxuICAgICRoaWRlTW9kYWwgPSAtPlxuICAgICAgayQuJChlbCkuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuXG4gICAgIyBBbGxvdyBtb2RhbCB0byBkaXNtaXNzIHdoZW4gY2xpY2tlZCBvdXRzaWRlXG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyICdjbGljaycsIC0+XG4gICAgICAkaGlkZU1vZGFsKClcblxuICAgIGskLiQoZWwpLmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgKGUpIC0+XG4gICAgICByZXR1cm4gZS5zdG9wUHJvcGFnYXRpb24oKVxuXG4gICAgJGNsb3NlciA9IGskLiQoZWwpLnF1ZXJ5U2VsZWN0b3IoJ2FbZGF0YS1tb2RhbC1jbG9zZV0nKVxuICAgIGlmICRjbG9zZXJcbiAgICAgICRjbG9zZXIuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCAtPlxuICAgICAgICAkaGlkZU1vZGFsKClcblxuICBrJC4kIGVsXG5cbmskLm1vZGFsID0gbW9kYWxcblxubW9kdWxlLmV4cG9ydHMgPSBtb2RhbFxuIiwibmF2ID0gKGVsKSAtPlxuXG4gICMgQWNjZXB0IGJvdGggc3RyaW5ncyBhbmQgZWxlbWVudHMuXG4gICRuYXZiYXIgPSBpZiB0eXBlb2YgZWwgPT0gJ3N0cmluZycgdGhlbiBrJC4kKGVsKSBlbHNlIGVsXG5cbiAgdHJ5XG4gICAgIyBXaXJlIHVwIG1lbnUgaXRlbXNcbiAgICAkbWVudUl0ZW1zID0gJG5hdmJhci5xdWVyeVNlbGVjdG9yQWxsKCd1bCA+IGxpJylcblxuICAgICMgUHJ1bmUgaXRlbXMgdGhhdCBkb24ndCBjb250YWluIHVsc1xuICAgIF8kbWVudUl0ZW1zID0gbmV3IEFycmF5KClcbiAgICBmb3IgJG1lbnVJdGVtIGluICRtZW51SXRlbXNcbiAgICAgIGlmICRtZW51SXRlbS5xdWVyeVNlbGVjdG9yQWxsKCd1bCcpLmxlbmd0aCBhbmQgISRtZW51SXRlbS5xdWVyeVNlbGVjdG9yQWxsKCdbcm9sZT1cImJ1dHRvblwiXScpLmxlbmd0aFxuICAgICAgICBfJG1lbnVJdGVtcy5wdXNoICRtZW51SXRlbVxuXG4gICAgJG1lbnVJdGVtcyA9IF8kbWVudUl0ZW1zXG4gICAgZm9yICRtZW51SXRlbSBpbiAkbWVudUl0ZW1zXG5cbiAgICAgICMgTWFyayBhcyBhIG1lbnUgaXRlbVxuICAgICAgJG1lbnVJdGVtLmNsYXNzTGlzdC5hZGQgJ21lbnUtaXRlbSdcblxuICBjYXRjaCBlXG4gICAgY29uc29sZS5lcnJvciBcIkNvdWxkIG5vdCBpbnN0YW50aWF0ZSBhcyBhIG5hdi5cIiwgZS5tZXNzYWdlXG5cbiAgJGJ1dHRvbiA9ICRuYXZiYXIucXVlcnlTZWxlY3RvcignLm5hdmJhci10aXRsZSBidXR0b24nKVxuICBpZiAkYnV0dG9uIFxuICAgICRidXR0b24uYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCAtPlxuICAgICAgJG5hdiA9ICRuYXZiYXIucXVlcnlTZWxlY3RvcignbmF2JylcbiAgICAgIGlmICRuYXYuY2xhc3NMaXN0LmNvbnRhaW5zICdleHBhbmQnXG4gICAgICAgICRuYXYuY2xhc3NMaXN0LnJlbW92ZSAnZXhwYW5kJ1xuICAgICAgZWxzZVxuICAgICAgICAkbmF2LmNsYXNzTGlzdC5hZGQgJ2V4cGFuZCdcblxuayQubmF2ID0gbmF2XG5cbm1vZHVsZS5leHBvcnRzID0gbmF2XG4iLCJzdGF0dXMgPSAob3B0cykgLT5cblxuICBkZWZhdWx0cyA9XG4gICAgdHlwZTogJ3N0YXR1cy15ZWxsb3cnXG4gICAgZGVsYXk6IDIwMDBcblxuICBzdGF0dXMgPSBrJC5leHRlbmQgZGVmYXVsdHMsIG9wdHNcblxuICBpZiBub3QgayQuJCQoJyNzdGF0dXNfYmFyJykubGVuZ3RoXG4gICAgJHN0YXR1c0JhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgJHN0YXR1c0Jhci5pZCA9ICdzdGF0dXNfYmFyJ1xuICAgICRzdGF0dXNCYXIuY2xhc3NOYW1lID0gJ3N0YXR1c19iYXInXG4gICAgJHN0YXR1c0Jhci5pbm5lckhUTUwgPSBcIjxkaXYgY2xhc3M9J3N0YXR1c19iYXItc3RhdHVzJyBpZD0nc3RhdHVzX2Jhci1zdGF0dXMnPjwvZGl2PlwiXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCgkc3RhdHVzQmFyKVxuXG4gICRzdGF0dXNCYXIgPSBrJC4kKCcjc3RhdHVzX2JhcicpXG5cbiAgaGlkZVN0YXR1c0JhciA9IC0+XG4gICAgJHN0YXR1c0Jhci5jbGFzc0xpc3QuYWRkICdoaWRlJ1xuICAgIHNldFRpbWVvdXQgLT5cbiAgICAgICRzdGF0dXNCYXIuY2xhc3NMaXN0LnJlbW92ZSAnaGlkZSdcbiAgICAgICRzdGF0dXNCYXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCAkc3RhdHVzQmFyXG4gICAgLCAyNTBcblxuICBpZiBzdGF0dXMuZGVsYXkgPiAwXG4gICAgayQuZGVib3VuY2UgaGlkZVN0YXR1c0JhciwgJ2hpZGVTdGF0dXNCYXInLCBzdGF0dXMuZGVsYXlcblxuICAkc3RhdHVzID0gayQuJChcIiNzdGF0dXNfYmFyLXN0YXR1c1wiKVxuICAkc3RhdHVzLmlubmVySFRNTCA9IHN0YXR1cy50ZXh0XG4gICRzdGF0dXMuZGF0YXNldC50eXBlID0gc3RhdHVzLnR5cGVcblxuayQuc3RhdHVzID0gc3RhdHVzXG5cbm1vZHVsZS5leHBvcnRzID0gc3RhdHVzXG4iLCJ0YWJzID0gKGVsKSAtPlxuXG4gICMgQWNjZXB0IGJvdGggc3RyaW5ncyBhbmQgZWxlbWVudHMuXG4gICR0YWJDb250YWluZXIgPSBpZiB0eXBlb2YgZWwgPT0gJ3N0cmluZycgdGhlbiBrJC4kKGVsKSBlbHNlIGVsXG5cbiAgJHRhYlNldCA9ICR0YWJDb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnbGknKVxuICAkdGFiLmNsYXNzTGlzdC5hZGQoJ3RhYi1pdGVtJykgZm9yICR0YWIgaW4gJHRhYlNldFxuXG4gICRwYW5lU2V0ID0gbmV3IEFycmF5KClcbiAgZm9yICRfdGFiIGluICR0YWJTZXRcbiAgICAkaWQgPSAkX3RhYi5xdWVyeVNlbGVjdG9yKCdhJykuZ2V0QXR0cmlidXRlKCdocmVmJylcbiAgICAkcGFuZSA9IGskLiQoXCJhcnRpY2xlI3skaWR9XCIpXG4gICAgJHBhbmUuY2xhc3NMaXN0LmFkZCAnb3BlbicgaWYgJF90YWIuY2xhc3NMaXN0LmNvbnRhaW5zICdvcGVuJ1xuICAgICRwYW5lU2V0LnB1c2goJHBhbmUpXG4gICAgIyAkcGFuZS5kYXRhc2V0LnBhbmVsID0gJ3RydWUnICMgUmVwbGFjZSB3aXRoIHRoaXMgd2hlbiBJRTEwIHN1cHBvcnQgZHJvcHNcbiAgICAkcGFuZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtcGFuZWwnLCB0cnVlKVxuXG4gIGZvciAkdGFiIGluICR0YWJTZXRcbiAgICAjIENyZWF0ZSBhbiBhcnJheSBvZiBwYW5lbHMgYnkgcmVhZGluZyB0aGUgbGlua3MgZnJvbSBlYWNoIHRhYi5cbiAgICAkdGFiTGluayA9ICR0YWIucXVlcnlTZWxlY3RvcignYScpXG4gICAgIyAkdGFiTGluay5kYXRhc2V0LmxpbmsgPSAkdGFiTGluay5nZXRBdHRyaWJ1dGUgJ2hyZWYnICMgSWJpZFxuICAgICR0YWJMaW5rLnNldEF0dHJpYnV0ZSgnZGF0YS1saW5rJywgJHRhYkxpbmsuZ2V0QXR0cmlidXRlKCdocmVmJykpXG4gICAgJHRhYkxpbmsuaHJlZiA9ICdqYXZhc2NyaXB0OnZvaWQoMCk7J1xuXG4gICAgZG8gKCR0YWIsICR0YWJMaW5rLCAkcGFuZVNldCkgLT5cbiAgICAgICR0YWIuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCAtPlxuXG4gICAgICAgICMgUmVzZXQgdGFicyBhbmQgcGFuZXMgb25seSBpbiB0aGlzIHRhYnNldFxuICAgICAgICAkcGFuZS5jbGFzc0xpc3QucmVtb3ZlICdvcGVuJyBmb3IgJHBhbmUgaW4gJHBhbmVTZXRcbiAgICAgICAgXyR0YWIuY2xhc3NMaXN0LnJlbW92ZSAnb3BlbicgZm9yIF8kdGFiIGluICR0YWJTZXRcblxuICAgICAgICAjIEFkZCBhbiBvcGVuIGNsYXNzIHVuaXF1ZWx5IHRvIHRoaXMgdGFiIGFuZCBwYW5lLlxuICAgICAgICAjIGskLiQoXCJhcnRpY2xlI3skdGFiTGluay5kYXRhc2V0Lmxpbmt9XCIpLmNsYXNzTGlzdC5hZGQgJ29wZW4nICMgSWJpZFxuICAgICAgICBrJC4kKFwiYXJ0aWNsZSN7JHRhYkxpbmsuZ2V0QXR0cmlidXRlKCdkYXRhLWxpbmsnKX1cIikuY2xhc3NMaXN0LmFkZCAnb3BlbidcbiAgICAgICAgJHRhYi5jbGFzc0xpc3QuYWRkICdvcGVuJ1xuXG5rJC50YWJzID0gdGFic1xuXG5tb2R1bGUuZXhwb3J0cyA9IHRhYnNcbiIsInRocm90dGxlID0gKGZuLCBpZCwgZGVsYXkpIC0+XG5cbiAgXG5cbmskLnRocm90dGxlID0gdGhyb3R0bGVcblxubW9kdWxlLmV4cG9ydHMgPSB0aHJvdHRsZVxuIiwidmFyICR0ciA9IHtcbiAgc3BlY3M6IHt9LFxuICBBc3NlcnQ6IGZ1bmN0aW9uKHN0cmluZywgdGltZW91dCwgc3BlYykge1xuICAgIHRoaXMuc3RyaW5nID0gc3RyaW5nO1xuICAgIHRoaXMudGltZW91dCA9IHRpbWVvdXQ7XG4gICAgdGhpcy5zcGVjID0gc3BlYztcbiAgICB0aGlzLmZhaWwgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIHRlc3RSdW5uZXIuZmFpbCh0aGlzLnN0cmluZyk7XG4gICAgfS5iaW5kKHRoaXMpLCB0aGlzLnRpbWVvdXQpO1xuICB9LFxuICBFeHBlY3Q6IGZ1bmN0aW9uKHN0cmluZywgY29uZGl0aW9uKSB7XG4gICAgdGhpcy5zdHJpbmcgPSBzdHJpbmc7XG4gICAgdGhpcy5jb25kaXRpb24gPSBjb25kaXRpb247XG4gIH0sXG4gIFNwZWM6IGZ1bmN0aW9uKHRlc3RzKSB7XG4gICAgdGhpcy50ZXN0cyA9IG5ldyBBcnJheSgpO1xuICAgIHRoaXMudGVzdHMgPSB0aGlzLnRlc3RzLmNvbmNhdCh0ZXN0cyk7XG4gIH0sXG4gIHBhc3M6IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICBjb25zb2xlLmxvZyhcIiVjVEVTVFJVTk5FUiBQQVNTRUQ6IFwiICsgbWVzc2FnZSwgXCJjb2xvcjogZ3JlZW5cIik7XG4gIH0sXG4gIGZhaWw6IGZ1bmN0aW9uKG1lc3NhZ2UsIGFyZ3MpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiVEVTVFJVTk5FUiBGQUlMRUQ6IFwiICsgbWVzc2FnZSk7XG4gICAgY29uc29sZS5lcnJvcihhcmdzKTtcbiAgfVxufVxuXG4kdHIuQXNzZXJ0LnByb3RvdHlwZS5yZXR1cm4gPSBmdW5jdGlvbigpIHtcbiAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLmZhaWwpO1xuICAkdHIucGFzcyh0aGlzLnN0cmluZyk7XG59XG5cbiR0ci5FeHBlY3QucHJvdG90eXBlLnJldHVybiA9IGZ1bmN0aW9uKCkge1xuICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gIGlmICh0aGlzLmNvbmRpdGlvbi5hcHBseShudWxsLCBhcmdzKSkge1xuICAgICR0ci5wYXNzKHRoaXMuc3RyaW5nKTtcbiAgfVxuICBlbHNlIHtcbiAgICAkdHIuZmFpbCh0aGlzLnN0cmluZywgYXJncyk7XG4gIH1cbn1cblxuJHRyLlNwZWMucHJvdG90eXBlLnJldHVybiA9IGZ1bmN0aW9uKCkge1xuICB0aGlzRGF0YSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cylcblxuICBmb3IgKHZhciBfaSA9IDAsIGxlbiA9IHRoaXMudGVzdHMubGVuZ3RoOyBfaSA8IGxlbjsgX2krKykge1xuICAgIHRoaXMudGVzdHNbX2ldLnJldHVybih0aGlzRGF0YVtfaV0pO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gJHRyXG4iXX0=
