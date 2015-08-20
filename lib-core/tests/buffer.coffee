assert = require("chai").assert
expect = require("chai").expect

describe "Buffer", (done) ->
  it "Should not prematurely fire functions other than the first", ->

    window.xArray = new Array()

    k$.buffer ->
      xArray.push(1)

    k$.buffer ->
      xArray.push(2)

    k$.buffer ->
      xArray.push(3)

    expect(xArray[0]).to.equal(1)
    expect(xArray[1]).to.be.undefined
    expect(xArray[2]).to.be.undefined

  it "Should execute all functions 2s between each other (1/2)", (done) ->
    this.timeout 520

    setTimeout ->
      if xArray[0] == 1 && xArray[1] == 2 && xArray[2] == undefined
        done()
      else
        console.error "xArray was #{xArray}"
    , 510

  it "Should execute all functions 2s between each other (2/2)", (done) ->
    this.timeout 520

    setTimeout ->
      if xArray[0] == 1 && xArray[1] == 2 && xArray[2] == 3
        done()
      else
        console.error "xArray was #{xArray}"
    , 510
