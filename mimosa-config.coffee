exports.config =
  modules: ['jshint', '6to5']
  watch:
    sourceDir: 'src'
    compiledDir: 'lib'
    javascriptDir: null
  jshint:
    rules:
      node: true
  to5:
    options:
      sourceMap: null
