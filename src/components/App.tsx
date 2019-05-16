import React, { Component } from 'react';
import s from './App.scss';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { User } from '../types/user';
import { Comm } from '../types/comm';
import bundler from '../core/hoc'
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
            <Route path="/rank" component={bundler(() => import('../routes/rank'))} />
            <Route path="/role" component={bundler(() => import('../routes/role'))} />
            <Route path="/store" component={bundler(() => import('../routes/store'))} />
            <Route path="/" component={bundler(() => import('../routes/home'))} />

          </Switch>
        </Router>
      </Provider>
    );
  }
}
