mimosa-6to5
===========

## Overview

This is a [6to5](https://6to5.org/) compiler module for the Mimosa build tool. It will compile your ES6 JavaScript to ES5 JavaScript.

For more information regarding Mimosa, see http://mimosa.io

## Usage

Add `'6to5'` to your list of modules.  That's all!  Mimosa will install the module for you when you start `mimosa watch` or `mimosa build`.

## Functionality

This module will process your `.js` files and compile them using [6to5](https://6to5.org/).  This module will not compile vendor JavaScript files.

## Default Config

```javascript
to5: {
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

#### `lib` 6to5 node module
You may want to use this module but may not want to use the version of 6to5 that comes bundled. Using the `lib` property you can provide a specific version of 6to5 if the one being used by this module isn't to your liking. To provide a specific version, you must have it npm installed into your project and then provide it to `lib`. For instance: `lib: require('6to5')`.

#### `extensions`: array of strings
The extension(s) of your ES6 JavaScript files.

#### `options` object
This is a pass through to the 6to5 options object. For more details on how to configure 6to5, [check out the documentation](https://6to5.org/docs/usage/options/).
