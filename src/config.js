export var defaults = () => { return {
  babel: {
  	// File extensions
  	extensions: ['js', 'es6'],

  	// Exclude files regex
    exclude: [],

    // Compiler options
    options: {
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
      moduleIds: false
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
    config.babel.lib = require('babel-core');
  }

  return errors;
}