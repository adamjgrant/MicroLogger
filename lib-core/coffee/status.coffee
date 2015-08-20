status = (opts) ->

  defaults =
    type: 'status-yellow'
    delay: 2000

  status = k$.extend defaults, opts

  if not k$.$$('#status_bar').length
    $statusBar = document.createElement('div')
    $statusBar.id = 'status_bar'
    $statusBar.className = 'status_bar'
    $statusBar.innerHTML = "<div class='status_bar-status' id='status_bar-status'></div>"
    document.body.appendChild($statusBar)

  $statusBar = k$.$('#status_bar')

  hideStatusBar = ->
    $statusBar.classList.add 'hide'
    setTimeout ->
      $statusBar.classList.remove 'hide'
      $statusBar.parentNode.removeChild $statusBar
    , 250

  if status.delay > 0
    k$.debounce hideStatusBar, 'hideStatusBar', status.delay

  $status = k$.$("#status_bar-status")
  $status.innerHTML = status.text
  $status.dataset.type = status.type

k$.status = status

module.exports = status
