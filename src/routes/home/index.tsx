import React, { Component } from 'react';
import s from './index.scss';
import { connect } from 'react-redux';


type ComponentDispatch = {

};

type ComponentStateProps = {

};
type ComponentProps = ComponentDispatch;

interface Home {

}

class Home extends Component<ComponentProps, ComponentStateProps> {
  constructor(props: ComponentProps) {
    super(props);
  }
  render() {
    return (
      <div className={s.root} />
    );
  }
}

export default connect()(Home);
