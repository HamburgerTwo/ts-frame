
import { ThunkDispatch } from 'redux-thunk'
import * as Actions from '../actions/user'
import { Reducer } from 'redux'
export interface User {
  roles?: number[]
  memberName?: string,
  memberId?: number,
  phone?: string,
  status?: number,
  orgNo?: string,
  orgStatus?: number,
  orgName?: string,
  isSign?: boolean
}


export type UserAction = ThunkDispatch<{
  user: User
},{}, Actions.UserActions>

export type BindingPhoneParam = {
  openId: string,
  phone: string
  sourceFrom: string
}

export type findEmployeeByIdParam = {
  memberId: number
}

export type findOrganizationByIdOrNoParam = {
  orgNo: string
}

export type bindEmployeeRoleParam = {
  orgNo: string
}