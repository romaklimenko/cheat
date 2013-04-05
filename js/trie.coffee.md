### Trie

The `Trie` class represents a trie (prefix tree) structure. Every `Trie` object could be a `Trie` and a `Trie` node at the same time.

    class LetterpressCheat.Trie

      constructor: (value, parent) ->
        @parent = parent
        @value = value
        @children = []

If `parent` is `undefined` then this `Trie` is a root.

      isRoot: ->
        return @parent?

`isLastLetter` shows if current node is last letter of word. If it's true we can get this word by concatenating values from root to current node.

      append: (word) ->
        return if word.length == 0
        childTrie = new LetterpressCheat.Trie(word.charAt(0), this)
        @children.push(childTrie)
        childTrie.append(word.slice(1))