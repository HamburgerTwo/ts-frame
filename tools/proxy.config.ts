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
    context: '/scrm',
    target: 'http://wx-test1.by-health.com',
   
    changeOrigin: true,
  },
] as ProxyConfig[];
