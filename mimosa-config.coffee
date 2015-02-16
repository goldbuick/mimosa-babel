exports.config =
  modules: ['jshint', 'babel']
  watch:
    sourceDir: 'src'
    compiledDir: 'lib'
    javascriptDir: null
  jshint:
    rules:
      node: true
  babel:
    options:
      sourceMap: false
