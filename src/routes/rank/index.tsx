import React, { Component } from 'react';
import s from './index.scss';
import classNames from 'classnames';
import PullToRefresh from 'rmc-pull-updown-to-refresh';
import { getPointRand } from '../../services/rank'
interface ComponentOwnProps {
  pageNum: Number
}
type ComponentDispatch = {
  
}

type ComponentStateProps = {
  list: Array<{
    rank: number,
    memberName: string,
    orgName: string,
    districtName: string,
    chainName: string,
    points: number
  }>,
  hasmore: boolean
}


type ComponentProps = ComponentOwnProps & ComponentDispatch

const itemCount = 20
interface Rank {
  pageNum: number
}
class Rank extends Component<ComponentProps, ComponentStateProps> {

  constructor(props: ComponentProps) {
    super(props)
    this.state = {
      list: [],
      hasmore: true
    }
    this.pageNum = 1
  }
  componentWillMount() {
    this.getPointRand()
  }
  public onPullUp = () => {
    if (this.state.hasmore) {
      this.pageNum = this.pageNum + 1
      this.getPointRand()
    }
  }
  public getPointRand = () => {
    getPointRand(this.pageNum, itemCount)
      .then((res) => {
        this.setState(({ list }) => ({
          list: [...list, ...res],
          hasmore: res.length === itemCount
        }))
      }).catch((err) => {
        alert('出错了')
      })
  }
  public onPullDown = () => {
  }
  render() {

    return (<div className={s.root}>
      <div className={s.rank}>
        <div className={s.cup}>钙世英雄排行榜</div>
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
            disablePullUp={!this.state.hasmore}

          >
            <table className={s.table}>
              <tbody>
                {this.state.list.map((item, index) => (<tr key={index} className={classNames({
                  [s.no1]: item.rank === 1,
                  [s.no2]: item.rank === 2,
                  [s.no3]: item.rank === 3,
                  [s.other]: item.rank > 3
                }, s.row)}>
                  <td className={s.col1}>{item.rank < 4 ? '' : item.rank}</td>
                  <td className={s.col2}>{item.memberName}</td>
                  <td className={s.col3}>{item.districtName}</td>
                  <td className={s.col4}>{item.chainName}</td>
                  <td className={s.col5}>{item.points}</td>
                </tr>))}
              </tbody>
            </table>
            {!this.state.hasmore ? <div className={s.nomore}>没有更多了</div> : null}
          </PullToRefresh>
        </div>
      </div>
    </div>)
  }
}

export default Rank
