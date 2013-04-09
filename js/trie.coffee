class Cheat.Trie

  constructor: (value, parent) ->
    @parent = parent
    @value = value
    @children = []

  # When we `append` a word to a `Trie`, we are responsible for correct `value`
  # of this `Trie`. If we `append` it to root, `value` should be `undefined`
  # but if we `append` to child nodes, `value` we should set the `value`.
  append: (word) ->
    return if word.length == 0

    childTrie = _.find(
      @children,
      (child) -> child.value is word.charAt(0))

    if childTrie is undefined
      childTrie = new Cheat.Trie(word.charAt(0), this)
      @children.push(childTrie)

    tail = word.slice(1)

    if tail.length is 0
      childTrie.last = true
    else
      childTrie.append(tail)

  # Fetch all words from given node.
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


  # Groups letters, aggregates letters count.
  group: (letters) ->

    letters = letters.sort()
    return _.countBy(letters, (letter) -> letter)

  # words function takes grouped letters and returns matched words
  words: (groups) ->
    result = []

    for child in @children
      if groups[child.value] > 0
        clone = _.clone(groups)
        clone[child.value]--
        result = result.concat(child.words(clone))
      else if groups[child.value] is 0
        result = result.concat(@fetch(this))
    # fixme: smells bad
    return _.uniq(result)