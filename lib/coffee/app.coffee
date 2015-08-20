KS        = require '../../lib-core/coffee/app'
window['testRunner'] = require '../js/testRunner'
vendor    = require './vendor/index'

document.addEventListener 'DOMContentLoaded', ->
  k$.$('button#first').addEventListener('click', ->
    testRunner.waitForButton = new testRunner.Assert("button was pressed in less than 3 seconds", 3000)
  )

  k$.$('button#second').addEventListener('click', ->
    testRunner.waitForButton.return()
  )

  k$.$('button#third').addEventListener('click', ->
    testRunner.specs.waitTwiceForButton = new testRunner.Spec([
      testRunner.waitForButton = new testRunner.Assert("button was pressed in less than 3 seconds", 3000),
      testRunner.waitForButton = new testRunner.Assert("button was pressed in less than 5 seconds", 5000)
    ])
  )

  k$.$('button#fourth').addEventListener('click', ->
    testRunner.specs.waitTwiceForButton.return([true, true])
  )
