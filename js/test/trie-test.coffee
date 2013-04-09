describe 'Trie', ->

  describe '#constructor(value, parent)', ->

    it 'should set value and parent', ->

      value = 'c'
      parent = new Cheat.Trie('p')
      trie = new Cheat.Trie(value, parent)
      chai.assert.equal(trie.value, value)
      chai.assert.equal(trie.parent, parent)

  describe '#children', ->

    it 'should be empty array when trie is just created', ->

      trie = new Cheat.Trie
      chai.assert.deepEqual(trie.children, [])

  describe '#parent', ->

    it 'should be undefined when trie is just created', ->

      trie = new Cheat.Trie
      chai.assert.isUndefined(trie.parent)

  describe '#append(word)', ->

    it 'should create a child trie with a first letter of word', ->

      word = 'unpredictabilities'
      trie = new Cheat.Trie(word.charAt(0))
      trie.append(word.slice(1))
      chai.assert.equal(trie.children.length, 1)

    it 'should append to existing child if child with same value already exists', ->

      first_word = 'unpredictabilities'
      second_word = 'underfulfilling'

      root = new Cheat.Trie
      root.append(first_word)
      root.append(second_word)

      chai.assert.equal(root.children.length, 1)
      chai.assert.equal(root.children[0].value, 'u')

      u0 = root.children[0]

      chai.assert.equal(u0.children.length, 1)
      chai.assert.equal(u0.children[0].value, 'n')

      n1 = u0.children[0]

      chai.assert.equal(n1.children.length, 2)
      chai.assert.equal(n1.children[0].value, 'p')
      chai.assert.equal(n1.children[1].value, 'd')

    it "should set `last` if it's a last letter in the word", ->
      first_word = 'abc'

      root = new Cheat.Trie
      root.append(first_word)

      # _a_bc

      chai.assert.equal(root.children[0].value, 'a')
      chai.assert.isUndefined(root.children[0].last)

      # a_b_c

      chai.assert.equal(root.children[0].children[0].value, 'b')
      chai.assert.isUndefined(root.children[0].children[0].last)

      # ab_c_

      chai.assert.equal(
        root.children[0].children[0].children[0].value, 'c')
      chai.assert.isDefined(
        root.children[0].children[0].children[0].last)

    it "should set `last` if it's a last letter in the word and several words in the trie", ->
      first_word = 'abc'
      second_word = 'abcde'

      root = new Cheat.Trie
      root.append(first_word)
      root.append(second_word)

      # _a_bcde

      chai.assert.equal(root.children[0].value, 'a')
      chai.assert.isUndefined(root.children[0].last)

      # a_b_cde

      chai.assert.equal(root.children[0].children[0].value, 'b')
      chai.assert.isUndefined(root.children[0].children[0].last)

      # ab_c_de

      chai.assert.equal(
        root.children[0].children[0].children[0].value, 'c')
      chai.assert.isDefined(
        root.children[0].children[0].children[0].last)

      # abc_d_e

      chai.assert.equal(
        root
          .children[0]
          .children[0]
          .children[0]
          .children[0].value, 'd')
      chai.assert.isUndefined(
        root
          .children[0]
          .children[0]
          .children[0]
          .children[0].last)

      # abcd_e_

      chai.assert.equal(
        root
          .children[0]
          .children[0]
          .children[0]
          .children[0]
          .children[0].value, 'e')
      chai.assert.isDefined(
        root
          .children[0]
          .children[0]
          .children[0]
          .children[0]
          .children[0].last)

  describe '#fetch(node)', ->

    it 'should fetch all words from given node', ->

      trie = new Cheat.Trie
      trie.append('detest')
      trie.append('test')
      trie.append('testable')
      trie.append('testables')
      trie.append('testers')

      node = trie
        .children[1] # t
        .children[0] # e
        .children[0] # s
        .children[0] # t
        .children[0] # a
        .children[0] # b
        .children[0] # l
        .children[0] # e
        .children[0] # s

      words = trie.fetch(node)

      chai.assert.equal(words.length, 3)
      chai.assert.include(words, 'test')
      chai.assert.include(words, 'testable')
      chai.assert.include(words, 'testables')

  describe '#group(letters)', ->

    it 'should group letters and aggregate count', ->

      trie = new Cheat.Trie
      letters = ['t', 'e', 's', 't', 'a', 'b', 'l', 'e']
      groups = trie.group(letters)
      chai.assert.deepEqual(
        groups,
        {a: 1, b: 1, e: 2, l: 1, s: 1, t: 2 })

  describe '#words(groups)', ->

    it 'should return all the words', ->

      trie = new Cheat.Trie
      trie.append('detest')
      trie.append('test')
      trie.append('testable')
      trie.append('testables')
      trie.append('testers')

      letters = ['t', 'e', 's', 't', 'a', 'b', 'l', 'e']

      groups = trie.group(letters)

      words = trie.words(groups)

      chai.assert.equal(words.length, 2)
      chai.assert.include(words, 'test')
      chai.assert.include(words, 'testable')