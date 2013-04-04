define(['underscore', 'knockout'], (_, ko) ->

    class ViewModel

      worker = undefined

      constructor: ->

        self = this

        @worker = new Worker('./js/worker.js')

        @worker.onmessage = (event) ->
          self.total(event.data.total)
          self.found(event.data.words.length)
          self.words(event.data.words)

        @loading = ko.computed(
          -> return self.total is ''
        )

        @wordsString = ko.computed(
          ->
            return ViewModel.filter(
              self.words(),
              self.requiredLetters()
            ).join(', ')
          self
        )

      total: ko.observable('')
      requiredLetters: ko.observable('')
      found: ko.observable(0)
      words: ko.observableArray([])

      @filter: (words, letters) ->
        return words if letters is ''

        return _.filter(
          words,
          (word) ->
            uniq = _.uniq(letters)
            intersection = _.intersection(word, uniq)
            return intersection.length == uniq.length)

      find: (letters) ->
        @worker.postMessage(letters)

    return ViewModel)