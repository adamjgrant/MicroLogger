debounce = (fn, id, delay, args, that) ->

  delay = delay || 1000
  that = that || this
  args = args || new Array

  k$.debounceQueue[id] = new Object() if typeof k$.debounceQueue[id] != "object"

  clearTimeout k$.debounceQueue[id].debounceTimer if typeof k$.debounceQueue[id].debounceTimer != "undefined"

  k$.debounceQueue[id] =
    fn: fn
    id: id
    delay: delay
    args: args
    debounceTimer: setTimeout ->
      k$.debounceQueue[id].fn.apply(that, k$.debounceQueue[id].args)
      k$.debounceQueue[id] = undefined
    , delay

k$.debounce = debounce

module.exports = debounce
