/*
 * Copyright (c) 2018 Wind4 <puxiaping@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Context, Middleware } from './typings';

function compose(stack: Middleware[]) {
  if (!Array.isArray(stack)) {
    throw new TypeError('Middlewares must be an array!');
  }
  if (stack.some(fn => typeof fn !== 'function')) {
    throw new TypeError('Middleware must be a functions!');
  }

  return function applyMiddleware(context: Context, done: Middleware) {
    let index = -1;

    function dispatch(i: number) : Promise<any> {
      if (i <= index) {
        return Promise.reject(new Error('next() called multiple times'));
      }
      index = i;

      let fn = stack[i];
      if (i === stack.length) fn = done;
      if (!fn) return Promise.resolve();

      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return dispatch(0);
  };
}

export default compose;
