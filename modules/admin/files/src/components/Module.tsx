import { Heading } from '@library/kit';

import React from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';

import { useGetData } from '@/hooks/useGetData.ts';

import { Page } from './Page';

import s from './default.module.scss';

export const Module = observer(() => {
  const params = useParams();
  const getData = useGetData();

  React.useEffect(() => {
    (async () => {
      await getData(params.bucketName);
    })();
  }, []);

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Heading variant={'h2'}>Файлы</Heading>
      </div>
      <div className={s.content}>
        <Page />
      </div>
    </div>
  );
});
