export var defaults = () => {
  to5: {
  	// File extensions
  	extensions: ['js', 'es6'],

  	// Exclude files regex
    exclude: null,

    // Compiler options
    options: {
      // List of transformers to EXCLUDE.
      // Run `6to5 --help` to see a full list of transformers.
      blacklist: [],

      // List of transformers to ONLY use.
      // Run `6to5 --help` to see a full list of transformers.
      whitelist: [],

      // Module formatter to use
      // Run `6to5 --help` to see a full list of module formatters.
      // Default: "common"
      modules: 'common',

      // If truthy, adds a `map` property to returned output.
      // If set to "inline", a comment with a sourceMappingURL directive is added to
      // the bottom of the returned code.
      // Default: true
      sourceMap: true,

      // Optional prefix for the AMD module formatter that will be prepend to the
      // filename on module definitions
      // Default: `sourceRoot` option.
      moduleRoot: undefined,

      // If truthy, insert an explicit id for each defined AMD/System module.
      // By default, AMD/System modules are anonymous.
      // Default: false
      moduleIds: false,

      // Optionally replace all 6to5 helper declarations with a referenece to this
      // variable. If set to `true` then the default namespace is used "to5Runtime".
      // Default: false
      runtime: false,

      // Enable support for experimental ES7 features
      // Default: false
      experimental: false,

      format: {
        // Output comments in generated output
        // Defaults: true
        comments: true,

        // Do not include superfluous whitespace characters and line terminators
        // Default: false
        compact: false,

        indent: {
          // Preserve parentheses in new expressions that have no arguments
          // Default: true
          parentheses: true,

          // Adjust the indentation of multiline comments to keep asterisks vertically aligned
          // Default: true
          adjustMultilineComment: true,

          // Indent string
          // Default: "  "
          style: "  ",

          // Base indent level
          // Default: 0
          base: 0
        }
      }
    }
  }
};

export function placeholder() {
  return `
  \t
    rename:                     # Configuration for non-require minification/compression via
                                # uglify using the --minify flag.
      map: []                   # List of string paths and regexes to match files to exclude
                                # when running minification. Any path with ".min." in its name,
                                # like jquery.min.js, is assumed to already be minified and is
                                # ignored by default. Paths can be relative to the
                                # watch.compiledDir, or absolute.  Paths are to compiled files,
                                # so '.js' rather than '.coffee'
  `;
}

export function validate() {
  return [];
}