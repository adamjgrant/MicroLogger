(function() {
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

}).call(this);
