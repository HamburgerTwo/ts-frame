import { User } from '../types/user';
import { USER_ACTION, BINDINDPHONE_ACTION, FINDEMPLOEEBYID_ACTION, FINDORGANIZATIONBYIDORNO_ACTION } from '../constants'
import { Reducer } from 'redux'
const initialUser:User = {
  roles: [],
  memberName: 'test',
  phone: '',
  memberId: 0,
  isSign: false
}
const user:Reducer<User> = (initialState: User = initialUser, action): User => {
  
  console.log(initialState)
  switch (action.type) {
    case USER_ACTION: {
      return { ...initialState, ...action.payload }
      break;
    }
    case BINDINDPHONE_ACTION: {
      return { ...initialState, ...action.payload }
      break;
    }
    case FINDEMPLOEEBYID_ACTION: {
      return { ...initialState, ...action.payload }
      break;
    }
    case FINDORGANIZATIONBYIDORNO_ACTION: {
      return { ...initialState, ...action.payload }
      break;
    }
    default: {
      return initialState;
    }
  }
}

export default user;

