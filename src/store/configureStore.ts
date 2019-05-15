import { createStore, applyMiddleware } from 'redux';
import reducers, {initialStore} from '../reducers';
import { User } from '../types/user';
import { Comm } from '../types/comm';
import thunkMiddleware from 'redux-thunk';
import { History } from 'history'
import {routerMiddleware} from 'react-router-redux';
export default function (history: History) {
  const middleware = applyMiddleware(
    thunkMiddleware,
    routerMiddleware(history));
  const store = createStore<{
    user:User,
    comm: Comm
   }>(reducers, initialStore, middleware);
  return store;
}
