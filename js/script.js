(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./lib/coffee/app.coffee":[function(require,module,exports){
var KS, vendor;

KS = require('../../lib-core/coffee/app');

window['$tr'] = require('../js/micrologger');

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



},{"../../lib-core/coffee/app":"/Users/adamgrant/sites/testrunner/lib-core/coffee/app.coffee","../js/micrologger":"/Users/adamgrant/sites/testrunner/lib/js/micrologger.js","./vendor/index":"/Users/adamgrant/sites/testrunner/lib/coffee/vendor/index.coffee"}],"/Users/adamgrant/sites/testrunner/lib-core/coffee/app.coffee":[function(require,module,exports){
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




},{}],"/Users/adamgrant/sites/testrunner/lib/js/micrologger.js":[function(require,module,exports){
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
    this.tests = new Array();
    this.tests = this.tests.concat(tests);
  },
  pass: function(message) {
    console.log("%c[PASS]: " + message, "color: green");
  },
  fail: function(message, args) {
    console.error("[FAIL]: " + message);
    console.error(args);
  }
}

$ml.Assert.prototype.return = function() {
  window.clearTimeout(this.fail);
  $ml.pass(this.string);
}

$ml.Expect.prototype.return = function() {
  var args = Array.prototype.slice.call(arguments);
  if (this.condition.apply(null, args)) {
    $ml.pass(this.string);
  }
  else {
    $ml.fail(this.string, args);
  }
}

$ml.Spec.prototype.return = function() {
  thisData = Array.prototype.slice.call(arguments)

  for (var _i = 0, len = this.tests.length; _i < len; _i++) {
    this.tests[_i].return(thisData[_i]);
  }
}

module.exports = $ml

},{}]},{},["./lib/coffee/app.coffee"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYWRhbWdyYW50L3NpdGVzL3Rlc3RydW5uZXIvbGliL2NvZmZlZS9hcHAuY29mZmVlIiwiL1VzZXJzL2FkYW1ncmFudC9zaXRlcy90ZXN0cnVubmVyL2xpYi1jb3JlL2NvZmZlZS9hcHAuY29mZmVlIiwiL1VzZXJzL2FkYW1ncmFudC9zaXRlcy90ZXN0cnVubmVyL2xpYi1jb3JlL2NvZmZlZS9idWZmZXIuY29mZmVlIiwiL1VzZXJzL2FkYW1ncmFudC9zaXRlcy90ZXN0cnVubmVyL2xpYi1jb3JlL2NvZmZlZS9idXR0b25zLmNvZmZlZSIsIi9Vc2Vycy9hZGFtZ3JhbnQvc2l0ZXMvdGVzdHJ1bm5lci9saWItY29yZS9jb2ZmZWUvZGVib3VuY2VyLmNvZmZlZSIsIi9Vc2Vycy9hZGFtZ3JhbnQvc2l0ZXMvdGVzdHJ1bm5lci9saWItY29yZS9jb2ZmZWUvZHJvcGRvd24uY29mZmVlIiwiL1VzZXJzL2FkYW1ncmFudC9zaXRlcy90ZXN0cnVubmVyL2xpYi1jb3JlL2NvZmZlZS9ncm93bC5jb2ZmZWUiLCIvVXNlcnMvYWRhbWdyYW50L3NpdGVzL3Rlc3RydW5uZXIvbGliLWNvcmUvY29mZmVlL2ljb25zLmNvZmZlZSIsImxpYi1jb3JlL2NvZmZlZS9rcy5jb2ZmZWUiLCIvVXNlcnMvYWRhbWdyYW50L3NpdGVzL3Rlc3RydW5uZXIvbGliLWNvcmUvY29mZmVlL21vZGFsLmNvZmZlZSIsIi9Vc2Vycy9hZGFtZ3JhbnQvc2l0ZXMvdGVzdHJ1bm5lci9saWItY29yZS9jb2ZmZWUvbmF2YmFyLmNvZmZlZSIsIi9Vc2Vycy9hZGFtZ3JhbnQvc2l0ZXMvdGVzdHJ1bm5lci9saWItY29yZS9jb2ZmZWUvc3RhdHVzLmNvZmZlZSIsIi9Vc2Vycy9hZGFtZ3JhbnQvc2l0ZXMvdGVzdHJ1bm5lci9saWItY29yZS9jb2ZmZWUvdGFicy5jb2ZmZWUiLCIvVXNlcnMvYWRhbWdyYW50L3NpdGVzL3Rlc3RydW5uZXIvbGliLWNvcmUvY29mZmVlL3Rocm90dGxlci5jb2ZmZWUiLCJsaWIvanMvbWljcm9sb2dnZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBOztBQUFBLEVBQUEsR0FBWSxPQUFBLENBQVEsMkJBQVI7O0FBQ1osTUFBTyxDQUFBLEtBQUEsQ0FBUCxHQUFnQixPQUFBLENBQVEsbUJBQVI7O0FBQ2hCLE1BQUEsR0FBWSxPQUFBLENBQVEsZ0JBQVI7O0FBRVosUUFBUSxDQUFDLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxTQUFBO0FBQzVDLE1BQUE7RUFBQSxPQUFBLEdBQVU7RUFDVixRQUFBLEdBQVc7RUFFWCxFQUFFLENBQUMsQ0FBSCxDQUFLLGNBQUwsQ0FBb0IsQ0FBQyxnQkFBckIsQ0FBc0MsT0FBdEMsRUFBK0MsU0FBQTtXQUM3QyxHQUFHLENBQUMsYUFBSixHQUF3QixJQUFBLEdBQUcsQ0FBQyxNQUFKLENBQVcsMkNBQVgsRUFBd0QsSUFBeEQ7RUFEcUIsQ0FBL0M7RUFJQSxFQUFFLENBQUMsQ0FBSCxDQUFLLGVBQUwsQ0FBcUIsQ0FBQyxnQkFBdEIsQ0FBdUMsT0FBdkMsRUFBZ0QsU0FBQTtXQUM5QyxHQUFHLENBQUMsYUFBYSxDQUFDLFFBQUQsQ0FBakIsQ0FBQTtFQUQ4QyxDQUFoRDtFQUlBLEVBQUUsQ0FBQyxDQUFILENBQUssY0FBTCxDQUFvQixDQUFDLGdCQUFyQixDQUFzQyxPQUF0QyxFQUErQyxTQUFBO1dBQzdDLEdBQUcsQ0FBQyxLQUFLLENBQUMsa0JBQVYsR0FBbUMsSUFBQSxHQUFHLENBQUMsSUFBSixDQUFTLENBQzFDLEdBQUcsQ0FBQyxhQUFKLEdBQXdCLElBQUEsR0FBRyxDQUFDLE1BQUosQ0FBVywyQ0FBWCxFQUF3RCxJQUF4RCxDQURrQixFQUUxQyxHQUFHLENBQUMsYUFBSixHQUF3QixJQUFBLEdBQUcsQ0FBQyxNQUFKLENBQVcsMkNBQVgsRUFBd0QsSUFBeEQsQ0FGa0IsQ0FBVDtF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dGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiS1MgICAgICAgID0gcmVxdWlyZSAnLi4vLi4vbGliLWNvcmUvY29mZmVlL2FwcCdcbndpbmRvd1snJHRyJ10gPSByZXF1aXJlICcuLi9qcy9taWNyb2xvZ2dlcidcbnZlbmRvciAgICA9IHJlcXVpcmUgJy4vdmVuZG9yL2luZGV4J1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyICdET01Db250ZW50TG9hZGVkJywgLT5cbiAgc29tZVZhciA9IDBcbiAgc29tZVZhcjIgPSB1bmRlZmluZWRcblxuICBrJC4kKCdidXR0b24jZmlyc3QnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIC0+XG4gICAgJHRyLndhaXRGb3JCdXR0b24gPSBuZXcgJHRyLkFzc2VydChcImJ1dHRvbiB3YXMgcHJlc3NlZCBpbiBsZXNzIHRoYW4gMyBzZWNvbmRzXCIsIDMwMDApXG4gIClcblxuICBrJC4kKCdidXR0b24jc2Vjb25kJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAtPlxuICAgICR0ci53YWl0Rm9yQnV0dG9uLnJldHVybigpXG4gIClcblxuICBrJC4kKCdidXR0b24jdGhpcmQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIC0+XG4gICAgJHRyLnNwZWNzLndhaXRUd2ljZUZvckJ1dHRvbiA9IG5ldyAkdHIuU3BlYyhbXG4gICAgICAkdHIud2FpdEZvckJ1dHRvbiA9IG5ldyAkdHIuQXNzZXJ0KFwiYnV0dG9uIHdhcyBwcmVzc2VkIGluIGxlc3MgdGhhbiAzIHNlY29uZHNcIiwgMzAwMCksXG4gICAgICAkdHIud2FpdEZvckJ1dHRvbiA9IG5ldyAkdHIuQXNzZXJ0KFwiYnV0dG9uIHdhcyBwcmVzc2VkIGluIGxlc3MgdGhhbiA1IHNlY29uZHNcIiwgNTAwMClcbiAgICBdKVxuICApXG5cbiAgayQuJCgnYnV0dG9uI2ZvdXJ0aCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgLT5cbiAgICAkdHIuc3BlY3Mud2FpdFR3aWNlRm9yQnV0dG9uLnJldHVybigpXG4gIClcblxuICBrJC4kKCdidXR0b24jc2V0b25lJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAtPiBcbiAgICBzb21lVmFyID0gMVxuICAgICR0ci5nZXRPbmUucmV0dXJuKHNvbWVWYXIpXG4gIClcblxuICBrJC4kKCdidXR0b24jc2V0dHdvJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAtPiBcbiAgICBzb21lVmFyID0gMlxuICAgICR0ci5nZXRPbmUucmV0dXJuKHNvbWVWYXIpXG4gIClcblxuICBrJC4kKCdidXR0b24jZ2V0b25lJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAtPiBcbiAgICAkdHIuZ2V0T25lID0gbmV3ICR0ci5FeHBlY3QoXCJ2YXJpYWJsZSBpcyBzZXQgdG8gMVwiLCAodmFyaWFibGUpIC0+XG4gICAgICByZXR1cm4gdmFyaWFibGUgPT0gMVxuICAgIClcbiAgKVxuXG4gIGskLiQoJ2J1dHRvbiNmaW5hbCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgLT5cbiAgICAkdHIuc3BlY3MuZ2V0T25lUXVpY2tseSA9IG5ldyAkdHIuU3BlYyhbXG4gICAgICBuZXcgJHRyLkV4cGVjdChcInZhcmlhYmxlIGlzIHNldCB0byAxXCIsICh2YXJpYWJsZSkgLT5cbiAgICAgICAgcmV0dXJuIHZhcmlhYmxlID09IDFcbiAgICAgICksXG4gICAgICBuZXcgJHRyLkFzc2VydChcInZhcmlhYmxlIGlzIHNldCBpbiBsZXNzIHRoYW4gMyBzZWNvbmRzXCIsIDMwMDApXG4gICAgXSlcbiAgKVxuXG4gIGskLiQoJ2J1dHRvbiNzZXRvbmV0d28nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIC0+XG4gICAgc29tZVZhcjIgPSAxXG4gICAgJHRyLnNwZWNzLmdldE9uZVF1aWNrbHkucmV0dXJuKHNvbWVWYXIyLCBudWxsKVxuICApXG5cbiAgayQuJCgnYnV0dG9uI3NldHR3b3R3bycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgLT5cbiAgICBzb21lVmFyMiA9IDJcbiAgICAkdHIuc3BlY3MuZ2V0T25lUXVpY2tseS5yZXR1cm4oc29tZVZhcjIsIG51bGwpXG4gIClcbiIsIktTICAgICAgICA9IHJlcXVpcmUgJy4va3MnXG5Nb2RhbCAgICAgPSByZXF1aXJlICcuL21vZGFsJ1xuTmF2YmFyICAgID0gcmVxdWlyZSAnLi9uYXZiYXInXG5EZWJvdW5jZSAgPSByZXF1aXJlICcuL2RlYm91bmNlcidcbkljb25zICAgICA9IHJlcXVpcmUgJy4vaWNvbnMnXG5TdGF0dXMgICAgPSByZXF1aXJlICcuL3N0YXR1cydcblRhYnMgICAgICA9IHJlcXVpcmUgJy4vdGFicydcblRocm90dGxlciA9IHJlcXVpcmUgJy4vdGhyb3R0bGVyJ1xuQnV0dG9ucyAgID0gcmVxdWlyZSAnLi9idXR0b25zJ1xuQnVmZmVyICAgID0gcmVxdWlyZSAnLi9idWZmZXInXG5Hcm93bCAgICAgPSByZXF1aXJlICcuL2dyb3dsJ1xuRHJvcGRvd24gID0gcmVxdWlyZSAnLi9kcm9wZG93bidcblxuayQucmVhZHkgPSAtPlxuICBrJC5pY29ucygpXG4gIGskLmJ1dHRvbigpXG4gIGskLmRyb3Bkb3duKClcbiAgayQubmF2KCRuYXZiYXIpIGZvciAkbmF2YmFyIGluIGskLiQkKCdbZGF0YS1rcy1uYXZiYXJdJylcbiAgayQudGFicygkdGFiU2V0KSBmb3IgJHRhYlNldCBpbiBrJC4kJCgnW2RhdGEta3MtdGFic10nKVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyICdET01Db250ZW50TG9hZGVkJywgLT4gayQucmVhZHkoKVxuIiwiYnVmZmVyID0gKGZuLCBkZWxheSkgLT5cblxuICAjIENyZWF0ZSBhIG5ldyBidWZmZXJBcnJheSBpZiBvbmUgZG9lcyBub3QgZXhpc3QgYWxyZWFkeS5cbiAgayQuYnVmZmVyQXJyYXkgPSBrJC5idWZmZXJBcnJheSB8fCBuZXcgQXJyYXkoKVxuICBpZiBub3QgayQuYnVmZmVyQXJyYXkubGVuZ3RoXG4gICAgayQuYnVmZmVyQXJyYXkgPSBuZXcgQXJyYXkoKVxuXG4gICAgZGVsYXkgPSBkZWxheSB8fCA1MDBcblxuICAgICMgQ3JlYXRlIGFuIGludGVydmFsIHRvIGZpcmUgdGhlIGZucyBpbiBidWZmZXJBcnJheVxuICAgIGkgPSAxXG5cbiAgICBrJC5idWZmZXJJbnRlcnZhbCA9IHNldEludGVydmFsIC0+XG4gICAgICBrJC5idWZmZXJBcnJheVtpXSgpIGlmIGskLmJ1ZmZlckFycmF5W2ldXG4gICAgICBpKytcbiAgICAgIGlmIGkgPj0gayQuYnVmZmVyQXJyYXkubGVuZ3RoXG4gICAgICAgIGNsZWFySW50ZXJ2YWwgayQuYnVmZmVySW50ZXJ2YWxcbiAgICAgICAgayQuYnVmZmVyQXJyYXkgPSB1bmRlZmluZWRcbiAgICAgICAgaSA9IDFcbiAgICAsIGRlbGF5XG5cbiAgIyBBZGQgdGhpcyBmdW5jdGlvbiB0byB0aGUgYXJyYXkuXG4gIGskLmJ1ZmZlckFycmF5LnB1c2ggZm5cblxuICAjIEZpcmUgcmlnaHQgYXdheSBpZiBpdCdzIHRoZSBmaXJzdCBpbiBsaW5lLlxuICBrJC5idWZmZXJBcnJheVswXSgpIGlmIGskLmJ1ZmZlckFycmF5Lmxlbmd0aCA9PSAxXG5cbiAgY29uc29sZS5pbmZvIFwiRnVuY3Rpb24gcXVldWVkICgje2skLmJ1ZmZlckFycmF5Lmxlbmd0aH0gaW4gcXVldWUpXCJcblxuayQuYnVmZmVyID0gYnVmZmVyXG5cbm1vZHVsZS5leHBvcnRzID0gYnVmZmVyXG4iLCJidXR0b24gPSAtPlxuXG4gICgkYnV0dG9uLmNsYXNzTGlzdC5hZGQgJ21lbnUtaXRlbScgaWYgJGJ1dHRvbi5xdWVyeVNlbGVjdG9yQWxsKCd1bCcpLmxlbmd0aCkgZm9yICRidXR0b24gaW4gayQuJCQoXCJidXR0b25cIilcbiAgJGJ1dHRvbkRyb3Bkb3duLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCAnbWVudS1pdGVtJyBmb3IgJGJ1dHRvbkRyb3Bkb3duIGluIGskLiQkICcuYnV0dG9uLWRyb3Bkb3duJ1xuXG5rJC5idXR0b24gPSBidXR0b25cblxubW9kdWxlLmV4cG9ydHMgPSBidXR0b25cbiIsImRlYm91bmNlID0gKGZuLCBpZCwgZGVsYXksIGFyZ3MsIHRoYXQpIC0+XG5cbiAgZGVsYXkgPSBkZWxheSB8fCAxMDAwXG4gIHRoYXQgPSB0aGF0IHx8IHRoaXNcbiAgYXJncyA9IGFyZ3MgfHwgbmV3IEFycmF5XG5cbiAgayQuZGVib3VuY2VRdWV1ZVtpZF0gPSBuZXcgT2JqZWN0KCkgaWYgdHlwZW9mIGskLmRlYm91bmNlUXVldWVbaWRdICE9IFwib2JqZWN0XCJcblxuICBjbGVhclRpbWVvdXQgayQuZGVib3VuY2VRdWV1ZVtpZF0uZGVib3VuY2VUaW1lciBpZiB0eXBlb2YgayQuZGVib3VuY2VRdWV1ZVtpZF0uZGVib3VuY2VUaW1lciAhPSBcInVuZGVmaW5lZFwiXG5cbiAgayQuZGVib3VuY2VRdWV1ZVtpZF0gPVxuICAgIGZuOiBmblxuICAgIGlkOiBpZFxuICAgIGRlbGF5OiBkZWxheVxuICAgIGFyZ3M6IGFyZ3NcbiAgICBkZWJvdW5jZVRpbWVyOiBzZXRUaW1lb3V0IC0+XG4gICAgICBrJC5kZWJvdW5jZVF1ZXVlW2lkXS5mbi5hcHBseSh0aGF0LCBrJC5kZWJvdW5jZVF1ZXVlW2lkXS5hcmdzKVxuICAgICAgayQuZGVib3VuY2VRdWV1ZVtpZF0gPSB1bmRlZmluZWRcbiAgICAsIGRlbGF5XG5cbmskLmRlYm91bmNlID0gZGVib3VuY2VcblxubW9kdWxlLmV4cG9ydHMgPSBkZWJvdW5jZVxuIiwiZHJvcGRvd24gPSAoKSAtPlxuXG4gIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCAoZSkgLT5cbiAgICAkbWVudUl0ZW0gPSBudWxsXG5cbiAgICBjbG9zZUFsbE1lbnVzID0gLT5cbiAgICAgIF8kbWVudUl0ZW0uY2xhc3NMaXN0LnJlbW92ZSAnb3BlbicgZm9yIF8kbWVudUl0ZW0gaW4gayQuJCQoJy5tZW51LWl0ZW0nKVxuXG4gICAgIyBXZSdsbCBuZWVkIHRoaXMgbGF0ZXIuXG4gICAgb3Blbk1lbnUgPSAtPlxuICAgICAgIyBVc2VyIGhhcyBjbGlja2VkIG9uIGEgbWVudSB0cmlnZ2VyLlxuICAgICAgaWYgJG1lbnVJdGVtLmNsYXNzTGlzdC5jb250YWlucyAnb3BlbicgXG4gICAgICAgICRtZW51SXRlbS5jbGFzc0xpc3QucmVtb3ZlICdvcGVuJyBcbiAgICAgIGVsc2UgXG4gICAgICAgIGNsb3NlQWxsTWVudXMoKSBcbiAgICAgICAgJG1lbnVJdGVtLmNsYXNzTGlzdC5hZGQgJ29wZW4nXG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG5cbiAgICAjIExldCdzIGNoZWNrIGlmIGEgdXNlciBoYXMgY2xpY2tlZCBvbiBhIG1lbnUgdHJpZ2dlcjpcbiAgICBpZiBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMgJ21lbnUtaXRlbSdcbiAgICAgICRtZW51SXRlbSA9IGUudGFyZ2V0IFxuICAgICAgb3Blbk1lbnUoKVxuICAgIGVsc2UgaWYgZS50YXJnZXQucGFyZW50Tm9kZS5jbGFzc0xpc3QuY29udGFpbnMgJ21lbnUtaXRlbSdcbiAgICAgICRtZW51SXRlbSA9IGUudGFyZ2V0LnBhcmVudE5vZGVcbiAgICAgIG9wZW5NZW51KClcbiAgICBlbHNlXG4gICAgICBjbG9zZUFsbE1lbnVzKClcbiAgICAgIHJldHVyblxuXG5cblxuICAjICMgVGhlIGZvbGxvd2luZyBzaG91bGQgYXBwbHkgdG8gc2V2ZXJhbCBlbGVtZW50cy5cbiAgI1xuICAjICRtZW51SXRlbXMgPSBrJC4kJCAnLm1lbnUtaXRlbSdcbiAgI1xuICAjIGZvciAkX21lbnVJdGVtIGluICRtZW51SXRlbXNcbiAgI1xuICAjICAgJG1lbnVJdGVtID0gJF9tZW51SXRlbS5jbG9uZU5vZGUgdHJ1ZVxuICAjICAgJF9tZW51SXRlbS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZCAkbWVudUl0ZW0sICRfbWVudUl0ZW1cbiAgI1xuICAjICAgZG8gKCRtZW51SXRlbSkgLT5cblxuICAgICAgIyBUT0RPIG1ha2Ugb25seSBvbmUgZXZlbnQgbGlzdGVuZXIgZm9yIHRoZSBwYXJlbnQuXG4gICAgICAjICRtZW51SXRlbS5hZGRFdmVudExpc3RlbmVyICdjbGljaycsIChlKSAtPlxuXG4gICAgICAgICMgIyBKdXN0IGNsb3NlIGl0IGlmIGl0J3MgYWxyZWFkeSBvcGVuXG4gICAgICAgICMgaWYgJG1lbnVJdGVtLmNsYXNzTGlzdC5jb250YWlucyAnb3BlbidcbiAgICAgICAgIyAgICRtZW51SXRlbS5jbGFzc0xpc3QucmVtb3ZlICdvcGVuJ1xuICAgICAgICAjICAgcmV0dXJuXG4gICAgICAgICNcbiAgICAgICAgIyAjIFJlc2V0IGFsbFxuICAgICAgICAjIF8kbWVudUl0ZW0uY2xhc3NMaXN0LnJlbW92ZSAnb3BlbicgZm9yIF8kbWVudUl0ZW0gaW4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1lbnUtaXRlbScpXG4gICAgICAgICMgJG9wZW5hYmxlID0gJG1lbnVJdGVtLnF1ZXJ5U2VsZWN0b3IgJ3VsJ1xuICAgICAgICAjXG4gICAgICAgICMgIyBPcGVuIHRoaXMgb25lXG4gICAgICAgICMgaWYgJG9wZW5hYmxlXG4gICAgICAgICMgICAkbWVudUl0ZW0uY2xhc3NMaXN0LmFkZCAnb3BlbidcbiAgICAgICAgI1xuICAgICAgICAjICMgUHJldmVudCBidWJibGluZ1xuICAgICAgICAjIGUuc3RvcFByb3BhZ2F0aW9uKClcblxuICAjICMgRGlzbWlzcyBhbGxcbiAgIyBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgLT5cbiAgIyAgICR1bC5wYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUgJ29wZW4nIGZvciAkdWwgaW4gayQuJCQoJy5tZW51LWl0ZW0gPiB1bCcpXG4gICMgICAkbGkuY2xhc3NMaXN0LnJlbW92ZSAnb3BlbicgZm9yICRsaSBpbiBrJC4kJCgnLm1lbnUtaXRlbS5vcGVuJylcblxuayQuZHJvcGRvd24gPSBkcm9wZG93blxuXG5tb2R1bGUuZXhwb3J0cyA9IGRyb3Bkb3duXG4iLCJncm93bCA9IChwYXJhbXMpIC0+XG5cbiAgayQuYnVmZmVyIC0+XG4gICAgZGVmYXVsdHMgPVxuICAgICAgdGl0bGU6IHVuZGVmaW5lZFxuICAgICAgdGV4dDogdW5kZWZpbmVkXG4gICAgICBkZWxheTogMjAwMFxuICAgICAgdHlwZTogJ2dyb3dsLXdhcm4nXG4gICAgICBpZDogRGF0ZS5ub3coKVxuXG4gICAgcGFyYW1zID0gayQuZXh0ZW5kIGRlZmF1bHRzLCBwYXJhbXNcblxuICAgICMgQ3JlYXRlIGdyb3dsIGNvbnRhaW5lclxuICAgIGlmIG5vdCBrJC4kJCgnLmdyb3dsX2NvbnRhaW5lcicpLmxlbmd0aFxuICAgICAgZ3Jvd2xDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdkaXYnXG4gICAgICBncm93bENvbnRhaW5lci5jbGFzc05hbWUgPSAnZ3Jvd2xfY29udGFpbmVyJ1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCBncm93bENvbnRhaW5lclxuXG4gICAgIyBDcmVhdGUgZ3Jvd2xcbiAgICBncm93bCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ2RpdidcblxuICAgICMgQWRkIGFwcHJvcHJpYXRlIGNsYXNzZXNcbiAgICBjbGFzc05hbWUgPSBcImFsZXJ0IGdyb3dsIHNob3cgI3twYXJhbXMudHlwZX0gZ3Jvd2wtI3twYXJhbXMuaWR9XCJcbiAgICBncm93bC5jbGFzc05hbWUgPSBjbGFzc05hbWVcblxuICAgICMgQWRkIGNvbnRlbnRcbiAgICBjb250ZW50ID0gXCJcIlxuICAgIGNvbnRlbnQgKz0gXCI8aDE+I3twYXJhbXMudGl0bGV9PC9oMT5cIiBpZiBwYXJhbXMudGl0bGVcbiAgICBjb250ZW50ICs9IFwiPHA+I3twYXJhbXMudGV4dH08L3A+XCIgaWYgcGFyYW1zLnRleHRcbiAgICBncm93bC5pbm5lckhUTUwgPSBjb250ZW50XG5cbiAgICAjIEFwcGVuZCBjaGlsZCB0byBjb250YWluZXJcbiAgICBrJC4kKCcuZ3Jvd2xfY29udGFpbmVyJykuYXBwZW5kQ2hpbGQgZ3Jvd2xcblxuICAgIGRlbGF5ID0gcGFyYW1zLmRlbGF5XG4gICAgaWQgPSBwYXJhbXMuaWRcblxuICAgIGlmIGRlbGF5ID4gMFxuICAgICAgZG8gKGRlbGF5LCBpZCkgLT5cbiAgICAgICAgc2V0VGltZW91dCAtPlxuICAgICAgICAgICRncm93bCA9IGskLiQoXCIuZ3Jvd2wtI3tpZH1cIilcbiAgICAgICAgICAkZ3Jvd2wuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpXG4gICAgICAgICAgJG5ld0dyb3dsID0gJGdyb3dsLmNsb25lTm9kZSB0cnVlXG4gICAgICAgICAgJGdyb3dsLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkICRuZXdHcm93bCwgJGdyb3dsXG4gICAgICAgICAgJG5ld0dyb3dsLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKVxuXG4gICAgICAgICAgZG8gKGRlbGF5LCBpZCkgLT5cbiAgICAgICAgICAgIHNldFRpbWVvdXQgLT5cbiAgICAgICAgICAgICAgIyBSZW1vdmUgZ2hvc3QgZ3Jvd2xzXG4gICAgICAgICAgICAgIGskLiQoJy5ncm93bF9jb250YWluZXInKS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkIGskLiQoJy5ncm93bF9jb250YWluZXInKSBpZiBub3QgayQuJCQoJy5ncm93bC5zaG93JykubGVuZ3RoXG4gICAgICAgICAgICAsIDUwMFxuICAgICAgICAsIGRlbGF5XG5cbmskLmdyb3dsID0gZ3Jvd2xcblxubW9kdWxlLmV4cG9ydHMgPSBncm93bFxuIiwiaWNvbnMgPSAoKSAtPlxuXG4gICMhIHN2ZzRldmVyeWJvZHkgdjEuMC4wIHwgZ2l0aHViLmNvbS9qb25hdGhhbnRuZWFsL3N2ZzRldmVyeWJvZHkgXG4gIHVzZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInVzZVwiKVxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIG9yIHdpbmRvdy5zZXRUaW1lb3V0XG4gIENBQ0hFID0ge31cbiAgIyBJRTlUTzExID0gL1RyaWRlbnRcXC9bNTY3XVxcYi8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSBvciAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQXBwbGVXZWJLaXRcXC8oXFxkKykvKSBvciBbXSlbMV0gPCA1MzdcbiAgSUU5VE8xMSA9IHRydWVcbiAgIyBGb3JjaW5nIHRoaXMgdG8gc2hpbSByZWdhcmRsZXNzLlxuICBlbWJlZCA9IChzdmcsIGcpIC0+XG4gICAgaWYgZ1xuICAgICAgdmlld0JveCA9IGcuZ2V0QXR0cmlidXRlKFwidmlld0JveFwiKVxuICAgICAgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcbiAgICAgIGNsb25lID0gZy5jbG9uZU5vZGUodHJ1ZSlcbiAgICAgIHN2Zy5zZXRBdHRyaWJ1dGUgXCJ2aWV3Qm94XCIsIHZpZXdCb3ggIGlmIHZpZXdCb3hcbiAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkIGNsb25lLmNoaWxkTm9kZXNbMF0gIHdoaWxlIGNsb25lLmNoaWxkTm9kZXMubGVuZ3RoXG4gICAgICBzdmcuYXBwZW5kQ2hpbGQgZnJhZ21lbnRcbiAgICByZXR1cm5cbiAgb25sb2FkID0gLT5cbiAgICB4aHIgPSB0aGlzXG4gICAgeCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ4XCIpXG4gICAgcyA9IHhoci5zXG4gICAgeC5pbm5lckhUTUwgPSB4aHIucmVzcG9uc2VUZXh0XG4gICAgeGhyLm9ubG9hZCA9IC0+XG4gICAgICBzLnNwbGljZSgwKS5tYXAgKGFycmF5KSAtPlxuICAgICAgICBlbWJlZCBhcnJheVswXSwgeC5xdWVyeVNlbGVjdG9yKFwiI1wiICsgYXJyYXlbMV0ucmVwbGFjZSgvKFxcVykvZywgXCJcXFxcJDFcIikpXG4gICAgICAgIHJldHVyblxuXG4gICAgICByZXR1cm5cblxuICAgIHhoci5vbmxvYWQoKVxuICAgIHJldHVyblxuICBvbmZyYW1lID0gLT5cbiAgICB1c2UgPSB1bmRlZmluZWRcbiAgICB3aGlsZSAodXNlID0gdXNlc1swXSlcbiAgICAgIHN2ZyA9IHVzZS5wYXJlbnROb2RlXG4gICAgICB1cmwgPSB1c2UuZ2V0QXR0cmlidXRlKFwieGxpbms6aHJlZlwiKS5zcGxpdChcIiNcIilcbiAgICAgIHVybF9yb290ID0gdXJsWzBdXG4gICAgICB1cmxfaGFzaCA9IHVybFsxXVxuICAgICAgc3ZnLnJlbW92ZUNoaWxkIHVzZVxuICAgICAgaWYgdXJsX3Jvb3QubGVuZ3RoXG4gICAgICAgIHhociA9IENBQ0hFW3VybF9yb290XSA9IENBQ0hFW3VybF9yb290XSBvciBuZXcgWE1MSHR0cFJlcXVlc3QoKVxuICAgICAgICB1bmxlc3MgeGhyLnNcbiAgICAgICAgICB4aHIucyA9IFtdXG4gICAgICAgICAgeGhyLm9wZW4gXCJHRVRcIiwgdXJsX3Jvb3RcbiAgICAgICAgICB4aHIub25sb2FkID0gb25sb2FkXG4gICAgICAgICAgeGhyLnNlbmQoKVxuICAgICAgICB4aHIucy5wdXNoIFtcbiAgICAgICAgICBzdmdcbiAgICAgICAgICB1cmxfaGFzaFxuICAgICAgICBdXG4gICAgICAgIHhoci5vbmxvYWQoKSAgaWYgeGhyLnJlYWR5U3RhdGUgaXMgNFxuICAgICAgZWxzZVxuICAgICAgICBlbWJlZCBzdmcsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHVybF9oYXNoKVxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSBvbmZyYW1lXG4gICAgcmV0dXJuXG4gIG9uZnJhbWUoKSAgaWYgSUU5VE8xMVxuICByZXR1cm5cblxuayQuaWNvbnMgPSBpY29uc1xuXG5tb2R1bGUuZXhwb3J0cyA9IGljb25zXG4iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG5nbG9iYWwuayQgPSBuZXcgT2JqZWN0KCk7XG5cbmskLiQkID0gZnVuY3Rpb24oZWwpIHtcbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWwpO1xufTtcblxuayQuJCA9IGZ1bmN0aW9uKGVsKSB7XG4gIHJldHVybiBrJC4kJChlbClbMF07XG59O1xuXG5rJC5leHRlbmQgPSBmdW5jdGlvbihkZXN0aW5hdGlvbiwgc291cmNlKSB7XG4gIHZhciBwcm9wZXJ0eTtcbiAgZm9yIChwcm9wZXJ0eSBpbiBzb3VyY2UpIHtcbiAgICBpZiAoc291cmNlW3Byb3BlcnR5XSAmJiBzb3VyY2VbcHJvcGVydHldLmNvbnN0cnVjdG9yICYmIHNvdXJjZVtwcm9wZXJ0eV0uY29uc3RydWN0b3IgPT09IE9iamVjdCkge1xuICAgICAgZGVzdGluYXRpb25bcHJvcGVydHldID0gZGVzdGluYXRpb25bcHJvcGVydHldIHx8IHt9O1xuICAgICAgYXJndW1lbnRzLmNhbGxlZShkZXN0aW5hdGlvbltwcm9wZXJ0eV0sIHNvdXJjZVtwcm9wZXJ0eV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZXN0aW5hdGlvbltwcm9wZXJ0eV0gPSBzb3VyY2VbcHJvcGVydHldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZGVzdGluYXRpb247XG59O1xuXG5rJC5kZWJvdW5jZVF1ZXVlID0gbmV3IE9iamVjdDtcblxubW9kdWxlLmV4cG9ydHMgPSBrJDtcblxuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklpOVZjMlZ5Y3k5aFpHRnRaM0poYm5RdmMybDBaWE12ZEdWemRISjFibTVsY2k5c2FXSXRZMjl5WlM5amIyWm1aV1V2YTNNdVkyOW1abVZsSWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3UVVGQlFTeE5RVUZOTEVOQlFVTXNSVUZCVUN4SFFVRm5RaXhKUVVGQkxFMUJRVUVzUTBGQlFUczdRVUZGYUVJc1JVRkJSU3hEUVVGRExFVkJRVWdzUjBGQlVTeFRRVUZETEVWQlFVUTdVMEZCVVN4UlFVRlJMRU5CUVVNc1owSkJRVlFzUTBGQk1FSXNSVUZCTVVJN1FVRkJVanM3UVVGRFVpeEZRVUZGTEVOQlFVTXNRMEZCU0N4SFFVRlBMRk5CUVVNc1JVRkJSRHRUUVVGUkxFVkJRVVVzUTBGQlF5eEZRVUZJTEVOQlFVMHNSVUZCVGl4RFFVRlZMRU5CUVVFc1EwRkJRVHRCUVVGc1FqczdRVUZEVUN4RlFVRkZMRU5CUVVNc1RVRkJTQ3hIUVVGWkxGTkJRVU1zVjBGQlJDeEZRVUZqTEUxQlFXUTdRVUZEVml4TlFVRkJPMEZCUVVFc1QwRkJRU3hyUWtGQlFUdEpRVU5GTEVsQlFVY3NUVUZCVHl4RFFVRkJMRkZCUVVFc1EwRkJVQ3hKUVVGeFFpeE5RVUZQTEVOQlFVRXNVVUZCUVN4RFFVRlRMRU5CUVVNc1YwRkJkRU1zU1VGQmMwUXNUVUZCVHl4RFFVRkJMRkZCUVVFc1EwRkJVeXhEUVVGRExGZEJRV3BDTEV0QlFXZERMRTFCUVhwR08wMUJRMFVzVjBGQldTeERRVUZCTEZGQlFVRXNRMEZCV2l4SFFVRjNRaXhYUVVGWkxFTkJRVUVzVVVGQlFTeERRVUZhTEVsQlFYbENPMDFCUTJwRUxGTkJRVk1zUTBGQlF5eE5RVUZXTEVOQlFXbENMRmRCUVZrc1EwRkJRU3hSUVVGQkxFTkJRVGRDTEVWQlFYZERMRTFCUVU4c1EwRkJRU3hSUVVGQkxFTkJRUzlETEVWQlJrWTdTMEZCUVN4TlFVRkJPMDFCU1VVc1YwRkJXU3hEUVVGQkxGRkJRVUVzUTBGQldpeEhRVUYzUWl4TlFVRlBMRU5CUVVFc1VVRkJRU3hGUVVwcVF6czdRVUZFUmp0VFFVMUJPMEZCVUZVN08wRkJVMW9zUlVGQlJTeERRVUZETEdGQlFVZ3NSMEZCYlVJc1NVRkJTVHM3UVVGRmRrSXNUVUZCVFN4RFFVRkRMRTlCUVZBc1IwRkJhVUlpTENKbWFXeGxJam9pWjJWdVpYSmhkR1ZrTG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYkltZHNiMkpoYkM1ckpDQTlJRzVsZHlCUFltcGxZM1FvS1Z4dVhHNXJKQzRrSkNBOUlDaGxiQ2tnTFQ0Z1pHOWpkVzFsYm5RdWNYVmxjbmxUWld4bFkzUnZja0ZzYkNCbGJGeHVheVF1SkNBOUlDaGxiQ2tnTFQ0Z2F5UXVKQ1FvWld3cFd6QmRYRzVySkM1bGVIUmxibVFnUFNBb1pHVnpkR2x1WVhScGIyNHNJSE52ZFhKalpTa2dMVDVjYmlBZ1ptOXlJSEJ5YjNCbGNuUjVJRzltSUhOdmRYSmpaVnh1SUNBZ0lHbG1JSE52ZFhKalpWdHdjbTl3WlhKMGVWMGdZVzVrSUhOdmRYSmpaVnR3Y205d1pYSjBlVjB1WTI5dWMzUnlkV04wYjNJZ1lXNWtJSE52ZFhKalpWdHdjbTl3WlhKMGVWMHVZMjl1YzNSeWRXTjBiM0lnYVhNZ1QySnFaV04wWEc0Z0lDQWdJQ0JrWlhOMGFXNWhkR2x2Ymx0d2NtOXdaWEowZVYwZ1BTQmtaWE4wYVc1aGRHbHZibHR3Y205d1pYSjBlVjBnYjNJZ2UzMWNiaUFnSUNBZ0lHRnlaM1Z0Wlc1MGN5NWpZV3hzWldVZ1pHVnpkR2x1WVhScGIyNWJjSEp2Y0dWeWRIbGRMQ0J6YjNWeVkyVmJjSEp2Y0dWeWRIbGRYRzRnSUNBZ1pXeHpaVnh1SUNBZ0lDQWdaR1Z6ZEdsdVlYUnBiMjViY0hKdmNHVnlkSGxkSUQwZ2MyOTFjbU5sVzNCeWIzQmxjblI1WFZ4dUlDQmtaWE4wYVc1aGRHbHZibHh1WEc1ckpDNWtaV0p2ZFc1alpWRjFaWFZsSUQwZ2JtVjNJRTlpYW1WamRGeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR3NrWEc0aVhYMD0iLCJtb2RhbCA9IChlbCkgLT5cblxuICBgdmFyIGlPUyA9IC8oaVBhZHxpUGhvbmV8aVBvZCkvZy50ZXN0KCBuYXZpZ2F0b3IudXNlckFnZW50IClgXG4gIFxuICAjIEN1cnNvciBwb2ludGVyIGhhY2sgaWYgaU9TXG4gIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCAnZGlzbWlzcy1tb2RhbCcgaWYgaU9TXG5cbiAgZG8gKGVsKSAtPlxuXG4gICAgJGhpZGVNb2RhbCA9IC0+XG4gICAgICBrJC4kKGVsKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG5cbiAgICAjIEFsbG93IG1vZGFsIHRvIGRpc21pc3Mgd2hlbiBjbGlja2VkIG91dHNpZGVcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgLT5cbiAgICAgICRoaWRlTW9kYWwoKVxuXG4gICAgayQuJChlbCkuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCAoZSkgLT5cbiAgICAgIHJldHVybiBlLnN0b3BQcm9wYWdhdGlvbigpXG5cbiAgICAkY2xvc2VyID0gayQuJChlbCkucXVlcnlTZWxlY3RvcignYVtkYXRhLW1vZGFsLWNsb3NlXScpXG4gICAgaWYgJGNsb3NlclxuICAgICAgJGNsb3Nlci5hZGRFdmVudExpc3RlbmVyICdjbGljaycsIC0+XG4gICAgICAgICRoaWRlTW9kYWwoKVxuXG4gIGskLiQgZWxcblxuayQubW9kYWwgPSBtb2RhbFxuXG5tb2R1bGUuZXhwb3J0cyA9IG1vZGFsXG4iLCJuYXYgPSAoZWwpIC0+XG5cbiAgIyBBY2NlcHQgYm90aCBzdHJpbmdzIGFuZCBlbGVtZW50cy5cbiAgJG5hdmJhciA9IGlmIHR5cGVvZiBlbCA9PSAnc3RyaW5nJyB0aGVuIGskLiQoZWwpIGVsc2UgZWxcblxuICB0cnlcbiAgICAjIFdpcmUgdXAgbWVudSBpdGVtc1xuICAgICRtZW51SXRlbXMgPSAkbmF2YmFyLnF1ZXJ5U2VsZWN0b3JBbGwoJ3VsID4gbGknKVxuXG4gICAgIyBQcnVuZSBpdGVtcyB0aGF0IGRvbid0IGNvbnRhaW4gdWxzXG4gICAgXyRtZW51SXRlbXMgPSBuZXcgQXJyYXkoKVxuICAgIGZvciAkbWVudUl0ZW0gaW4gJG1lbnVJdGVtc1xuICAgICAgaWYgJG1lbnVJdGVtLnF1ZXJ5U2VsZWN0b3JBbGwoJ3VsJykubGVuZ3RoIGFuZCAhJG1lbnVJdGVtLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyb2xlPVwiYnV0dG9uXCJdJykubGVuZ3RoXG4gICAgICAgIF8kbWVudUl0ZW1zLnB1c2ggJG1lbnVJdGVtXG5cbiAgICAkbWVudUl0ZW1zID0gXyRtZW51SXRlbXNcbiAgICBmb3IgJG1lbnVJdGVtIGluICRtZW51SXRlbXNcblxuICAgICAgIyBNYXJrIGFzIGEgbWVudSBpdGVtXG4gICAgICAkbWVudUl0ZW0uY2xhc3NMaXN0LmFkZCAnbWVudS1pdGVtJ1xuXG4gIGNhdGNoIGVcbiAgICBjb25zb2xlLmVycm9yIFwiQ291bGQgbm90IGluc3RhbnRpYXRlIGFzIGEgbmF2LlwiLCBlLm1lc3NhZ2VcblxuICAkYnV0dG9uID0gJG5hdmJhci5xdWVyeVNlbGVjdG9yKCcubmF2YmFyLXRpdGxlIGJ1dHRvbicpXG4gIGlmICRidXR0b24gXG4gICAgJGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyICdjbGljaycsIC0+XG4gICAgICAkbmF2ID0gJG5hdmJhci5xdWVyeVNlbGVjdG9yKCduYXYnKVxuICAgICAgaWYgJG5hdi5jbGFzc0xpc3QuY29udGFpbnMgJ2V4cGFuZCdcbiAgICAgICAgJG5hdi5jbGFzc0xpc3QucmVtb3ZlICdleHBhbmQnXG4gICAgICBlbHNlXG4gICAgICAgICRuYXYuY2xhc3NMaXN0LmFkZCAnZXhwYW5kJ1xuXG5rJC5uYXYgPSBuYXZcblxubW9kdWxlLmV4cG9ydHMgPSBuYXZcbiIsInN0YXR1cyA9IChvcHRzKSAtPlxuXG4gIGRlZmF1bHRzID1cbiAgICB0eXBlOiAnc3RhdHVzLXllbGxvdydcbiAgICBkZWxheTogMjAwMFxuXG4gIHN0YXR1cyA9IGskLmV4dGVuZCBkZWZhdWx0cywgb3B0c1xuXG4gIGlmIG5vdCBrJC4kJCgnI3N0YXR1c19iYXInKS5sZW5ndGhcbiAgICAkc3RhdHVzQmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAkc3RhdHVzQmFyLmlkID0gJ3N0YXR1c19iYXInXG4gICAgJHN0YXR1c0Jhci5jbGFzc05hbWUgPSAnc3RhdHVzX2JhcidcbiAgICAkc3RhdHVzQmFyLmlubmVySFRNTCA9IFwiPGRpdiBjbGFzcz0nc3RhdHVzX2Jhci1zdGF0dXMnIGlkPSdzdGF0dXNfYmFyLXN0YXR1cyc+PC9kaXY+XCJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCRzdGF0dXNCYXIpXG5cbiAgJHN0YXR1c0JhciA9IGskLiQoJyNzdGF0dXNfYmFyJylcblxuICBoaWRlU3RhdHVzQmFyID0gLT5cbiAgICAkc3RhdHVzQmFyLmNsYXNzTGlzdC5hZGQgJ2hpZGUnXG4gICAgc2V0VGltZW91dCAtPlxuICAgICAgJHN0YXR1c0Jhci5jbGFzc0xpc3QucmVtb3ZlICdoaWRlJ1xuICAgICAgJHN0YXR1c0Jhci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkICRzdGF0dXNCYXJcbiAgICAsIDI1MFxuXG4gIGlmIHN0YXR1cy5kZWxheSA+IDBcbiAgICBrJC5kZWJvdW5jZSBoaWRlU3RhdHVzQmFyLCAnaGlkZVN0YXR1c0JhcicsIHN0YXR1cy5kZWxheVxuXG4gICRzdGF0dXMgPSBrJC4kKFwiI3N0YXR1c19iYXItc3RhdHVzXCIpXG4gICRzdGF0dXMuaW5uZXJIVE1MID0gc3RhdHVzLnRleHRcbiAgJHN0YXR1cy5kYXRhc2V0LnR5cGUgPSBzdGF0dXMudHlwZVxuXG5rJC5zdGF0dXMgPSBzdGF0dXNcblxubW9kdWxlLmV4cG9ydHMgPSBzdGF0dXNcbiIsInRhYnMgPSAoZWwpIC0+XG5cbiAgIyBBY2NlcHQgYm90aCBzdHJpbmdzIGFuZCBlbGVtZW50cy5cbiAgJHRhYkNvbnRhaW5lciA9IGlmIHR5cGVvZiBlbCA9PSAnc3RyaW5nJyB0aGVuIGskLiQoZWwpIGVsc2UgZWxcblxuICAkdGFiU2V0ID0gJHRhYkNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdsaScpXG4gICR0YWIuY2xhc3NMaXN0LmFkZCgndGFiLWl0ZW0nKSBmb3IgJHRhYiBpbiAkdGFiU2V0XG5cbiAgJHBhbmVTZXQgPSBuZXcgQXJyYXkoKVxuICBmb3IgJF90YWIgaW4gJHRhYlNldFxuICAgICRpZCA9ICRfdGFiLnF1ZXJ5U2VsZWN0b3IoJ2EnKS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKVxuICAgICRwYW5lID0gayQuJChcImFydGljbGUjeyRpZH1cIilcbiAgICAkcGFuZS5jbGFzc0xpc3QuYWRkICdvcGVuJyBpZiAkX3RhYi5jbGFzc0xpc3QuY29udGFpbnMgJ29wZW4nXG4gICAgJHBhbmVTZXQucHVzaCgkcGFuZSlcbiAgICAjICRwYW5lLmRhdGFzZXQucGFuZWwgPSAndHJ1ZScgIyBSZXBsYWNlIHdpdGggdGhpcyB3aGVuIElFMTAgc3VwcG9ydCBkcm9wc1xuICAgICRwYW5lLnNldEF0dHJpYnV0ZSgnZGF0YS1wYW5lbCcsIHRydWUpXG5cbiAgZm9yICR0YWIgaW4gJHRhYlNldFxuICAgICMgQ3JlYXRlIGFuIGFycmF5IG9mIHBhbmVscyBieSByZWFkaW5nIHRoZSBsaW5rcyBmcm9tIGVhY2ggdGFiLlxuICAgICR0YWJMaW5rID0gJHRhYi5xdWVyeVNlbGVjdG9yKCdhJylcbiAgICAjICR0YWJMaW5rLmRhdGFzZXQubGluayA9ICR0YWJMaW5rLmdldEF0dHJpYnV0ZSAnaHJlZicgIyBJYmlkXG4gICAgJHRhYkxpbmsuc2V0QXR0cmlidXRlKCdkYXRhLWxpbmsnLCAkdGFiTGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSlcbiAgICAkdGFiTGluay5ocmVmID0gJ2phdmFzY3JpcHQ6dm9pZCgwKTsnXG5cbiAgICBkbyAoJHRhYiwgJHRhYkxpbmssICRwYW5lU2V0KSAtPlxuICAgICAgJHRhYi5hZGRFdmVudExpc3RlbmVyICdjbGljaycsIC0+XG5cbiAgICAgICAgIyBSZXNldCB0YWJzIGFuZCBwYW5lcyBvbmx5IGluIHRoaXMgdGFic2V0XG4gICAgICAgICRwYW5lLmNsYXNzTGlzdC5yZW1vdmUgJ29wZW4nIGZvciAkcGFuZSBpbiAkcGFuZVNldFxuICAgICAgICBfJHRhYi5jbGFzc0xpc3QucmVtb3ZlICdvcGVuJyBmb3IgXyR0YWIgaW4gJHRhYlNldFxuXG4gICAgICAgICMgQWRkIGFuIG9wZW4gY2xhc3MgdW5pcXVlbHkgdG8gdGhpcyB0YWIgYW5kIHBhbmUuXG4gICAgICAgICMgayQuJChcImFydGljbGUjeyR0YWJMaW5rLmRhdGFzZXQubGlua31cIikuY2xhc3NMaXN0LmFkZCAnb3BlbicgIyBJYmlkXG4gICAgICAgIGskLiQoXCJhcnRpY2xlI3skdGFiTGluay5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGluaycpfVwiKS5jbGFzc0xpc3QuYWRkICdvcGVuJ1xuICAgICAgICAkdGFiLmNsYXNzTGlzdC5hZGQgJ29wZW4nXG5cbmskLnRhYnMgPSB0YWJzXG5cbm1vZHVsZS5leHBvcnRzID0gdGFic1xuIiwidGhyb3R0bGUgPSAoZm4sIGlkLCBkZWxheSkgLT5cblxuICBcblxuayQudGhyb3R0bGUgPSB0aHJvdHRsZVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRocm90dGxlXG4iLCJ2YXIgJG1sID0ge1xuICBzcGVjczoge30sXG4gIEFzc2VydDogZnVuY3Rpb24oc3RyaW5nLCB0aW1lb3V0LCBzcGVjKSB7XG4gICAgdGhpcy5zdHJpbmcgPSBzdHJpbmc7XG4gICAgdGhpcy50aW1lb3V0ID0gdGltZW91dDtcbiAgICB0aGlzLnNwZWMgPSBzcGVjO1xuICAgIHRoaXMuZmFpbCA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgJG1sLmZhaWwodGhpcy5zdHJpbmcpO1xuICAgIH0uYmluZCh0aGlzKSwgdGhpcy50aW1lb3V0KTtcbiAgfSxcbiAgRXhwZWN0OiBmdW5jdGlvbihzdHJpbmcsIGNvbmRpdGlvbikge1xuICAgIHRoaXMuc3RyaW5nID0gc3RyaW5nO1xuICAgIHRoaXMuY29uZGl0aW9uID0gY29uZGl0aW9uO1xuICB9LFxuICBTcGVjOiBmdW5jdGlvbih0ZXN0cykge1xuICAgIHRoaXMudGVzdHMgPSBuZXcgQXJyYXkoKTtcbiAgICB0aGlzLnRlc3RzID0gdGhpcy50ZXN0cy5jb25jYXQodGVzdHMpO1xuICB9LFxuICBwYXNzOiBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgY29uc29sZS5sb2coXCIlY1tQQVNTXTogXCIgKyBtZXNzYWdlLCBcImNvbG9yOiBncmVlblwiKTtcbiAgfSxcbiAgZmFpbDogZnVuY3Rpb24obWVzc2FnZSwgYXJncykge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJbRkFJTF06IFwiICsgbWVzc2FnZSk7XG4gICAgY29uc29sZS5lcnJvcihhcmdzKTtcbiAgfVxufVxuXG4kbWwuQXNzZXJ0LnByb3RvdHlwZS5yZXR1cm4gPSBmdW5jdGlvbigpIHtcbiAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLmZhaWwpO1xuICAkbWwucGFzcyh0aGlzLnN0cmluZyk7XG59XG5cbiRtbC5FeHBlY3QucHJvdG90eXBlLnJldHVybiA9IGZ1bmN0aW9uKCkge1xuICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gIGlmICh0aGlzLmNvbmRpdGlvbi5hcHBseShudWxsLCBhcmdzKSkge1xuICAgICRtbC5wYXNzKHRoaXMuc3RyaW5nKTtcbiAgfVxuICBlbHNlIHtcbiAgICAkbWwuZmFpbCh0aGlzLnN0cmluZywgYXJncyk7XG4gIH1cbn1cblxuJG1sLlNwZWMucHJvdG90eXBlLnJldHVybiA9IGZ1bmN0aW9uKCkge1xuICB0aGlzRGF0YSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cylcblxuICBmb3IgKHZhciBfaSA9IDAsIGxlbiA9IHRoaXMudGVzdHMubGVuZ3RoOyBfaSA8IGxlbjsgX2krKykge1xuICAgIHRoaXMudGVzdHNbX2ldLnJldHVybih0aGlzRGF0YVtfaV0pO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gJG1sXG4iXX0=
