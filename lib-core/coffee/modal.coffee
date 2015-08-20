modal = (el) ->

  `var iOS = /(iPad|iPhone|iPod)/g.test( navigator.userAgent )`
  
  # Cursor pointer hack if iOS
  document.body.classList.add 'dismiss-modal' if iOS

  do (el) ->

    $hideModal = ->
      k$.$(el).style.display = 'none'

    # Allow modal to dismiss when clicked outside
    document.body.addEventListener 'click', ->
      $hideModal()

    k$.$(el).addEventListener 'click', (e) ->
      return e.stopPropagation()

    $closer = k$.$(el).querySelector('a[data-modal-close]')
    if $closer
      $closer.addEventListener 'click', ->
        $hideModal()

  k$.$ el

k$.modal = modal

module.exports = modal
