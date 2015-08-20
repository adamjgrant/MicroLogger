(function() {
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

}).call(this);
