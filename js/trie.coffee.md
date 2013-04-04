### Trie

The `Trie` class represents a trie (prefix tree) structure. Every `Trie` object could be a `Trie` and a `Trie` node at the same time.

    class LetterpressCheat.Trie

If `Trie` has a `parent` then it' a node in parent's `Trie`.

      parent: undefined

If `parent` is `undefined` then this `Trie` is a root.

      isRoot: ->
        return @parent?

# [] children
# [] append
# [] is last letter
# [] is visited
# [] value