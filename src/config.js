export var defaults = () => { return {
  to5: {
  	// File extensions
  	extensions: ['js', 'es6'],

  	// Exclude files regex
    exclude: [],

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
}};

export function validate(config, validators) {
  let errors = [];

  if (validators.ifExistsIsObject(errors, "to5 config", config.to5)) {

    if ( validators.isArrayOfStringsMustExist( errors, "to5.extensions", config.to5.extensions ) ) {
      if (config.to5.extensions.length === 0) {
        errors.push( "to5.extensions cannot be an empty array");
      }
    }

    validators.ifExistsIsObject(errors, "to5.options", config.to5.options);
    validators.ifExistsIsArray(errors, "to5.exclude", config.to5.exclude);
  }

  // if user has not provided their own version, use local 6to5
  if ( !errors.length && !config.to5.lib ) {
    config.to5.lib = require( "6to5" );
  }

  return errors;
}