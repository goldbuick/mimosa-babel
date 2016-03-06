export var defaults = () => { return {
  babel6: {
  	// File extensions
  	extensions: ['jsx'],

  	// Exclude files regex
    exclude: [],

    // Compiler options
    options: {
      "plugins": [ "transform-es2015-modules-amd" ],
      "presets": [ "react", "es2015" ]
    }
  }
}};

export function validate(config, validators) {
  let errors = [];

  if (validators.ifExistsIsObject(errors, 'babel config', config.babel6)) {

    if ( validators.isArrayOfStringsMustExist( errors, 'babel.extensions', config.babel6.extensions ) ) {
      if (config.babel6.extensions.length === 0) {
        errors.push('babel.extensions cannot be an empty array');
      }
    }

    validators.ifExistsIsObject(errors, 'babel.options', config.babel6.options);
    validators.ifExistsIsArray(errors, 'babel.exclude', config.babel6.exclude);
  }

  // if user has not provided their own version, use local babel
  if ( !errors.length && !config.babel6.lib ) {
    config.babel6.lib = require('babel-core');
  }

  return errors;
}