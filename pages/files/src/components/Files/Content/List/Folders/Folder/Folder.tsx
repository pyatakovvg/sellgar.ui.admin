import { FolderEntity } from '@library/domain';
import { Typography } from '@sellgar/kit';

import React from 'react';
import { NavLink } from 'react-router-dom';

import s from './default.module.scss';

interface IProps {
  data: FolderEntity;
}

export const Folder: React.FC<IProps> = (props) => {
  return (
    <NavLink className={s.wrapper} to={'/files' + '?folderUuid=' + props.data.uuid}>
      <div className={s.icon}>{/*<Icon icon={'folder'} size={100} />*/}</div>
      <div className={s.name}>
        <Typography size={'body-m'} weight={'medium'}>
          <p>{props.data.name}</p>
        </Typography>
      </div>
    </NavLink>
  );
};
