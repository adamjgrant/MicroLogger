(function() {
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

}).call(this);
