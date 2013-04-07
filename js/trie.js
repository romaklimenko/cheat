//@ sourceMappingURL=trie.map
// Generated by CoffeeScript 1.6.1
(function() {

  LetterpressCheat.Trie = (function() {

    function Trie(value, parent) {
      this.parent = parent;
      this.value = value;
      this.children = [];
    }

    Trie.prototype.append = function(word) {
      var childTrie, tail;
      if (word.length === 0) {
        return;
      }
      childTrie = _.find(this.children, function(child) {
        return child.value === word.charAt(0);
      });
      if (childTrie === void 0) {
        childTrie = new LetterpressCheat.Trie(word.charAt(0), this);
        this.children.push(childTrie);
      }
      tail = word.slice(1);
      if (tail.length === 0) {
        return childTrie.last = true;
      } else {
        return childTrie.append(tail);
      }
    };

    Trie.prototype.fetch = function(node) {
      var lastNode, lastNodes, parent, result, word, _i, _len, _node;
      result = [];
      lastNodes = [];
      _node = node;
      while (_node.parent) {
        if (_node.last) {
          lastNodes.push(_node);
        }
        _node = _node.parent;
      }
      for (_i = 0, _len = lastNodes.length; _i < _len; _i++) {
        lastNode = lastNodes[_i];
        parent = lastNode.parent;
        word = lastNode.value;
        while (parent && parent.value) {
          word = parent.value + word;
          parent = parent.parent;
        }
        result.push(word);
      }
      return result;
    };

    Trie.prototype.group = function(letters) {
      letters = _.sortBy(letters, function(letter) {
        return letter;
      });
      return _.countBy(letters, function(letter) {
        return letter;
      });
    };

    Trie.prototype.words = function(groups) {
      var child, clone, result, _i, _len, _ref;
      result = [];
      _ref = _.filter(this.children, function(child) {
        return !child.stop;
      });
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        if (groups[child.value] > 0) {
          clone = _.clone(groups);
          clone[child.value]--;
          _.union(result, child.words(clone));
        } else {

        }
      }
      return result;
    };

    return Trie;

  })();

}).call(this);
