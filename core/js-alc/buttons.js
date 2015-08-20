(function() {
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

}).call(this);
