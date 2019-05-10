import React, { Component, ComponentClass } from 'react';
import s from './index.scss';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk'
import * as Actions from '../../actions/user'
import { User, UserAction } from '../../types/user'


interface ComponentOwnProps {
  user: User


}
type ComponentDispatch = {
  saveUser: (user: User) => Actions.SaveUserAction
}

type ComponentProps = ComponentOwnProps & ComponentDispatch;


class Home extends Component<ComponentProps, {}> {
  constructor(props: ComponentProps) {
    super(props)
  }
  public saveUser = () => {
    const { saveUser } = this.props;
    saveUser({
      memberName: 'new one',
      role: []
    })
  }
  render() {
    const { user } = this.props;
    return (<div className={s.root} onClick={this.saveUser}>
      <div className={s.fieldset}>
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
      </div>
      <div className={s.fieldset}>
        <button className={s.confirmBtn}>确定</button>
      </div>
    </div>)
  }
}

export default connect(({ user }) => ({ user }), (dispatch: UserAction) => ({
  saveUser: (user: User) => {

    return dispatch(Actions.saveUserAction(user))
  }

}))(Home);
