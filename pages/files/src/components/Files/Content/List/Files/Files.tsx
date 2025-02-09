import { FileEntity } from '@library/domain';

import React from 'react';

import { File } from './File';
import { View } from './View';

import s from './default.module.scss';

interface IProps {
  data: FileEntity[];
}

export const Files: React.FC<IProps> = (props) => {
  const [src, setSrc] = React.useState<string | null>(null);

  return (
    <div className={s.wrapper}>
      {props.data.map((file) => {
        return (
          <div key={file.uuid} className={s.content}>
            <File data={file} onClick={(src) => setSrc(src)} />
          </div>
        );
      })}

      <View src={src!} isOpen={!!src} onClose={() => setSrc(null)} />
    </div>
  );
};
