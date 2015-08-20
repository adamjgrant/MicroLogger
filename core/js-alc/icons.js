(function() {
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

}).call(this);
