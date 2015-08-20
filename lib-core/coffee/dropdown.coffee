dropdown = () ->

  document.body.addEventListener 'click', (e) ->
    $menuItem = null

    closeAllMenus = ->
      _$menuItem.classList.remove 'open' for _$menuItem in k$.$$('.menu-item')

    # We'll need this later.
    openMenu = ->
      # User has clicked on a menu trigger.
      if $menuItem.classList.contains 'open' 
        $menuItem.classList.remove 'open' 
      else 
        closeAllMenus() 
        $menuItem.classList.add 'open'
      e.stopPropagation()

    # Let's check if a user has clicked on a menu trigger:
    if e.target.classList.contains 'menu-item'
      $menuItem = e.target 
      openMenu()
    else if e.target.parentNode.classList.contains 'menu-item'
      $menuItem = e.target.parentNode
      openMenu()
    else
      closeAllMenus()
      return



  # # The following should apply to several elements.
  #
  # $menuItems = k$.$$ '.menu-item'
  #
  # for $_menuItem in $menuItems
  #
  #   $menuItem = $_menuItem.cloneNode true
  #   $_menuItem.parentNode.replaceChild $menuItem, $_menuItem
  #
  #   do ($menuItem) ->

      # TODO make only one event listener for the parent.
      # $menuItem.addEventListener 'click', (e) ->

        # # Just close it if it's already open
        # if $menuItem.classList.contains 'open'
        #   $menuItem.classList.remove 'open'
        #   return
        #
        # # Reset all
        # _$menuItem.classList.remove 'open' for _$menuItem in document.querySelectorAll('.menu-item')
        # $openable = $menuItem.querySelector 'ul'
        #
        # # Open this one
        # if $openable
        #   $menuItem.classList.add 'open'
        #
        # # Prevent bubbling
        # e.stopPropagation()

  # # Dismiss all
  # document.body.addEventListener 'click', ->
  #   $ul.parentNode.classList.remove 'open' for $ul in k$.$$('.menu-item > ul')
  #   $li.classList.remove 'open' for $li in k$.$$('.menu-item.open')

k$.dropdown = dropdown

module.exports = dropdown
