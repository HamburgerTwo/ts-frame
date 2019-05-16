import {
  BINDINDPHONE_ACTION,
  FINDEMPLOEEBYID_ACTION,
  FINDORGANIZATIONBYIDORNO_ACTION,
  UPDATEEMPLOYEE_ACTION,
  SIGN_ACTION,
  LOGINBYWECHATUSER_ACTION,
  RoleType, ClerkStatuType, StoreStatuType,
  GOTOURL_ACTION
} from '../constants'
import {
  User,
  UserAction,
  BindingPhoneParam,
  findEmployeeByIdParam,
  findOrganizationByIdOrNoParam,
  updateEmployeeParam,
  loginByWechatUserParam
} from '../types/user';

import { CommAction } from '../types/comm'
import { AnyAction } from 'redux';
import {
  bingdingPhone,
  findEmployeeById,
  findOrganizationByIdOrNo,
  updateEmployee,
  loginByWechatUser
} from '../services/index'

import history from '../core/history'


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

export interface UpdateEmployeeAction extends AnyAction {
  type: UPDATEEMPLOYEE_ACTION
  payload: User
}

export interface SignAction extends AnyAction {
  type: SIGN_ACTION
  payload: User
}

export interface LoginByWechatUserAction extends AnyAction {
  type: LOGINBYWECHATUSER_ACTION
  payload: User
}
export type UserActions = BingdingPhoneAction | FindEmployeeByIdAction | FindOrganizationByIdOrNoAction | UpdateEmployeeAction | SignAction | LoginByWechatUserAction

function handleRes(res: UserActions) {
  return res.payload
}

export const bingdingPhoneAction = (params: BindingPhoneParam) => (dispatch: UserAction) => (
  bingdingPhone(params).then((res) => {
    sessionStorage.setItem('authToken', res.authToken)
    return dispatch({
      type: BINDINDPHONE_ACTION,
      payload: {
        memberId: res.memberId,
        phone: params.phone
      }
    })
  }).then(handleRes)
)

export const findEmployeeByIdAction = (params: findEmployeeByIdParam) => (dispatch: UserAction & CommAction) => (
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
  )).then(handleRes).then((res) => {
    switch (res.status) {
      case ClerkStatuType.NonActive:
        alert('该账户未激活')
        throw {}
      case ClerkStatuType.Normol:
        
        if (res.roles!.some((item) => item === RoleType.Member)) {
          console.log(location.hash)
          if (location.hash === '#/rank') {
            dispatch({
              type: GOTOURL_ACTION,
              payload: {
                url: '/rank'
              }
            })
          }
          history.replace('/role')
          return {}
        } else {
          return findOrganizationByIdOrNo({
            orgNo: res.orgNo || ''
          }).then<User>((res) => {
            switch (res.status) {
              case StoreStatuType.Normol:
                return dispatch(signAction)
              default:
                alert('门店已停用')
                throw {}
            }
          })
        }
      case ClerkStatuType.Frozen:
        alert('该账户已停用')
        throw {}
      case ClerkStatuType.Deny:
        alert('该账户已作废')
        throw {}
    }
    return {}
  })
)

export const findOrganizationByIdOrNoAction = (params: findOrganizationByIdOrNoParam) => (dispatch: UserAction) => (
  findOrganizationByIdOrNo(params).then((res) => (
    dispatch({
      type: FINDORGANIZATIONBYIDORNO_ACTION,
      payload: {
        orgStatus: res.status,
        orgNo: params.orgNo,
        orgName: res.orgName,
      }
    })
  )).then(handleRes)
)


export const updateEmployeeAction = (params: updateEmployeeParam) => (dispatch: UserAction) => (
  updateEmployee(params).then((res) => (
    dispatch({
      type: UPDATEEMPLOYEE_ACTION,
      payload: {
        memberName: params.memberName,
        isSign: true,
      }
    })
  )).then(handleRes)
)

export const signAction = (dispatch: UserAction) => (
  Promise.resolve().then(() => dispatch({
    type: SIGN_ACTION,
    payload: {
      isSign: true,
    }
  })
  ).then(handleRes)
)

export const loginByWechatUserAction = (params: loginByWechatUserParam) => (dispatch: UserAction) => (
  loginByWechatUser(params).then((res) => {
    sessionStorage.setItem('authToken', res.authToken)
    return dispatch({
      type: SIGN_ACTION,
      payload: {
        memberId: res.memberId
      }
    })
  }
  ).then(handleRes)
)

