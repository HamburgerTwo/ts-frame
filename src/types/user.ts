
import { ThunkDispatch } from 'redux-thunk'
import * as Actions from '../actions/user'
import { Reducer } from 'redux'
export interface User {
  role?: number[]
  memberName?: string,
  memberId?: number,
  phone?: string,
}


export type UserAction = ThunkDispatch<{
  user: User
},{}, Actions.UserActions>

export type BindingPhoneParam = {
  openId: string,
  phone: string
  sourceFrom: string
}
