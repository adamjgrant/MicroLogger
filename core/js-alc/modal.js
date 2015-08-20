(function() {
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

}).call(this);
