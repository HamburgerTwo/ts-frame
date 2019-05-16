import React, { Component } from 'react'
import s from './index.scss'
import { connect } from 'react-redux'
import history from '../../core/history'
import { phoneRegex } from '../../utils/commRegex'
import {
  sendValidateCode,
  checkValidateCode,
} from '../../services/index'
import * as Actions from '../../actions/user'
import { User, UserAction, BindingPhoneParam, findEmployeeByIdParam, findOrganizationByIdOrNoParam } from '../../types/user'
import { ACCOUNT_TYPE } from '../../constants/index'


interface ComponentOwnProps {
  user: User


}
type ComponentDispatch = {
  bindingPhone: (params: BindingPhoneParam) => Promise<User>,
  findEmployeeById: (params: findEmployeeByIdParam) => Promise<User>,
  findOrganizationByIdOrNo: (params: findOrganizationByIdOrNoParam) => Promise<User>,
  signAction: () => Promise<User>
}

type ComponentStateProps = {
  phoneError: string,
  valiError: string,
  disabledBtn: boolean,
  count: number
}
type ComponentProps = ComponentOwnProps & ComponentDispatch;

interface Home {
  phone: HTMLInputElement | null,
  valicode: HTMLInputElement | null,
  valicodeInterVal: any
}

class Home extends Component<ComponentProps, ComponentStateProps> {
  constructor(props: ComponentProps) {
    super(props)
    this.state = {
      phoneError: '',
      valiError: '',
      disabledBtn: false,
      count: 0
    }
  }

  public sendValidateCode = () => {
    if (!this.phone!.value) {
      this.setState({
        phoneError: '手机号码不能为空'
      })
      return
    }
    if (!phoneRegex.test(this.phone!.value)) {
      this.setState({
        phoneError: '手机号码不正确'
      })
      return
    }
    if (!this.state.disabledBtn) {
      let count = 60
      this.valicodeInterVal = setInterval(() => {
        this.setState({
          disabledBtn: true,
          count
        })
        count = count - 1
        if (count === -1) {
          clearInterval(this.valicodeInterVal)
          this.setState({
            disabledBtn: false,
            count: 0
          })
        }
      }, 1000)
      sendValidateCode({
        taskId: 7,  //任务ID  6:推送语音验证码  7:发送手机验证码  11：福利卡验证码
        phone: this.phone!.value,  //手机号
        length: 4,  //验证码长度
        token: '',  //图片验证码的token  可为空
        captext: ''  //
      }).catch((err) => {
        clearInterval(this.valicodeInterVal)
        this.setState({
          disabledBtn: false,
          count: 0
        })
        alert(err.errorMsg || '出错了')
      })

    }
  }
  public onPhoneChange = () => {
    this.setState({
      phoneError: '',
      valiError: ''
    })
  }
  public onValicodeChange = () => {
    this.setState({
      valiError: ''
    })
  }
  public onConfirm = () => {
    if (!this.phone!.value) {
      this.setState({
        phoneError: '手机号码不能为空'
      })
      return
    }
    if (!phoneRegex.test(this.phone!.value)) {
      this.setState({
        phoneError: '手机号码不正确'
      })
      return
    }
    if (!this.valicode!.value) {
      this.setState({
        phoneError: '',
        valiError: '验证码不能为空'
      })
      return
    }
    const { bindingPhone, findEmployeeById, findOrganizationByIdOrNo, signAction } = this.props;
    checkValidateCode({
      taskId: 7,
      phone: this.phone!.value,  //手机号
      validateCode: this.valicode!.value
    }).then((res) =>
      (bindingPhone({
        openId: '1',
        phone: this.phone!.value,
        sourceFrom: '钙世英雄小程序',
        identityType: 'ACCOUNT_TYPE' 
      }).then((res) => (
        findEmployeeById({ memberId: res.memberId || 0 })
      ).catch((err) => {
        alert('出错了')
      })
      ).catch((err) => {
        alert('出错了')
      }))
    )
      .catch((err) => {
        this.setState({
          phoneError: '',
          valiError: '验证码不正确'
        })
      })
  }

  render() {
    const { user } = this.props
    const { isSign, memberName, orgName, orgNo, phone } = user
    const { phoneError, valiError, count } = this.state
    return (<div className={s.root}>
      {isSign ? <div className={s.fieldset}>
        <div className={s.label}>姓名</div>
        <div className={s.inputBox}>
          <input className={s.input} placeholder="请填写您的姓名" value={memberName} readOnly />
        </div>
      </div> : null}
      {isSign ? <div className={s.fieldset}>
        <div className={s.label}>门店名称</div>
        <div className={s.inputBox}>
          <div className={s.inputStyle}><input className={s.innerInput} placeholder="请填写门店名称" value={orgNo} readOnly /><button disabled className={s.queryBtn}>查询</button></div>
          <div className={s.info}>查询结果：您当前绑定门店为<span className={s.underline}>{orgName}</span></div>
        </div>
      </div> : null}
      <div className={s.fieldset}>
        <div className={s.label}>手机号</div>
        <div className={s.valicodeBox}>
          <div className={s.inputStyle}><input onChange={this.onPhoneChange} readOnly={isSign} value={phone} ref={(ref) => (this.phone = ref)} maxLength={11} type="tel" className={s.innerInput} placeholder="请输入手机号" /></div>
          <div className={s.info}>{phoneError}</div>
        </div>
        {isSign ? null : <div className={s.inputBox}>
          <div className={s.inputStyle}><input onChange={this.onValicodeChange} className={s.innerInput} placeholder="请输入验证码" ref={(ref) => (this.valicode = ref)} /><button onClick={this.sendValidateCode} className={s.queryBtn}>{count ? `${count}秒后获取` : '获取验证码'}</button></div>
          <div className={s.info} >{valiError}</div>
        </div>}
      </div>
      {isSign ? null : <div className={s.fieldset}>
        <button className={s.confirmBtn} onClick={this.onConfirm}>确定</button>
      </div>}
    </div>)
  }
}

export default connect(({ user }) => ({ user }), (dispatch: UserAction) => ({
  bindingPhone: (params: BindingPhoneParam) => (dispatch(Actions.bingdingPhoneAction(params))),
  findEmployeeById: (params: findEmployeeByIdParam) => (dispatch(Actions.findEmployeeByIdAction(params))),
  findOrganizationByIdOrNo: (params: findOrganizationByIdOrNoParam) => (dispatch(Actions.findOrganizationByIdOrNoAction(params))),
  signAction: () => (dispatch(Actions.signAction)),
}))(Home);
