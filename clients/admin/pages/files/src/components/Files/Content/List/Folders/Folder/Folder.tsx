import { FolderEntity } from '@library/domain';
import { Icon, Text, Link } from '@library/kit';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  data: FolderEntity;
}

export const Folder: React.FC<IProps> = (props) => {
  return (
    <Link className={s.wrapper} href={'/files' + '?dirUuid=' + props.data.uuid}>
      <div className={s.icon}>
        <Icon icon={'folder'} size={40} />
      </div>
      <div className={s.name}>
        <Text>{props.data.name}</Text>
      </div>
    </Link>
  );
};
