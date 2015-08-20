assert = require("chai").assert
expect = require("chai").expect

describe "Growl", ->
  it "should create a growl on execution", ->
    assert(k$.$$('.growl').length == 0, "No growls on page before fn call")
    k$.growl({title: "Hey"})
    expect(k$.$$('.growl').length).to.equal(1)

  it "should close growl after 2s (by default)", (done) ->
    this.timeout 2700
    setTimeout ->
      if k$.$$('.growl').length == 0
        done()
      else
        console.error "A growl was found."
    , 2600
