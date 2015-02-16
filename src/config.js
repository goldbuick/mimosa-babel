export var defaults = () => { return {
  babel: {
  	// File extensions
  	extensions: ['js', 'es6'],

  	// Exclude files regex
    exclude: [],

    // Compiler options
    options: {
      // List of transformers to EXCLUDE.
      // Run `babel --help` to see a full list of transformers.
      blacklist: [],

      // List of transformers to ONLY use.
      // Run `babel --help` to see a full list of transformers.
      whitelist: [],

      // Module formatter to use
      // Run `babel --help` to see a full list of module formatters.
      // Default: 'common'
      modules: 'common',

      // If truthy, adds a `map` property to returned output.
      // If set to 'inline', a comment with a sourceMappingURL directive is added to
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
          // Default: '  '
          style: '  ',

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

  if (validators.ifExistsIsObject(errors, 'babel config', config.babel)) {

    if ( validators.isArrayOfStringsMustExist( errors, 'babel.extensions', config.babel.extensions ) ) {
      if (config.babel.extensions.length === 0) {
        errors.push('babel.extensions cannot be an empty array');
      }
    }

    validators.ifExistsIsObject(errors, 'babel.options', config.babel.options);
    validators.ifExistsIsArray(errors, 'babel.exclude', config.babel.exclude);
  }

  // if user has not provided their own version, use local babel
  if ( !errors.length && !config.babel.lib ) {
    config.babel.lib = require('babel');
  }

  return errors;
}