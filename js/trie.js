//@ sourceMappingURL=trie.map
// Generated by CoffeeScript 1.6.1
(function() {

  LetterpressCheat.Trie = (function() {

    function Trie(value, parent) {
      this.parent = parent;
      this.value = value;
      this.children = [];
    }

    Trie.prototype.isRoot = function() {
      return this.parent != null;
    };

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

    return Trie;

  })();

}).call(this);
