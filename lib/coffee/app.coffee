KS        = require '../../lib-core/coffee/app'
window['$tr'] = require '../js/micrologger'
vendor    = require './vendor/index'

document.addEventListener 'DOMContentLoaded', ->
  someVar = 0
  someVar2 = undefined

  k$.$('button#first').addEventListener('click', ->
    $tr.waitForButton = new $tr.Assert("button was pressed in less than 3 seconds", 3000)
  )

  k$.$('button#second').addEventListener('click', ->
    $tr.waitForButton.return()
  )

  k$.$('button#third').addEventListener('click', ->
    $tr.specs.waitTwiceForButton = new $tr.Spec([
      $tr.waitForButton = new $tr.Assert("button was pressed in less than 3 seconds", 3000),
      $tr.waitForButton = new $tr.Assert("button was pressed in less than 5 seconds", 5000)
    ])
  )

  k$.$('button#fourth').addEventListener('click', ->
    $tr.specs.waitTwiceForButton.return()
  )

  k$.$('button#setone').addEventListener('click', -> 
    someVar = 1
    $tr.getOne.return(someVar)
  )

  k$.$('button#settwo').addEventListener('click', -> 
    someVar = 2
    $tr.getOne.return(someVar)
  )

  k$.$('button#getone').addEventListener('click', -> 
    $tr.getOne = new $tr.Expect("variable is set to 1", (variable) ->
      return variable == 1
    )
  )

  k$.$('button#final').addEventListener('click', ->
    $tr.specs.getOneQuickly = new $tr.Spec([
      new $tr.Expect("variable is set to 1", (variable) ->
        return variable == 1
      ),
      new $tr.Assert("variable is set in less than 3 seconds", 3000)
    ])
  )

  k$.$('button#setonetwo').addEventListener('click', ->
    someVar2 = 1
    $tr.specs.getOneQuickly.return(someVar2, null)
  )

  k$.$('button#settwotwo').addEventListener('click', ->
    someVar2 = 2
    $tr.specs.getOneQuickly.return(someVar2, null)
  )
