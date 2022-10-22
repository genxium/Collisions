const path = require('path');
const baseAbsPath = __dirname + '/';

const webModuleAbsPath = baseAbsPath + './node_modules';
const webpack = require(webModuleAbsPath + '/webpack');

const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


/*
* These entry names are used not only by the "output" directive, by also by the "SplitChunksPlugin" https://webpack.js.org/plugins/split-chunks-plugin/.
* 
* As a case study, the "shared codes/dependencies by `admin_console` & `player_console`" could be extracted and rebundled into "admin_console~player_console.bundle.js". Similarly, the "shared codes/dependencies by `admin_console` & `player_console` & `writer_console`" could be extracted and rebundled into "admin_console~player_console~writer_console.bundle.js". 
*
* Surely you want the rebundling nomenclature to be controlled and "SplitChunksPlugin" allows you to do so.   
*
* Moreover, using 
``` 
webpack.optimization.splitChunks.chunks: 'all' 
```
can drastically reduce the "total built size of all bundles", because it traverses all entries, i.e. "player_console" & "admin_console" & "writer_console" in this case, to extract and rebundle all duplicate codes/dependencies, REGARDLESS OF whether or not the shares are dynamic imports.
However, the 'all' strategy can easily go wrong, if your codes fail to execute under "webpack.optimization.splitChunks.chunks: 'all'" configuration, chances are that webpack itself has a bug, and you should disable the "SplitChunksPlugin" temporarily to better seek the root cause. 
*/

const commonConfig = require('./webpack_common.config.js');

const toExport = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new BundleAnalyzerPlugin({
      generateStatsFile: true,
      statsFilename: 'webpack_bundle.production.stats', // Will be located in the "<proj-root>/frontend/bin/" dir.
    })
  ],
  optimization: {
    /*
    splitChunks: {
      chunks: 'async'
    },
    */
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false, // Must be set to true if using source-maps in production
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        }
      }),
    ],
  }
};

Object.assign(toExport, commonConfig);

module.exports = toExport;
