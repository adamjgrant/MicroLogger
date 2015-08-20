(function() {
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

}).call(this);
