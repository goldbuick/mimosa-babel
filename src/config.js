export var defaults = () => { return {
  babel: {
  	// File extensions
  	extensions: ['js', 'es6'],

  	// Exclude files regex
    exclude: [],

    // Compiler options
    options: {
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