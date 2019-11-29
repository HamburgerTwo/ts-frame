import React, { ReactNode, SFC } from 'react';
import SlotContext from './SlotContext';

export interface IProps {
  name?: string;
}

const Slot: SFC<IProps> = ({ name, children }) => {
  return (
    <SlotContext.Consumer>
      {({ requestAddOnRenderer }) => {
        const addOnRenderer = requestAddOnRenderer(name!);
        return (addOnRenderer && addOnRenderer()) || children || null;
      }}
    </SlotContext.Consumer>
  );
};

Slot.defaultProps = {
  name: '$$default',
};

export default Slot;
