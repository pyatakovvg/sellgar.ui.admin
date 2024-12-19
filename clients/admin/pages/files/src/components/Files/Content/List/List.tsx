import React from 'react';
import { observer } from 'mobx-react';

import { CurrentFolder } from './CurrentFolder';
import { Folders } from './Folders';
import { Files } from './Files';

import { useGetData } from '../../../../hooks/get-data.hook.ts';

import s from './default.module.scss';

export const List = observer(() => {
  const data = useGetData();

  return (
    <div className={s.wrapper}>
      {data.currentFolder && (
        <div className={s.current}>
          <CurrentFolder data={data.currentFolder} />
        </div>
      )}
      {!!data.folders.length && (
        <div className={s.folders}>
          <Folders data={data.folders} />
        </div>
      )}
      <div className={s.files}>
        <Files data={data.files} />
      </div>
    </div>
  );
});
