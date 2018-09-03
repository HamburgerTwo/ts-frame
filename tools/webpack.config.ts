/**
 * Copyright (c) 2018 Wind4 <puxiaping@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import InterpolateHtmlPlugin from 'interpolate-html-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import { getClientEnvironment } from './internals/env';
import * as paths from './paths.config';

const pkg = require('../package.json');
const isDebug = process.env.NODE_ENV !== 'production';
const isVerbose = process.argv.includes('--verbose');
const clientEnv = getClientEnvironment();

const webpackConfig: webpack.Configuration = {
  mode: isDebug ? 'development' : 'production',

  context: paths.SRC_DIR,

  entry: '.',

  output: {
    path: paths.BUILD_DIR,
    filename: isDebug ? '[name].js' : '[name].[hash:8].js',
    chunkFilename: isDebug ? 'thunk/[name].js' : 'thunk/[name].[hash:8].js',
    publicPath: isDebug ? '/' : process.env.PUBLIC_PATH,
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js'],
  },

  module: {
    strictExportPresence: true,

    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        options: {
          compilerOptions: {
            module: 'es2015',
          },
        },
      },

      {
        test: /\.(css|less|sass|scss)$/,
        rules: [
          {
            loader: isDebug ? 'style-loader' : MiniCssExtractPlugin.loader,
          },

          // Process external/third-party styles
          {
            exclude: paths.SRC_DIR,
            loader: 'css-loader',
            options: {
              sourceMap: isDebug,
            },
          },

          // Process internal/project styles (from src folder)
          {
            include: paths.SRC_DIR,
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: isDebug,
              // CSS Modules https://github.com/css-modules/css-modules
              modules: true,
              localIdentName: isDebug ? '[name]-[local]-[hash:base64:5]' : '[hash:base64:5]',
            },
          },

          // Apply PostCSS plugins including autoprefixer
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                // Add vendor prefixes to CSS rules using values from caniuse.com
                // https://github.com/postcss/autoprefixer
                require('autoprefixer')({
                  // flexbox: 'no-2009', // Recommended for modern browsers
                  browsers: pkg.browserslist,
                }),
              ],
            },
          },

          // Compile Less to CSS
          // https://github.com/webpack-contrib/less-loader
          // Install dependencies before uncommenting: yarn add --dev less-loader less
          // {
          //   test: /\.less$/,
          //   loader: 'less-loader',
          //   options: {
          //     sourceMap: isDebug,
          //   },
          // },

          // Compile Sass to CSS
          // https://github.com/webpack-contrib/sass-loader
          // Install dependencies before uncommenting: yarn add --dev sass-loader node-sass
          // {
          //   test: /\.(scss|sass)$/,
          //   loader: 'sass-loader',
          //   options: {
          //     sourceMap: isDebug,
          //   },
          // },
        ],
      },
    ],
  },

  plugins: [
    // Define free variables
    // https://webpack.js.org/plugins/define-plugin/
    new webpack.DefinePlugin(
      Object.assign({}, clientEnv.stringified, {
        __DEV__: isDebug,
      }),
    ),

    // Extracts CSS into separate files
    // https://webpack.js.org/plugins/mini-css-extract-plugin/
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[id].[contenthash:8].css',
    }),

    // Simplifies creation of HTML files to serve your webpack bundles
    // https://github.com/jantimon/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: './index.ejs',
      hash: isDebug,
      minify: {
        collapseWhitespace: !isDebug,
      },
    }),

    // Interpolate custom variables into html template
    // https://github.com/egoist/interpolate-html-plugin
    new InterpolateHtmlPlugin(
      Object.assign({}, clientEnv.raw, {
        __DEV__: isDebug,
      }),
    ),
  ],

  optimization: {
    minimizer: [
      // Minimize all JavaScript output of chunks
      // https://github.com/mishoo/UglifyJS2#compressor-options
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          warnings: isVerbose,
          output: {
            comments: false,
          },
        },
      }),

      // Optimize and minimize CSS assets
      // https://github.com/NMFR/optimize-css-assets-webpack-plugin
      new OptimizeCSSAssetsPlugin(),
    ],
  },

  // Don't attempt to continue if there are any errors.
  bail: !isDebug,

  devtool: isDebug ? 'cheap-module-eval-source-map' : false,

  performance: { hints: isDebug ? false : 'warning' },

  // Specify what bundle information gets displayed
  // https://webpack.js.org/configuration/stats/
  stats: {
    cached: isVerbose,
    cachedAssets: isVerbose,
    children: isVerbose,
    chunks: isVerbose,
    chunkModules: isVerbose,
    colors: true,
    errorDetails: true,
    hash: isVerbose,
    modules: isVerbose,
    reasons: isDebug,
    timings: true,
    version: isVerbose,
  },
};

export default webpackConfig;
