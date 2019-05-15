import { Comm } from '../types/comm';
import { GOTOURL_ACTION } from '../constants'
import { Reducer } from 'redux'
const initialUser:Comm = {
  url: '/'
}
const comm:Reducer<Comm> = (initialState: Comm = initialUser, action): Comm => {
  switch (action.type) {
    
    case GOTOURL_ACTION: {
      return { ...initialState, ...action.payload }
      break;
    }
    default: {
      return initialState;
    }
  }
}

export default comm;

