import { combineReducers } from 'redux'; // 连接reducers
import user from './user';
import { User } from '../types/user'

const rootReducer= combineReducers<{
  user: User
}>({
    user,
});

export default rootReducer;


export const initialStore = {
  user :{
    roles: [],
    memberName: 'test'
  }
}
