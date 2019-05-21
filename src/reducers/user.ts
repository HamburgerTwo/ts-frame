import { User } from '../types/user';
import { Reducer } from 'redux'
const initialUser:User = {
  memberName: '',
}
const user:Reducer<User> = (initialState: User = initialUser, action): User => {
  switch (action.type) {
    default: {
      return initialState;
    }
  }
}

export default user;

