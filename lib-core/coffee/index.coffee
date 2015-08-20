$button = k$.$('#preview-button')
typeOut = (str, container, cb, startWith) ->
  i = 0
  _str = ""

  @interval = setInterval ->
    i++
    _str = str.substr(0, i) 
    container.innerHTML = startWith + _str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\|/g, '<br>').replace(/\+/g, '<span class="color">').replace(/\*/g, '</span>').replace(/%/g, '&nbsp;')
    if i > str.length - 1
      clearInterval @interval 
      cb()
  , 75

slide3 = ->
  $button.classList.add('button')
  $button.classList.add('button-primary')
  slide3TO = setTimeout ->
    $button.classList.remove('button')
    $button.classList.remove('button-primary')
    clearTimeout slide3TO
    slide1() 
  , 1200

slide2 = ->
  $button.classList.add('button')
  $button.classList.add('button-primary')
  slide2TO = setTimeout ->
    $button.classList.remove('button')
    $button.classList.remove('button-primary')
    typeOut '<button class="+cta*">Call to Action</button>||.+cta* {|%%@include button($primary-color);|}', k$.$('#source'), slide3, "&lt;!-- OR define your own --&gt;<br><br>"
    clearTimeout slide2TO
  , 1200


slide1 = ->
  typeOut '<button class="+button button-primary*">Call to Action</button>', k$.$('#source'), slide2, "&lt;!-- Use predefined classes --&gt;<br><br>"

slide1()
