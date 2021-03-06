/**
 * Copyright (c) 2018 Wind4 <puxiaping@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
declare interface Module {
  default: Task;
}
declare type Task = (options?: any) => Promise<any> | undefined;

function format(time: Date) {
  return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}

function run(fn: Module | Task, options?: any) {
  const task = typeof fn === 'function' ? fn : fn.default;
  const start = new Date();
  console.info(
    `[${format(start)}] Starting '${task.name}${
      options ? ` (${JSON.stringify(options)})` : ''
    }'...`,
  );
  return Promise.resolve()
    .then(() => task(options))
    .then(resolution => {
      const end = new Date();
      const time = end.getTime() - start.getTime();
      console.info(
        `[${format(end)}] Finished '${task.name}${
          options ? ` (${JSON.stringify(options)})` : ''
        }' after ${time} ms`,
      );
      return resolution;
    });
}

export default run;
