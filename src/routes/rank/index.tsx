import React, { Component, ComponentClass } from 'react';
import s from './index.scss';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk'
import classNames from 'classnames';
import * as Actions from '../../actions/user'
import { User, UserAction } from '../../types/user'
import PullToRefresh from 'rmc-pull-updown-to-refresh';

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
  public onPullUp = () => {
    console.log('111')
  }
  public onPullDown = () => {
  }
  render() {
    const { user } = this.props;
    return (<div className={s.root}>
      <div className={s.rank}>
        <div className={s.cup}>XX排行榜</div>
        <div className={s.title}>数据截止：昨天</div>
        <table className={s.table}>
          <thead>
            <tr className={s.header}>
              <th className={s.col1}>排名</th>
              <th className={s.col2}>店员名称</th>
              <th className={s.col3}>大区</th>
              <th className={s.col4}>连锁名称</th>
              <th className={s.col5}>积分额</th>
            </tr>
          </thead>
        </table>
        <div className={s.rankBox}>
          <PullToRefresh
            disablePullDown={true}
            pullUpText="加载更多"
            onPullUp={this.onPullUp}
            
          >
            <table className={s.table}>
              <tbody>
                <tr className={classNames(s.no1, s.row)}>
                  <td className={s.col1}></td>
                  <td className={s.col2}>李杰</td>
                  <td className={s.col3}>华北大区</td>
                  <td className={s.col4}>天保堂</td>
                  <td className={s.col5}>686</td>
                </tr>
                <tr className={classNames(s.no2, s.row)}>
                  <td className={s.col1}></td>
                  <td className={s.col2}>李杰</td>
                  <td className={s.col3}>华北大区</td>
                  <td className={s.col4}>天保堂</td>
                  <td className={s.col5}>686</td>
                </tr>
                <tr className={classNames(s.no3, s.row)}>
                  <td className={s.col1}></td>
                  <td className={s.col2}>李杰</td>
                  <td className={s.col3}>华北大区</td>
                  <td className={s.col4}>天保堂</td>
                  <td className={s.col5}>686</td>
                </tr>
                <tr className={classNames(s.other, s.row)}>
                  <td className={s.col1}>4</td>
                  <td className={s.col2}>李杰</td>
                  <td className={s.col3}>华北大区</td>
                  <td className={s.col4}>天保堂</td>
                  <td className={s.col5}>686</td>
                </tr>
                <tr className={classNames(s.other, s.row)}>
                  <td className={s.col1}>5</td>
                  <td className={s.col2}>李杰</td>
                  <td className={s.col3}>华北大区</td>
                  <td className={s.col4}>天保堂</td>
                  <td className={s.col5}>686</td>
                </tr>
                <tr className={classNames(s.other, s.row)}>
                  <td className={s.col1}>5</td>
                  <td className={s.col2}>李杰</td>
                  <td className={s.col3}>华北大区</td>
                  <td className={s.col4}>天保堂</td>
                  <td className={s.col5}>686</td>
                </tr>
                <tr className={classNames(s.other, s.row)}>
                  <td className={s.col1}>5</td>
                  <td className={s.col2}>李杰</td>
                  <td className={s.col3}>华北大区</td>
                  <td className={s.col4}>天保堂</td>
                  <td className={s.col5}>686</td>
                </tr>
                <tr className={classNames(s.other, s.row)}>
                  <td className={s.col1}>5</td>
                  <td className={s.col2}>李杰</td>
                  <td className={s.col3}>华北大区</td>
                  <td className={s.col4}>天保堂</td>
                  <td className={s.col5}>686</td>
                </tr>
                <tr className={classNames(s.other, s.row)}>
                  <td className={s.col1}>5</td>
                  <td className={s.col2}>李杰</td>
                  <td className={s.col3}>华北大区</td>
                  <td className={s.col4}>天保堂</td>
                  <td className={s.col5}>686</td>
                </tr>
                <tr className={classNames(s.other, s.row)}>
                  <td className={s.col1}>5</td>
                  <td className={s.col2}>李杰</td>
                  <td className={s.col3}>华北大区</td>
                  <td className={s.col4}>天保堂</td>
                  <td className={s.col5}>686</td>
                </tr>
                <tr className={classNames(s.other, s.row)}>
                  <td className={s.col1}>5</td>
                  <td className={s.col2}>李杰</td>
                  <td className={s.col3}>华北大区</td>
                  <td className={s.col4}>天保堂</td>
                  <td className={s.col5}>686</td>
                </tr>
                <tr className={classNames(s.other, s.row)}>
                  <td className={s.col1}>5</td>
                  <td className={s.col2}>李杰</td>
                  <td className={s.col3}>华北大区</td>
                  <td className={s.col4}>天保堂</td>
                  <td className={s.col5}>686</td>
                </tr>
              </tbody>
            </table>
          </PullToRefresh>
        </div>
      </div>
    </div>)
  }
}

export default connect(({ user }) => ({ user }), (dispatch: UserAction) => ({
  saveUser: (user: User) => {

    return dispatch(Actions.saveUserAction(user))
  }

}))(Rank);
