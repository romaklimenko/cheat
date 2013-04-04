### Trie test

    describe 'Trie', ->

      describe '#children', ->

        it 'should be empty array when trie is just created', ->
          trie = new LetterpressCheat.Trie
          chai.assert.deepEqual(trie.children, [])

      describe '#parent', ->

        it 'should be undefined when trie is just created', ->
          trie = new LetterpressCheat.Trie
          chai.assert.isUndefined(trie.parent)

      describe '#isRoot', ->

        it 'should be false if parent does not exists', ->

          trie = new LetterpressCheat.Trie
          chai.assert.isFalse(trie.isRoot())

        it 'should be true if parent exists', ->

          trie = new LetterpressCheat.Trie
          trie.parent = new Object
          chai.assert.isTrue(trie.isRoot())