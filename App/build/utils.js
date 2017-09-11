var glob = require('glob')
var path = require('path')
var fs = require('fs')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

function resolvePath(dir){
  return fs.realpathSync(__dirname + '/' + path.join('..' , dir))
}

function getEntry(globPath , pathDir){
  console.log(globPath)
  var files = glob.sync(globPath);
  var entries = {} ,
    entry , dirname , basename , pathname , extname;

  for (var i = 0 ; i < files.length ; i++) {
    entry = files[i];
    dirname = path.dirname(entry);
    extname = path.extname(entry);
    basename = path.basename(entry , extname);
    pathname = path.join(dirname , basename);
    pathname = pathDir ? pathname.replace(pathDir , '') : pathname;
    var reg = /^(.*)\/(.*)$/;
    pathname = pathname.replace(reg , '$1');
    console.log(1 , pathname , entry);
    entries[pathname] = entry;
  }
  console.log(entries)
  return entries;
}

exports.assetsPath = function (_path){
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory , _path)
}

exports.cssLoaders = function (options){
  options = options || {}

  var cssLoader = {
    loader:'css-loader' ,
    options:{
      minimize:process.env.NODE_ENV === 'production' ,
      sourceMap:options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader , loaderOptions){
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader:loader + '-loader' ,
        options:Object.assign({} , loaderOptions , {
          sourceMap:options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use:loaders ,
        fallback:'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css:generateLoaders() ,
    postcss:generateLoaders() ,
    less:generateLoaders('less') ,
    sass:generateLoaders('sass' , {indentedSyntax:true}) ,
    scss:generateLoaders('sass') ,
    stylus:generateLoaders('stylus') ,
    styl:generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options){
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test:new RegExp('\\.' + extension + '$') ,
      use:loader
    })
  }
  return output
}
exports.getEntries = function (globPath , pathDir){
  "use strict";
  var entryFiles = getEntry(globPath , pathDir)
  var map = {}
  for (var key in entryFiles) {
    map[key.replace('/' , '')] = entryFiles[key]
  }

  console.log(entryFiles)
  return entryFiles;
}
// exports.getPageEntries = function (globPath , pathDir){
//   "use strict";
//   var entryFiles = getEntry(globPath , pathDir)
//   var map = {}
//   for (var key in entryFiles) {
//   var newKey=
//     map[key.replace('/' , '')] = entryFiles[key]
//   }
//
//   console.log(entryFiles)
//   return entryFiles;
// }
exports.getPageEntries = getEntry
exports.resolve = resolvePath
