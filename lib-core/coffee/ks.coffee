global.k$ = new Object()

k$.$$ = (el) -> document.querySelectorAll el
k$.$ = (el) -> k$.$$(el)[0]
k$.extend = (destination, source) ->
  for property of source
    if source[property] and source[property].constructor and source[property].constructor is Object
      destination[property] = destination[property] or {}
      arguments.callee destination[property], source[property]
    else
      destination[property] = source[property]
  destination

k$.debounceQueue = new Object

module.exports = k$
