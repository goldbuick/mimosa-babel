let path = require('path');
let deepmerge = require('deepmerge');
let logger = null;

function _compile(config, file, cb) {
  //console.log options

  if (isExcluded(config.exclude, file.inputFileName)) {
    logger.debug(`skipping babel transpiling for [[ ${file.inputFileName} ]], file is excluded`);
    return cb();
  }

  if (file.isVendor) {
    logger.debug(`skipping babel transpiling for [[ ${file.inputFileName} ]], is vendor file`);
    //console.log "skipping babel transpiling for [[ #{file.inputFileName} ]], is vendor file"
    return cb();
  }

  if (file.inputFileText) {
    try {
      let localConfig = config;
      if (localConfig.overrides) {
        for (let pattern in config.overrides) {
          if (config.overrides.hasOwnProperty(pattern)) {
            let match = new RegExp(pattern);
            //console.log(`matching ${pattern} with ${file.inputFileName}: ${match.test(file.inputFileName)}`);
            if (match.test(file.inputFileName)) {
              //console.log(`matching ${pattern}, appending config`);
              localConfig = extend(localConfig, config.overrides[pattern]);
            }
          }
        }
      }

      let fOpts = extend(localConfig.options, {
        filename: file.inputFileName,
        ast: false
      });

      let result = localConfig.lib.transform(file.inputFileText, fOpts);

      // if source map is inline, need to leave sourceMap null to avoid
      // appending extra source map comment in mimosa core
      // will be managed/detected with future mimosa core release
      let sourceMap = null;
      if (result.map !== null
        && result.map !== undefined
        && localConfig.options.sourceMap === true) {
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
    object = deepmerge(object, args[i]);
  }

  return object;
}

export function extensions(conf) {
  return conf.babel.extensions;
}

export function compile(conf, file, cb) {
  logger = conf.log;
  return _compile(conf.babel, file, cb);
}
