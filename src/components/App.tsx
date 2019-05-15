import React, { Component } from 'react';
import s from './App.scss';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from '../routes/home';
import Rank from '../routes/rank';
import Role from '../routes/role';
import { User } from '../types/user';
import { Comm } from '../types/comm';
import StoreComponent from '../routes/store';

import history from '../core/history';
import { Store } from 'redux'

interface ComponentProps  {
  store: Store<{
    user: User;
    comm: Comm;
}>
}
export default class App extends Component<ComponentProps> {
  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={history}>
          <Switch>
            <Route path="/rank" component={Rank} />
            <Route path="/role" component={Role} />
            <Route path="/store" component={StoreComponent} />
            <Route path="/" component={Home} />

          </Switch>
        </Router>
      </Provider>
    );
  }
}
