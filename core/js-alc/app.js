(function() {
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

}).call(this);
