import { FolderEntity } from '@library/domain';
import { Icon, Text, Link } from '@library/kit';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  data: FolderEntity;
}

export const CurrentFolder: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.icon}>
        <Icon icon={'folder_open'} size={40} />
      </div>
      <div className={s.name}>
        <Text>{props.data.name}</Text>
      </div>
    </div>
  );
};
