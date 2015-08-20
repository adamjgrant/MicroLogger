buffer = (fn, delay) ->

  # Create a new bufferArray if one does not exist already.
  k$.bufferArray = k$.bufferArray || new Array()
  if not k$.bufferArray.length
    k$.bufferArray = new Array()

    delay = delay || 500

    # Create an interval to fire the fns in bufferArray
    i = 1

    k$.bufferInterval = setInterval ->
      k$.bufferArray[i]() if k$.bufferArray[i]
      i++
      if i >= k$.bufferArray.length
        clearInterval k$.bufferInterval
        k$.bufferArray = undefined
        i = 1
    , delay

  # Add this function to the array.
  k$.bufferArray.push fn

  # Fire right away if it's the first in line.
  k$.bufferArray[0]() if k$.bufferArray.length == 1

  console.info "Function queued (#{k$.bufferArray.length} in queue)"

k$.buffer = buffer

module.exports = buffer
