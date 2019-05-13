/**
 * Copyright (c) 2018 Wind4 <puxiaping@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from 'http-proxy-middleware';

interface ProxyConfig extends Config {
  context: string | string[];
}

// Configure proxy middleware
// https://github.com/chimurai/http-proxy-middleware
export default [
  // Example:
  {
    context: '/yygj',
    target: 'http://192.168.103.53:10555',
    changeOrigin: true,
  },
  {
    context: '/scrm',
    target: 'http://yyj-test.by-health.com',
    changeOrigin: true,
  },
] as ProxyConfig[];
