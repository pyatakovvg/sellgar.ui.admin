import React from 'react';

import { DropDown, DropDownContext } from '@/base/DropDown';

import { Icon } from '../../Icon';
import { IconBox } from '../../IconBox';

interface IProps {}

export const Control: React.FC<React.PropsWithChildren<IProps>> = () => {
  const context = React.useContext(DropDownContext);

  const handleClick = () => {
    if (context.isOpen) {
      context.close();
    } else {
      context.open();
    }
  };

  return (
    <IconBox onClick={handleClick}>
      <Icon icon={'ellipsis'} />
    </IconBox>
  );
};
