import React, { Component } from 'react';
import s from './index.scss';
import { connect } from 'react-redux';
import history from '../../core/history'
import { RoleType } from '../../constants';
import { User } from '../../types/user'
import { Comm } from '../../types/comm'
interface ComponentOwnProps {
  user: User,
  comm: Comm
}
type ComponentDispatch = {
}

type ComponentProps = ComponentOwnProps & ComponentDispatch;

class Role extends Component<ComponentProps, {}> {
  constructor(props: ComponentProps) {
    super(props)
    const { user, comm } = props
    const { isSign } = user
    if (isSign) {
      history.replace(comm.url)
    }
  }
  public onSelectRole = (role: RoleType) => () => {
    history.push(`/store?role=${role}`)
  }
  render() {
    return (<div className={s.root}>
      <div className={s.shopowner} onClick={this.onSelectRole(RoleType.Shopowner)}></div>
      <div className={s.clerk} onClick={this.onSelectRole(RoleType.Clerk)}></div>
    </div>)
  }
}

export default connect(({ user, comm }) => ({ user, comm }))(Role);
