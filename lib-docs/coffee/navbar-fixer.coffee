window.onscroll = ->
  # This actually works great for one-offs, but not what we
  # need for the docs page
  # #######################################################
  #
  # $fixedAreas = k$.$$('.fixed-area')
  # for $fixedArea in $fixedAreas
  #   do ($fixedArea) ->
  #     $isFixed = $fixedArea.classList.contains 'fixed'
  #     if $fixedArea.getBoundingClientRect().top < 1
  #       $fixedArea.classList.add 'fixed' if not $isFixed
  #     else
  #       $fixedArea.classList.remove 'fixed' if $isFixed
  $fixedArea = k$.$('.docs-nav')
  $isFixed = document.body.classList.contains 'fixed-nav'
  if k$.$('.main-navigation').getBoundingClientRect().top  < (-1 * k$.$('.docs-nav').clientHeight)
    document.body.classList.add 'fixed-nav' if not $isFixed
    k$.$('main.main').style.paddingTop = "#{k$.$('.docs-nav').clientHeight}px"
    k$.$('.fixed-toc').style.top = "#{k$.$('.docs-nav').clientHeight}px"
  else
    document.body.classList.remove 'fixed-nav' if $isFixed
    k$.$('main.main').style.paddingTop = 0
    k$.$('.fixed-toc').style.top = 0
