import React from 'react';

import { DropDown } from '@/base/DropDown';

import { Action } from './Action';
import { Control } from './Control';
import { Content } from './Content';

interface IProps {}

type IconDropDownType = typeof IconDropDownComponent & {
  Action: typeof Action;
};

const IconDropDownComponent: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  return (
    <DropDown alignStart={'end'}>
      <DropDown.Content>
        <Control />
      </DropDown.Content>
      <DropDown.List>
        <Content>{props.children}</Content>
      </DropDown.List>
    </DropDown>
  );
};

export const IconDropDown: IconDropDownType = Object.assign(IconDropDownComponent, {
  Action,
});
