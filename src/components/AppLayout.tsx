import React, { Component } from 'react';
import { any } from 'prop-types';
import Slot from './Slot';
import SlotContext from './SlotContext';
export default class AppLayout extends Component {

  public addOnRenderers:any = {};

  // 通过Context为子节点提供接口

  public requestAddOnRenderer = (name: string) => {
      if (!this.addOnRenderers[name]) {
        return () => null
      }
      return () => (
        this.addOnRenderers[name]
      )
    }
  public render() {
    const {
      children,
      ...restProps
    } = this.props;
    if (children) {
      // 以k-v的方式缓存<AddOn />的内容
      const arr = React.Children.toArray(children);
      const nameChecked: string[] = [];
      this.addOnRenderers = {};
      arr.forEach((item: any) => {
        if (item!.type.displayName === 'AddOn') {
          const slotName = item.props.slot || '$$default';
          // 确保内容唯一性
          if (nameChecked.findIndex(i => i === slotName) !== -1) {
            throw new Error(`Slot(${slotName}) has been occupied`);
          }
          this.addOnRenderers[slotName] = item.props.children;
          nameChecked.push(slotName);
        }
      });
    }
    return (
      <SlotContext.Provider value={{
        requestAddOnRenderer: this.requestAddOnRenderer,
      }}>
      <div>
        <header>
          <Slot name="header"></Slot>
        </header>
        <main>
          <Slot></Slot>
        </main>
        <footer>
          <Slot name="footer"></Slot>
        </footer>
      </div>
      </SlotContext.Provider>
    );
  }
}
