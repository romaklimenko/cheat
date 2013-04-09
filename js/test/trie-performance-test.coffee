suite 'Performance', ->

  $.ajax({
    url: './en.txt',
    success: (result) ->
      window.words = result.match(/[^\r\n]+/g)
    async: false})

  suite 'Trie', ->

    window.trie = new Cheat.Trie
    for word in words
      trie.append word

    test 'build trie', ->

      trie = new Cheat.Trie
      for word in words
        trie.append word

    test "find all words in trie by ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']", ->

      letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
      words = trie.words(trie.group(letters))
      console.log words.length

    test "find all words in trie by ['a','s','d','w','t','r','i','b','n','o','w','p','l','f','g','l','e','w','h','q','a','g','n','b','e']", ->

      letters = ['a','s','d','w','t','r','i','b','n','o','w','p','l','f','g','l','e','w','h','q','a','g','n','b','e']
      words = trie.words(trie.group(letters))
      console.log words.length

  suite 'Array', ->

    test "find all words in array by ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']", ->

      letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

      result = []
      for word in words
        result.push(word.split('').sort())
      console.log result
