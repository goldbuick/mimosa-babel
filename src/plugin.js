let path = require('path');
let logger = null;
let compiler = null;

let typeIsArray = Array.isArray || (value) => ({}.toString.call(value) === '[object Array]');

function _compile(config, file, cb) {
  if (compiler === null)
    compiler = require('6to5');

  let exclude = config.exclude
  if (!typeIsArray(exclude))
    exclude = [exclude];
  //console.log options

  if (isExcluded(exclude, file.inputFileName)) {
    logger.debug(`skipping 6to5 transpiling for [[ ${file.inputFileName} ]], file is excluded`);
    return cb();
  }

  if (file.isVendor) {
    logger.debug(`skipping 6to5 transpiling for [[ ${file.inputFileName} ]], is vendor file`);
    //console.log "skipping es6Modules transpiling for [[ #{file.inputFileName} ]], file is vendor"
    return cb();
  }

  if (file.inputFileText) {
    try {
      let fOpts = extend(config.options, {
        filename: file.inputFileName,
        ast: false
      });

      let result = compiler.transform(file.inputFileText, fOpts);

      // if source map is inline, need to leave sourceMap null to avoid
      // appending extra source map comment in mimosa core
      // will be managed/detected with future mimosa core release
      let sourceMap = null;
      if (result.map !== null
        && result.map !== undefined
        && config.options.sourceMap === true) {
        let map = result.map
        // fix paths if Windows style paths
        map.file = map.file.replace(/\\/g, "/");
        map.sources = map.sources.map((p) =>
          p.replace(/\\/g, "/"));
        sourceMap = JSON.stringify(result.map);
      }

      cb(null, result.code, config, sourceMap);
    } catch (err) {
      logger.error(`Error running es6 module transpiler on file [[ ${file.inputFileName} ]]`, err);
      cb(err);
    }
  } else {
    cb();
  }
}


function isExcluded(filters, name) {
  return filters.some((filter) => {
    if (filter instanceof RegExp)
      return filter.test(name);
    return name.indexOf(filter) === 0;
  });
}

function extend(object, ...args) {
  for (let i = 0, l = args.length; i < l; i++) {
    let arg = args[i];
    for (let key in arg) {
      if (arg.hasOwnProperty(key)) {
        object[key] = arg[key];
      }
    }
  }

  return object;
}

export function extensions(conf) {
  return conf.to5.extensions;
}

export function compile(conf, file, cb) {
  logger = conf.log;
  return _compile(conf.to5, file, cb);
}
