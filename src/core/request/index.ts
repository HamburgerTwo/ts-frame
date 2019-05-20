import Request from './request';
import * as middlewares from './middlewares';

const inst = new Request(
  {
    baseUrl: process.env.REACT_APP_SCRM_ROOT,
    type: 'json',
  },
  [middlewares.timeout, middlewares.http, middlewares.json, middlewares.baseUrl, middlewares.authToken, middlewares.params, middlewares.type],
);

export default inst;
export { Request };
