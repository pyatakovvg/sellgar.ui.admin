import React from 'react';

import { DropDown } from '../_parts/DropDown';

import { Icon } from '../Icon';

import s from './default.module.scss';

interface IProps {
  disabled?: boolean;
  alignStart?: 'start' | 'end';
}

export const Actions: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  const [_, setFocus] = React.useState(false);

  return (
    <div className={s.wrapper}>
      <DropDown
        alignStart={props.alignStart}
        disabled={props.disabled}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      >
        <DropDown.Content>
          <div className={s.control}>
            <Icon icon={'keyboard_control'} />
          </div>
        </DropDown.Content>
        <DropDown.List>
          <div className={s.content}>{props.children}</div>
        </DropDown.List>
      </DropDown>
    </div>
  );
};
