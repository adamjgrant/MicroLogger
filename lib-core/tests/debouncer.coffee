assert = require("chai").assert
expect = require("chai").expect

describe 'Debouncer', ->
  it 'should fire after a default interval of 1 second.', (done) ->
    window.one = 0
    this.timeout 2000
    setOne = ->
      window.one = 1

    k$.debounce setOne, 'change zero to one'
    setTimeout ->
      if one == 1
        done()
      else
        console.error "Found #{one}"
    , 1200

  it 'should suspend firing if called again during that second', (done) ->
    window.one = 0
    this.timeout 2500

    setOne = ->
      window.one = 1

    setTimeout ->
      k$.debounce setOne, 'change zero to one'
    , 500

    setTimeout ->
      k$.debounce setOne, 'change zero to one'
    , 1000

    setTimeout ->
      k$.debounce setOne, 'change zero to one'
    , 1500

    setTimeout ->
      k$.debounce setOne, 'change zero to one'
    , 2000

    setTimeout ->
      if one == 0
        done()
      else
        console.error "Found #{one}"
    , 2100

  it 'should suspend firing if called again during a custom interval', (done) ->
    this.timeout 4000
    setTimeout ->
      if one == 1
        done()
      else
        console.error "Found #{one}"
    , 2100


  it 'should not clear a neighbor\'s timer', (done) ->
    this.timeout 3500
    a = ''
    fn1 = ->
      a = 'foo'

    fn2 = ->
      a = 'bar'

    k$.debounce fn1, 'f'
      
    setTimeout ->
      k$.debounce fn2, 'b'
    , 500

    setTimeout ->
      if a == 'bar' or a == 'foo'
        console.error "One function fired too early"
    , 700

    setTimeout ->
      if a == 'bar'
        done()
    , 1700
