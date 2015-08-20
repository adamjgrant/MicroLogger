assert = require("chai").assert
expect = require("chai").expect

describe 'k$.modal()', ->
  it 'should return a DOM object', ->
    assert.typeOf k$.modal('#test-modal'), 'object', 'Modal returns a DOM object'

  showModal = ->
    $modal = k$.modal '#test-modal'
    $modal.style.display = 'block'
    $modal

  showSecondModal = ->
    $modal = k$.modal '#test-modal-2'
    $modal.style.display = 'block'
    $modal

  it 'should close when clicking on body', ->
    $modal = showModal()
    k$.testClick document.body
    expect($modal.style.display).to.equal('none')

  # Seems a little silly, but since we're using raw event listeners,
  # selectors have a way of overriding their predecessors.
  it 'should close all modals on body click', ->
    $modal = showModal()
    $modal2 = showSecondModal()
    k$.testClick document.body
    expect($modal.style.display).to.equal('none')
    expect($modal2.style.display).to.equal('none')

  it 'should close modal on "x" click', ->
    $modal = showModal()
    expect($modal.style.display).to.equal('block') 
    k$.testClick k$.$ '#test-modal-close'
    expect($modal.style.display).to.equal('none') 
