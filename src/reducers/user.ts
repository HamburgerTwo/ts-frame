import { User } from '../types/user';
import { BINDINDPHONE_ACTION, FINDEMPLOEEBYID_ACTION, FINDORGANIZATIONBYIDORNO_ACTION,UPDATEEMPLOYEE_ACTION,SIGN_ACTION, SAVEOPENID_ACTION } from '../constants'
import { Reducer } from 'redux'
const initialUser:User = {
  roles: [],
  memberName: 'test',
  phone: '',
  memberId: 0,
  isSign: false
}
const user:Reducer<User> = (initialState: User = initialUser, action): User => {
  console.log(action)
  switch (action.type) {
    
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
    case UPDATEEMPLOYEE_ACTION: {
      return { ...initialState, ...action.payload }
      break;
    }
    case SIGN_ACTION: {
      return { ...initialState, ...action.payload }
      break;
    }
    case SAVEOPENID_ACTION: {
      return { ...initialState, ...action.payload }
      break;
    }
    default: {
      return initialState;
    }
  }
}

export default user;

