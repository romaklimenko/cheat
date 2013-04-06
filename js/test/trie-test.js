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
    describe('#isRoot()', function() {
      it('should be false if parent does not exists', function() {
        var trie;
        trie = new LetterpressCheat.Trie;
        return chai.assert.isFalse(trie.isRoot());
      });
      return it('should be true if parent exists', function() {
        var trie;
        trie = new LetterpressCheat.Trie('', new Object);
        return chai.assert.isTrue(trie.isRoot());
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
    return describe('#words(letters)', function() {
      it('should return empty array if letters is undefined', function() {
        var trie, words;
        trie = new LetterpressCheat.Trie;
        trie.append('abcde');
        words = trie.words();
        chai.assert.isArray(words);
        return chai.assert.equal(words.length, 0);
      });
      it('should return empty array if letters is empty', function() {
        var trie, words;
        trie = new LetterpressCheat.Trie;
        trie.append('abcde');
        words = trie.words([]);
        chai.assert.isArray(words);
        return chai.assert.equal(words.length, 0);
      });
      return it('should return all the words', function() {
        var letters, trie, words;
        trie = new LetterpressCheat.Trie;
        trie.append('test');
        trie.append('forest');
        trie.append('orest');
        letters = ['t', 'e', 's', 't', 'o'];
        words = trie.words(letters);
        chai.assert.include(words, 'test');
        chai.assert.include(words, 'orest');
        return chai.expect(words).to.not.include('forest');
      });
    });
  });

}).call(this);
