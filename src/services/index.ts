import request from '../core/request'
import {
    BindingPhoneParam,
    findEmployeeByIdParam,
    findOrganizationByIdOrNoParam,
    bindEmployeeRoleParam,
    updateEmployeeParam,
    loginByWechatUserParam
} from '../types/user'

type CodeParam = {
    taskId: number,  //任务ID  6:推送语音验证码  7:发送手机验证码  11：福利卡验证码
    phone: string,  //手机号
    length: number,  //验证码长度
    token: string,  //图片验证码的token  可为空
    captext: string  //图片验证码的字符串  如果token为空，则为空，如果token不为空，则不能为空
}
export const sendValidateCode = (param: CodeParam) => (
    request.post('/scrm/message/sendValidateCode', param)
)

type CheckParam = {
    taskId: number,  //任务ID  6:推送语音验证码  7:发送手机验证码  11：福利卡验证码
    phone: string,  //手机号
    validateCode: string  //验证码
}
export const checkValidateCode = (param: CheckParam) => (
    request.post('/scrm/message/checkValidateCode', param)
)


export const bingdingPhone = (params: BindingPhoneParam) => (
    request.get<{
        memberId: number,
        authToken: string,
    }>('/scrm/yygj/service/applet/bingdingPhone', { params })
)


export const findEmployeeById = (params: findEmployeeByIdParam) => (
    request.get<{
        orgNo: string, //机构编号 (门店编号)
        roles: Array<number>,
        status: number, //店员状态 0：未激活 , 1：正常，2：停用 3：作废
        memberName: string,
    }>('/scrm/employee/findEmployeeById', { params })
)


export const findOrganizationByIdOrNo = (params: findOrganizationByIdOrNoParam) => (
    request.get<{
        orgName: string, //机构编号 (门店编号)
        status: number, //状态：0 正常
    }>('/scrm/organization/findOrganizationByIdOrNo', { params })
)

export const bindEmployeeRole = (param: bindEmployeeRoleParam) => (
    request.post<{
        status: number, //状态：0 正常
    }>('/scrm//employee/bindEmployeeRole', param)
)

export const updateEmployee = (param: updateEmployeeParam) => (
    request.post<{
        status: number, //状态：0 正常
    }>('/scrm/employee/updateEmployee', param)
)

export const loginByWechatUser = (param: loginByWechatUserParam) => (
    request.post<
        {
            memberId: number,
            authToken: string
        }>('/scrm/auth/employee/loginByWechatUser', param)
)