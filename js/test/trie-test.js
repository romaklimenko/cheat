//@ sourceMappingURL=trie-test.map
// Generated by CoffeeScript 1.6.1
(function() {

  describe('Trie', function() {
    describe('#constructor(value, parent)', function() {
      return it('should set value and parent', function() {
        var parent, trie, value;
        value = 'c';
        parent = new LetterpressCheat.Trie('p');
        trie = new LetterpressCheat.Trie(value, parent);
        chai.assert.equal(trie.value, value);
        return chai.assert.equal(trie.parent, parent);
      });
    });
    describe('#children', function() {
      return it('should be empty array when trie is just created', function() {
        var trie;
        trie = new LetterpressCheat.Trie;
        return chai.assert.deepEqual(trie.children, []);
      });
    });
    describe('#parent', function() {
      return it('should be undefined when trie is just created', function() {
        var trie;
        trie = new LetterpressCheat.Trie;
        return chai.assert.isUndefined(trie.parent);
      });
    });
    describe('#append(word)', function() {
      it('should create a child trie with a first letter of word', function() {
        var trie, word;
        word = 'unpredictabilities';
        trie = new LetterpressCheat.Trie(word.charAt(0));
        trie.append(word.slice(1));
        return chai.assert.equal(trie.children.length, 1);
      });
      it('should append to existing child if child with same value already exists', function() {
        var first_word, n1, root, second_word, u0;
        first_word = 'unpredictabilities';
        second_word = 'underfulfilling';
        root = new LetterpressCheat.Trie;
        root.append(first_word);
        root.append(second_word);
        chai.assert.equal(root.children.length, 1);
        chai.assert.equal(root.children[0].value, 'u');
        u0 = root.children[0];
        chai.assert.equal(u0.children.length, 1);
        chai.assert.equal(u0.children[0].value, 'n');
        n1 = u0.children[0];
        chai.assert.equal(n1.children.length, 2);
        chai.assert.equal(n1.children[0].value, 'p');
        return chai.assert.equal(n1.children[1].value, 'd');
      });
      it("should set `last` if it's a last letter in the word", function() {
        var first_word, root;
        first_word = 'abc';
        root = new LetterpressCheat.Trie;
        root.append(first_word);
        chai.assert.equal(root.children[0].value, 'a');
        chai.assert.isUndefined(root.children[0].last);
        chai.assert.equal(root.children[0].children[0].value, 'b');
        chai.assert.isUndefined(root.children[0].children[0].last);
        chai.assert.equal(root.children[0].children[0].children[0].value, 'c');
        return chai.assert.isDefined(root.children[0].children[0].children[0].last);
      });
      return it("should set `last` if it's a last letter in the word and several words in the trie", function() {
        var first_word, root, second_word;
        first_word = 'abc';
        second_word = 'abcde';
        root = new LetterpressCheat.Trie;
        root.append(first_word);
        root.append(second_word);
        chai.assert.equal(root.children[0].value, 'a');
        chai.assert.isUndefined(root.children[0].last);
        chai.assert.equal(root.children[0].children[0].value, 'b');
        chai.assert.isUndefined(root.children[0].children[0].last);
        chai.assert.equal(root.children[0].children[0].children[0].value, 'c');
        chai.assert.isDefined(root.children[0].children[0].children[0].last);
        chai.assert.equal(root.children[0].children[0].children[0].children[0].value, 'd');
        chai.assert.isUndefined(root.children[0].children[0].children[0].children[0].last);
        chai.assert.equal(root.children[0].children[0].children[0].children[0].children[0].value, 'e');
        return chai.assert.isDefined(root.children[0].children[0].children[0].children[0].children[0].last);
      });
    });
    describe('#fetch(node)', function() {
      return it('should fetch all words from given node', function() {
        var node, trie, words;
        trie = new LetterpressCheat.Trie;
        trie.append('detest');
        trie.append('test');
        trie.append('testable');
        trie.append('testables');
        trie.append('testers');
        node = trie.children[1].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0];
        words = trie.fetch(node);
        chai.assert.equal(words.length, 3);
        chai.assert.include(words, 'test');
        chai.assert.include(words, 'testable');
        return chai.assert.include(words, 'testables');
      });
    });
    describe('#group(letters)', function() {
      return it('should group letters and aggregate count', function() {
        var groups, letters, trie;
        trie = new LetterpressCheat.Trie;
        letters = ['t', 'e', 's', 't', 'a', 'b', 'l', 'e'];
        groups = trie.group(letters);
        return chai.assert.deepEqual(groups, {
          a: 1,
          b: 1,
          e: 2,
          l: 1,
          s: 1,
          t: 2
        });
      });
    });
    return describe('#words(groups)', function() {
      return it('should return all the words', function() {
        var groups, letters, trie, words;
        trie = new LetterpressCheat.Trie;
        trie.append('detest');
        trie.append('test');
        trie.append('testable');
        trie.append('testables');
        trie.append('testers');
        letters = ['t', 'e', 's', 't', 'a', 'b', 'l', 'e'];
        groups = trie.group(letters);
        words = trie.words(groups);
        chai.assert.equal(words.length, 2);
        chai.assert.include(words, 'test');
        return chai.assert.include(words, 'testable');
      });
    });
  });

}).call(this);
