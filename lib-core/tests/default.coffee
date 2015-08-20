assert = require("chai").assert
expect = require("chai").expect

k$.testClick = (el) ->
  event = document.createEvent 'MouseEvents'
  event.initMouseEvent 'click', true, true, window, 1, 0, 0
  el.dispatchEvent event

describe 'Kickstart main function', ->
  it 'should exist as an object', ->
    assert.typeOf k$, 'object', 'k$ is an object'
  it 'should contain basic selectors', ->
    assert.typeOf k$.$, 'function', 'k$.$ is a function'
  it 'should contain basic selectors', ->
    assert.typeOf k$.$$, 'function', 'k$.$$ is a function'
