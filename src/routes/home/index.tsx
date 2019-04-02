import React, { Component, ComponentClass } from 'react';
import s from './index.scss';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk'
import * as Actions from '../../actions/user'
import { User, UserAction } from '../../types/user'


interface ComponentOwnProps  {
  user: User


}
type ComponentDispatch = {
  saveUser: ( user: User) => Actions.SaveUserAction
}

type ComponentProps = ComponentOwnProps & ComponentDispatch;


class Home extends Component<ComponentProps,{}> {
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
    return (<div className={s.root} onClick={this.saveUser}>hello world!, I'm {user.memberName}</div>)
  }
}

export default connect(({user}) => ({ user }),(dispatch: UserAction) => ({
  saveUser: (user: User) =>{

    return dispatch(Actions.saveUserAction(user))}

}))(Home);
