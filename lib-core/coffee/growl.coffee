growl = (params) ->

  k$.buffer ->
    defaults =
      title: undefined
      text: undefined
      delay: 2000
      type: 'growl-warn'
      id: Date.now()

    params = k$.extend defaults, params

    # Create growl container
    if not k$.$$('.growl_container').length
      growlContainer = document.createElement 'div'
      growlContainer.className = 'growl_container'
      document.body.appendChild growlContainer

    # Create growl
    growl = document.createElement 'div'

    # Add appropriate classes
    className = "alert growl show #{params.type} growl-#{params.id}"
    growl.className = className

    # Add content
    content = ""
    content += "<h1>#{params.title}</h1>" if params.title
    content += "<p>#{params.text}</p>" if params.text
    growl.innerHTML = content

    # Append child to container
    k$.$('.growl_container').appendChild growl

    delay = params.delay
    id = params.id

    if delay > 0
      do (delay, id) ->
        setTimeout ->
          $growl = k$.$(".growl-#{id}")
          $growl.classList.remove('show')
          $newGrowl = $growl.cloneNode true
          $growl.parentNode.replaceChild $newGrowl, $growl
          $newGrowl.classList.add('hide')

          do (delay, id) ->
            setTimeout ->
              # Remove ghost growls
              k$.$('.growl_container').parentNode.removeChild k$.$('.growl_container') if not k$.$$('.growl.show').length
            , 500
        , delay

k$.growl = growl

module.exports = growl
