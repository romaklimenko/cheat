importScripts('require.js')

require({
    baseUrl: './'
  },
  ['require', 'model'],
  (require, Model) ->
    result = {
      total: Model.words().length
      words: []
    }

    postMessage(result)

    @onmessage = (oEvent) ->
      letters = oEvent.data

      result = {
        total: Model.words().length
        words: Model.find(letters)
      }

      postMessage(result)
)