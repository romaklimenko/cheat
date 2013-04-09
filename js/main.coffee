$ ->
  $.ajax({
    url: './en.txt',
    success: (result) ->
      words = result.match(/[^\r\n]+/g)
      trie = new Cheat.Trie
      for word in words
        trie.append(word)
      console.log trie
      window.trie = trie
      $('#letters-input').removeAttr('disabled')
      $('#letters-button').removeAttr('disabled')
    async: false})

  class WordsViewModel
    words: ko.observableArray([])

  window.wordsViewModel = new WordsViewModel

  ko.applyBindings(window.wordsViewModel)

  $('#letters-button').click(
    ->
      window.wordsViewModel.words.removeAll()
      words = window.trie.words(window.trie.group($('#letters-input').val()))
      window.wordsViewModel.words(_.shuffle(words).slice(0,999))
  )