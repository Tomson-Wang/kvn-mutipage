var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entries chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name){
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})
var htmlPlugins = []
var pages = utils.getPageEntries(config.build.viewPath + '/**/*.html' , config.build.viewPath + '/')

for (var key in pages) {
  htmlPlugins.push(new HtmlWebpackPlugin({
    filename:key + '.html' ,
    template:pages[key] ,
    inject:true ,
    chunks:['manifest' , 'vendor' , key] ,
    apiHost:config.dev.apiHost,
    minify:{
      removeComments:true ,
      collapseWhitespace:true ,
      removeAttributeQuotes:true
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    } ,
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode:'dependency'
  }))
}


module.exports = merge(baseWebpackConfig , {
  module:{
    rules:utils.styleLoaders({sourceMap:config.dev.cssSourceMap})
  } ,
  // cheap-module-eval-source-map is faster for development
  devtool:'#cheap-module-eval-source-map' ,
  plugins:[
    new webpack.DefinePlugin({
      'process.env':config.dev.env
    }) ,
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin() ,
    new webpack.NoEmitOnErrorsPlugin() ,
    // https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'index.html',
    //   inject: true
    // }),
    new FriendlyErrorsPlugin()
  ].concat(htmlPlugins)

})
