import { combineReducers } from 'redux'; // 连接reducers
import user from './user';
import comm from './comm';
import { User } from '../types/user'
import { Comm } from '../types/comm'

const rootReducer= combineReducers<{
  user: User,
  comm: Comm
}>({
    user,
    comm
});

export default rootReducer;


export const initialStore = {
  user :{
  },
  comm: {
    url: '/'
  }
}
