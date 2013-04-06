### Trie

The `Trie` class represents a trie (prefix tree) structure. Every `Trie` object could be a `Trie` and a `Trie` node at the same time.

`value` is a node prefix and `children` are child nodes.

    class LetterpressCheat.Trie

      constructor: (value, parent) ->
        @parent = parent
        @value = value
        @children = []

If `Trie` has a `parent`, it's not a root and vice versa.

      isRoot: ->
        return @parent?

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

`words` functions takes an array of `letters` and returns matched words

      words: (letters) ->

        result = []

        return result if not letters or letters.length is 0
