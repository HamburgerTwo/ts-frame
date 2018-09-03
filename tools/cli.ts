/**
 * Copyright (c) 2018 Wind4 <puxiaping@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { fork } from './internals/cp';
import run from './internals/run';

if (process.send) {
  const scriptName = process.argv[2];
  if (scriptName) {
    // Load environment variables
    require('./internals/env');

    const task = require(`./scripts/${scriptName}`);
    run(task).catch(err => {
      console.error(err.stack);
      process.exit(1);
    });
  }
} else {
  fork(__filename, process.argv.slice(2), {
    env: Object.assign(
      {
        // Search custom module definitions
        // https://github.com/TypeStrong/ts-node#help-my-types-are-missing
        TS_NODE_FILES: 'true',
      },
      process.env,
    ),
  });
}
