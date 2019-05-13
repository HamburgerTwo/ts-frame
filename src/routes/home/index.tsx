import React, { Component, ComponentClass } from 'react'
import s from './index.scss'
import { connect } from 'react-redux'
import history from '../../core/history'
import { phoneRegex } from '../../utils/commRegex'
import {
  sendValidateCode,
  checkValidateCode,
  bingdingPhone,
  findEmployeeById,
  findOrganizationByIdOrNo
} from '../../services/index'
import * as Actions from '../../actions/user'
import { User, UserAction, BindingPhoneParam } from '../../types/user'
import { params } from '../../core/request/middlewares';

console.log(111)

interface ComponentOwnProps {
  user: User


}
type ComponentDispatch = {
  saveUser: (user: User) => Actions.SaveUserAction,
  bindingPhone: (params: BindingPhoneParam) => Promise<User>
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
  public saveUser = () => {
    const { saveUser } = this.props;

    saveUser({
      memberName: 'new one',
      role: []
    })
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
        "taskId": 7,  //任务ID  6:推送语音验证码  7:发送手机验证码  11：福利卡验证码
        "phone": this.phone!.value,  //手机号
        "length": 4,  //验证码长度
        "token": '',  //图片验证码的token  可为空
        "captext": ''  //
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
    const { bindingPhone } = this.props;
    checkValidateCode({
      taskId: 7,
      phone: this.phone!.value,  //手机号
      validateCode: this.valicode!.value
    }).then((res) =>
      (bindingPhone({
        openId: '1',
        phone: this.phone!.value,
        sourceFrom: '钙世英雄小程序'
      }).then((res) => (
        findEmployeeById({ memberId: res.memberId || 0 })
          ).then((res) => {
            switch (res.status) {
              case 0:
                alert('该账户未激活');
                break
              case 1:
                return findOrganizationByIdOrNo({
                  orgNo: res.orgNo
                }).then((res) => {
                  switch (res.status) {
                    case -1:
                    case 1:
                    case 2:
                    alert('门店已停用');
                    break;
                  }
                })
              case 2:
                alert('该账户已停用');
                break
              case 3:
                alert('该账户已作废');
                break
            }
        return {}
        }).catch((err) => {
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
    const { user } = this.props;
    const { phoneError, valiError, count } = this.state;
    return (<div className={s.root}>
      {/* <div className={s.fieldset}>
        <div className={s.label}>姓名</div>
        <div className={s.inputBox}>
          <input className={s.input} placeholder="请填写您的姓名" />
        </div>
      </div>
      <div className={s.fieldset}>
        <div className={s.label}>门店名称</div>
        <div className={s.inputBox}>
          <div className={s.inputStyle}><input className={s.innerInput} placeholder="请填写门店名称" /><button className={s.queryBtn}>查询</button></div>
          <div className={s.info}>查询结果：您当前绑定门店为<span className={s.underline}>广州天河店</span></div>
        </div>
      </div> */}
      <div className={s.fieldset}>
        <div className={s.label}>手机号</div>
        <div className={s.valicodeBox}>
          <div className={s.inputStyle}><input onChange={this.onPhoneChange} ref={(ref) => (this.phone = ref)} maxLength={11} type="tel" className={s.innerInput} placeholder="请输入手机号" /></div>
          <div className={s.info}>{phoneError}</div>
        </div>
        <div className={s.inputBox}>
          <div className={s.inputStyle}><input onChange={this.onValicodeChange} className={s.innerInput} placeholder="请输入验证码" ref={(ref) => (this.valicode = ref)} /><button onClick={this.sendValidateCode} className={s.queryBtn}>{count ? `${count}秒后获取` : '获取验证码'}</button></div>
          <div className={s.info} >{valiError}</div>
        </div>
      </div>
      <div className={s.fieldset}>
        <button className={s.confirmBtn} onClick={this.onConfirm}>确定</button>
      </div>
    </div>)
  }
}

export default connect(({ user }) => ({ user }), (dispatch: UserAction) => ({
  saveUser: (user: User) => {
    return dispatch(Actions.saveUserAction(user))
  },
  bindingPhone: (params: BindingPhoneParam) => (dispatch(Actions.bingdingPhoneAction(params)))

}))(Home);
