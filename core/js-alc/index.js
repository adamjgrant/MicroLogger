(function() {
  var $button, slide1, slide2, slide3, typeOut;

  $button = k$.$('#preview-button');

  typeOut = function(str, container, cb, startWith) {
    var _str, i;
    i = 0;
    _str = "";
    return this.interval = setInterval(function() {
      i++;
      _str = str.substr(0, i);
      container.innerHTML = startWith + _str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\|/g, '<br>').replace(/\+/g, '<span class="color">').replace(/\*/g, '</span>').replace(/%/g, '&nbsp;');
      if (i > str.length - 1) {
        clearInterval(this.interval);
        return cb();
      }
    }, 75);
  };

  slide3 = function() {
    var slide3TO;
    $button.classList.add('button');
    $button.classList.add('button-primary');
    return slide3TO = setTimeout(function() {
      $button.classList.remove('button');
      $button.classList.remove('button-primary');
      clearTimeout(slide3TO);
      return slide1();
    }, 1200);
  };

  slide2 = function() {
    var slide2TO;
    $button.classList.add('button');
    $button.classList.add('button-primary');
    return slide2TO = setTimeout(function() {
      $button.classList.remove('button');
      $button.classList.remove('button-primary');
      typeOut('<button class="+cta*">Call to Action</button>||.+cta* {|%%@include button($primary-color);|}', k$.$('#source'), slide3, "&lt;!-- OR define your own --&gt;<br><br>");
      return clearTimeout(slide2TO);
    }, 1200);
  };

  slide1 = function() {
    return typeOut('<button class="+button button-primary*">Call to Action</button>', k$.$('#source'), slide2, "&lt;!-- Use predefined classes --&gt;<br><br>");
  };

  slide1();

}).call(this);
