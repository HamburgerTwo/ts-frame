import React, { ReactNode, SFC } from 'react';
interface IProps {
  slot?: string;
}
const AddOn: SFC<IProps> = () => null;
AddOn.defaultProps = {
  slot: '$$default',
};
AddOn.displayName='AddOn';
export default AddOn;
