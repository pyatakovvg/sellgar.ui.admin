import React from 'react';

import { Action } from './Action';

import { Button } from '@/symbols/Button/Base';
import { DropDown } from '@/base/DropDown';

import type { IActionButton } from './types';

import st from './default.module.scss';

export const ActionButton = (props: IActionButton) => {
  // const handleChange = (value: string | null) => {
  //   props.onChange(value);
  //   dropDownEvents.emit('close');
  // };Button

  return (
    <DropDown disabled={props.disabled}>
      <DropDown.Content>
        <Button>{props.caption}</Button>
      </DropDown.Content>
      <DropDown.List>
        <div className={st.content}>
          {React.Children.map(props.children, (child) => {
            return <div className={st.action}>{child}</div>;
          })}
        </div>
      </DropDown.List>
    </DropDown>
  );
};

ActionButton.Action = Action;
