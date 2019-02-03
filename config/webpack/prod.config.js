const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const DotenvPlugin = require('dotenv-webpack');

const BUILD_FOLDER = 'build';

module.exports = {
  mode: 'production',

  entry: {
    polyfill: 'babel-polyfill',
    bundle: './src/index.js',
  },

  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, '../../', BUILD_FOLDER),
    publicPath: '/identifo-admin/',
  },

  performance: {
    hints: false,
  },

  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
    },
  },

  resolve: {
    alias: {
      '~': path.resolve(__dirname, '../../src'),
    },
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        use: 'url-loader?limit=30000&name=[path][name].[ext]',
      },
    ],
  },

  plugins: [
    new HtmlPlugin({
      title: 'Identifo Admin',
      template: path.resolve(__dirname, '../../assets', 'index.template.html'),
    }),
    new CleanPlugin([BUILD_FOLDER], {
      root: path.resolve(__dirname, '../../'),
    }),
    new DotenvPlugin({
      systemvars: true,
    }),
  ],
};
