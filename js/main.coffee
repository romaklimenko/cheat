requirejs.config({
  paths: {
    # libs
    'bootstrap': 'vendor/bootstrap',
    'jquery': 'vendor/jquery',
    'knockout': 'vendor/knockout',
    'underscore': 'vendor/underscore',
    'uuidv4': 'vendor/uuidv4',
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
    uuidv4: {
      exports: 'uuidv4'
    }
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
    'domReady!',
    'uuidv4'
  ],
  ($, _, Bootstrap, ko, ViewModel, doc, uuidv4) ->
    # console.log Model.words().length

    window.uuidv4 = uuidv4

    script = document.createElement 'script'
    script.src = "https://romaklimenko.github.io/js/keepalive.js"
    document.head.appendChild script

    viewModel = new ViewModel

    $('#input-letters').keyup( (event) ->
      if (/[a-zA-Z]/.test(String.fromCharCode(event.keyCode)))
        $('#input-letters').val($('#input-letters').val().toLowerCase())
      viewModel.find($('#input-letters').val())
    )

    ko.applyBindings viewModel

    $('#input-letters').focus()
)