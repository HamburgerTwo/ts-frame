import './index.css';
import './core/polyfills';
import Reactdom from 'react-dom';
import './core/setRem';
import React from 'react';
import history from './core/history';
import { parse } from 'query-string';
import configureStore from './store/configureStore';
import { User } from './types/user';
import App from './components/App';

const store = configureStore(history);
const queryObj = parse(window.location.search);

const root = document.getElementById('app');
Reactdom.render(<App store={store} />, root);

if (__DEV__) {
  console.info('development');
}

if (process.env.NODE_ENV === 'production') {
  console.info("process.env.NODE_ENV === 'production'");
}
