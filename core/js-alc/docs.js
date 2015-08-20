(function() {
  document.addEventListener('DOMContentLoaded', function() {
    var $documentContainer, $headingLevel, $link, $menuItem, $newSubmenu, $stepsUp, $targetNode, $thisHeadingLevel, $toc, booleanViewOptions, defaults, els, extend, fn, heading, i, j, k, len, len1, len2, option, options, ref, setSettings, settings;
    window.$$ = function(el) {
      return document.querySelectorAll(el);
    };
    window.$ = function(el) {
      return $$(el)[0];
    };

    /*
    CRUD DOCUMENTATION SETTINGS
     */
    defaults = {
      viewOptions: {
        jquery: false,
        semantic: true
      }
    };
    booleanViewOptions = ['jquery', 'semantic'];
    options = JSON.parse(localStorage.getItem('kickstartDocs'));
    extend = function(destination, source) {
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
    settings = options ? extend(defaults, options) : defaults;
    setSettings = function(settings) {
      var i, len, option, results;
      localStorage.setItem('kickstartDocs', JSON.stringify(settings));
      results = [];
      for (i = 0, len = booleanViewOptions.length; i < len; i++) {
        option = booleanViewOptions[i];
        if (settings.viewOptions["" + option]) {
          results.push(document.body.classList.add("show-" + option));
        } else {
          results.push(document.body.classList.remove("show-" + option));
        }
      }
      return results;
    };
    setSettings(settings);
    els = [];
    for (i = 0, len = booleanViewOptions.length; i < len; i++) {
      option = booleanViewOptions[i];
      option = "#docs-" + option;
      els.push(option);
    }
    if ($$(els).length) {
      fn = function(option) {
        window["$opt" + option] = $("#docs-" + option);
        window["$opt" + option].checked = (settings.viewOptions["" + option] ? true : false);
        return window["$opt" + option].addEventListener('click', function() {
          settings.viewOptions["" + option] = this.checked;
          return setSettings(settings);
        });
      };
      for (j = 0, len1 = booleanViewOptions.length; j < len1; j++) {
        option = booleanViewOptions[j];
        fn(option);
      }
    }
    if (k$.$('#example-showGrowl')) {
      k$.$('#example-showGrowl').addEventListener('click', function() {
        var growls;
        growls = [
          {
            title: 'Document Saved.',
            text: 'Your document was successfully saved.',
            type: 'alert-green'
          }, {
            title: 'Library book not found',
            text: 'Sorry, we could find that library book.',
            type: 'alert-red'
          }, {
            title: 'Wide clearance selection',
            text: 'Remember to check out our clearance',
            type: 'alert-blue'
          }, {
            title: 'Deadline approaching',
            text: 'Friendly reminder that your deadline is quickly approaching.',
            type: 'alert-yellow'
          }
        ];
        k$.exampleCounter++;
        if (!k$.exampleCounter || k$.exampleCounter > 3) {
          k$.exampleCounter = 0;
        }
        return k$.growl(growls[k$.exampleCounter]);
      });
    }
    if (k$.$('#example-showStatus')) {
      k$.$('#example-showStatus').addEventListener('click', function() {
        var statuses;
        statuses = [
          {
            text: 'Document Saved.',
            type: 'status-green'
          }, {
            text: 'Sorry, we could find that library book.',
            type: 'status-red'
          }, {
            text: 'Remember to check out our clearance',
            type: 'status-blue'
          }, {
            text: 'Deadline is approaching!',
            type: 'status-yellow'
          }
        ];
        k$.exampleCounter++;
        if (!k$.exampleCounter || k$.exampleCounter > 3) {
          k$.exampleCounter = 0;
        }
        return k$.status(statuses[k$.exampleCounter]);
      });
    }
    k$.slugify = function(str) {
      return str.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
    };
    if (k$.$$('#toc').length) {
      k$.$('.creating-table').parentNode.removeChild(k$.$('.creating-table'));
      $toc = document.createElement('ul');
      $toc.className = "list list-unstyled";
      $link = document.createElement('li');
      $link.innerHTML = '<a></a>';
      $headingLevel = 1;
      $targetNode = $toc;
      $documentContainer = k$.$('.document-container');
      ref = $documentContainer.querySelectorAll('h1, h2, h3, h4, h5, h6');
      for (k = 0, len2 = ref.length; k < len2; k++) {
        heading = ref[k];
        if (!heading.classList.contains('toc-exempt')) {
          heading.id = k$.slugify(heading.innerHTML);
          $thisHeadingLevel = parseInt(heading.tagName.substr(1, 2));
          if ($thisHeadingLevel > $headingLevel) {
            $newSubmenu = document.createElement('ul');
            $targetNode.children[$targetNode.children.length - 1].appendChild($newSubmenu);
            $targetNode = $newSubmenu;
            $headingLevel = $thisHeadingLevel;
          }
          if ($thisHeadingLevel < $headingLevel) {
            $stepsUp = $headingLevel - $thisHeadingLevel;
            while ($stepsUp > -1) {
              $targetNode = $targetNode.parentNode;
              $stepsUp--;
            }
            $headingLevel = $thisHeadingLevel;
          }
          $menuItem = $link.cloneNode(true);
          $menuItem.querySelector('a').href = "#" + heading.id;
          $menuItem.querySelector('a').innerHTML = heading.innerHTML;
          $targetNode.appendChild($menuItem);
        }
      }
      return k$.$('#toc').appendChild($toc);
    }
  });

}).call(this);
