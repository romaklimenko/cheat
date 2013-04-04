define(['vendor/text!../en.txt'], (en) ->

    class Model

      @find: (letters) ->
        result = []
        words = Model.words()
        for _word in words
          if Model.word(_word, letters)
            result.push _word
        return result

      @word: (word, letters) ->
        for letter in word
          return false if not -1 > letters.indexOf(letter)
          letters = letters.replace(letter, '')

        return true

      @words: ->
        return en.match(/[^\r\n]+/g)

    return Model)