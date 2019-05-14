import React, { Component } from 'react';
import s from './index.scss';
import { connect } from 'react-redux';
import history from '../../core/history'
import { RoleType } from '../../constants';
interface ComponentOwnProps {
}
type ComponentDispatch = {
}

type ComponentProps = ComponentOwnProps & ComponentDispatch;


class Role extends Component<ComponentProps, {}> {
  constructor(props: ComponentProps) {
    super(props)
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

export default Role;
