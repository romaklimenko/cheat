### Trie test

    describe 'Trie', ->

      describe '#constructor(value, parent)', ->

        it 'should set value and parent', ->

          value = 'c'
          parent = new LetterpressCheat.Trie('p')
          trie = new LetterpressCheat.Trie(value, parent)
          chai.assert.equal(trie.value, value)
          chai.assert.equal(trie.parent, parent)

      describe '#children', ->

        it 'should be empty array when trie is just created', ->

          trie = new LetterpressCheat.Trie
          chai.assert.deepEqual(trie.children, [])

      describe '#parent', ->

        it 'should be undefined when trie is just created', ->

          trie = new LetterpressCheat.Trie
          chai.assert.isUndefined(trie.parent)

      describe '#isRoot()', ->

        it 'should be false if parent does not exists', ->

          trie = new LetterpressCheat.Trie
          chai.assert.isFalse(trie.isRoot())

        it 'should be true if parent exists', ->

          trie = new LetterpressCheat.Trie('', new Object)
          chai.assert.isTrue(trie.isRoot())

      describe '#append(word)', ->

        it 'should create a child trie with a first letter of word', ->

          word = 'unpredictabilities'
          trie = new LetterpressCheat.Trie(word.charAt(0))
          trie.append(word.slice(1))
          chai.assert.equal(trie.children.length, 1)

        it 'should append to existing child if child with same value already exists', ->

          first_word = 'unpredictabilities'
          second_word = 'underfulfilling'

          root = new LetterpressCheat.Trie
          root.append(first_word)
          root.append(second_word)

          console.log root

          chai.assert.equal(root.children.length, 1)
          chai.assert.equal(root.children[0].value, 'u')

          u0 = root.children[0]

          chai.assert.equal(u0.children.length, 1)
          chai.assert.equal(u0.children[0].value, 'n')

          n1 = u0.children[0]

          chai.assert.equal(n1.children.length, 2)
          chai.assert.equal(n1.children[0].value, 'p')
          chai.assert.equal(n1.children[1].value, 'd')