import { Substrate } from '@library/kit';

import React from 'react';
import { observer } from 'mobx-react';

import { useFiles } from '@/hooks/useFiles.ts';

import { File } from './File';
import { Empty } from './Empty';

import s from './default.module.scss';

export const List: React.FC = observer(() => {
  const files = useFiles();

  if (!files.length) {
    return <Empty />;
  }

  return (
    <Substrate>
      <div className={s.wrapper} data-title={'list'}>
        {files.map((file, index) => (
          <div key={index} className={s.item}>
            <File file={file} />
          </div>
        ))}
      </div>
    </Substrate>
  );
});
