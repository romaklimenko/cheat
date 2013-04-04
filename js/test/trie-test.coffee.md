### Trie test

    describe 'Trie', ->

      describe '#parent', ->

        it 'parent should be undefined when trie just created', ->
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