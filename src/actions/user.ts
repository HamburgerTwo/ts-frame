import { USER_ACTION,
  BINDINDPHONE_ACTION,
  FINDEMPLOEEBYID_ACTION,
  FINDORGANIZATIONBYIDORNO_ACTION,
  StoreStatuType } from '../constants'
import {
  User,
  UserAction,
  BindingPhoneParam,
  findEmployeeByIdParam,
  findOrganizationByIdOrNoParam
} from '../types/user';
import { AnyAction } from 'redux';
import {
  bingdingPhone,
  findEmployeeById,
  findOrganizationByIdOrNo
} from '../services/index'

export interface SaveUserAction extends AnyAction {
  type: USER_ACTION
  payload: User
}



export interface BingdingPhoneAction extends AnyAction {
  type: BINDINDPHONE_ACTION
  payload: User
}

export interface FindEmployeeByIdAction extends AnyAction {
  type: FINDEMPLOEEBYID_ACTION
  payload: User
}

export interface FindOrganizationByIdOrNoAction extends AnyAction {
  type: FINDORGANIZATIONBYIDORNO_ACTION
  payload: User
}
export type UserActions = SaveUserAction | BingdingPhoneAction | FindEmployeeByIdAction | FindOrganizationByIdOrNoAction

function handleRes(res: UserActions) {
  return res.payload
}
export const saveUserAction = (user: User) => (dispatch: UserAction, getState: () => ({ user: User })) => {
  
  return dispatch({
    type: USER_ACTION,
    payload: user
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

export const findEmployeeByIdAction = (params: findEmployeeByIdParam) => (dispatch: UserAction) => (
  findEmployeeById(params).then((res) => (
    dispatch({
      type: BINDINDPHONE_ACTION,
      payload: {
        roles: res.roles,
        orgNo: res.orgNo,
        status: res.status,
        memberName: res.memberName
      }
    })
  )).then(handleRes)
)

export const findOrganizationByIdOrNoAction = (params: findOrganizationByIdOrNoParam) => (dispatch: UserAction) => (
  findOrganizationByIdOrNo(params).then((res) => (
    dispatch({
      type: FINDORGANIZATIONBYIDORNO_ACTION,
      payload: {
        orgStatus: res.status,
        orgName: res.orgName,
        isSign: res.status === StoreStatuType.Normol
      }
    })
  )).then(handleRes)
)
