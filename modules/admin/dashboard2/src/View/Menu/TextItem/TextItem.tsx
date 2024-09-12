import React from 'react';

import { Item } from './Item';
import { CustomItem, type CustomItemProps } from '../CustomItem';

export const TextItem: React.FC<React.PropsWithChildren<CustomItemProps>> = (props) => {
  return (
    <CustomItem {...props}>
      <Item>{props.children}</Item>
    </CustomItem>
  );
};
