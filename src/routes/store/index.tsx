import React, { Component } from 'react';
import s from './index.scss';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from "react-router"
import { ThunkDispatch } from 'redux-thunk'
import * as Actions from '../../actions/user'
import { User, UserAction, findOrganizationByIdOrNoParam, updateEmployeeParam } from '../../types/user'
import { Comm } from '../../types/comm'
import { bindEmployeeRole } from '../../services/index'
import { StoreStatuType, RoleType } from '../../constants'
import { parse } from 'query-string'
interface ComponentOwnProps {
  user: User,
  comm: Comm
}
type ComponentDispatch = {
  findOrganizationByIdOrNo: (params: findOrganizationByIdOrNoParam) => Promise<User>,
  updateEmployee:  (params: updateEmployeeParam) => Promise<User>,
}

type ComponentProps = ComponentOwnProps & ComponentDispatch & RouteComponentProps;

type ComponentStateProps = {
  nameError: string,
  storeTip: string,
  storeName: string,

}
interface Store {
  name: HTMLInputElement | null,
  storeNo: HTMLInputElement | null,
  queryNo: string,
}

class Store extends Component<ComponentProps, ComponentStateProps> {

  constructor(props: ComponentProps) {
    super(props)
    this.state = {
      storeTip: '',
      storeName: '',
      nameError: ''
    }
    this.queryNo = ''
  }
 
  public queryStore = () => {
    if (!this.storeNo!.value) {
      this.setState({
        storeTip: '请输入门店编号'
      })
      return
    }
    const { findOrganizationByIdOrNo } = this.props;
    findOrganizationByIdOrNo({
      orgNo: this.storeNo!.value
    }).then((res) => {
      if (res.orgStatus === StoreStatuType.Normol) {
        this.setState({
          storeTip: '查询结果：您当前绑定门店为',
          storeName: res.orgName || ''
        })
        this.queryNo = this.storeNo!.value
      } else {
        this.queryNo = ''
        this.setState({
          storeTip: '该门店已停用',
          storeName: ''
        })
      }
    })
  }
  public onStoreNoChange = () => {
    this.queryNo = ''
    this.setState({
      storeTip: '',
      storeName: ''
    })
  }
  public onNameChange = () => {
    this.setState({
      nameError: '',
    })
  }
  public onConfirm = () => {
    if (!this.name!.value) {
      this.setState({
        nameError: '请输入姓名',
      })
    }
    if (!this.queryNo) {
      this.setState({
        storeTip: '请输入需要绑定的门店编号',
        storeName: ''
      })
    }
    const { user, updateEmployee, history, comm } = this.props
    const { memberId = 0 } = user;
    const queryObj = parse(this.props.location.search)
    Promise.resolve().then(() => {
      if (queryObj.role === RoleType.Shopowner.toString()) {
        return bindEmployeeRole({
          orgNo: this.queryNo,
          memberName: this.name!.value,
          roleType: RoleType.Shopowner,
          memberId
        })
      }
      return {}
    }).then(() => updateEmployee({
      orgNo: this.queryNo,
      memberName: this.name!.value,
      roles:[RoleType.Clerk],
      memberId
    })).then(() => {
      
      history.replace(comm.url)
    }).catch((err) => {
      
      alert(err.message || '出错了')
    })
  }
  render() {
    const { user } = this.props;
    const { storeTip, storeName, nameError } = this.state
    return (<div className={s.root}>
      <div className={s.fieldset}>
        <div className={s.label}>姓名</div>
        <div className={s.inputBox}>
          <input className={s.input} onChange={this.onNameChange} ref={(ref) => (this.name = ref)} placeholder="请填写您的姓名" />
          <div className={s.info}>{nameError}</div>
        </div>
      </div>
      <div className={s.fieldset}>
        <div className={s.label}>门店编号</div>
        <div className={s.inputBox}>
          <div className={s.inputStyle}><input className={s.innerInput} ref={(ref) => (this.storeNo = ref)} onChange={this.onStoreNoChange} placeholder="请填写门店编号" /><button onClick={this.queryStore} className={s.queryBtn}>查询</button></div>
          <div className={s.info}>{storeTip}<span className={s.underline}>{storeName}</span></div>
        </div>
      </div>
      <div className={s.fieldset}>
        <button className={s.confirmBtn} onClick={this.onConfirm}>确定</button>
      </div>
    </div>)
  }
}

export default withRouter(connect(({ user, comm }) => ({ user, comm }), (dispatch: UserAction) => ({
  findOrganizationByIdOrNo: (params: findOrganizationByIdOrNoParam) => dispatch(Actions.findOrganizationByIdOrNoAction(params)),
  updateEmployee: (params: updateEmployeeParam) => dispatch(Actions.updateEmployeeAction(params))
}))(Store));
