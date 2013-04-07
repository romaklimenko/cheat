### Trie

The `Trie` class represents a trie (prefix tree) structure. Every `Trie` object could be a `Trie` and a `Trie` node at the same time.

`value` is a node prefix and `children` are child nodes.

    class LetterpressCheat.Trie

      constructor: (value, parent) ->
        @parent = parent
        @value = value
        @children = []

When we `append` a word to a `Trie`, we are responsible for correct `value` of this `Trie`. If we `append` it to root, `value` should be `undefined` but if we `append` to child nodes, `value` we should set the `value`.

      append: (word) ->
        return if word.length == 0

        childTrie = _.find(
          @children,
          (child) -> child.value is word.charAt(0))

        if childTrie is undefined
          childTrie = new LetterpressCheat.Trie(word.charAt(0), this)
          @children.push(childTrie)

        tail = word.slice(1)

        if tail.length is 0
          childTrie.last = true
        else
          childTrie.append(tail)

Fetch all words from given node.

      fetch: (node) ->

        result = []

        lastNodes = []

        _node = node

        while _node.parent
          lastNodes.push(_node) if _node.last
          _node = _node.parent

        for lastNode in lastNodes

          parent = lastNode.parent
          word = lastNode.value

          while parent and parent.value
            word = parent.value + word
            parent = parent.parent

          result.push(word)

        return result


Groups letters, aggregates letters count.

      group: (letters) ->

        letters = _.sortBy(letters, (letter) -> letter)
        return _.countBy(letters, (letter) -> letter)

`words` functions takes an array of `letters` and returns matched words

      words: (groups) ->

        result = []

        for child in _.filter(@children, (child) -> not child.stop)
          if groups[child.value] > 0
            clone = _.clone(groups)
            clone[child.value]--

Fixme. This code smells bad.

            result = result.concat(child.words(clone))
            result = result.concat(@fetch(child))

        return _.uniq(result)