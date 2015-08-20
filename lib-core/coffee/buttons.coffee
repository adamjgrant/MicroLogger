button = ->

  ($button.classList.add 'menu-item' if $button.querySelectorAll('ul').length) for $button in k$.$$("button")
  $buttonDropdown.parentNode.classList.add 'menu-item' for $buttonDropdown in k$.$$ '.button-dropdown'

k$.button = button

module.exports = button
