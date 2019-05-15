import './index.css'
import './core/polyfills';
import Reactdom from 'react-dom';
import './core/setRem';
import React from 'react';
import history from './core/history';
import { parse } from 'query-string'
import { ACCOUNT_TYPE } from './constants'
import configureStore from './store/configureStore';
import * as Actions from './actions/user'
import { User, UserAction } from './types/user'
import { GOTOURL_ACTION } from './constants/index'
const store = configureStore(history);
const queryObj = parse(window.location.search)
store.dispatch<any>(Actions.loginByWechatUserAction({
  openid: queryObj.openid,
  accountType: ACCOUNT_TYPE
})).then((res: User) => (res.memberId ? store.dispatch<any>(Actions.findEmployeeByIdAction({
  memberId: res.memberId || 0
})) : {})).then(() => {
  const root = document.getElementById('app');
  Reactdom.render(<App store={store} />, root)
}).catch((err: any) => {
  console.log(err)
  if (location.hash === '#/rank') {
    store.dispatch({
      type: GOTOURL_ACTION,
      payload: {
        url: '/rank'
      }
    })
  }
  history.replace('/')
})
import App from './components/App'

if (__DEV__) {
  console.info('development');
}

if (process.env.NODE_ENV === 'production') {
  console.info("process.env.NODE_ENV === 'production'");
}


