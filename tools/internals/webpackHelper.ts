/**
 * Copyright (c) 2018 Wind4 <puxiaping@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import webpack from 'webpack';

/**
 * Merge webpack entries
 * @param webpackConfig
 * @param entries
 */
export function mergeEntries(webpackConfig: webpack.Configuration, entries: string[]) {
  if (webpackConfig.entry === undefined) {
    webpackConfig.entry = './src';
  }

  if (Array.isArray(webpackConfig.entry) || typeof webpackConfig.entry === 'string') {
    webpackConfig.entry = entries.concat(webpackConfig.entry);
  } else {
    Object.keys(webpackConfig.entry).forEach(entry => {
      (webpackConfig.entry as webpack.Entry)[entry] = entries.concat(
        (webpackConfig.entry as webpack.Entry)[entry],
      );
    });
  }
}

/**
 * Merge webpack plugins
 * @param webpackConfig
 * @param plugins
 */
export function mergePlugins(webpackConfig: webpack.Configuration, plugins: webpack.Plugin[]) {
  webpackConfig.plugins = webpackConfig.plugins || [];
  plugins.forEach(plugin => {
    (webpackConfig.plugins as webpack.Plugin[]).push(plugin);
  });

  return webpackConfig;
}

/**
 * Inject HMR configuration
 * @param webpackConfig
 */
export function injectHMR(webpackConfig: webpack.Configuration) {
  mergeEntries(webpackConfig, ['webpack-hot-middleware/client?reload=true']);
  mergePlugins(webpackConfig, [new webpack.HotModuleReplacementPlugin()]);

  return webpackConfig;
}
