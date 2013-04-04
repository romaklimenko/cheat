define(
  [
    'main',
    '../node_modules/chai/chai.js',
    'view-model'
  ],
  (Main, Chai, ViewModel) ->
    assert = Chai.assert
    expect = Chai.expect

    describe 'ViewModel', ->

      describe '#constructor', ->

        # todo

      describe '#find(letters)', ->

        # todo

      describe '#filter(words, letters)', ->

        it 'should filter array by required letters', ->

          words = ['abc', 'bcd', 'cde', 'def']
          letters = 'bc'
          result = ViewModel.filter(words, letters)

          assert.equal(result.length, 2, result)
          assert.include(result, 'abc')
          assert.include(result, 'bcd')
)