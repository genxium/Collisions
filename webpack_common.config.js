const path = require('path');
const baseAbsPath = __dirname + '/';

let entryObj = {
  Collisions: baseAbsPath + './src/Collisions.mjs'
};
let outputPath = baseAbsPath + './dist/collisions';

const webModuleAbsPath = baseAbsPath + '../node_modules';

const commonConfig = {
  resolve: {
    modules: [
      webModuleAbsPath
    ]
  },
  resolveLoader: {
    modules: [
      webModuleAbsPath // This helps to resolve loader names, e.g. 'babel-loader'
    ]
  },
  entry: entryObj,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
      },
      {
        test: /\.(css)$/,
        exclude: /\.useable\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  output: {
    path: outputPath,
    filename: '[name].js',
    sourceMapFilename: '[file].map'
  }
};

module.exports = commonConfig;
