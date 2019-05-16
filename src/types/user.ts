
import { ThunkDispatch } from 'redux-thunk'
import * as Actions from '../actions/user'
export interface User {
  roles?: number[]
  memberName?: string,
  memberId?: number,
  phone?: string,
  status?: number,
  orgNo?: string,
  orgStatus?: number,
  orgName?: string,
  isSign?: boolean,
  openId?: string
}


export type UserAction = ThunkDispatch<{
  user: User
}, {}, Actions.UserActions>

export type BindingPhoneParam = {
  openId: string,
  phone: string
  sourceFrom: string,
  identityType: string
}

export type findEmployeeByIdParam = {
  memberId: number
}

export type findOrganizationByIdOrNoParam = {
  orgNo: string
}

export type bindEmployeeRoleParam =
  {
    memberId: number,
    orgNo: string,
    roleType: number, //店长
    memberName: string  //输入姓名  并修改店员姓名 member_name
  }

export type updateEmployeeParam = {
  memberId: number,
  memberName: string,  //名称
  roles: Array<number>,  //角色  1:店员  4：店长
  orgNo: string  //门店编号 门店id和门店编号二选一
}

export type loginByWechatUserParam = {
  openid: string,
  accountType: string
}

export type saveOpenIdParam = {
  openId: string
}