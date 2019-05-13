import { USER_ACTION, BINDINDPHONE_ACTION } from '../constants'
import { User, UserAction, BindingPhoneParam } from '../types/user';
import { AnyAction } from 'redux';
import { bingdingPhone } from '../services/index'

export interface SaveUserAction extends AnyAction {
  type: USER_ACTION;
  payload:User
}



export interface BingdingPhoneAction extends AnyAction {
  type: BINDINDPHONE_ACTION;
  payload: User
}

export type UserActions = SaveUserAction | BingdingPhoneAction;

function handleRes(res: UserActions) {
  return res.payload
}
export const saveUserAction = (user: User) => (dispatch:UserAction, getState: () => ({ user: User})) => {
  console.log(getState());
  console.log(dispatch)
  return dispatch({
    type: USER_ACTION,
    payload:user
  })
}

export const bingdingPhoneAction = (params: BindingPhoneParam) => (dispatch: UserAction) => (
  bingdingPhone(params).then((res) => (
    dispatch({
      type: BINDINDPHONE_ACTION,
      payload: {
        memberId: res.memberId,
        phone: params.phone
      }
    })
  )).then(handleRes)
)
