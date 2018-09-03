/**
 * Copyright (c) 2018 Wind4 <puxiaping@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import cp from 'child_process';

const signal = {
  RESTART: '@@SIG_RESTART',
};

export function fork(modulePath: string, args?: ReadonlyArray<string>, options?: cp.ForkOptions) {
  const child = cp.fork(modulePath, args, options);

  child.on('message', msg => {
    if (msg === signal.RESTART) {
      child.kill();
      setImmediate(fork, modulePath, args, options);
    }
  });

  return child;
}

export function restart() {
  if (process.send) {
    process.send(signal.RESTART);
  }
}
