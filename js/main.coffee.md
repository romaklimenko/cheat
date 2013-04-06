## Main

      $ ->
        response =
          $.get(
            './en.txt',
            (data) ->
              words = data.match(/[^\r\n]+/g)
              trie = new LetterpressCheat.Trie
              trie.append(word) for word in words
              console.log trie)