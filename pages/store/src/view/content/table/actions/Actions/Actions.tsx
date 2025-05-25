import { Icon, Text, dropDownContext } from '@library/kit';

import React from 'react';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps {
  onClick(type: 'edit' | 'delete'): void;
}

export const Actions: React.FC<IProps> = (props) => {
  const { close } = React.useContext(dropDownContext);

  const handleClick = (type: 'edit' | 'delete') => {
    close();
    props.onClick(type);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.action} onClick={() => handleClick('edit')}>
        <div className={cn(s.icon, s['mode--edit'])}>
          <Icon icon={'drive_file_rename_outline'} size={20} />
        </div>
        <div className={s.title}>
          <Text>Редактировать</Text>
        </div>
      </div>
      <div className={s.action} onClick={() => handleClick('delete')}>
        <div className={cn(s.icon, s['mode--delete'])}>
          <Icon icon={'delete_outline'} size={20} />
        </div>
        <div className={s.title}>
          <Text>Удалить</Text>
        </div>
      </div>
    </div>
  );
};
