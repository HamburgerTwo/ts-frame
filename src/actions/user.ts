import { USER_ACTION } from '../constants'
import { User, UserAction } from '../types/user';
import { AnyAction } from 'redux';
export interface SaveUserAction extends AnyAction {
  type: USER_ACTION;
  payload:User
}

export interface GetUserAction extends AnyAction {
  type: USER_ACTION;
  payload:User
}

export type UserActions = SaveUserAction | GetUserAction;

export const saveUserAction = (user: User) => (dispatch:UserAction, getState: () => ({ user: User})) => {
  console.log(getState());
  console.log(dispatch)
  return dispatch({
    type: USER_ACTION,
    payload:user
  })
}
