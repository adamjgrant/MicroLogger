KS        = require '../../lib-core/coffee/app'
window['testRunner'] = require '../js/testRunner'
vendor    = require './vendor/index'

document.addEventListener 'DOMContentLoaded', ->
  someVar = 0
  someVar2 = undefined

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
    testRunner.specs.waitTwiceForButton.return()
  )

  k$.$('button#setone').addEventListener('click', -> 
    someVar = 1
    testRunner.getOne.return(someVar)
  )

  k$.$('button#settwo').addEventListener('click', -> 
    someVar = 2
    testRunner.getOne.return(someVar)
  )

  k$.$('button#getone').addEventListener('click', -> 
    testRunner.getOne = new testRunner.Expect("variable is set to 1", (variable) ->
      return variable == 1
    )
  )

  k$.$('button#final').addEventListener('click', ->
    testRunner.specs.getOneQuickly = new testRunner.Spec([
      new testRunner.Expect("variable is set to 1", (variable) ->
        return variable == 1
      ),
      new testRunner.Assert("variable is set in less than 3 seconds", 3000)
    ])
  )

  k$.$('button#setonetwo').addEventListener('click', ->
    someVar2 = 1
    testRunner.specs.getOneQuickly.return(someVar2, null)
  )

  k$.$('button#settwotwo').addEventListener('click', ->
    someVar2 = 2
    testRunner.specs.getOneQuickly.return(someVar2, null)
  )
