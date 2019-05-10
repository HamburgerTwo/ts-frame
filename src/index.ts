import './index.css'
import './core/polyfills';
import Reactdom from 'react-dom';
import './core/setRem';
import React from 'react';
import App from './components/App'

if (__DEV__) {
  console.info('development');
}

if (process.env.NODE_ENV === 'production') {
  console.info("process.env.NODE_ENV === 'production'");
}

const root = document.getElementById('app');

Reactdom.render(React.createElement(App),root)
