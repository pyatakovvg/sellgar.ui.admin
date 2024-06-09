import React from 'react';
import { IconDropDown, Icon } from '@library/kit';

import { Action } from './Action';

interface IProps {
  onEdit?(): void;
  onDelete?(): void;
}

export const Actions: React.FC<IProps> = (props) => {
  return (
    <IconDropDown>
      {!!props.onEdit && (
        <IconDropDown.Action>
          <Action icon={<Icon icon={'plus'} />} onClick={props.onEdit}>
            Редактировать
          </Action>
        </IconDropDown.Action>
      )}
      {!!props.onDelete && (
        <IconDropDown.Action>
          <Action icon={<Icon icon={'trash'} />} onClick={props.onDelete}>
            Удалить
          </Action>
        </IconDropDown.Action>
      )}
    </IconDropDown>
  );
};
