nav = (el) ->

  # Accept both strings and elements.
  $navbar = if typeof el == 'string' then k$.$(el) else el

  try
    # Wire up menu items
    $menuItems = $navbar.querySelectorAll('ul > li')

    # Prune items that don't contain uls
    _$menuItems = new Array()
    for $menuItem in $menuItems
      if $menuItem.querySelectorAll('ul').length and !$menuItem.querySelectorAll('[role="button"]').length
        _$menuItems.push $menuItem

    $menuItems = _$menuItems
    for $menuItem in $menuItems

      # Mark as a menu item
      $menuItem.classList.add 'menu-item'

  catch e
    console.error "Could not instantiate as a nav.", e.message

  $button = $navbar.querySelector('.navbar-title button')
  if $button 
    $button.addEventListener 'click', ->
      $nav = $navbar.querySelector('nav')
      if $nav.classList.contains 'expand'
        $nav.classList.remove 'expand'
      else
        $nav.classList.add 'expand'

k$.nav = nav

module.exports = nav
