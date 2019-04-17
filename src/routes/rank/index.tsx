import React, { Component, ComponentClass } from 'react';
import s from './index.scss';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk'
import classNames from 'classnames';
import * as Actions from '../../actions/user'
import { User, UserAction } from '../../types/user'


interface ComponentOwnProps {
  user: User


}
type ComponentDispatch = {
  saveUser: (user: User) => Actions.SaveUserAction
}

type ComponentProps = ComponentOwnProps & ComponentDispatch;


class Rank extends Component<ComponentProps, {}> {
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
      <div className={s.rank}>
        <div className={s.cup}>XX排行榜</div>
        <div className={s.title}>数据截止：昨天</div>
        <table className={s.table}>
          <tr className={s.header}>
            <th>排名</th>
            <th>店员名称</th>
            <th>大区</th>
            <th>连锁名称</th>
            <th>积分额</th>
          </tr>
          <tr className={classNames(s.no1, s.row)}>
            <td></td>
            <td>李杰</td>
            <td>华北大区</td>
            <td>天保堂</td>
            <td>686</td>
          </tr>
          <tr className={classNames(s.no2, s.row)}>
          <td></td>
            <td>李杰</td>
            <td>华北大区</td>
            <td>天保堂</td>
            <td>686</td>
          </tr>
          <tr className={classNames(s.no3, s.row)}>
          <td></td>
            <td>李杰</td>
            <td>华北大区</td>
            <td>天保堂</td>
            <td>686</td>
          </tr>
          <tr className={classNames(s.other, s.row)}>
          <td>4</td>
            <td>李杰</td>
            <td>华北大区</td>
            <td>天保堂</td>
            <td>686</td>
          </tr>
          <tr className={classNames(s.other, s.row)}>
          <td>5</td>
            <td>李杰</td>
            <td>华北大区</td>
            <td>天保堂</td>
            <td>686</td>
          </tr>
        </table>
      </div>
    </div>)
  }
}

export default connect(({ user }) => ({ user }), (dispatch: UserAction) => ({
  saveUser: (user: User) => {

    return dispatch(Actions.saveUserAction(user))
  }

}))(Rank);
