import React, { Component } from 'react';
import s from './App.scss';
import {HashRouter, Route, Link} from 'react-router-dom';
import Home from '../routes/home';
import history from '../core/history';

import { Provider } from 'react-redux';
import configureStore from '../store/configureStore'
const store = configureStore(history);
export default class App extends Component {
  render() {
    return (<Provider store={store}><HashRouter>
            <Route path="/" component={Home} />
      </HashRouter></Provider>)
  }
}
