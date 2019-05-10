import React, { Component } from 'react';
import s from './App.scss';
import { Router, Route, Switch } from 'react-router-dom';
import Home from '../routes/home';
import Rank from '../routes/rank';
import Role from '../routes/role';
import Store from '../routes/store';
import history from '../core/history';

import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
const store = configureStore(history);
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path="/rank" component={Rank} />
            <Route path="/role" component={Role} />
            <Route path="/store" component={Store} />
            <Route path="/" component={Home} />

          </Switch>
        </Router>
      </Provider>
    );
  }
}
