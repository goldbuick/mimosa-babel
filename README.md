mimosa-babel
===========

This is a [babel](https://babeljs.org/) compiler module for the Mimosa build tool. It will compile your ES6 JavaScript to ES5 JavaScript.

For more information regarding Mimosa, see http://mimosa.io

## Usage

Add `'babel'` to your list of modules.  That's all!  Mimosa will install the module for you when you start `mimosa watch` or `mimosa build`.

## Functionality

This module will process your `.js` files and compile them using [babel](https://babeljs.org/).  This module will not compile vendor JavaScript files.

## Default Config

```javascript
babel: {
  extensions: ['js', 'es6'],
  exclude: [],
  options: {
    blacklist: [],
    whitelist: [],
    modules: 'common',
    sourceMap: true,
    moduleRoot: undefined,
    moduleIds: false,
    runtime: false,
    experimental: false,
    format: {
      comments: true,
      compact: false,
      indent: {
        parentheses: true,
        adjustMultilineComment: true,
        style: "  ",
        base: 0
      }
    }
  }
}
```

#### `lib` node module
You may want to use this module but may not want to use the version of babel that comes bundled. Using the `lib` property you can provide a specific version of babel if the one being used by this module isn't to your liking. To provide a specific version, you must have it npm installed into your project and then provide it to `lib`. For instance: `lib: require('babel')`.

#### `extensions` array of strings
The extension(s) of your ES6 JavaScript files.

#### `options` object
This is a pass through to the babel options object. For more details on how to configure babel, [check out the documentation](https://babeljs.org/docs/usage/options/).
