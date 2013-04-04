define(
  [
    'main',
    '../node_modules/chai/chai.js',
    'model'
  ],
  (Main, Chai, Model) ->
    assert = Chai.assert
    expect = Chai.expect

    describe "Model", ->

      describe '@find(letters)', ->

        it 'find all words by abcdefghijklmnopqrstuvwxyz', ->

          letters = 'abcdefghijklmnopqrstuvwxyz'

          words = Model.find(letters)

          assert.equal(words.length, 50902)

      describe '@word(word, letters)', ->

        it "should return true if it's possible to compose a word from given letters", ->

          letters = 'aesttz'
          word = 'test'

          word = Model.word(word, letters)

          assert.isTrue(word)

        it "should return false if it isn't possible to compose a word from given letters", ->

          letters = 'aestz'
          word = 'test'

          word = Model.word(word, letters)

          assert.isFalse(word)

      describe "@words()", ->

        it "should return an array of words", ->
          assert.isArray(Model.words())

        it "should return a lot of words", ->
          assert.isTrue(Model.words().length >= 274892)
)