import { FileEntity } from '@library/domain';

import React from 'react';

import { File } from './File';

import s from './default.module.scss';

interface IProps {
  data: FileEntity[];
}

export const Files: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      {props.data.map((file) => {
        return (
          <div key={file.uuid} className={s.content}>
            <File data={file} />
          </div>
        );
      })}
    </div>
  );
};
