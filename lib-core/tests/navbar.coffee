assert = require("chai").assert
expect = require("chai").expect

describe 'k$.nav()', ->
  k$.nav('#test-nav')

  it 'should add an "expand" class when the responsive button is clicked', ->
    assert(!k$.$('#test-nav nav').classList.contains('expand'), 'Does not contain expand class')
    k$.testClick k$.$('#test-nav .navbar-title button')
    assert(k$.$('#test-nav nav').classList.contains('expand'), 'Does contain expand class')

  it 'should open submenus on click', ->
    assert(!k$.$('#test-nav #test-nav-subparent').classList.contains('open'), 'Does not contain open class')
    k$.testClick k$.$ '#test-nav #test-nav-submenu-link'
    assert(k$.$('#test-nav #test-nav-subparent').classList.contains('open'), 'Does contain open class')

  it 'should close when clicking outside', ->
    assert(k$.$('#test-nav #test-nav-subparent').classList.contains('open'), 'Does contain open class')
    k$.testClick document.body
    assert(!k$.$('#test-nav #test-nav-subparent').classList.contains('open'), 'Does not contain open class')
    assert(!k$.$('#test-nav #test-nav-subparent-2').classList.contains('open'), 'Does not contain open class')

  it 'should close when clicking on same trigger', ->
    assert(!k$.$('#test-nav #test-nav-subparent').classList.contains('open'), 'Does not contain open class')
    k$.testClick k$.$ '#test-nav #test-nav-submenu-link'
    assert(k$.$('#test-nav #test-nav-subparent').classList.contains('open'), 'Does contain open class')
    k$.testClick k$.$ '#test-nav #test-nav-submenu-link'
    assert(!k$.$('#test-nav #test-nav-subparent').classList.contains('open'), 'Does not contain open class')

  it 'should not leave other submenus open on click', ->
    assert(!k$.$('#test-nav #test-nav-subparent').classList.contains('open'), 'Does not contain open class')
    k$.testClick k$.$ '#test-nav #test-nav-submenu-link'
    assert(k$.$('#test-nav #test-nav-subparent').classList.contains('open'), 'Does contain open class')
    assert(!k$.$('#test-nav #test-nav-subparent-2').classList.contains('open'), 'Does not contain open class')
    k$.testClick k$.$ '#test-nav #test-nav-submenu-link-2'
    assert(k$.$('#test-nav #test-nav-subparent-2').classList.contains('open'), 'Does contain open class')
    assert(!k$.$('#test-nav #test-nav-subparent').classList.contains('open'), 'Does not contain open class')
