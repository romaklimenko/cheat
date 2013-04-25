requirejs.config({
  paths: {
    # libs
    'bootstrap': 'vendor/bootstrap',
    'jquery': 'vendor/jquery',
    'knockout': 'vendor/knockout',
    'underscore': 'vendor/underscore',
    # requirejs plugins
    'domReady': 'vendor/domReady',
    'text': 'vendor/text'
    # own modules
    'Model': 'model',
    'ViewModel': 'view-model'
  },
  shim: {
    bootstrap: {
      deps: ['jquery']
    },
    underscore: {
      exports: '_'
    }
  },
  waitSeconds: 600
})

require(
  [
    'jquery',
    'underscore',
    'bootstrap',
    'knockout',
    'view-model',
    'domReady!'
  ],
  ($, _, Bootstrap, ko, ViewModel, doc) ->
    #console.log Model.words().length

    viewModel = new ViewModel

    $('#input-letters').keyup( (event) ->
      if (/[a-zA-Z]/.test(String.fromCharCode(event.keyCode)))
        $('#input-letters').val($('#input-letters').val().toLowerCase())
      viewModel.find($('#input-letters').val())
    )

    ko.applyBindings viewModel

    $('#input-letters').focus()
)