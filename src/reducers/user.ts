import { User } from '../types/user';
import { USER_ACTION } from '../constants'
import { Reducer } from 'redux'
const initialUser:User = {
  role: [],
  memberName: 'test'
}
const user:Reducer<User> = (initialState: User = initialUser, action): User => {
  switch (action.type) {
    case USER_ACTION: {
      return { ...initialState, ...action.payload }
      break;
    }
    default: {
      return initialState;
    }
  }
}

export default user;

