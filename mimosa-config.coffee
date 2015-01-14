exports.config =
  modules: ['jshint', '6to5']
  coffeescript:
    options:
      sourceMap: false
  watch:
    sourceDir: 'src'
    compiledDir: 'lib'
    javascriptDir: null
  jshint:
    rules:
      node: true