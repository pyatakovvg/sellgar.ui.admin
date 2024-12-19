import { FolderEntity } from '@library/domain';

import React from 'react';

import { Folder } from './Folder';

import s from './default.module.scss';

interface IProps {
  data: FolderEntity[];
}

export const Folders: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      {props.data.map((folder) => {
        return (
          <div key={folder.uuid} className={s.folder}>
            <Folder data={folder} />
          </div>
        );
      })}
    </div>
  );
};
